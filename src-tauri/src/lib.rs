mod system;
mod utils;
use std::{
    env,
    sync::{mpsc, Arc},
    time::Duration,
};

use r_lanlib::{
    network,
    scanners::{full_scanner::FullScanner, Device, ScanMessage, Scanner},
    targets::{ips::IPTargets, ports::PortTargets},
};

#[tauri::command]
fn get_network_info() -> Result<(), String> {
    // Detect the default network interface and derive the CIDR to scan
    let interface = Arc::new(network::get_default_interface().expect("cannot find interface"));

    let cidr = interface.cidr.clone();

    // Wire abstracts the raw packet reader/sender for the interface
    let wire = r_lanlib::wire::default(&interface).expect("failed to create wire");

    let ip_targets = IPTargets::new(vec![cidr]).expect("failed to parse IP targets");

    // Ports to check on each discovered device
    let port_targets =
        PortTargets::new(vec!["1-65535".to_string()]).expect("failed to parse port targets");

    let idle_timeout = Duration::from_millis(10000);
    let source_port: u16 = 54321;

    // ScanMessage is sent on this channel as results arrive
    let (tx, rx) = mpsc::channel::<ScanMessage>();

    let scanner = FullScanner::builder()
        .interface(interface)
        .wire(wire)
        .targets(ip_targets)
        .ports(port_targets)
        .vendor(true)
        .host(true)
        .idle_timeout(idle_timeout)
        .notifier(tx)
        .source_port(source_port)
        .build()
        .unwrap();
    let mut results: Vec<Device> = Vec::new();

    // scan() spawns a background thread; join it after draining the channel
    let handle = scanner.scan().unwrap();

    loop {
        let msg = rx.recv().expect("failed to poll for messages");

        match msg {
            // Done signals both phases are complete and the thread is finishing
            ScanMessage::Done => {
                println!("scanning complete");
                break;
            }
            // SYNScanDevice is the terminal result per device, emitted after
            // the SYN phase; open_ports is populated at this point
            ScanMessage::SYNScanDevice(device) => results.push(device),
            _ => {
                println!("{:?}", msg)
            }
        }
    }

    if let Err(e) = handle.join() {
        panic!("error: {:?}", e);
    }

    println!("results: {:?}", results);

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            crate::system::get_system_info,
            get_network_info
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
