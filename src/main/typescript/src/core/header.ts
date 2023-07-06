import {resolveCSS} from "../stylesResolver";

export function resolveHeader(){
    resolveCSS("header")
    resolveResetButton()
    // resolveInfoButton()
    // resolveHelpButton()
}

const headerElement = document.getElementById("header")!

function resolveResetButton(){
    resolveButtonAction("reset", () => location.reload())
}

// function resolveInfoButton(){
//     resolveButtonAction("info")
// }
//
// function resolveHelpButton(){
//     resolveButtonAction("help")
// }

function resolveButtonAction(buttonClassName: string, onClick: () => void){
    headerElement.querySelector("button."+buttonClassName).addEventListener("click", onClick)
}

// fetchApplicationInfo()