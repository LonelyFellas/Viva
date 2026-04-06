mod server;
mod system;
mod utils;

#[cfg_attr(mobile, tauri::mobile_entry_point)]

pub fn run() {
    std::thread::spawn(|| {
        if let Err(e) = server::main() {
            eprintln!("server::main failed: {e:#}");
        }
    });
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![crate::system::get_system_info,])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
