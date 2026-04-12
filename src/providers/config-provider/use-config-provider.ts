import { useContext } from "react";
import { ConfigProvider } from "./config-provider";

export function useConfigProvider() {
  return useContext(ConfigProvider);
}