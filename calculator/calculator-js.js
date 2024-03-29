let display = document.querySelector(".display");

let buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
    button.addEventListener("click",(e) => {
        switch(button.innerText) {
            case "AC":
                display.innerText = "0";
                break;
            case "=":
                try {
                display.innerText = eval(display.innerText);
                }
                catch (e) {
                    display.innerText = "Error"
                }
                break;
            case "%":
                display.innerText = eval(display.innerText + "/100")
                break;
            case "+/-":
                display.innerText = "-";
                break;
            default:
                if(display.innerText === "0" && button.innerText != ".") {
                    display.innerText = button.innerText;
                }
                else display.innerText += button.innerText;
        }
    });
});