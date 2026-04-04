mod utils;

use serde::Serialize;
use sysinfo::System;

use utils::format_bytes;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct SystemInfoMemory {
    total_memory: u64,
    used_memory: u64,
    total_swap: u64,
    used_swap: u64,
    total_memory_text: String,
    used_memory_text: String,
    total_swap_text: String,
    used_swap_text: String,
}

#[tauri::command]
fn get_system_info() -> Result<SystemInfoMemory, String> {
    let mut sys = System::new_all();

    sys.refresh_all();
    println!("=> system");
    // RAM and swap information:
    println!("total memory: {} bytes", sys.total_memory());
    println!("used memory : {} bytes", sys.used_memory());
    println!("total swap  : {} bytes", sys.total_swap());
    println!("used swap   : {} bytes", sys.used_swap());

    Ok(SystemInfoMemory {
        total_memory: sys.total_memory(),
        used_memory: sys.used_memory(),
        total_swap: sys.total_swap(),
        used_swap: sys.used_swap(),
        total_memory_text: format_bytes(sys.total_memory()),
        used_memory_text: format_bytes(sys.used_memory()),
        total_swap_text: format_bytes(sys.total_swap()),
        used_swap_text: format_bytes(sys.used_swap()),
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, get_system_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
