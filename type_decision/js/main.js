/**
    * AI 분석 포털 메인 스크립트
    * - DOM 로드 후 기능 초기화
    * - 공통 기능 및 이벤트 처리
*/

// DOM이 로드되면 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 공통 기능 초기화
    initCommon();
    
    // 데이터맵 토글 기능 초기화
    initDataMapToggle();
    
    // 검색바 기능 초기화
    initSearchBar();
});

/**
    * 공통 기능 초기화 함수
    * - 모바일 메뉴 토글
    * - 스크롤 이벤트
*/
function initCommon() {
    // 스크롤 시 헤더 스타일 변경
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        }
        else {
            header.classList.remove('scrolled');
        }
    });
    
    // 네비게이션 현재 항목 표시
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.gnb__item a');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPath || (currentPath === '/' && href === '#')) {
            item.parentElement.classList.add('active');
        }
    });
}

/**
    * 데이터맵 토글 기능
    * - 데이터맵 펼치기/접기
*/
function initDataMapToggle() {
    const toggleBtn = document.querySelector('.data-map__toggle');
    if (!toggleBtn) return;
    
    toggleBtn.addEventListener('click', function() {
        const dataMap = this.closest('.data-map');
        const rankingList = dataMap.querySelector('.ranking-list');
        
        if (dataMap.classList.contains('collapsed')) {
            // 펼치기
            dataMap.classList.remove('collapsed');
            rankingList.style.maxHeight = rankingList.scrollHeight + 'px';
            this.querySelector('.arrow-down-icon').style.transform = 'rotate(45deg)';
        }
        else {
            // 접기
            dataMap.classList.add('collapsed');
            rankingList.style.maxHeight = '0';
            this.querySelector('.arrow-down-icon').style.transform = 'rotate(-135deg)';
        }
    });
    
    // 초기 상태: 펼쳐진 상태
    const dataMap = document.querySelector('.data-map');
    if (dataMap) {
        const rankingList = dataMap.querySelector('.ranking-list');
        if (rankingList) {
            rankingList.style.maxHeight = rankingList.scrollHeight + 'px';
        }
    }
}

/**
    * 검색바 기능 초기화
    * - 검색어 입력 및 버튼 이벤트
*/
function initSearchBar() {
    const searchInput = document.querySelector('.search-bar input');
    const enterBtn = document.querySelector('.btn-enter');
    const searchBtn = document.querySelector('.btn-search');
    
    if (!searchInput || !enterBtn || !searchBtn) return;
    
    // 엔터 버튼 클릭 이벤트
    enterBtn.addEventListener('click', function() {
        if (searchInput.value.trim()) {
            performSearch(searchInput.value, 'normal');
        }
    });
    
    // AI 검색 버튼 클릭 이벤트
    searchBtn.addEventListener('click', function() {
        if (searchInput.value.trim()) {
            performSearch(searchInput.value, 'ai');
        }
    });
    
    // 엔터키 입력 이벤트
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter' && this.value.trim()) {
            performSearch(this.value, 'normal');
        }
    });
}

/**
    * 검색 실행 함수
    * @param {string} query - 검색어
    * @param {string} type - 검색 타입 (normal 또는 ai)
*/
function performSearch(query, type) {
    console.log(`검색 실행: ${query} (타입: ${type})`);
    
    // 실제 검색 기능은 백엔드 API 연동 필요
    if (type === 'ai') {
        // AI 검색 로직
        alert(`AI 검색을 수행합니다: ${query}`);
    }
    else {
        // 일반 검색 로직
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
}

/**
 * 브라우저 크기 변경 감지 및 대응
 */
window.addEventListener('resize', function() {
  // 반응형 요소 조정 필요 시 구현
}); 