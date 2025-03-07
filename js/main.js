// 아코디언 토글 기능
document.querySelectorAll('.chevron-button').forEach(button => {
    button.addEventListener('click', () => {
        const workItem = button.closest('.work-item');
        const content = workItem.querySelector('.collapsible-content');
        
        button.classList.toggle('active');
        content.classList.toggle('active');
    });
});

// 모바일 메뉴 토글 및 자동 닫힘 기능
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

    // 프로젝트 이미지 프리뷰 기능
    // 이미지 파일명은 프로젝트 제목과 동일하게 저장해야 함
    if (window.innerWidth >= 800) {  // 데스크톱에서만 실행
        const preview = document.createElement('div');
        preview.className = 'project-image-preview';
        document.body.appendChild(preview);

        document.querySelectorAll('.work-section h3').forEach(title => {
            title.classList.add('has-preview');
            
            title.addEventListener('mouseenter', (e) => {
                const projectName = title.textContent.trim();
                // data-image-name 속성에서 이미지 파일명을 가져옴
                const imageName = title.getAttribute('data-image-name') || projectName;
                preview.innerHTML = `<img src="../img/projects/${imageName}.png" alt="${projectName}">`;
                preview.style.opacity = '1';
            });

            title.addEventListener('mousemove', (e) => {
                preview.style.left = (e.clientX) + 'px';
                preview.style.top = (e.clientY) + 'px';
            });

            title.addEventListener('mouseleave', () => {
                preview.style.opacity = '0';
            });
        });
    }
});

// 현재 페이지 메뉴 하이라이트 기능
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        if (currentPath.includes('work.html') && item.textContent === 'work') {
            item.classList.add('active');
        } else if (currentPath.includes('about.html') && item.textContent === 'about') {
            item.classList.add('active');
        }
    });
});
