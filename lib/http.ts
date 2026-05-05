import { stringify } from 'qs';

export type ApiMethod = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
const DEFAULT_TIMEOUT_MS = 10_000;

type ApiClientConfig = {
	baseUrl: string;
	defaultHeaders?: Record<string, string>;
	timeoutMs?: number;
};

type ApiErrorKind = 'abort' | 'http' | 'network' | 'parse' | 'timeout' | 'unknown';
type RequestOptions = {
	headers?: Record<string, string>;
	query?: RequestQuery;
};
type RequestQuery = any;
export class ApiError extends Error {
	constructor(
		message: string,
		public readonly kind: ApiErrorKind,
		public readonly status?: number,
		public readonly details?: unknown
	) {
		super(message);

		Object.setPrototypeOf(this, ApiError.prototype);
	}
}

export function createApiClient(config: ApiClientConfig) {
	const timeoutMs = config.timeoutMs || DEFAULT_TIMEOUT_MS;

	async function request<TResponse>(
		method: ApiMethod,
		path: string,
		body?: unknown,
		options?: RequestOptions
	): Promise<TResponse> {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
		const url = buildUrl(config.baseUrl, path, options?.query);
		const headers: Record<string, string> = {
			...(config.defaultHeaders ?? {}),
			...(options?.headers ?? {}),
		};
		const shouldSendJsonBody = !!body && method !== 'GET' && method !== 'DELETE';

		if (shouldSendJsonBody && !headers['Content-Type'])
			headers['Content-Type'] = 'application/json';

		try {
			const response = await fetch(url, {
				body: shouldSendJsonBody ? JSON.stringify(body) : undefined,
				headers,
				method,
				signal: controller.signal,
			});

			const parsed = await parseResponse(response);

			if (!response.ok) {
				const errorMessage =
					typeof parsed === 'object' && parsed && 'message' in parsed
						? String(parsed.message)
						: `Request failed (${response.status})`;

				throw new ApiError(errorMessage, 'http', response.status, parsed);
			}

			return parsed as TResponse;
		} catch (err) {
			if (err && typeof err === 'object' && 'kind' in err) throw err;

			if (err && typeof err === 'object' && 'name' in err && err.name === 'AbortError') {
				throw new ApiError(`Timeout after ${timeoutMs}ms`, 'timeout');
			}

			throw toApiError(err);
		} finally {
			clearTimeout(timeoutId);
		}
	}

	return {
		delete<T>(path: string, options?: RequestOptions) {
			return request<T>('DELETE', path, undefined, options);
		},
		get<T>(path: string, options?: RequestOptions) {
			return request<T>('GET', path, undefined, options);
		},
		patch<T>(path: string, body?: unknown, options?: RequestOptions) {
			return request<T>('PATCH', path, body, options);
		},
		post<T>(path: string, body?: unknown, options?: RequestOptions) {
			return request<T>('POST', path, body, options);
		},
		put<T>(path: string, body?: unknown, options?: RequestOptions) {
			return request<T>('PUT', path, body, options);
		},
		request,
	};
}

export function toApiError(error: unknown): ApiError {
	if (error && typeof error === 'object' && 'name' in error && error.name === 'AbortError') {
		return new ApiError('Request was cancelled', 'abort');
	}

	if (error instanceof TypeError) return new ApiError('Network error', 'network');
	if (error instanceof Error) return new ApiError(error.message, 'network', undefined, error.cause);

	return new ApiError('Unknown error', 'unknown');
}

function buildUrl(baseUrl: string, path: string, query?: RequestQuery) {
	const url = new URL(path, baseUrl);

	if (query) url.search = stringify(query, { encode: false });

	return url.toString();
}

async function parseResponse(res: Response): Promise<unknown> {
	const contentType = res.headers.get('content-type') ?? '';
	const isJson = contentType.includes('application/json');

	if (isJson) {
		try {
			return await res.json();
		} catch {
			return null;
		}
	}

	try {
		const text = await res.text();

		return JSON.parse(text);
	} catch {
		return '';
	}
}
