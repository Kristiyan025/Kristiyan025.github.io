const addDefaultMessageOnEmptyPage = () => {
    let body = document.querySelectorAll('body > .body')[0];
    if(body.childElementCount > 1) {
        return;
    }

    if(body.childElementCount == 1 &&
       !body.children[0].classList.contains("title") &&
       !body.children[0].classList.contains("content-container")) {
        return;
    }

    if(body.childElementCount == 1 &&
        body.children[0].classList.contains("content-container") &&
        body.children[0].childElementCount > 1) {
        return;
    }

    if(body.childElementCount == 1 &&
        body.children[0].classList.contains("content-container") &&
        body.children[0].childElementCount == 1 &&
        !body.children[0].children[0].classList.contains("title")) {
        return;
    }

    if(body.childElementCount == 1 &&
        body.children[0].classList.contains("content-container")) {
        body = body.children[0];
    }
    
    body.style.display = 'flex';
    body.style.flexDirection = 'column';
    body.style.alignItems = 'center';
    body.style.padding = "calc(2.5 * var(--font-size))";

    if(body.childElementCount == 1) {
        body.style.padding = "0 calc(2.5 * var(--font-size)) calc(2.5 * var(--font-size))";
    }

    body.innerHTML += '<h2 class="empty-page">There is no content on this page, yet.</h2>';
};


addDefaultMessageOnEmptyPage();