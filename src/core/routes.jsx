import Home from "/src/components/Home"
import Nihongo from "/src/components/Nihongo"

export const routes = []

function addRoute(path, element)
{
	return routes.push({
		path: path,
		element: React.cloneElement(element)
	})
}

addRoute("*", <h1>404 Not Found</h1>)
addRoute("/", Home)
addRoute("/nihongo", Nihongo)
