console.log("Welcome to my portfolio site!");
document.querySelector(".arrow").addEventListener("click", function () {
    window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth"
    });
});
