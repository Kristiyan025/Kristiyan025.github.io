
const body = document.getElementsByTagName('body')[0];
const timeline = document.getElementsByClassName('timeline')[0];
const bigImg = document.getElementsByClassName('big-img')[0]; 
const bigPic = document.getElementsByClassName('big-pic')[0]; 
const closeX = document.getElementsByClassName('close')[0];

const setPictureMechanism = () => {
    timeline.addEventListener('click', e => {
        if(e.target.localName === 'img') {
            bigPic.src = e.target.currentSrc;
            bigPic.alt = e.target.alt;
            bigImg.classList.remove('hidden');
            body.classList.add('cut');
        }
    });
    closeX.addEventListener('click', e => {
            bigImg.classList.add('hidden');
            body.classList.remove('cut');
    });
};

setPictureMechanism();