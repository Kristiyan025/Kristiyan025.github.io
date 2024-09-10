const addDefaultMessageOnEmptyPage = () => {
    const body = document.querySelectorAll('body > .body')[0];
    if(body.innerHTML.trim() != "") {
        return;
    }
    
    body.style.display = 'flex';
    body.style.justifyContent = 'center';
    body.style.padding = "calc(2.5 * var(--font-size))";
    body.innerHTML = '<h2 class="empty-page">There is no content on this page, yet.</h2>';
};


addDefaultMessageOnEmptyPage();