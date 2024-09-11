document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tooltip-container').forEach(container => {
        const trigger = container.classList.contains('tooltip-trigger') ? container :
                    container.querySelector('.tooltip-trigger');
        const tooltip = container.querySelector('.tooltip');
    
        const positions = ['top', 'right', 'bottom', 'left'];
    
        function updateTooltipPosition() {
            const triggerRect = trigger.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
        
            tooltip.classList.remove(...positions);
        
            // Default position
            let position = 'top';
        
            if (triggerRect.top > tooltipRect.height) {
                position = 'top';
            } else if (triggerRect.top + triggerRect.height + tooltipRect.height < windowHeight) {
                position = 'bottom';
            } else if (triggerRect.left > tooltipRect.width) {
                position = 'left';
            } else if (triggerRect.left + triggerRect.width + tooltipRect.width < windowWidth) {
                position = 'right';
            } else {
                position = 'top';
            }
        
            tooltip.classList.add(position);
        }
    
        trigger.addEventListener('mouseover', () => {
        tooltip.style.display = 'block';
        updateTooltipPosition();
        });
    
        trigger.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
        });
    
        window.addEventListener('resize', updateTooltipPosition);
    });
});
  