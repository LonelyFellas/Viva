// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod server;

fn main() {
    std::thread::spawn(|| {
        if let Err(e) = server::local_network_main() {
            eprintln!("local network main failed: {e}");
        }
    });

    viva_lib::run();
}
