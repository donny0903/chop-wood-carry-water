// 아코디언 토글 기능
document.querySelectorAll('.chevron-button').forEach(button => {
    button.addEventListener('click', () => {
        const workItem = button.closest('.work-item');
        const content = workItem.querySelector('.collapsible-content');
        
        button.classList.toggle('active');
        content.classList.toggle('active');
    });
});

// 공통 레이아웃 로더
async function loadPartial(selector, url) {
    const container = document.querySelector(selector);
    if (!container) return;

    try {
        const response = await fetch(url);
        if (!response.ok) return;
        const html = await response.text();
        container.innerHTML = html;
    } catch (e) {
        // 네트워크 오류 등은 조용히 무시
    }
}

// 모바일 메뉴 토글 및 자동 닫힘 기능
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenuButton.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // 메뉴 아이템 클릭시 메뉴 닫기
        document.querySelectorAll('.nav-item').forEach((item) => {
            item.addEventListener('click', () => {
                mobileMenuButton.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

// 프로젝트 이미지 프리뷰 기능
function initProjectPreview() {
    if (window.innerWidth < 800) return;  // 데스크톱에서만 실행

    const preview = document.createElement('div');
    preview.className = 'project-image-preview';
    document.body.appendChild(preview);

    document.querySelectorAll('.work-body-item h3').forEach((title) => {
        const imageName = title.getAttribute('data-image-name');

        if (imageName) {
            title.classList.add('has-preview');

            title.addEventListener('mouseenter', () => {
                preview.innerHTML = `<img src="../img/projects/${imageName}.jpg" alt="${title.textContent.trim()}">`;
                preview.style.opacity = '1';
                preview.style.left = '50%';
                preview.style.top = '50%';
                preview.style.transform = 'translate(-50%, -50%)';
            });

            title.addEventListener('mouseleave', () => {
                preview.style.opacity = '0';
            });
        }
    });
}

// 현재 페이지 메뉴 하이라이트 기능
function initNavHighlight() {
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        if (currentPath.includes('work.html') && item.textContent === 'work') {
            item.classList.add('active');
        } else if (currentPath.includes('about.html') && item.textContent === 'about') {
            item.classList.add('active');
        }
    });
}

// href="#"인 링크 클릭 시 경고 모달 표시 (임시 링크 막기 용도)
function initHashLinks() {
    const hashLinks = document.querySelectorAll('a[href="#_work"]');
    
    hashLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 기본 동작 방지
            alert('자세한 내용이 궁금하시다면 링크드인 또는 메일로 연락주세요 😄');
        });
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
        loadPartial('#topNavigation', 'components/topNavigation.html'),
        loadPartial('#footer', 'components/footer.html'),
    ]);

    initMobileMenu();
    initProjectPreview();
    initNavHighlight();
    initHashLinks();
});