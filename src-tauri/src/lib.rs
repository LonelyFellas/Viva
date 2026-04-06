use serde::Serialize;

mod system;
mod utils;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
#[derive(Serialize)]
struct Config {
    api_base: String,
}

#[tauri::command]
fn get_config() -> Config {
    let config = Config {
        api_base: std::env::var("API_BASE")
            .unwrap_or_else(|_| "http://192.168.101.118:7890".to_string()),
    };
    return config;
}

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            crate::system::get_system_info,
            get_config
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
