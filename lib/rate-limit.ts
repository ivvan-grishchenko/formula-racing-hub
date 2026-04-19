/**
 * Sliding-window rate limiter: at most `limit` calls may **start** in any rolling
 * `intervalMs` window
 *
 * Instantiate once and call {@link SlidingWindowThrottle.run} for each operation.
 */
export class SlidingWindowThrottle {
	/** Serializes slot acquisition so concurrent callers cannot corrupt `timestamps`. */
	private acquireQueue = Promise.resolve();
	private readonly timestamps: number[] = [];

	constructor(
		private readonly limit: number,
		private readonly intervalMs: number
	) {}

	/**
	 * Waits until this request is allowed under the rate limit, then runs `fn`.
	 */
	async run<T>(fn: () => Promise<T>): Promise<T> {
		await this.acquireSlot();

		return fn();
	}

	private acquireSlot(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.acquireQueue = this.acquireQueue
				.then(() => this.waitUntilSlotAvailable())
				.then(resolve, reject);
		});
	}

	private async waitUntilSlotAvailable(): Promise<void> {
		let isInfinite = true;

		while (isInfinite) {
			const now = Date.now();

			while (!!this.timestamps.length && now - this.timestamps[0] >= this.intervalMs) {
				this.timestamps.shift();
			}

			if (this.timestamps.length < this.limit) {
				this.timestamps.push(Date.now());

				isInfinite = false;

				return;
			}

			const wait = this.intervalMs - (now - this.timestamps[0]);

			await new Promise<void>((resolve) => setTimeout(resolve, Math.max(0, wait)));
		}
	}
}
