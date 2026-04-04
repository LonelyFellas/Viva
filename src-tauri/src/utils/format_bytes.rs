pub fn format_bytes(bytes: u64) -> String {
    let units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let mut bytes = bytes as f64;
    let mut unit_index = 0usize;
    while bytes >= 1024.0 && unit_index + 1 < units.len() {
        bytes /= 1024.0;
        unit_index += 1;
    }
    format!("{:.2} {}", bytes, units[unit_index])
}
