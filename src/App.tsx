import "./global.css";
import { AppProviders } from "./prividers";

export default function App(props: React.PropsWithChildren) {
  return (
    <AppProviders>
      {props.children}
    </AppProviders>
  )
}