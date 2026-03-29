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

// work 아코디언 토글
function initWorkAccordion() {
    document.querySelectorAll('.chevron-button').forEach((button) => {
        button.addEventListener('click', () => {
            const workItem = button.closest('.work-item');
            if (!workItem) return;

            const content = workItem.querySelector('.collapsible-content');
            if (!content) return;

            button.classList.toggle('active');
            content.classList.toggle('active');
        });
    });
}

// 프로젝트 이미지 프리뷰 기능
function initProjectPreview() {
    if (window.innerWidth < 800) return;  // 데스크톱에서만 실행

    const preview = document.createElement('div');
    preview.className = 'project-image-preview';
    document.body.appendChild(preview);

    // 프로젝트 프리뷰 대상: 상세 리스트(h3) + 헤더 타이틀(h1)
    document.querySelectorAll('.work-body-item h3, .work-header h1[data-image-name]').forEach((title) => {
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

    let activeKey = null;
    if (currentPath.includes('work.html')) {
        activeKey = 'work';
    } else if (currentPath.includes('blog_space')) {
        activeKey = 'space';
    } else if (currentPath.includes('blog_article')) {
        activeKey = 'blog';
    } else if (currentPath.includes('about.html')) {
        activeKey = 'about';
    }

    if (!activeKey) return;

    navItems.forEach((item) => {
        const label = item.textContent.trim().toLowerCase();
        if (label === activeKey) {
            item.classList.add('active');
        }
    });
}

// href="#"인 링크 클릭 시 경고 모달 표시 (임시 링크 막기 용도)
function initHashLinks() {
    const hashLinks = document.querySelectorAll('a[href="#_work"]');

    hashLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // 기본 동작 방지
            alert('자세한 내용이 궁금하시다면 링크드인 또는 메일로 연락주세요 😄');
        });
    });
}

// work 탭 전환 기능 (슬라이드 애니메이션)
function initWorkTabs() {
    const tabs = document.querySelectorAll('.work-tab');
    const personalSection = document.querySelector('.work-section-personal');
    const fieldSection = document.querySelector('.work-section-field');

    if (!tabs.length || !personalSection || !fieldSection) return;

    let currentMode = 'field';

    const activateTab = (mode) => {
        if (mode === currentMode) return;

        const toPersonal = mode === 'personal';
        const incoming = toPersonal ? personalSection : fieldSection;
        const outgoing = toPersonal ? fieldSection : personalSection;

        tabs.forEach((tab) => {
            const isActive = tab.dataset.tab === mode;
            tab.classList.toggle('active', isActive);
        });

        // 리셋
        incoming.classList.remove('slide-in-from-left', 'slide-in-from-right');

        // 방향에 따라 애니메이션 클래스 부여
        incoming.classList.add(toPersonal ? 'slide-in-from-right' : 'slide-in-from-left');

        // 실제 활성 상태 전환
        incoming.classList.add('is-active');
        outgoing.classList.remove('is-active', 'slide-in-from-left', 'slide-in-from-right');

        currentMode = mode;
    };

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const mode = tab.dataset.tab;
            activateTab(mode);
        });
    });

    // 기본값: field (Work Experience)
    tabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.tab === 'field'));
    personalSection.classList.remove('is-active', 'slide-in-from-left', 'slide-in-from-right');
    fieldSection.classList.add('is-active');
    fieldSection.classList.remove('slide-in-from-left', 'slide-in-from-right');
}

document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
        loadPartial('#topNavigation', 'components/topNavigation.html'),
        loadPartial('#footer', 'components/footer.html'),
        loadPartial('#workTabs', 'components/workTabs.html'),
    ]);

    initMobileMenu();
    initWorkAccordion();
    initProjectPreview();
    initNavHighlight();
    initHashLinks();
    initWorkTabs();
    initBlogArticleGrid('blogGrid');
    initBlogArticleGrid('indexBlogGrid', 5);
    initBlogSpaceGrid('spaceGrid');
    initBlogSpaceGrid('indexSpaceGrid');
    initBlogPost();
});

function formatDateFromSlug(slug) {
    const parts = slug.split('_');
    return parts.length === 3 ? `${parts[0]}.${parts[1]}.${parts[2]}` : slug;
}

function getSlugTimestamp(slug) {
    const parts = slug.split('_');
    if (parts.length !== 3) return 0;

    const [year, month, day] = parts.map(Number);
    if (!year || !month || !day) return 0;

    return new Date(year, month - 1, day).getTime();
}

function sortPostsByDateDesc(posts) {
    return [...posts].sort((a, b) => getSlugTimestamp(b.slug) - getSlugTimestamp(a.slug));
}

async function getPostTitle(post, sourceDir) {
    if (post.title) return post.title;

    try {
        const mdRes = await fetch(`${sourceDir}/${post.slug}.md`);
        if (!mdRes.ok) return post.slug;
        const md = await mdRes.text();
        const titleMatch = md.match(/^#\s+(.+)$/m);
        return titleMatch ? titleMatch[1] : post.slug;
    } catch (e) {
        return post.slug;
    }
}

// blog_article 목록 (텍스트 리스트)
async function initBlogArticleGrid(gridId, limit) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    try {
        const res = await fetch('blog_article/index.json');
        if (!res.ok) return;
        const posts = sortPostsByDateDesc(await res.json());

        const visiblePosts = Number.isInteger(limit) ? posts.slice(0, limit) : posts;

        for (const post of visiblePosts) {
            const title = await getPostTitle(post, 'blog_article');
            const date = formatDateFromSlug(post.slug);
            const subtitle = post.subtitle || '';

            const item = document.createElement('a');
            item.className = 'blog-list-item';
            item.href = `blog_article_post.html?slug=${post.slug}`;
            item.innerHTML = `
                <span class="blog-list-date">${date}</span>
                <span class="blog-list-title">${title}</span>
                <span class="blog-list-subtitle">${subtitle}</span>
            `;
            grid.appendChild(item);
        }
    } catch (e) {
        // 로드 실패 시 조용히 무시
    }
}

