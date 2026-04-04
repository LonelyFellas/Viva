import IpApi from "@/api/public/ip";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";

interface VivaDisk {
  name: string;
  kind: "HDD" | "SSD" | "Unknown";
  storage: number;
  storageText?: string;
}
interface SystemInfoMemory {
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

export default function Home() {
  const ipApi = useRef(new IpApi());
  const { data } = useQuery({
    queryKey: ["home"],
    queryFn: async () => await ipApi.current.getIpInfo(),
  });

  const { data: systemInfo } = useQuery({
    queryKey: ["systemInfo"],
    queryFn: async () => await invoke<SystemInfoMemory>("get_system_info"),
  });

  console.log(systemInfo);

  const countryCodeToFlag = useMemo(
    () =>
      data?.country_code
        ?.trim()
        .toUpperCase()
        .replace(/[^A-Z]/g, "")
        .slice(0, 2)
        .replace(/./g, (char) =>
          String.fromCodePoint(127397 + char.charCodeAt(0)),
        ),
    [data?.country_code],
  );

  return (
    <div>
      <h1>本地的地理位置信息</h1>
      <div>
        国家: {countryCodeToFlag} - {data?.country}
      </div>
      <div>城市: {data?.city}</div>
      <div>地区: {data?.region}</div>
      <div>时区: {data?.timezone}</div>
      <div>经度: {data?.longitude}</div>
      <div>纬度: {data?.latitude}</div>
      <div>偏移: {data?.offset}</div>
      <div>组织: {data?.organization}</div>
      <div>邮编: {data?.postal_code}</div>
      <div>isp: {data?.isp}</div>
      <div>ip: {data?.ip}</div>
      <h1>Memory</h1>
      <div>Total: {systemInfo?.totalMemoryText}</div>
      <div>Used: {systemInfo?.usedMemoryText}</div>
      <div>Total Swap: {systemInfo?.totalSwapText}</div>
      <div>Used Swap: {systemInfo?.usedSwapText}</div>
      <h1>System</h1>
      <div>Name: {systemInfo?.systemName}</div>
      <div>Kernel Version: {systemInfo?.systemKernelVersion}</div>
      <div>OS Version: {systemInfo?.systemOsVersion}</div>
      <div>Host Name: {systemInfo?.systemHostName}</div>
      <h1>磁盘</h1>
      <div className="flex flex-col space-x-4 bg-accent">
        {systemInfo?.disks?.map((disk, index) => (
          <div key={index} className="flex gap-3">
            <div>磁盘名字：{disk.name}</div>
            <div>磁盘类型：{disk.kind}</div>
            <div>磁盘容量：{disk.storageText}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
