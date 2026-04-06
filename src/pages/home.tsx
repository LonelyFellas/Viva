import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";

async function mockConnect() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          isSuccess: true,
        },
        code: 200,
        message: "success",
      });
    }, 3000);
  });
}

interface BaseApiResponse<T> {
  data: T;
  code: number;
  msg: string;
}
async function queryDevices(): Promise<
  BaseApiResponse<
    {
      ip: string;
      operatingSystem: string;
      systemName: string;
      status: "online" | "offline";
    }[]
  >
> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            ip: "192.168.101.118",
            operatingSystem: "Windows 10",
            systemName: "Darwish",
            status: "online",
          },
        ],
        code: 200,
        msg: "success",
      });
    }, 3000);
  });
}

export default function Home() {
  const { data: dataResponse } = useQuery({
    queryKey: ["query-devices"],
    queryFn: queryDevices,
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["connect"],
    mutationFn: async () => await mockConnect(),
    onSuccess(data) {
      console.log("连接成功", data);
    },
  });

  const connect = () => {
    mutate();
  };

  return (
    <div className="min-h-screen w-screen bg-slate-50 p-6">
      <div className="mx-auto w-full max-w-3xl space-y-4">
        <h1 className="text-2xl font-semibold text-slate-900">设备列表</h1>

        <div className="space-y-3">
          {dataResponse?.data?.map((device) => (
            <div
              key={device.ip}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-medium text-slate-900">
                    {device.systemName}
                  </p>
                  <p className="text-sm text-slate-500">{device.ip}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    device.status === "online"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {device.status === "online" ? "在线" : "离线"}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                操作系统：{device.operatingSystem}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <Button onClick={connect} disabled={isPending}>
            {isPending ? "Connecting..." : "Connect"}
          </Button>
        </div>
      </div>
    </div>
  );
}
