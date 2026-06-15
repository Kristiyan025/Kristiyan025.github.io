function addRecommendation(el, recommendations) {
  for (const recommendation of recommendations) {
    let childElement = document.createElement("li");
    childElement.classList.add("list-item", "event-info", "reveal");
    childElement.innerHTML = `
            <a class="name-link" ${recommendation.namehref ? `href="${recommendation.namehref}"` : ""}>
                <h3 class="event-name">${recommendation.name}</h3>
            </a>
            <embed class="pdf" src="./images/recommendations/${recommendation.filename}" 
                type="application/pdf" title="${recommendation.title}" />
        `;
    el.appendChild(childElement);
  }
}

let workRecommendationsList = document.getElementById("work-recommendations");
let schoolRecommendationsList = document.getElementById(
  "school-recommendations",
);

addRecommendation(workRecommendationsList, work_recommendations);
addRecommendation(schoolRecommendationsList, school_recommendations);
