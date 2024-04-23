const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");
styleSwitcherToggler.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
})

window.addEventListener("scroll", () => {
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
})


const styleColor = document.querySelectorAll(".color");
// console.log(styleColor);



function setActiveStyle(color) {
    styleColor.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disable");
        } else {
            style.setAttribute("disable", "true");
        }
        // console.log(color);
        console.log(style);
    })
}