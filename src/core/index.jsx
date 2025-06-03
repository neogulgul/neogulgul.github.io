import "/src/global"

import "/src/model"

import App from "./App.jsx"

const root = ReactDomClient.createRoot(document.getElementById("root"))
root.render(<App/>)

logger.success.log("App mounted.")
logger.debug.notice.log("You are in debug mode.")
