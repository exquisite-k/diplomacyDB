/**
    * AI 분석 포털 슬라이드 기능
    * - Swiper.js 라이브러리 활용
    * - 메인 배너 슬라이드
    * - 뉴스 슬라이드
*/

// 디버깅을 위한 로그
console.log("Swiper 라이브러리 로드 확인:", typeof Swiper);

// 슬라이드 초기화 함수
function initSliders() {
    console.log("슬라이드 초기화 시작");
    
    // Swiper.js 라이브러리가 로드되었는지 확인
    if (typeof Swiper === 'undefined') {
        console.error("Swiper 라이브러리가 로드되지 않았습니다.");
        return;
    }
    
    // 메인 배너 슬라이드 초기화
    initMainBannerSlider();
    
    // 뉴스 슬라이드 초기화
    initNewsSlider();
    
    console.log("슬라이드 초기화 완료");
}

/**
    * 메인 배너 슬라이드 초기화 함수
    * - 자동 재생
    * - 페이지네이션
    * - 네비게이션 버튼
*/
function initMainBannerSlider() {
    console.log("메인 배너 슬라이드 초기화 시작");
    
    // 슬라이드 요소 확인
    const swiperEl = document.querySelector('.main-banner__swiper');
    if (!swiperEl) {
        console.error("메인 배너 슬라이드 요소가 없습니다: .main-banner__swiper");
        return;
    }
    
    const slides = swiperEl.querySelectorAll('.swiper-slide');
    console.log("메인 배너 슬라이드 수:", slides.length);
    
    // 슬라이드가 1개 이하일 경우 loop 모드 비활성화
    const useLoop = slides.length > 1;
    
    try {
        const mainBannerSwiper = new Swiper('.main-banner__swiper', {
            // 기본 설정
            slidesPerView: 1,
            spaceBetween: 0,
            effect: 'fade',
            loop: useLoop, // 슬라이드가 2개 이상인 경우에만 loop 활성화
            
            // 자동 재생 (슬라이드가 2개 이상인 경우에만)
            autoplay: useLoop ? {
                delay: 5000,
                disableOnInteraction: false,
            } : false,
            
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
        
        console.log("메인 배너 슬라이드 초기화 완료", mainBannerSwiper);
    } catch (error) {
        console.error("메인 배너 슬라이드 초기화 오류:", error);
    }
}

/**
    * 뉴스 슬라이드 초기화 함수
    * - 반응형 설정
    * - 페이지네이션
    * - 네비게이션 버튼
*/
function initNewsSlider() {
    console.log("뉴스 슬라이드 초기화 시작");
    
    // 슬라이드 요소 확인
    const swiperEl = document.querySelector('.news-slider');
    if (!swiperEl) {
        console.error("뉴스 슬라이드 요소가 없습니다: .news-slider");
        return;
    }
    
    const slides = swiperEl.querySelectorAll('.swiper-slide');
    console.log("뉴스 슬라이드 수:", slides.length);
    
    // 슬라이드가 1개 이하일 경우 loop 모드 비활성화
    const useLoop = slides.length > 1;
    
    try {
        const newsSwiper = new Swiper('.news-slider', {
            // 기본 설정
            slidesPerView: 1,
            spaceBetween: 20,
            loop: useLoop, // 슬라이드가 2개 이상인 경우에만 loop 활성화
            
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
                    slidesPerView: slides.length >= 2 ? 2 : 1,
                    spaceBetween: 20,
                },
                // 992px 이상일 때
                992: {
                    slidesPerView: slides.length >= 3 ? 3 : (slides.length >= 2 ? 2 : 1),
                    spaceBetween: 30,
                }
            }
        });
        
        console.log("뉴스 슬라이드 초기화 완료", newsSwiper);
    } catch (error) {
        console.error("뉴스 슬라이드 초기화 오류:", error);
    }
}

// DOM이 로드된 후 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM 로드 완료, 슬라이드 초기화 시작");
    initSliders();
}); 