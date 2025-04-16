// 문서가 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 스와이퍼 슬라이더 초기화 - 인물 섹션
    const personSwiper = new Swiper('.person-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
            draggable: true,
        },
        breakpoints: {
            // 576px 이상에서
            576: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            // 768px 이상에서
            768: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
            // 1024px 이상에서
            1024: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
        }
    });
    // 스와이퍼 슬라이더 초기화 - 키워드 섹션
    const keywordSwiper = new Swiper('.keyword-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
            draggable: true,
        },
        breakpoints: {
            // 576px 이상에서
            576: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            // 768px 이상에서
            768: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
            // 1024px 이상에서
            1024: {
                slidesPerView: 4,
                spaceBetween: 24,
            },
        }
    });
    // amCharts 5 차트 생성
    initCharts();


    // 탭 버튼 초기화 - 항상 하나는 활성화 (토글 off 불가)
    initToggleButtonGroup('.tab-btn-box', '.tab-btn', null, false);


    // 키워드 버튼 클릭 이벤트
    // 모든 keyword-wrap을 찾습니다
    const keywordWraps = document.querySelectorAll('.keyword-wrap');
    // 각 keyword-wrap에 대해 별도로 이벤트 리스너 설정
    keywordWraps.forEach(wrap => {
        // 해당 wrap 내의 모든 버튼을 찾습니다
        const buttons = wrap.querySelectorAll('.keyword-wrap-item button');
        
        // 해당 wrap 내의 각 버튼에 클릭 이벤트 리스너 추가
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // 현재 wrap 내의 모든 keyword-wrap-item에서 active 클래스 제거
                wrap.querySelectorAll('.keyword-wrap-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // 클릭된 버튼의 부모 요소(keyword-wrap-item)에 active 클래스 추가
                this.closest('.keyword-wrap-item').classList.add('active');
            });
        });
    });

    // filter-wrapper에 무한 스크롤 효과 적용하는 함수
    initInfiniteScroll();
    // 창 크기 변경 시 다시 계산
    window.addEventListener('resize', function() {
        const filterWrapper = document.querySelector('.filter-wrapper');
        if (filterWrapper) {
            filterWrapper.classList.remove('animate');
            setTimeout(() => {
                initInfiniteScroll();
            }, 100);
        }
    });
});

// 차트 초기화 함수
function initCharts() {
    // 데이터 세트 (샘플 데이터)
    const chartData = [
        {
            category: "한국",
            value: 35,
            color: am5.color(0x1326A7)
        },
        {
            category: "미국",
            value: 25,
            color: am5.color(0x2CD5AB)
        },
        {
            category: "중국",
            value: 20,
            color: am5.color(0xF53C80)
        },
        {
            category: "일본",
            value: 10,
            color: am5.color(0xE0E0E0)
        },
    ];

    // 차트 생성 함수 - 파이 차트 생성 함수
    function createPieChart(elementId, data) {
        // 차트 요소 존재 확인
        if (!document.getElementById(elementId)) return;

        // 루트 요소 생성
        let root = am5.Root.new(elementId);
        root._logo.dispose();

        // 테마 설정
        root.setThemes([am5themes_Animated.new(root)]);

        // 차트 생성
        let chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                layout: root.verticalLayout,
                innerRadius: am5.percent(60)
            })
        );

        // 시리즈 생성
        let series = chart.series.push(
            am5percent.PieSeries.new(root, {
                valueField: "value",
                categoryField: "category",
                alignLabels: false,
                legendLabelText: "[{fill}]{category}[/]",
                legendValueText: "[bold {fill}]{value}[/]"
            })
        );

        // 슬라이스 템플릿 설정
        let sliceTemplate = series.slices.template;
            
        // 내부 색상 채우기 및 투명도 설정
        sliceTemplate.setAll({
            fillOpacity: 1,          // 내부 색상 투명도 (1 = 완전 불투명)
            stroke: am5.color(0xffffff), // 테두리 색상 (흰색)
            strokeWidth: 0,          // 테두리 두께
            strokeOpacity: 0       // 테두리 투명도
        });

        // 색상 설정 - fill 속성 사용
        sliceTemplate.adapters.add("fill", function(fill, target) {
            let dataItem = target.dataItem;
            if (dataItem && dataItem.dataContext && dataItem.dataContext.color) {
                return dataItem.dataContext.color;
            }
            return fill;
        });

        // 시리즈에 데이터 추가
        series.data.setAll(data);
        
        // 레이블 비활성화 (공간 부족으로)
        series.labels.template.set("visible", false);
        series.ticks.template.set("visible", false);

        // 애니메이션 효과
        series.appear(1000, 100);
    }

    // 모든 차트 생성
    createPieChart("chart1", chartData);
    createPieChart("chart2", chartData);
    createPieChart("chart3", chartData);
    createPieChart("chart4", chartData);
    createPieChart("chart5", chartData);
    createPieChart("chart6", chartData);
}