// blog_space 목록 (썸네일 카드)
async function initBlogSpaceGrid(gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    try {
        const res = await fetch('blog_space/index.json');
        if (!res.ok) return;
        const posts = sortPostsByDateDesc(await res.json());

        for (const post of posts) {
            const title = await getPostTitle(post, 'blog_space');
            const subtitle = post.subtitle || '';

            const article = document.createElement('article');
            article.className = 'project-card';
            article.innerHTML = `
                <a href="blog_space_post.html?slug=${post.slug}" class="project-card" rel="noopener noreferrer">
                    <div class="card-image">
                        <img src="${post.thumbnail}" alt="${title}">
                    </div>
                    <h2 class="card-title">${title}</h2>
                </a>
                <p class="card-subtitle">${subtitle}</p>
            `;
            grid.appendChild(article);
        }
    } catch (e) {
        // 로드 실패 시 조용히 무시
    }
}

// 블로그 상세 페이지 MD 렌더링 (article / space 공용)
async function initBlogPost() {
    const contentContainer = document.querySelector('.blog-post-content');
    if (!contentContainer) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    if (!slug) return;

    const source = contentContainer.dataset.source || 'blog_article';

    // index.json에서 메타데이터 조회
    let postMeta = null;
    try {
        const indexRes = await fetch(`${source}/index.json`);
        if (indexRes.ok) {
            const posts = await indexRes.json();
            postMeta = posts.find(p => p.slug === slug);
        }
    } catch (e) {}

    // SEO 메타 태그 동적 업데이트
    if (postMeta) {
        const title = postMeta.title || '';
        const subtitle = postMeta.subtitle || '';
        const date = formatDateFromSlug(slug);
        const baseUrl = 'https://www.aboutdonny.com';
        const pageFile = source === 'blog_space' ? 'blog_space_post.html' : 'blog_article_post.html';
        const fullUrl = `${baseUrl}/${pageFile}?slug=${slug}`;
        const imageUrl = postMeta.thumbnail ? `${baseUrl}/${postMeta.thumbnail}` : `${baseUrl}/img/profile.jpg`;

        document.title = `${title} — About Donny`;

        const setMeta = (attr, key, value) => {
            const el = document.querySelector(`meta[${attr}="${key}"]`);
            if (el) el.setAttribute('content', value);
        };

        setMeta('name', 'description', subtitle || title);
        setMeta('property', 'og:title', title);
        setMeta('property', 'og:description', subtitle);
        setMeta('property', 'og:image', imageUrl);
        setMeta('property', 'og:url', fullUrl);
        setMeta('name', 'twitter:card', 'summary_large_image');

        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.setAttribute('href', fullUrl);

        // JSON-LD 구조화 데이터
        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title,
            description: subtitle,
            image: imageUrl,
            datePublished: slug.replace(/_/g, '-'),
            url: fullUrl,
            author: {
                '@type': 'Person',
                name: 'Donghwan Kim'
            }
        };
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(jsonLd);
        document.head.appendChild(script);
    }

    // hero 이미지
    const heroImg = document.querySelector('.blog-post-hero img');
    if (heroImg && postMeta?.thumbnail) {
        heroImg.src = postMeta.thumbnail;
        heroImg.alt = postMeta.title || '';
    } else if (heroImg) {
        heroImg.closest('.blog-post-hero').style.display = 'none';
    }

    // 날짜
    const dateContainer = document.querySelector('.blog-post-date');
    if (dateContainer) {
        dateContainer.textContent = formatDateFromSlug(slug);
    }

    // 부제목
    const subtitleContainer = document.querySelector('.blog-post-subtitle');
    if (subtitleContainer && postMeta?.subtitle) {
        subtitleContainer.textContent = postMeta.subtitle;
    }

    // 마크다운 렌더링
    try {
        const res = await fetch(`${source}/${slug}.md`);
        if (!res.ok) {
            contentContainer.innerHTML = '<p>글을 찾을 수 없습니다.</p>';
            return;
        }
        const md = await res.text();
        contentContainer.innerHTML = marked.parse(md);

        const titleContainer = document.querySelector('.blog-post-title');
        if (titleContainer && postMeta?.title) {
            titleContainer.textContent = postMeta.title;
        }

        const h1 = contentContainer.querySelector('h1');
        if (h1) h1.remove();

        contentContainer.querySelectorAll('a').forEach(a => {
            a.setAttribute('target', '_blank');
            a.setAttribute('rel', 'noopener noreferrer');
        });

        contentContainer.querySelectorAll('blockquote br').forEach(br => {
            const spacer = document.createElement('span');
            spacer.className = 'br-spacer';
            br.replaceWith(spacer);
        });

        contentContainer.querySelectorAll('hr').forEach(hr => {
            const divider = document.createElement('div');
            divider.className = 'work-divider';
            divider.innerHTML = '<img src="img/icon/divider.png" alt="divider">';
            hr.replaceWith(divider);
        });
    } catch (e) {
        contentContainer.innerHTML = '<p>글을 불러오는 중 오류가 발생했습니다.</p>';
    }
}