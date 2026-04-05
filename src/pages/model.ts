/** sysinfo 枚举默认序列化为形如 `{ SSD: null }` 的外层标签。 */
export type VivaDiskKindPayload = { HDD?: null; SSD?: null; Unknown?: number };

export interface VivaDisk {
  name: string;
  mountPoint: string;
  diskKind: VivaDiskKindPayload;
  totalSpace: number;
  totalSpaceText: string;
  availableSpace: number;
  availableSpaceText: string;
}


export interface SystemInfoMemory {
  totalMemory: number;
  usedMemory: number;
  totalSwap: number;
  usedSwap: number;
  totalMemoryText: string;
  usedMemoryText: string;
  totalSwapText: string;
  usedSwapText: string;
  systemName: string;
  systemKernelVersion: string;
  systemOsVersion: string;
  systemHostName: string;
  disks: VivaDisk[];
}

export interface NetworkInfo {
  name: string;
  ip: string;
  mac: string;
  subnet: string;
  gateway: string;
  dns: string;
}