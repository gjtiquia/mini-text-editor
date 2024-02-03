import { OuterProvider } from "./providers/OuterProvider"
import { Root } from "./routes"
import "./index.css"

export default App

function App() {

  return (
    <OuterProvider>
      <Root />
    </OuterProvider>
  )
}

