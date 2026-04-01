import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import App from "../App";

export const Route = createRootRoute({
    component: RootComponent,
    notFoundComponent: () => {
        return <div>Not Found</div>
    }
})

function RootComponent() {
    return (
        <App>
            <Outlet />
            <TanStackRouterDevtools position="bottom-right" />
        </App>
    )
}