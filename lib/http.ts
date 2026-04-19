export async function baseFetch<T>(base: string, path: string): Promise<T> {
	const url = path.startsWith('http') ? path : `${base}${path.startsWith('/') ? path : `/${path}`}`;
	const res = await fetch(url);

	return parseJson<T>(res);
}

async function parseJson<T>(res: Response): Promise<T> {
	const text = await res.text();

	if (!res.ok) throw new Error(`OpenF1 ${res.status}: ${text.slice(0, 200)}`);

	if (!text.length) return [] as T;

	return JSON.parse(text) as T;
}
