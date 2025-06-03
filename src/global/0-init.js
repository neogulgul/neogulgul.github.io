import      React          from "react"
import      ReactDomClient from "react-dom/client"
import * as ReactRouterDOM from "react-router-dom"
import * as Mobx           from "mobx"
import * as MobxReact      from "mobx-react-lite"

window.DEBUG          = import.meta.env.VITE_DEBUG || false
window.React          = React
window.ReactDomClient = ReactDomClient
window.ReactRouterDOM = ReactRouterDOM
window.Mobx           = Mobx
window.MobxReact      = MobxReact

// common elements
window.Link = ReactRouterDOM.Link

Mobx.configure({ enforceActions: "never" })
