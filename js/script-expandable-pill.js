document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.expandable-pill-container');
    
    containers.forEach(container => {
        const btn = container.querySelector('.pill-btn');
        const content = container.querySelector('.pill-content');
        
        if (btn && content) {
            btn.addEventListener('click', () => {
                content.classList.toggle('expanded');
            });
        }
    });
});