// 스크롤 위치에 따라 헤더 상태 변경하는 함수
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    if (!header) return; // 헤더가 없으면 실행하지 않음
    
    // 스크롤 이벤트 성능 최적화를 위한 쓰로틀링 함수
    function throttle(callback, delay = 100) {
        let isThrottled = false;
        
        return function() {
            if (isThrottled) return;
            
            isThrottled = true;
            callback.apply(this, arguments);
            
            setTimeout(() => {
                isThrottled = false;
            }, delay);
        };
    }
    
    // 스크롤 위치 체크 및 헤더 클래스 토글 함수
    function checkScrollPosition() {
        const scrollY = window.scrollY || window.pageYOffset;
        const threshold = 100; // 임계값 (필요에 따라 조정)
        
        if (scrollY > threshold) {
            // 스크롤이 임계값보다 아래에 있을 때
            if (!header.classList.contains('active')) {
                header.classList.add('active');
            }
        } else {
            // 스크롤이 맨 위에 있을 때
            header.classList.remove('active');
        }
    }
    
    // 초기 스크롤 위치 확인
    checkScrollPosition();
    
    // 스크롤 이벤트에 쓰로틀링 적용하여 등록
    window.addEventListener('scroll', throttle(checkScrollPosition, 50));
});

// 검색 버튼 클릭 이벤트
document.querySelector('.search-btn').addEventListener('click', function() {
    const searchInput = document.querySelector('.search-input');
    performSearch(searchInput.value);
});

// 검색 입력란 엔터 키 이벤트
document.querySelector('.search-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        performSearch(this.value);
    }
});

// 검색 수행 함수
function performSearch(query) {
    if (!query.trim()) return; // 빈 검색어인 경우 무시
    
    console.log('검색어:', query);
    // 여기에 실제 검색 로직 구현 (API 호출 등)
    alert('검색 기능은 현재 구현 중입니다: ' + query);
} 

// 네비게이션 버튼 클릭 이벤트
function toggleActive(element) {
    // 이미 active 상태인지 확인
    const isAlreadyActive = element.classList.contains('active');
    
    // 부모 요소 찾기
    const parent = element.parentNode;
    
    // 부모 안에 있는 모든 a 태그 형제 요소들 찾기
    const siblings = parent.querySelectorAll('a');
    
    // 모든 형제 요소에서 active 클래스 제거
    siblings.forEach(sibling => {
        sibling.classList.remove('active');
    });
    
    // 이미 active 상태가 아니었을 경우에만 현재 요소에 active 클래스 추가
    if (!isAlreadyActive) {
        element.classList.add('active');
    }
    
    return false; // 이벤트 전파 중지
}


// 탭 버튼 함수
/**
 * 토글 기능이 있는 탭 버튼 그룹 관리 함수
 * @param {String} containerSelector - 버튼 그룹을 포함하는 컨테이너 선택자
 * @param {String} itemSelector - 각 아이템 선택자
 * @param {String} buttonSelector - 각 아이템 내 버튼 선택자 (생략 가능)
 * @param {Boolean} allowToggleOff - 모든 버튼이 비활성화될 수 있는지 여부 (기본값: true)
*/
function initToggleButtonGroup(containerSelector, itemSelector, buttonSelector = null, allowToggleOff = true) {
    // 모든 컨테이너 요소 찾기
    const containers = document.querySelectorAll(containerSelector);
    
    containers.forEach(container => {
        // 버튼 선택자가 제공된 경우 해당 버튼에 이벤트 추가, 아니면 아이템 자체에 이벤트 추가
        const clickTargets = buttonSelector 
            ? container.querySelectorAll(buttonSelector)
            : container.querySelectorAll(itemSelector);
            
        clickTargets.forEach(target => {
            target.addEventListener('click', function() {
                // 클릭된 아이템 요소 (버튼 또는 아이템 자체)
                const item = buttonSelector 
                    ? this.closest(itemSelector) 
                    : this;
                    
                // 이미 활성화된 상태인 경우
                if (item.classList.contains('active')) {
                    // allowToggleOff가 true인 경우에만 토글 해제 가능
                    if (allowToggleOff) {
                        item.classList.remove('active');
                    }
                } else {
                    // allowToggleOff가 false인 경우, 다른 아이템의 active 클래스 제거
                    if (!allowToggleOff) {
                        container.querySelectorAll(itemSelector).forEach(el => {
                            el.classList.remove('active');
                        });
                    }
                    // 현재 아이템에 active 클래스 추가
                    item.classList.add('active');
                }
            });
        });
    });
}



