/**
    * AI 분석 포털 슬라이드 기능
    * - Swiper.js 라이브러리 활용
    * - 메인 배너 슬라이드
    * - 뉴스 슬라이드
*/

// 슬라이드 초기화 함수
function initSliders() {
    // 메인 배너 슬라이드 초기화
    initMainBannerSlider();
    
    // 뉴스 슬라이드 초기화
    initNewsSlider();
}

/**
    * 메인 배너 슬라이드 초기화 함수
    * - 자동 재생
    * - 페이지네이션
    * - 네비게이션 버튼
*/
function initMainBannerSlider() {
    const mainBannerSwiper = new Swiper('.main-banner__swiper', {
        // 기본 설정
        slidesPerView: 1,
        spaceBetween: 0,
        effect: 'fade',
        loop: true,
        
        // 자동 재생
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        
        // 페이지네이션
        pagination: {
            el: '.main-banner .swiper-pagination',
            clickable: true,
        },
        
        // 네비게이션 화살표
        navigation: {
            nextEl: '.main-banner .swiper-button-next',
            prevEl: '.main-banner .swiper-button-prev',
        },
    });
}

/**
    * 뉴스 슬라이드 초기화 함수
    * - 반응형 설정
    * - 페이지네이션
    * - 네비게이션 버튼
*/
function initNewsSlider() {
    const newsSwiper = new Swiper('.news-slider', {
        // 기본 설정
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        
        // 페이지네이션
        pagination: {
            el: '.keyword-news .swiper-pagination',
            clickable: true,
        },
        
        // 네비게이션 화살표
        navigation: {
            nextEl: '.keyword-news .swiper-button-next',
            prevEl: '.keyword-news .swiper-button-prev',
        },
        
        // 반응형 설정
        breakpoints: {
            // 768px 이상일 때
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            // 992px 이상일 때
            992: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });
}

// DOM이 로드된 후 초기화
document.addEventListener('DOMContentLoaded', initSliders); 