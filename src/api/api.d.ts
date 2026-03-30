namespace Api {
    type ApiRequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";
    type ApiRequestOptions = {
        headers?: Record<string, string>;
        body?: any;
        params?: Record<string, string>;
    };
}