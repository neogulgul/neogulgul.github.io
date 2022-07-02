const svgs = {
	plus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/></svg>`,
	minus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M5 11h14v2H5z"/></svg>`
}

document.querySelectorAll("section h2").forEach((h2) => {
	h2.insertAdjacentHTML("afterbegin", svgs.plus)

	h2.onclick = () => {
		if (h2.parentElement.classList.contains("open")) {
			h2.parentElement.classList.remove("open")
			h2.children[0].innerHTML = svgs.plus
		} else {
			h2.parentElement.classList.add("open")
			h2.children[0].innerHTML = svgs.minus
		}
	}
})
