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

// 필터 옵션 클릭 이벤트
document.querySelectorAll('.filter-option').forEach(option => {
    option.addEventListener('click', function() {
        // 모든 필터에서 active 클래스 제거
        document.querySelectorAll('.filter-option').forEach(item => {
            item.classList.remove('active');
        });
        
        // 클릭한 필터에 active 클래스 추가
        this.classList.add('active');
    });
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

