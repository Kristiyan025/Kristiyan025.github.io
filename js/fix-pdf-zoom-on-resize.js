function getSubstringBeforeLastHash(inputString) {
    const lastIndex = inputString.lastIndexOf('#');

    if (lastIndex !== -1) {
        const substringBeforeLastHash = inputString.substring(0, lastIndex);
        return substringBeforeLastHash;
    } else {
        return inputString;
    }
}

function fixPdfElementZoomOnResize(selector) {
    function fixPDFZoomOnResize() {
        let zoomLevel = (window.outerWidth - 8) / window.innerWidth;
        let changes = [];
        document.querySelectorAll(selector).forEach(el => {
            const oldSrcVal = el.src;
            let newSrcVal = getSubstringBeforeLastHash(el.src);
            if (zoomLevel > 3.5) {
                newSrcVal += "#toolbar=0&navpanes=0&scrollbar=0&view=FitH";
            } else {
                newSrcVal += "#toolbar=0&navpanes=0&scrollbar=0&view=FitB";
            }
            if (oldSrcVal != newSrcVal) {
                const newEmbed = document.createElement('embed');
                newEmbed.id = el.id;
                newEmbed.classList = el.classList;
                newEmbed.src = newSrcVal;
                newEmbed.type = 'application/pdf';
                changes.push([el, newEmbed]);
            }
        });

        for (let [oldEl, newEl] of changes) {
            let parent = oldEl.parentNode;
            parent.removeChild(oldEl);
            parent.appendChild(newEl);
        }
    }

    fixPDFZoomOnResize();
    window.addEventListener('resize', fixPDFZoomOnResize);    
}
