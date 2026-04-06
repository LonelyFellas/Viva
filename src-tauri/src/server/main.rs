use serde::Serialize;

#[derive(Serialize)]
struct DeviceConnectRequest {
    net_ip: String,
}

pub async fn device_connect_api(net_ip: String) -> Result<(), Box<dyn std::error::Error>> {
    reqwest::Client::new()
        .post("http://192.168.101.118:7890/device/connect")
        .json(&DeviceConnectRequest { net_ip })
        .send()
        .await?;
    Ok(())
}

#[tokio::main]
pub async fn main() -> Result<(), Box<dyn std::error::Error>> {
    device_connect_api("192.168.101.118".to_string()).await?;
    Ok(())
}
