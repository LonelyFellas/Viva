use std::fmt::format;

use serde::Serialize;

const BASE_URL: &str = tauri::Config::get("api_base").unwrap_or("http://192.168.101.118:7890");

#[derive(Serialize)]
struct DeviceConnectRequest {
    net_ip: String,
}

pub async fn device_connect_api(net_ip: String) -> Result<(), Box<dyn std::error::Error>> {
    reqwest::Client::new()
        .post(format!("{}/device/connect", BASE_URL))
        .json(&DeviceConnectRequest { net_ip })
        .send()
        .await?;
    Ok(())
}

struct Device {
    id: String,
    net_ip: String,
    connected_at: String,
}
struct BaseResponse<T> {
    message: String,
    data: T,
    code: u16,
}

pub async fn query_device_api() -> Result<Vec<Device>, Box<dyn std::error::Error>> {
    let resp = reqwest::Client::new()
        .get(format!("{}/device/list", BASE_URL))
        .json(&{})
        .send()
        .await?;

    println!("---resp: {:?}", resp);

    Ok(())
}
