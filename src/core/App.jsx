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
				<header>
					<nav>
						<Link to="/">Home</Link>
						<Link to="/nihongo">日本語</Link>
					</nav>
					<div className="options">
						<DarkModeToggle/>
					</div>
				</header>
				<main>
					<ReactRouterDOM.Outlet/>
				</main>
			</>,
			children: routes
		}
	])}/>
})

function DarkModeToggle()
{
	const icon = React.createElement(model.darkMode ? Icons.Moon : Icons.Sun, {
		onClick: (e) => {
			model.darkMode = !model.darkMode
		}
	})

	return <>
		<div className="DarkModeToggle">
			{icon}
		</div>
	</>
}
