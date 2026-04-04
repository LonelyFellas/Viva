use serde::Serialize;
use sysinfo::{DiskKind, Disks, System};

use crate::utils::format_bytes;

#[derive(Serialize)]
enum VivaDiskKind {
    /// HDD type.
    HDD,
    /// SSD type.
    SSD,
    /// Unknown type.
    Unknown(isize),
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct VivaDisk {
    name: String,
    disk_kind: VivaDiskKind,
    storage: u64,
    storage_text: Option<String>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SystemInfoMemory {
    total_memory: u64,
    used_memory: u64,
    total_swap: u64,
    used_swap: u64,
    total_memory_text: String,
    used_memory_text: String,
    total_swap_text: String,
    used_swap_text: String,
    system_name: Option<String>,
    system_kernel_version: Option<String>,
    system_os_version: Option<String>,
    system_host_name: Option<String>,
    nb_cpus: usize,
    disks: Vec<VivaDisk>,
}

#[tauri::command]
pub fn get_system_info() -> Result<SystemInfoMemory, String> {
    let mut sys = System::new_all();

    sys.refresh_all();
    let total_memory = sys.total_memory();
    let used_memory = sys.used_memory();
    let total_swap = sys.total_swap();
    let used_swap = sys.used_swap();

    let total_memory_text = format_bytes(total_memory);
    let used_memory_text = format_bytes(used_memory);
    let total_swap_text = format_bytes(total_swap);
    let used_swap_text = format_bytes(used_swap);

    let system_name = System::name();
    let system_kernel_version = System::kernel_version();
    let system_os_version = System::os_version();
    let system_host_name = System::host_name();

    let nb_cpus = sys.cpus().len();

    let os_disks = Disks::new_with_refreshed_list();

    let disks: Vec<VivaDisk> = os_disks
        .iter()
        .map(|disk| VivaDisk {
            name: disk.name().to_string_lossy().to_string(),
            disk_kind: match disk.kind() {
                DiskKind::HDD => VivaDiskKind::HDD,
                DiskKind::SSD => VivaDiskKind::SSD,
                DiskKind::Unknown(value) => VivaDiskKind::Unknown(value),
            },
            storage: disk.total_space(),
            storage_text: Some(format_bytes(disk.total_space())),
        })
        .collect();

    Ok(SystemInfoMemory {
        total_memory,
        used_memory,
        total_swap,
        used_swap,
        total_memory_text,
        used_memory_text,
        total_swap_text,
        used_swap_text,
        system_name,
        system_kernel_version,
        system_os_version,
        system_host_name,
        nb_cpus,
        disks,
    })
}
