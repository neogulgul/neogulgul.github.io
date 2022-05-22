// some functions
function getElement(element) {
	return document.querySelector(element)
}

function getAllElements(elements) {
	return document.querySelectorAll(elements)
}

function renderCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height)

	const columns = canvas.width / 16
	const rows = canvas.height / 16
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < columns; x++) {
			if (x % 2 === 0 && y % 2 !== 0 || x % 2 !== 0 && y % 2 === 0) {
				context.fillStyle = "rgba(0, 0, 0, 0.1)"
				context.fillRect(x * 16, y * 16, 16, 16)
			}
		}
	}

	Object.keys(map.layers).forEach((layer) => {
		for (let y = 0; y < map.layers[layer].length; y++) {
			let row = map.layers[layer][y]
			for (let x = 0; x < row.length; x++) {
				let square = row[x]
				if (square !== "") {
					square.draw()
				}
			}
		}
	})
}

function changeCanvasSize() {
	getAllElements("input[type='number']").forEach((input) => {
		if (parseInt(input.value) < input.min || isNaN(parseInt(input.value))) {
			input.value = input.min
		}
		else if (parseInt(input.value) > input.max) {
			input.value = input.max
		}
	})

	const width = parseInt(getElement("#width").value)
	const height = parseInt(getElement("#height").value)
	const deltaWidth = width - map.width
	const deltaHeight = height - map.height
	map.width = width
	map.height = height

	getElement("#map canvas").width = width * 16
	getElement("#map canvas").height = height * 16

	console.log(`dW: ${deltaWidth}, dH: ${deltaHeight}`)
	Object.keys(map.layers).forEach((layer) => {
		// rows
		for (let y = 0; y < Math.abs(deltaHeight); y++) {
			if (deltaHeight > 0) {
				map.layers[layer].push([])
				if (deltaWidth === 0) {
					let length = map.layers[layer].length
					for (let x = 0; x < width; x++) {
						map.layers[layer][length - 1].push("")
					}
				}
			} else if (deltaHeight < 0) {
				map.layers[layer].pop()
			}
		}

		// columns
		for (let y = 0; y < map.layers[layer].length; y++) {
			let row = map.layers[layer][y]
			for (let x = 0; x < Math.abs(deltaWidth); x++) {
				if (deltaWidth > 0) {
					row.push("")
				} else if (deltaWidth < 0) {
					row.pop()
				}
			}
		}
		console.log(map.layers[layer])
	})

	renderCanvas()
}

function transformCanvas() {
	canvas.style.transform = `translate(${translationX}px, ${translationY}px) scale(${mapScale})`
}

function zoom(closer) {
	if (closer) { // zoom in
		mapScale += 0.25
	} else { // zoom out
		mapScale -= 0.25
		if (mapScale === 0) {
			mapScale = 0.25
		}
	}

	transformCanvas()
}

function getCoords(event, scale) {
	const { x, y } = event.target.getBoundingClientRect()
	const mouseX = (event.clientX - x) / scale
	const mouseY = (event.clientY - y) / scale
	return [Math.floor(mouseX / 16), Math.floor(mouseY / 16)]
}

function leftClick(event) {
	if (event.button === 0) {
		return true
	}
	return false
}

function middleClick(event) {
	if (event.button === 1) {
		return true
	}
	return false
}

function tiling(event) {
	const position = {
		x: getCoords(event, mapScale)[0],
		y: getCoords(event, mapScale)[1]
	}
	if (editor.erase) {
		map.layers[editor.layer][position.y][position.x] = ""
	} else {
		const tile = new Tile(editor.layer, editor.selector, position)
		map.layers[editor.layer][position.y][position.x] = tile
	}
}

function activateSelector() {
	if (getElement(".selector.active") !== null) {
		getElement(".selector.active").classList.remove("active")
	}
	getElement(`.layer.${editor.layer} .selector`).classList.add("active")

	if (getElement("#layers .active") !== null) {
		getElement("#layers .active").classList.remove("active")
	}
	getElement(`#layers .${editor.layer}`).classList.add("active")
}

// some variables
const canvas = getElement("#map canvas")
const context = canvas.getContext("2d")

const editor = {
	layer: "bottom",
	selector: {
		x: 0,
		y: 0
	},
	drag: {
		map: false,
		grid: false
	},
	erase: false
}

const map = {
	name: "",
	width: 0,
	height: 0,
	layers: {
		bottom: [],
		middle: [],
		top: []
	}
}

const svgs = {
	plus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/></svg>`,
	minus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M5 11h14v2H5z"/></svg>`
}

