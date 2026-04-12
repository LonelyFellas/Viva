use serde::{Deserialize, Serialize};

mod system;
mod utils;

/// 与 `tauri.conf.default.json` 同结构（非 Tauri 官方配置，仅作应用默认值）。
#[derive(Deserialize)]
struct AppConfigDefaults {
    api_base: String,
}

const APP_CONFIG_DEFAULTS: &str = include_str!("../tauri.conf.default.json");

#[cfg_attr(mobile, tauri::mobile_entry_point)]
#[derive(Serialize)]
struct Config {
    api_base: String,
}

fn default_api_base_from_file() -> String {
    serde_json::from_str::<AppConfigDefaults>(APP_CONFIG_DEFAULTS)
        .expect("tauri.conf.default.json: invalid JSON or missing api_base")
        .api_base
}

#[tauri::command]
fn get_config() -> Config {
    Config {
        api_base: std::env::var("API_BASE").unwrap_or_else(|_| default_api_base_from_file()),
    }
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
