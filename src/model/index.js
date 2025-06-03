class Model
{
	constructor()
	{
		this.load()

		Mobx.makeAutoObservable(this)

		Mobx.reaction(
			() => this.getSnapshot(),
			() => this.save()
		)
	}

	setSnapshot(snapshot)
	{
		this.darkMode = snapshot?.darkMode ?? window.matchMedia("(prefers-color-scheme: dark)").matches
	}

	getSnapshot()
	{
		return { ...this }
	}

	save()
	{
		localStorage.setItem("model", JSON.stringify(this.getSnapshot()))
		logger.debug.log("Model snapshot saved.")
	}

	load()
	{
		this.setSnapshot(JSON.parse(localStorage.getItem("model")))
		logger.debug.log("Model snapshot loaded:", this.getSnapshot())
	}

	reset()
	{
		this.setSnapshot(null)
	}
}

window.model = new Model()
