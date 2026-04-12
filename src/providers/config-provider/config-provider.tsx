import { useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import { createContext, useMemo } from "react";

interface Config {
  api_base: String;
}

export const ConfigProvider = createContext<{
  config: Partial<Config>;
}>({
  config: {
    api_base: "",
  },
});
export function AppConfigProvider(props: React.PropsWithChildren) {
  const { data } = useQuery({
    queryKey: ["app-config"],
    queryFn: async () => await invoke<Config>("get_config"),
  });

  const config = useMemo(() => {
    // 获取localstorage缓存数据
    const cachedConfig = localStorage.getItem("app-config");
    if (cachedConfig) {
      // 更新localstorage缓存数据
      localStorage.setItem("app-config", JSON.stringify(data));
    }
    return data ?? {};
  }, [data]);

  return (
    <ConfigProvider.Provider value={{ config }}>
      {props.children}
    </ConfigProvider.Provider>
  );
}
