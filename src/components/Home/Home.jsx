import "./Home.scss"

export default MobxReact.observer(function(props)
{
	return <>
		<div className="Home">
			<h1>{model.value}</h1>
			<div className="buttons">
				<button onClick={() => { model.value++ }}>
					+
				</button>
				<button onClick={() => { model.value-- }}>
					-
				</button>
			</div>
			<button onClick={() => { model.darkMode = !model.darkMode }}>Turn {model.darkMode ? "off" : "on"} dark mode</button>
			<button onClick={() => { model.reset() }}>Reset data</button>
		</div>
	</>
})
