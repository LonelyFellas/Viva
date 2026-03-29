use std::process::Command;
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

struct LinuxInfo {

}

#[tauri::command()]
fn get_linux_info() -> String {
    let output = Command::new("lshw")
        .arg("-short")
        .output()
        .expect("Failed to execute process");
    let text = String::from_utf8(output.stdout).expect("Failed to convert output to string");
    println!("Output: {text}");
    text
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, get_linux_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
