document.querySelector("#lang").addEventListener("click", async function (evt) {
    if (evt.target.tagName === "SPAN") {
        translator.load(evt.target.getAttribute("data-value"));
        localStorage.lang = evt.target.getAttribute("data-value")
        await miro.board.ui.closeLibrary()
        await miro.board.ui.openLibrary(LIBRARY_PATH, { title: 'Sonja et Conan contre les Ninjas' })
    }
})

miro.onReady(() => {
    UI.displayOnLoad()
})

