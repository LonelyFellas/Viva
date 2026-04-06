import "./global.css";
import { AppProviders } from "./providers";

export default function App(props: React.PropsWithChildren) {
  return <AppProviders>{props.children}</AppProviders>;
}
