function addRecommendation(el, recommendations) {
  for (const recommendation of recommendations) {
    let childElement = document.createElement("li");
    childElement.classList.add("list-item", "event-info", "reveal");
    childElement.innerHTML = `
            <a class="name-link" ${recommendation.namehref ? `href="${recommendation.namehref}"` : ""}>
                <h3 class="event-name">${recommendation.name}</h3>
            </a>
            <embed class="pdf" src="./images/papers/${recommendation.filename}" 
                type="application/pdf" title="${recommendation.title}" />
        `;
    el.appendChild(childElement);
  }
}

let papersList = document.getElementById("papers");

addRecommendation(papersList, scientific_papers);
