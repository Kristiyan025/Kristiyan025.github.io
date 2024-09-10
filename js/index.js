const fixLastMediaLinkWhenOddCount = () => {
    const mediaLinks = document.querySelectorAll('ul.medias')[0];

    if(mediaLinks.childElementCount % 2 == 0) {
        return;
    }

    const lastMediaLink = mediaLinks.children[mediaLinks.childElementCount - 1];

    lastMediaLink.classList.add("last-media");
}

fixLastMediaLinkWhenOddCount();