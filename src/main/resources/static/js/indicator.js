const flashingText = document.createElement("p")
flashingText.textContent = "I'm flashing when JS is working"
function runFlashing(){
    setTimeout(() => {
        flashingText.style.color =
            flashingText.style.color === "black"
                ? "white" : "black"

        runFlashing()
    }, 500)
}

document
    .querySelector("body")
    .appendChild(flashingText)

runFlashing()