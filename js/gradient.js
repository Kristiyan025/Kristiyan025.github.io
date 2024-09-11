class Gradient {
    constructor(colorStops) {
        this.colorStops = colorStops;
    }

    sample(x) {
        x = Math.min(1, Math.max(0, x));
        
        for(let i = 0; i < this.colorStops.length - 1; ++i) {
            if(x > this.colorStops[i].position) {
                continue;
            }
            
            const {color: curCol, position: curPos} = this.colorStops[i];
            const {color: nextCol, position: nextPos} = this.colorStops[i + 1];

            const colStart = this.#GetColorChannelsFromColor(curCol);
            const colEnd = this.#GetColorChannelsFromColor(nextCol);
            
            return this.#ColorToString(
                this.#interpolate(colStart, colEnd, (x - curPos) / (nextPos - curPos))
            );
        }
    }

    #GetColorChannelsFromColor(hex) {
        // Remove the hash at the start if it's there
        hex = hex.replace(/^#/, '');
        
        let r, g, b;
        
        // Handle 3-digit hex color codes
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        }
        // Handle 6-digit hex color codes
        else if (hex.length === 6) {
            r = parseInt(hex.slice(0, 2), 16);
            g = parseInt(hex.slice(2, 4), 16);
            b = parseInt(hex.slice(4, 6), 16);
        } else {
            throw new Error('Invalid hex color format');
        }
        
        return {R: r, G: g, B: b};
    }

    #interpolate1D(start, end, val) {
        return (end - start) * val + start;
    }

    #interpolate({R: startR, G: startG, B: startB}, {R: endR, G: endG, B: endB}, val) {
        return {R: this.#interpolate1D(startR, endR, val), 
                G: this.#interpolate1D(startG, endG, val), 
                B: this.#interpolate1D(startB, endB, val)
            };
    }

    #ColorToString({R: r, G: g, B: b}) {
        return `rgb(${r}, ${g}, ${b})`;
    }
}
