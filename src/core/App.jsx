import "./App.scss"

import { routes } from "./routes.jsx"

export default MobxReact.observer(function(props)
{
	React.useEffect(() => {
		document.documentElement.classList.toggle("dark", model.darkMode);
	}, [model.darkMode])

	return <ReactRouterDOM.RouterProvider router={ReactRouterDOM.createBrowserRouter([
		{
			element: <>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/test">Test</Link>
				</nav>
				<main>
					<ReactRouterDOM.Outlet/>
				</main>
			</>,
			children: routes
		}
	])}/>
})
