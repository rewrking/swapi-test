import fetch, { Response } from "node-fetch";

export enum ReqMethod {
	POST = "POST",
	GET = "GET",
	PUT = "PUT",
	PATCH = "PATCH",
	DELETE = "DELETE",
}

type PartialResponse = Pick<Response, "status" | "statusText" | "ok">;
type FetchResponse = [Response, PartialResponse];

export type ApiResponse<T> = PartialResponse & {
	data: T;
};

export abstract class BaseApi {
	private ctrlr: AbortController;

	constructor(protected baseUrl: string) {
		this.ctrlr = new AbortController();
	}

	private fetch = async (route: string, method: ReqMethod): Promise<FetchResponse> => {
		try {
			const { signal } = this.ctrlr;
			const url: string = this.baseUrl + route;
			const response = await fetch(url, { method, signal });
			const { status, statusText, ok } = response;
			const details = {
				status,
				statusText,
				ok,
			};
			return [response, details];
		} catch (err: any) {
			console.warn("fetch error: ", err);
			throw err;
		}
	};

	protected getRaw = async (route: string): Promise<ApiResponse<string>> => {
		const [response, details] = await this.fetch(route, ReqMethod.GET);

		const data: string = await response.text();
		return {
			...details,
			data,
		};
	};

	protected GET = async <T extends object>(route: string): Promise<ApiResponse<T>> => {
		const [response, details] = await this.fetch(route, ReqMethod.GET);
		const data = (await response.json()) as T;
		return {
			...details,
			data,
		};
	};

	protected POST = async <T extends object>(route: string): Promise<ApiResponse<T>> => {
		const [response, details] = await this.fetch(route, ReqMethod.POST);
		const data = (await response.json()) as T;
		return {
			...details,
			data,
		};
	};
}