let startX = 0
let startY = 0
let translationX = 0
let translationY = 0
let mapScale = 1

class Tile {
	constructor(layer, selector, position) {
		this.layer = getElement(`img[src="./textures/${layer}.png"]`)
		this.selector = {
			x: selector.x * 16,
			y: selector.y * 16
		}
		this.position = {
			x: position.x * 16,
			y: position.y * 16
		}
	}

	draw() {
		context.drawImage(this.layer, this.selector.x, this.selector.y, 16, 16, this.position.x, this.position.y, 16, 16)
	}
}

// onload
document.body.onload = () => {
	// to prevent dragging images
	getAllElements("img").forEach((image) => {
		image.ondragstart = () => {
			return false
		}
	})

	getAllElements("aside section h2").forEach((h2) => {
		h2.innerHTML += svgs.plus

		h2.onclick = () => {
			let section = h2.closest("section")

			if (section.classList.contains("open")) {
				section.classList.remove("open")
				h2.children[0].outerHTML = svgs.plus
			} else {
				section.classList.add("open")
				h2.children[0].outerHTML = svgs.minus
			}
		}
	})

	getAllElements("input[type='number']").forEach((input) => {
		input.onkeydown = (event) => {
			if (event.key === "Enter") {
				if (parseInt(input.value) < input.min || isNaN(parseInt(input.value))) {
					input.value = input.min
				}
				else if (parseInt(input.value) > input.max) {
					input.value = input.max
				}
			}
		}
	})

	getElement("#change-size").onclick = () => {
		changeCanvasSize()
	}

	getAllElements(".layer img").forEach((img) => {
		img.onmousedown = (event) => {
			if (!leftClick(event)) {
				return
			}

			editor.erase = false
			getElement("#erase").classList.remove("active")

			const src = img.getAttribute("src")
			editor.layer = src.split("./textures/")[1].split(".png")[0]

			const scale = getComputedStyle(document.documentElement).getPropertyValue("--pixel-scale")
			editor.selector.x = getCoords(event, scale)[0]
			editor.selector.y = getCoords(event, scale)[1]
			getElement(`.layer.${editor.layer} .selector`).style.top = editor.selector.y * 16 * scale + "px"
			getElement(`.layer.${editor.layer} .selector`).style.left = editor.selector.x * 16 * scale + "px"
			activateSelector()
		}
	})

	getAllElements("#layers span").forEach((span) => {
		span.onclick = () => {
			if (!span.classList.contains("active")) {
				editor.layer = span.classList.value
				const scale = getComputedStyle(document.documentElement).getPropertyValue("--pixel-scale")
				editor.selector.x = 0
				editor.selector.y = 0
				getElement(`.layer.${editor.layer} .selector`).style.top = editor.selector.y * 16 * scale + "px"
				getElement(`.layer.${editor.layer} .selector`).style.left = editor.selector.x * 16 * scale + "px"
				activateSelector()
				getElement("#layers .active").classList.remove("active")
				span.classList.add("active")
			}
		}
	})

	getElement("#map").onmousedown = (event) => {
		if (!middleClick(event)) {
			return
		}

		editor.drag.map = true
		startX = event.clientX - translationX
		startY = event.clientY - translationY
	}

	getElement("#map").onwheel = (event) => {
		if (event.deltaY < 0) {
			zoom(true)
		} else {
			zoom()
		}
	}

	getElement("#map canvas").onmousedown = (event) => {
		if (!leftClick(event)) {
			return
		}
		editor.drag.grid = true
		tiling(event)
		renderCanvas()
	}

	getElement("#map canvas").onmousemove = (event) => {
		if (editor.drag.grid) {
			tiling(event)
			renderCanvas()
		}
	}

	getElement("#reset").onclick = () => {
		translationX = 0
		translationY = 0
		mapScale = 1
		transformCanvas()
	}

	getElement("#zoom-in").onclick = () => { // zoom in
		zoom(true)
	}

	getElement("#zoom-out").onclick = () => { // zoom out
		zoom()
	}

	getElement("#erase").onclick = () => {
		if (getElement("#erase").classList.contains("active")) {
			getElement("#erase").classList.remove("active")
			editor.erase = false
		} else {
			getElement("#erase").classList.add("active")
			editor.erase = true
		}
	}

	changeCanvasSize()
	activateSelector()
}

document.onmousemove = (event) => {
	if (editor.drag.map) {
		translationX = event.clientX - startX
		translationY = event.clientY - startY
		transformCanvas()
	}
}

document.onmouseup = () => {
	editor.drag.map = false
	editor.drag.grid = false
}
