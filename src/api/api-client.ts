export class ApiClient {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getIpInfo() {
        const response = await fetch(`${this.baseUrl}/geoip`);
        return response.json();
    }
}