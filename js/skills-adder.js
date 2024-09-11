class SkillAdder {
    
    #EXPERIENCE_GRADIENT = new Gradient([
        {color: '#e60000', position: 0.0},
        {color: '#e60000', position: 0.07},
        {color: '#ffa500', position: 0.3},
        {color: '#ffff00', position: 0.5},
        {color: '#00cf00', position: 0.9},
        {color: '#00cf00', position: 1.0},
    ]);
    #EXPERIENCE_RESIDUE_ANGLE = 30;
    #UNEXPERIENCE_COLOR = '#252121AA';

    #calcCollapsibleId = (carry=0) => {
        return document.querySelectorAll('.collapsible-toggle').length + carry;
    };

    #activationFunction = (x) => Math.min(0.9 , x / 7 + 0.01 * x * (x - 5) * (x - 7));

    #getRelativeEperianceAngle = (exp) => {
        return this.#activationFunction(exp / yearsToMonths(1)) * 360;
    };

    #formatPeriod = (months) => {
        let years = Math.floor(months / 12);
        months -= years * 12;

        let result = '';
        if(years > 0) {
            result += years + ' year' + (years > 1 ? 's' : '');
        }

        if(years > 0 && months > 0) {
            result += ' ';
        }

        if(months > 0) {
            result += months + ' month' + (months > 1 ? 's' : '');
        }

        return result;
    };

    #generateSkillBadgeHtml = (skill) => {
        const experienceMainAngle = this.#getRelativeEperianceAngle(skill.TotalExperienceDurationMonths());
        const experienceSecondaryAngle = experienceMainAngle + this.#EXPERIENCE_RESIDUE_ANGLE;
        const experienceColor = this.#EXPERIENCE_GRADIENT.sample(experienceMainAngle / 360);

        return `
            <section class="skill-badge tooltip-container tooltip-trigger" 
                    style="background: conic-gradient(from 180deg at 50% 50%, 
                                ${experienceColor} 0deg,
                                ${experienceColor} ${experienceMainAngle}deg,
                                ${this.#UNEXPERIENCE_COLOR} ${experienceSecondaryAngle}deg,
                                ${this.#UNEXPERIENCE_COLOR} 360deg);">
                <img class="skill-badge-image" 
                    src="./images/skills/${skill.badgeImageUrl}" 
                    alt="${skill.name}" loading="lazy">
                <section class="tooltip">
                    Used for <b>${this.#formatPeriod(skill.TotalExperienceDurationMonths())}</b>.
                </section>
            </section>
        `
    };

    #generateSkillHtml = (skill, carry) => {
        const collapsibleId = this.#calcCollapsibleId(carry);

        let skillHeaderText = skill.name;
        if(skill.link !== undefined) {
            skillHeaderText = `<a class="skill-link" href="${skill.link}">${skillHeaderText}</a>`;
        }

        return `
        <section class="collapsible">
            <input type="checkbox" id="collapsible-${collapsibleId}" class="collapsible-toggle">
            <label for="collapsible-${collapsibleId}" class="collapsible-header unselectable" unselectable="on">
                ${this.#generateSkillBadgeHtml(skill)}
                <h3 class="skill-header-text">${skillHeaderText}</h3>
            </label>
            <section class="collapsible-content">
                <p>Lorem Ipsum</p>
            </section>
        </section>
        `;
    };

    addSkills = (container) => {
        Object.entries(skills)
        .forEach(([skillCategory, skillList]) => {
            const collapsibleId = this.#calcCollapsibleId();
            const shouldCheckboxBeChecked = skillCategory == 'Programming Languages' ? 'checked' : '';
            container.innerHTML += `
            <section class="collapsible">
                <input type="checkbox" id="collapsible-${collapsibleId}" class="collapsible-toggle" ${shouldCheckboxBeChecked}>
                <label for="collapsible-${collapsibleId}" class="collapsible-header unselectable" unselectable="on">
                    ${skillCategory}
                </label>
                <section class="collapsible-content">
                    <ul class='skills-list'>
                    ${skillList
                        .map((skill, index) => this.#generateSkillHtml(skill, index + 1))
                        .map(html => `<li>${html}</li>`)
                        .join('\n')
                    }
                    </ul>
                </section>
            </section>
            `;
        });
    };
}