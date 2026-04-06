import ApiRequest from "../api-request";

export default class Device {
  private apiRequet: ApiRequest;

  constructor() {
    this.apiRequet = new ApiRequest("http://192.168.101.118:7890");
  }



  deviceList() {

  }
}