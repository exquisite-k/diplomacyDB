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


// 앞부분이 끝나면 뒤에서 다시 나오는 무한 슬라이드 구현
function initInfiniteCarousel() {
    const filterWrapper = document.querySelector('.filter-wrapper');
    if (!filterWrapper) return;
    
    // 초기 아이템 개수 확인
    const originalItems = filterWrapper.querySelectorAll('.filter-option');
    const originalItemCount = originalItems.length;
    
    // 10개 이하일 경우 복제하여 개수 늘리기
    if (originalItemCount <= 10) {
        // 원본 아이템 복제
        const originalContent = filterWrapper.innerHTML;
        // 복제본 추가 (최소 2배)
        filterWrapper.innerHTML = originalContent;
        
        // 필요한 만큼 더 복제 (2배로)
        for (let i = 0; i < originalItemCount; i++) {
            const clonedItem = originalItems[i].cloneNode(true);
            // 클론된 아이템에 고유 ID 추가 (필요 시)
            clonedItem.dataset.clone = 'true';
            filterWrapper.appendChild(clonedItem);
        }
        
        console.log(`필터 아이템 복제: ${originalItemCount}개 -> ${filterWrapper.querySelectorAll('.filter-option').length}개`);
    }
    
    // 초기 스타일 설정
    filterWrapper.style.display = 'flex';
    filterWrapper.style.position = 'relative';
    
    // 모든 아이템 (원본 + 복제본) 가져오기
    const items = filterWrapper.querySelectorAll('.filter-option');
    const itemPositions = [];
    let totalWidth = 0;
    
    // 각 아이템의 초기 위치와 크기 계산
    items.forEach((item, index) => {
        const width = item.offsetWidth;
        const marginRight = parseInt(getComputedStyle(item).marginRight);
        
        itemPositions.push({
            item: item,
            width: width,
            margin: marginRight,
            position: totalWidth
        });
        
        // 초기 위치 설정
        item.style.position = 'absolute';
        item.style.left = `${totalWidth}px`;
        
        totalWidth += width + marginRight;
    });
    
    // filterWrapper의 width 설정
    // filterWrapper.style.minWidth = `${totalWidth}px`;
    filterWrapper.style.height = `${items[0].offsetHeight + 40}px`; // padding 포함
    
    // 슬라이드 속도 설정
    const speed = 2; // 픽셀 단위 이동 속도 (높을수록 빠름)
    let animationId;
    
    // 애니메이션 함수
    function animateCarousel() {
        // 모든 아이템을 왼쪽으로 이동
        itemPositions.forEach(itemData => {
            itemData.position -= speed;
            itemData.item.style.left = `${itemData.position}px`;
            
            // 아이템이 왼쪽으로 완전히 사라지면 오른쪽 끝으로 재배치
            if (itemData.position < (-itemData.width * 2)) {
                itemData.position = totalWidth - (itemData.width * 2);
                itemData.item.style.left = `${itemData.position}px`;
            }
        });
        
        animationId = requestAnimationFrame(animateCarousel);
    }
    
    // 애니메이션 시작
    animationId = requestAnimationFrame(animateCarousel);
    
    // 탭이 백그라운드로 갈 때 애니메이션 일시 중지
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animationId = requestAnimationFrame(animateCarousel);
        }
    });
    
    // 화면 크기 변경 시 위치 재계산
    window.addEventListener('resize', function() {
        cancelAnimationFrame(animationId);
        
        // 위치 재계산
        totalWidth = 0;
        itemPositions.forEach(itemData => {
            itemData.width = itemData.item.offsetWidth;
            itemData.position = totalWidth;
            itemData.item.style.left = `${totalWidth}px`;
            totalWidth += itemData.width + itemData.margin;
        });
        
        // filterWrapper.style.minWidth = `${totalWidth}px`;
        filterWrapper.style.height = `${items[0].offsetHeight + 40}px`;
        
        // 애니메이션 재시작
        setTimeout(() => {
            animationId = requestAnimationFrame(animateCarousel);
        }, 100);
    });
    
    return {
        stop: function() {
            cancelAnimationFrame(animationId);
        },
        start: function() {
            animationId = requestAnimationFrame(animateCarousel);
        },
        setSpeed: function(newSpeed) {
            speed = newSpeed;
        }
    };
}

// 문서 로드 후 무한 캐러셀 초기화
let carouselController;
document.addEventListener('DOMContentLoaded', function() {
    carouselController = initInfiniteCarousel();
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

