import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { AppProvider } from "./context/AppContext"
import "./index.css"

import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
)
