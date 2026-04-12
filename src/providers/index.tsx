import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppConfigProvider } from "./config-provider/config-provider";

const queryClient = new QueryClient();

export function AppProviders(props: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppConfigProvider>{props.children}</AppConfigProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
