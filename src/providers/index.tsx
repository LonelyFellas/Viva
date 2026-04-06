import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export function AppProviders(props: React.PropsWithChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            {props.children}
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}