function zip(...arrays) {
    // Get the minimum length of the input arrays to handle cases where arrays have different lengths
    const minLength = Math.min(...arrays.map(arr => arr.length));
    
    // Create a new array by mapping over the length of the shortest array
    return Array.from({ length: minLength }, (_, i) => arrays.map(arr => arr[i]));
  }

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

    #generateSkillAngleAndColor = (skill) => {
        const experienceMainAngle = this.#getRelativeEperianceAngle(skill.TotalExperienceDurationMonths());
        const experienceColor = this.#EXPERIENCE_GRADIENT.sample(experienceMainAngle / 360);
        return [experienceMainAngle, experienceColor];
    };

    #generateSkillBadgeHtml = (skill) => {
        const [experienceMainAngle, experienceColor] = this.#generateSkillAngleAndColor(skill);
        const experienceSecondaryAngle = experienceMainAngle + this.#EXPERIENCE_RESIDUE_ANGLE;

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

    #claculateExperianceRadii = (skill, maxRadius) => {
        let totalExperienceMonths = skill.TotalExperienceDurationMonths();
        let maxDuration = skill.workExperiences.map(exp => exp.durationMonths).reduce(Math.max, 0);

        let decreaseCoeff = 1;
        if(maxDuration < 4) {
            decreaseCoeff = 0.85;
        }

        let distribution = skill.workExperiences.map(exp => Math.sqrt(Math.max(0.1, exp.durationMonths / totalExperienceMonths * decreaseCoeff)));

        return distribution.map(val => val * maxRadius);
    };

    #SVG_HALF_SIZE = 1000;


    #generateSkillWorkExperienceDistributionGraphHtml = (skill, coords, skillId) => {
        const [_, skillColor] = this.#generateSkillAngleAndColor(skill);
        const n = 10;
        const stops = Array
            .from({ length: n + 1 }, (_, index) => index)
            .map(num => num / n);

        const gradientId = `graph-fill-${skillId}`;
        const gradientFn = x => x * x;

        const graphFor3OrMoreCoords = () => {
            const interpolate = ({x: x1, y: y1}, {x: x2, y: y2}, val) => {
                return {
                    x: (x2 - x1) * val + x1,
                    y: (y2 - y1) * val + y1,
                };
            };
            const generateBezier = ({x: x1, y: y1}, {x: x2, y: y2}) => {
                let middlePt = interpolate({x: x1, y: y1}, {x: x2, y: y2}, 1 / 2);
                const SKEWNESS_COEFF = 1 / 4;
                let controlPoint = interpolate(middlePt, {x: 0, y: 0}, SKEWNESS_COEFF);
                return `
                    C ${controlPoint.x} ${controlPoint.y}, 
                        ${controlPoint.x} ${controlPoint.y}, 
                        ${x2} ${y2}
                `;
            };
            return `
                <path class="graph-line"
                      d="M ${coords[0].x} ${coords[0].y} 
                           ${zip(coords, [...(coords.slice(1)), coords[0]]).map(([p1, p2]) => generateBezier(p1, p2)).join(' ')} Z" 
                      fill="url(#${gradientId})" />
            `;
        };

        const graphFor2Coords = () => {
            const controlPoint = {x: 0, y: this.#SVG_HALF_SIZE};
            const half = (dir) => `<path class="graph-line" 
                                         d="M ${coords[1 - (dir + 1) / 2].x} ${coords[1 - (dir + 1) / 2].y} 
                                            C ${controlPoint.x} ${dir * controlPoint.y}, 
                                              ${controlPoint.x} ${dir * controlPoint.y}, 
                                              ${coords[(dir + 1) / 2].x} ${coords[(dir + 1) / 2].y}" 
                                         fill="url(#${gradientId})" />`;

            return  half(1) + half(-1);
        };

        const graphFor1Coord = () => `<circle class="graph-line" cx="0" cy="0" r="${Math.abs(coords[0].x + coords[0].y)}" fill="url(#${gradientId})" />`;

        const graph = () => {
            if(coords.length > 2) {
                return graphFor3OrMoreCoords();
            } else if(coords.length == 2) {
                return graphFor2Coords();
            } else {
                return graphFor1Coord();
            }
        }

        return `
            <svg class="graph"
                 viewBox="${-this.#SVG_HALF_SIZE} ${-this.#SVG_HALF_SIZE} 
                          ${2 * this.#SVG_HALF_SIZE} ${2 * this.#SVG_HALF_SIZE}">
                <defs>
                    <radialGradient id="${gradientId}" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        ${stops.map(stop => `<stop offset="${Math.round(stop * 100)}%" 
                                                   style="stop-color:${skillColor};
                                                          stop-opacity:${gradientFn(stop)}" />`).join('\n')}
                    </radialGradient>
                </defs>
                ${graph()}
            </svg>
        `;
    };

    #generateSkillWorkExperienceNodesHtml = (skill, coords, angles) => {
        return `
            <ul class="graph-nodes">
                ${zip(skill.workExperiences, coords, angles).map(([exp, coord, angle]) => {
                    let workplace = workplaceToUrlMap[exp.company];
                    angle = angle >= 2 * Math.PI ? angle - 2 * Math.PI : angle < 0 ? angle + 2 * Math.PI : angle;
                    let flexDirection = 'row';
                    if (Math.PI / 2 < angle && angle < Math.PI * 3 / 2) {
                        flexDirection = 'row-reverse';
                    }
                    
                    let horizontalOffset = `left: calc(${coord.x} - (var(--height) / 2)); padding-left: 0;`;
                    if(flexDirection == 'row-reverse') {
                        horizontalOffset = `right: calc(100% - ${coord.x} - (var(--height) / 2)); padding-right: 0;`
                    }

                    return `
                        <li class="node-container tooltip-container tooltip-trigger" 
                            style="${horizontalOffset}
                                   top: calc(${coord.y} - (var(--height) / 2));
                                   flex-direction: ${flexDirection};">
                            <section class="node-badge">
                                <img class="node-badge-image" 
                                    src="${workplace.badgeImageUrl}" 
                                    alt="${workplace.name}" loading="lazy" />
                                <img class="node-badge-mini-image" 
                                    src="./images/skills/workplaces/${exp.isPartOfEducation ? 'education.jpg' : 'work.png'}" 
                                    alt="${exp.isPartOfEducation ? 'Education' : 'Work'}" loading="lazy" />
                            </section>
                            <section class="node-name" style="${flexDirection == 'row' ? 'text-align: right' : ""}">
                                <a class="node-name-link" href="${workplace.url}">${workplace.name}</a>
                            </section>
                            <section class="tooltip">
                                Practiced <b>${this.#formatPeriod(exp.durationMonths)}</b>.
                            </section>
                        </li>
                    `;
                }).join('\n')}
            </ul>
        `;
    };

    #generateSkillWorkExperienceDistributionHtml = (skill, skillId) => {
        let n = skill.workExperiences.length;

        let angles = [];
        for(let i = 0; i < n; ++i) {
            angles.push((1 / 2 - i * 2 / n) * Math.PI);
        }

        if(n == 2) {
            angles = [0, Math.PI];
        }

        let anglesForAxes = angles;
        if(n == 1) {
            anglesForAxes = [0, 0.5 * Math.PI, Math.PI, 1.5 * Math.PI]
        }
        const coordAxes = anglesForAxes.map(angle => `<div class="coord-axis" style="transform: rotate(${-angle}rad)"></div>`).join('\n');
        
        const CSS_MAX_RADIUS = 45;
        const SVG_MAX_RADIUS = CSS_MAX_RADIUS / 50 * this.#SVG_HALF_SIZE;

        /* y is with minus because of coordinate system inversion. */
        let cssCoordsPercents = zip(angles, this.#claculateExperianceRadii(skill, CSS_MAX_RADIUS)).map(([angle, radius]) => {
            return {
                x: (50 + Math.cos(angle) * radius) + '%',
                y: (50 - Math.sin(angle) * radius) + '%',
            };
        });

        let svgCoords = zip(angles, this.#claculateExperianceRadii(skill, SVG_MAX_RADIUS)).map(([angle, radius]) => {
            return {
                x: Math.round(Math.cos(angle) * radius),
                y: Math.round(-Math.sin(angle) * radius),
            };
        });

        return `
            <section class="work-exp-distribution">
                <div class="coord-system unselectable" unselectable="on">
                    <div class="circle-1"></div>
                    <div class="circle-2"></div>
                    <div class="circle-3"></div>
                    <div class="circle-4"></div>
                    <div class="circle-5"></div>
                    <div class="origin"></div>
                    ${coordAxes}
                </div>
                ${this.#generateSkillWorkExperienceDistributionGraphHtml(skill, svgCoords, skillId)}
                ${this.#generateSkillWorkExperienceNodesHtml(skill, cssCoordsPercents, angles)}
            </section>
        `
    };

    #generateLibrariesHtml = (mainSkill, carry) => {
        if (mainSkill.librarySkills.length == 0) {
            return '';
        }

        const collapsibleId = this.#calcCollapsibleId(carry);
        return `
            <section class="collapsible" style="margin-top: var(--font-size);">
                <input type="checkbox" id="collapsible-${collapsibleId}" class="collapsible-toggle">
                <label for="collapsible-${collapsibleId}" class="collapsible-header unselectable" unselectable="on">
                    <h3 class="skill-header-text">Libraries / Frameworks / Wrapper Tools</h3>
                </label>
                <section class="collapsible-content">
                    <ul class='skills-list'>
                        ${mainSkill.librarySkills
                            .map((skill, index) => this.#generateSkillHtml(skill, carry + index + 1))
                            .map(html => `<li>${html}</li>`)
                            .join('\n')
                        }
                    </ul>
            </section>
        </section>
        `;
    };

    #generateSkillHtml = (skill, carry) => {
        const collapsibleId = this.#calcCollapsibleId(carry);

        let skillHeaderText = skill.name;
        if(skill.link !== undefined) {
            skillHeaderText = `<a class="skill-link" href="${skill.link}">${skillHeaderText}</a>`;
        }

        let skillDescription = '';
        if(skill.description !== undefined) {
            skillDescription = `<h4 class="skill-description">${skill.description}</h4>`;
        }

        return `
        <section class="collapsible">
            <input type="checkbox" id="collapsible-${collapsibleId}" class="collapsible-toggle">
            <label for="collapsible-${collapsibleId}" class="collapsible-header unselectable" unselectable="on">
                ${this.#generateSkillBadgeHtml(skill)}
                <h3 class="skill-header-text">${skillHeaderText}</h3>
            </label>
            <section class="collapsible-content">
                ${skillDescription}
                ${this.#generateSkillWorkExperienceDistributionHtml(skill, collapsibleId)}
                ${this.#generateLibrariesHtml(skill, carry + 1)}
            </section>
        </section>
        `;
    };

    addSkills = (container) => {
        Object.entries(skills)
        .forEach(([skillCategory, skillList]) => {
            let carry = 1;
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
                        .map((skill) => {
                            let result = this.#generateSkillHtml(skill, carry)
                            carry += 1 + skill.librarySkills.length + (skill.librarySkills.length > 0 ? 1 : 0);
                            return result;
                        })
                        .map(html => `<li>${html}</li>`)
                        .join('\n')}
                    </ul>
                </section>
            </section>
            `;
        });
    };
}