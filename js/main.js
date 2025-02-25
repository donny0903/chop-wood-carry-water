document.querySelectorAll('.chevron-button').forEach(button => {
    button.addEventListener('click', () => {
        const workItem = button.closest('.work-item');
        const content = workItem.querySelector('.collapsible-content');
        
        button.classList.toggle('active');
        content.classList.toggle('active');
    });
});
