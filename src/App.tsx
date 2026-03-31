import "./global.css";

export default function App(props: React.PropsWithChildren) {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-red-500">Hello world!</h1>
      {props.children}
    </div>
  )
}