// Instagram 스타일 마퀴 효과 구현
// function initInstagramMarquee() {
//     const marqueeContainer = document.querySelector('.page_instagramMarqueeContent__X1DAF');
//     if (!marqueeContainer) return;
    
//     // 타임빌라스 스타일 인스타그램 이미지 데이터 (예시)
//     const images = [
//         '/images/marquee/image1.jpg',
//         '/images/marquee/image2.jpg',
//         '/images/marquee/image3.jpg',
//         '/images/marquee/image4.jpg',
//         '/images/marquee/image5.jpg',
//         '/images/marquee/image6.jpg',
//         '/images/marquee/image7.jpg',
//         '/images/marquee/image8.jpg'
//     ];
    
//     // 두 개의 행으로 마퀴 생성 (위/아래 반대 방향으로 움직임)
//     const rows = 2;
//     marqueeContainer.innerHTML = '';
    
//     for (let i = 0; i < rows; i++) {
//         const rowElement = document.createElement('div');
//         rowElement.className = 'instagram-marquee-row';
//         rowElement.style.display = 'flex';
//         rowElement.style.marginBottom = i < rows - 1 ? '20px' : '0';
        
//         // 각 행에 이미지 추가
//         for (let j = 0; j < images.length; j++) {
//             const itemElement = document.createElement('div');
//             itemElement.className = 'instagram-marquee-item';
//             itemElement.style.margin = '0 10px';
//             itemElement.style.flex = '0 0 auto';
            
//             const imageElement = document.createElement('img');
//             imageElement.src = images[j];
//             imageElement.alt = 'Instagram image';
//             imageElement.style.width = '300px';
//             imageElement.style.height = '300px';
//             imageElement.style.objectFit = 'cover';
//             imageElement.style.borderRadius = '12px';
            
//             itemElement.appendChild(imageElement);
//             rowElement.appendChild(itemElement);
//         }
        
//         // 무한 스크롤을 위해 이미지 복제
//         for (let j = 0; j < images.length; j++) {
//             const itemElement = document.createElement('div');
//             itemElement.className = 'instagram-marquee-item';
//             itemElement.style.margin = '0 10px';
//             itemElement.style.flex = '0 0 auto';
            
//             const imageElement = document.createElement('img');
//             imageElement.src = images[j];
//             imageElement.alt = 'Instagram image';
//             imageElement.style.width = '300px';
//             imageElement.style.height = '300px';
//             imageElement.style.objectFit = 'cover';
//             imageElement.style.borderRadius = '12px';
            
//             itemElement.appendChild(imageElement);
//             rowElement.appendChild(itemElement);
//         }
        
//         marqueeContainer.appendChild(rowElement);
//     }
    
//     // 애니메이션 설정
//     const rows_elements = marqueeContainer.querySelectorAll('.instagram-marquee-row');
//     const speed = 1; // 기본 속도
    
//     // 각 행별 현재 위치와 방향 설정
//     const rowPositions = Array.from(rows_elements).map((row, index) => ({
//         element: row,
//         position: 0,
//         direction: index % 2 === 0 ? -1 : 1, // 홀수 행은 오른쪽, 짝수 행은 왼쪽으로
//         speed: speed * (index % 2 === 0 ? 1 : 0.8) // 행마다 약간 다른 속도
//     }));
    
//     // 각 행의 총 너비 계산
//     rowPositions.forEach(rowData => {
//         const items = rowData.element.querySelectorAll('.instagram-marquee-item');
//         let totalWidth = 0;
        
//         items.forEach(item => {
//             totalWidth += item.offsetWidth + parseInt(getComputedStyle(item).marginLeft) + parseInt(getComputedStyle(item).marginRight);
//         });
        
//         rowData.totalWidth = totalWidth / 2; // 전체 아이템의 절반이 한 세트이므로
//     });
    
//     // 애니메이션 함수
//     function animateMarquee() {
//         rowPositions.forEach(rowData => {
//             // 현재 위치 업데이트
//             rowData.position += rowData.speed * rowData.direction;
            
//             // 경계 확인 및 순환
//             if (rowData.direction < 0 && Math.abs(rowData.position) >= rowData.totalWidth) {
//                 rowData.position = 0;
//             } else if (rowData.direction > 0 && rowData.position >= rowData.totalWidth) {
//                 rowData.position = 0;
//             }
            
//             // 위치 적용
//             rowData.element.style.transform = `translateX(${rowData.position}px)`;
//         });
        
//         requestAnimationFrame(animateMarquee);
//     }
    
//     // 애니메이션 시작
//     requestAnimationFrame(animateMarquee);
    
