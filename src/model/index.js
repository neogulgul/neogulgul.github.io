class Model
{
	constructor()
	{
		this.load()

		Mobx.makeAutoObservable(this)

		Mobx.reaction(
			() => this.snapshot,
			() => this.save()
		)
	}

	set snapshot(snapshot)
	{
		this.value    = snapshot?.value    ?? 0
		this.darkMode = snapshot?.darkMode ?? window.matchMedia("(prefers-color-scheme: dark)").matches
	}

	get snapshot()
	{
		return {
			value:    this.value,
			darkMode: this.darkMode
		}
	}

	save()
	{
		localStorage.setItem("model", JSON.stringify(this.snapshot))
		logger.debug.log("Model snapshot saved.")
	}

	load()
	{
		this.snapshot = JSON.parse(localStorage.getItem("model"))
		logger.debug.log("Model snapshot loaded:", this.snapshot)
	}

	reset()
	{
		this.snapshot = null
	}
}

window.model = new Model()
