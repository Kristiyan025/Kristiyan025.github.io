const parent = document.querySelectorAll('.intertwined-optional-timelines .timeline .events')[0];
const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
const checkboxesParent = document.getElementsByClassName('options')[0];
const subjectIcons = {
    'math': '<i class="fas fa-square-root-alt"></i>',
    'programming': '<i class="fas fa-code"></i>',
    'school': '<i class="fas fa-graduation-cap"></i>',
    'robotics': '<i class="fas fa-robot"></i>',
    'music': '<i class="fas fa-music"></i>',
    'english': '<i class="language-icon">a</i>',
    'german': '<i class="language-icon">ä</i>',
    'technical-sketching': '<i class="fas fa-pencil-alt"></i>',
    'math-linguistics': '<i class="fas fa-language"></i>',
    'miscellaneous': '<i class="fas fa-cubes"></i>'
};

const isPortrait = (img) => img.clientWidth < img.clientHeight;

const fixMargins = () => {
    const lowBound = 4;
    const upBound = 7;
    const range = upBound - lowBound;
    const sigmoid = x => 1 / (1 + (1.5 ** -(x - 8)));
    const scaledDayDifference = (x, y) => (x.getTime() - y.getTime()) / (1000 * 60 * 60 * 24) / 20;

    let i = 0;
    let prevDate = new Date();
    if(parent.children.length > 0)
    for(const event of Array.from(parent.children)) {
        if(event.children.length > 1) {
            const dateParts = event.children[1].innerText.split('/');
            const curDate = new Date(dateParts[2], dateParts[1], dateParts[0])
            if(i > 0) {
                event.style.marginTop = 
                    `calc(${sigmoid(scaledDayDifference(prevDate, curDate)) * range + lowBound} * var(--font-size))`;
            }
            prevDate = curDate;
        }
        i++;
    }
};

const buildTimeline = (page, pagename) => {
    let chosen = checkboxes
        .filter(x => x.checked)
        .map(x => x.name);
    let arr = [];
    for (const folder in page) {
        let files = page[folder];
        if(chosen.includes(folder))
            for(const file of files)
                arr.push(file + '|' + folder);
    }
    arr.sort((a, b) => (a > b ? -1 : 1));
    let prevPt = '';
    let timepoints = [];
    let cur = [];
    for(let i = 0; i < arr.length; i++) {
        let parts = arr[i].split('|');
        let file = parts[0];
        let folder = parts[1];
        parts = parts[0].split('_');
        let date = parts[0].split('-').reverse().join('/');
        let eventname = parts[1];
        if(eventname.includes('-PART-'))
        {
            parts = eventname.split('-PART-');
            eventname = parts[0];
        }
        eventname = eventname.replaceAll('.jpg', '').replaceAll(' Sharp', '#');
        if(date + '_' + eventname != prevPt && prevPt != '') {
            timepoints.push(cur);
            cur = [];
        }
        cur.push({date, eventname, folder, file});
        prevPt = date + '_' + eventname;
    }
    if(cur.length > 0) timepoints.push(cur);
    parent.innerHTML = '';
    if(chosen.length === 0) {
        parent.innerHTML = '<h2 class="empty-category">You haven\'t chosen any category.</h2>';
    } else if(timepoints.length === 0) {
        parent.innerHTML = '<h2 class="empty-category">There are no records in this category, yet.</h2>';
    }
    for(let pt of timepoints) {
        pt.sort((a, b) => (a.file > b.file ? 1 : -1));
        parent.innerHTML += `                    
        <section class="event">
            <section class="event-timepoint-badge">${subjectIcons[pt[0].folder]}</section>
            <section class="event-date">${pt[0].date}</section>
            <section class="event-info reveal">
                <h3 class="event-name">${pt[0].eventname}</h3>
                <section class="event-images scrollable">
                    ${pt.map(diploma => `
                    <section class="event-image-wrapper">
                        <img class="diploma-photo expanded" 
                            src="./images/${pagename}/${diploma.folder}/${diploma.file}" alt="${diploma.eventname}" loading="lazy">
                    </section>                    
                    `).join('\n')}
                </section>
            </section>
        </section>`;
    }
    fixMargins();
}

const centerImages = () => {
    setTimeout(() => {
        Array.from(document.getElementsByClassName('event-images')).forEach(diplomas => {
            if(diplomas.children.length == 1 || 
            (diplomas.children.length == 2 && diplomas.children[0].clientWidth + diplomas.children[1].clientWidth < diplomas.clientWidth))
            diplomas.classList.add('centered');
        });
    }, 1000);
};

const addEventListenersToCheckboxes = (page, pagename) => {
    checkboxesParent.addEventListener('click', e => {
        if(e.target.localName === 'input'){
            buildTimeline(page, pagename);
            centerImages();
        }
    });
}