//     // 컨테이너 스타일 설정
//     marqueeContainer.style.overflow = 'hidden';
//     marqueeContainer.style.width = '100%';
//     marqueeContainer.style.padding = '40px 0';
// }

// filter-wrapper에 양방향 마퀴 효과 적용
function initFilterMarquee() {
    const filterWrapper = document.querySelector('.filter-wrapper');
    if (!filterWrapper) return;
    
    // 원본 컨텐츠 저장
    const originalContent = filterWrapper.innerHTML;

    // 복제 횟수 설정
    const repeatCount = 5; // 복제 횟수 (필요에 따라 조정)
    
    // 마퀴 재구성
    filterWrapper.innerHTML = '';
    
    // 첫 번째 행 (왼쪽 방향)
    const row = document.createElement('div');
    row.className = 'filter-marquee-row';

    // 반복 메서드를 사용하여 콘텐츠 복제
    row.innerHTML = originalContent.repeat(repeatCount);
    row.setAttribute('data-direction', 'left');
    
    // 컨테이너에 행 추가
    filterWrapper.appendChild(row);
    
    // 각 행 설정
    const rows = filterWrapper.querySelectorAll('.filter-marquee-row');
    
    // 각 행의 너비 및 아이템 수 계산
    const rowData = Array.from(rows).map((row, index) => {
        const items = row.querySelectorAll('.filter-option');
        const itemCount = items.length / 2; // 복제했으므로 절반이 원본 수
        
        // 각 아이템의 총 너비 계산 (마진 포함)
        let totalWidth = 0;
        for (let i = 0; i < itemCount; i++) {
            const item = items[i];
            const width = item.offsetWidth;
            const marginRight = parseInt(getComputedStyle(item).marginRight);
            totalWidth += width + marginRight;
        }
        
        return {
            element: row,
            totalWidth: totalWidth,
            position: index === 1 ? -totalWidth / 2 : 0, // 두 번째 행은 반대 위치에서 시작
            direction: index === 0 ? -1 : 1, // 첫 번째 행은 왼쪽으로, 두 번째 행은 오른쪽으로
            speed: 1.5 * (index === 0 ? 1 : 0.8) // 약간 다른 속도 적용
        };
    });

    // 애니메이션 상태 관리
    let isAnimating = true;
    let animationId = null;
    
    // 마퀴 애니메이션 함수
    function animateMarquee() {
        if (!isAnimating) return;
        
        rowData.forEach(data => {
            // 현재 위치 업데이트
            data.position += data.speed * data.direction;
            
            // 경계 확인 및 순환
            if (data.direction < 0 && Math.abs(data.position) >= data.totalWidth) {
                data.position = 0;
            } else if (data.direction > 0 && data.position >= data.totalWidth) {
                data.position = 0;
            }
            
            // 위치 적용
            data.element.style.transform = `translateX(${data.position}px)`;
        });
        
        animationId = requestAnimationFrame(animateMarquee);
    }
    
    // 애니메이션 시작/정지 함수
    function startAnimation() {
        if (!isAnimating) {
            isAnimating = true;
            animationId = requestAnimationFrame(animateMarquee);
        }
    }
    
    function stopAnimation() {
        isAnimating = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }
    
    // 컨테이너와 행 스타일 설정
    rows.forEach(row => {
        row.style.display = 'flex';
    });
    
    // 모든 filter-option에 마우스 이벤트 리스너 추가
    const filterOptions = filterWrapper.querySelectorAll('.filter-option');
    filterOptions.forEach(option => {
        option.addEventListener('mouseenter', () => {
            stopAnimation();
            
            // 호버된 아이템 강조 효과
            option.style.transform = 'translateY(-8px) scale(1.05)';
            option.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        option.addEventListener('mouseleave', () => {
            startAnimation();
            
            // 강조 효과 제거
            option.style.transform = '';
            option.style.boxShadow = '';
        });
    });
    
    // 초기 애니메이션 시작
    animationId = requestAnimationFrame(animateMarquee);
    
    // 페이지 가시성 변경 시 애니메이션 제어
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAnimation();
        } else {
            startAnimation();
        }
    });
    
    return {
        stop: stopAnimation,
        start: startAnimation,
        setSpeed: function(newSpeed) {
            rowData.forEach((data, index) => {
                data.speed = newSpeed * (index === 0 ? 1 : 0.8);
            });
        }
    };
}

// 문서 로드 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 기존에 있던 initInfiniteCarousel 대신 새로운 함수 사용
    const marqueeController = initFilterMarquee();
});

// 문서 로드 후 실행
document.addEventListener('DOMContentLoaded', function() {
    initInstagramMarquee();
});

