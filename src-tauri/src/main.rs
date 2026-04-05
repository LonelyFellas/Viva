// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod server;

#[warn(unused)]
fn main() {
    std::thread::spawn(|| {
        let _ = server::main();
    });

    viva_lib::run();
}
