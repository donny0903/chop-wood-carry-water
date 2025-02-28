document.querySelectorAll('.chevron-button').forEach(button => {
    button.addEventListener('click', () => {
        const workItem = button.closest('.work-item');
        const content = workItem.querySelector('.collapsible-content');
        
        button.classList.toggle('active');
        content.classList.toggle('active');
    });
});

// 모바일 메뉴 관련 코드를 문서 로드 후 실행되도록 수정
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenuButton.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // 메뉴 아이템 클릭시 메뉴 닫기
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                mobileMenuButton.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
});
