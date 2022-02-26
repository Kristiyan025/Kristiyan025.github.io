function hover(e) {
    let src = e.getAttribute('src');
    src = src.substring(0, src.length - 3) + 'gif';
    e.setAttribute('src', src);
}

function unhover(e) {
    let src = e.getAttribute('src');
    src = src.substring(0, src.length - 3) + 'png';
    e.setAttribute('src', src);
}

const container = document.querySelectorAll('.projects-grid')[0];

container.addEventListener('mouseover', e => {
    if(e.target.localName === 'img'){
        hover(e.target);
    }
});

container.addEventListener('mouseout', e => {
    if(e.target.localName === 'img'){
        unhover(e.target);
    }
});