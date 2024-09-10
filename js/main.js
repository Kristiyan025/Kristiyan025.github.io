/*       Header       */
let menuIcon = document.getElementsByClassName('menu-icon')[0];
setTimeout(function(){ menuIcon.style.visibility = 'visible'; }, 850);

/*       Fix Full Width       */
function adjustWidth() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.querySelector('body').style.width = `calc(100vw - ${scrollbarWidth}px)`;
}

window.addEventListener('resize', adjustWidth);
window.addEventListener('load', adjustWidth);

/*       Scroll Effect       */
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 200;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}
window.addEventListener("scroll", reveal);