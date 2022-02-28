
const body = document.getElementsByTagName('body')[0];
const timelines = document.querySelectorAll('.timeline');
const bigImg = document.getElementsByClassName('big-img')[0]; 
const bigPic = document.getElementsByClassName('big-pic')[0]; 
const closeX = document.getElementsByClassName('close')[0];

const setPictureMechanism = () => {
    timelines.forEach(x => x.addEventListener('click', e => {
        if(e.target.localName === 'img') {
            bigPic.src = e.target.currentSrc;
            bigPic.alt = e.target.alt;
            bigImg.classList.remove('hidden');
            body.classList.add('cut');
        }
    }));
    closeX.addEventListener('click', e => {
            bigImg.classList.add('hidden');
            body.classList.remove('cut');
    });
};

setPictureMechanism();