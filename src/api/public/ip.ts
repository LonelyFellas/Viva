import ApiRequest from "../api-request";

export default class IpApi {
    private apiRequest: ApiRequest;

    constructor() {
        this.apiRequest = new ApiRequest("https://api.ip.sb");
    }

    async getIpInfo() {
        const response = await this.apiRequest.get<IpInfo>("/geoip");
        return response;
    }
}

interface IpInfo {
    city: string;
    continent_code: string;
    country: string;
    country_code: string;
    ip: string;
    isp: string;
    latitude: number;
    longitude: number;
    offset: number;
    organization: string;
    postal_code: string;
    region: string;
    region_code: string;
    timezone: string;
}