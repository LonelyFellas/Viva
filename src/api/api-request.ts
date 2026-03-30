export default class ApiRequest {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async baseRequest(method: Api.ApiRequestMethod, path: string, data: any) {
        path = this.buildPath(path, data.params);
        const response = await fetch(`${this.baseUrl}${path}`, {
            method,
            ...(method !== "GET" ? { body: JSON.stringify(data) } : {}),
        }).then(res => res.json());
        return response;
    }

    private buildPath(path: string, params?: Record<string, string>) {
        if (!params) return path;
        return path + "?" + Object.entries(params).map(([key, value]) => `${key}=${value}`).join("&");
    }

    get<T>(path: string, options?: any): Promise<T> {
        return this.baseRequest("GET", path, options ?? {});
    }

    post<T>(path: string, options?: any): Promise<T> {
        return this.baseRequest("POST", path, options ?? {});
    }

    put<T>(path: string, options?: any): Promise<T> {
        return this.baseRequest("PUT", path, options ?? {});
    }

    delete<T>(path: string, options?: any): Promise<T> {
        return this.baseRequest("DELETE", path, options ?? {});
    }

    patch<T>(path: string, options?: any): Promise<T> {
        return this.baseRequest("PATCH", path, options ?? {});
    }

    options<T>(path: string, options?: any): Promise<T> {
        return this.baseRequest("OPTIONS", path, options ?? {});
    }
}