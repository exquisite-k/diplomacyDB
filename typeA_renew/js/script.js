// 문서가 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    /* 스와이퍼 슬라이더 초기화 */
    // 관련 뉴스
    const newsSwiper = new Swiper('.news-slider', {
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

    /* 뉴스 카드 클릭 이벤트 */
    const newsCards = document.querySelectorAll('.news-section .news-card');
    newsCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 다른 모든 뉴스 카드에서 active 클래스 제거
            newsCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('active');
                }
            });
            
            // 현재 클릭한 카드에 active 클래스 추가 (이미 있어도 유지됨)
            if (!card.classList.contains('active')) {
                card.classList.add('active');
            }
        });
    });

    /* 숫자 증가 애니메이션 */
    setupCountUpObserver();

    /* 차트 드롭다운 */
    toggleChartDropdown();

    /* amCharts5 차트 생성 */
    initCharts();
    
    /* 탭 버튼 초기화 */
    initToggleButtonGroup('.tab-btn-box', '.tab-btn', null, false); // 항상 하나는 활성화 (토글 off 불가)

    /* 키워드 버튼 클릭 이벤트 */
    // 모든 keyword-wrap 요소 찾기
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

    /* 필터 마퀴 효과 */
    // filter-wrapper에 무한 스크롤 효과 적용하는 함수
    const marqueeController = initFilterMarquee();
    // initInfiniteScroll();
    
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

    /* 키워드별 언급량 차트 초기화 */
    initKeywordChart();
    
    /* 연관어 차트 초기화 */
    initRelatedChart();
});

/* 스크롤 위치에 따라 헤더 상태 변경하는 이벤트 */
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

/* 검색 버튼 클릭 이벤트 */
document.querySelector('.search-btn').addEventListener('click', function() {
    const searchInput = document.querySelector('.search-input');
    performSearch(searchInput.value);
});

/* 검색 입력란 엔터 키 이벤트 */
document.querySelector('.search-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        performSearch(this.value);
    }
});

/* 검색 수행 함수 */
function performSearch(query) {
    if (!query.trim()) return; // 빈 검색어인 경우 무시
    
    console.log('검색어:', query);
    // 여기에 실제 검색 로직 구현 (API 호출 등)
    alert('검색 기능은 현재 구현 중입니다: ' + query);
}

/* 네비게이션 버튼 함수 */
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

/* 차트 드롭다운 토글 함수 */
function toggleChartDropdown() {
    // 모든 chart-title-wrap 요소 선택
    const chartTitles = document.querySelectorAll('.chart-title-wrap');

    chartTitles.forEach(title => {
        title.addEventListener('click', function() {
            // 부모 요소인 chart-item 찾기
            const chartItem = this.closest('.chart-item');
            
            // chart-item이 존재하면 active 클래스 토글
            // if (chartItem) {
            //     // active 클래스 토글
            //     chartItem.classList.toggle('active');
                
            //     // 차트 컨테이너 찾기
            //     const chartContent = chartItem.querySelector('.chart-content');
                
            //     if (chartContent) {
            //         // active 상태에 따라 차트 컨테이너 표시/숨김
            //         if (chartItem.classList.contains('active')) {
            //             chartContent.style.display = 'block';
            //         } else {
            //             chartContent.style.display = 'none';
            //         }
            //     }
            // }

            if (chartItem) {
                // 상위 차트 그룹 찾기 (.left-chart 또는 .right-chart)
                const chartGroup = chartItem.closest('.left-chart') || chartItem.closest('.right-chart');
                
                if (chartGroup) {
                    // 같은 그룹 내의 모든 차트 아이템에서 active 클래스 제거
                    chartGroup.querySelectorAll('.chart-item').forEach(item => {
                        // 현재 클릭한 아이템이 아닌 경우에만 active 제거
                        if (item !== chartItem) {
                            item.classList.remove('active');
                            
                            // 차트 컨텐츠 숨기기
                            const content = item.querySelector('.chart-content');
                            if (content) {
                                content.style.display = 'none';
                            }
                        }
                    });
                    
                    // 현재 아이템에 active 클래스 토글
                    // chartItem.classList.toggle('active');
                    chartItem.classList.add('active');
                    
                    // 차트 컨텐츠 표시/숨김 토글
                    const chartContent = chartItem.querySelector('.chart-content');
                    if (chartContent) {
                        if (chartItem.classList.contains('active')) {
                            chartContent.style.display = 'block';
                        } else {
                            chartContent.style.display = 'none';
                        }
                    }
                }
            }
        });
    });

}

/* 탭 버튼 함수 */
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

/* 필터 마퀴 효과 함수 */
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

/* 차트 초기화 함수 */
function initCharts() {
    // 데이터 샘플 (샘플 데이터)
    const chartData1 = [
        {
            category: "국내뉴스",
            value: 1365,
            color: am5.color(0x2CD5AB),
        },
        {
            category: "트위터",
            value: 320,
            color: am5.color(0xF53C80),
        },
        {
            category: "블로그",
            value: 1514,
            color: am5.color(0x1326A7),
        },
        {
            category: "커뮤니티",
            value: 867,
            color: am5.color(0xE0E0E0),
        },
    ];
    const chartData2 = [
        {
            category: "사건사고 현황",
            value: 2442,
            color: am5.color(0x2CD5AB),
        },
        {
            category: "외교일지",
            value: 4567,
            color: am5.color(0xF53C80),
        },
        {
            category: "여권발급 현황",
            value: 879,
            color: am5.color(0x1326A7),
        },
        {
            category: "재외동포 현황",
            value: 1153,
            color: am5.color(0xE0E0E0),
        },
    ];

    function createPieChart(elementId, data) {
        // 차트 요소 존재 확인
        if (!document.getElementById(elementId)) return;
    
        // 루트 요소 생성
        let root = am5.Root.new(elementId);

        // 차트 로고 제거
        root._logo.dispose();

        // 차트 테마 설정
        root.setThemes([am5themes_Animated.new(root)]);
    
        // 전체 컨테이너 생성
        let container = root.container.children.push(
            am5.Container.new(root, {
                width: am5.percent(100),
                height: am5.percent(100),
                layout: root.horizontalLayout,
            })
        );
    
        // 차트 영역 생성
        let chartContainer = container.children.push(
            am5.Container.new(root, {
                width: am5.percent(50),
                height: am5.percent(100),
            })
        );
    
        // 차트 생성
        let chart = chartContainer.children.push(
            am5percent.PieChart.new(root, {
                radius: am5.percent(90),
                innerRadius: am5.percent(64),
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 10,
            })
        );
    
        // 시리즈 생성
        let series = chart.series.push(
            am5percent.PieSeries.new(root, {
                valueField: "value",
                categoryField: "category",
                alignLabels: false,
                legendLabelText: "{category}[/]",
                legendValueText: "{value}[/]",
            })
        );
    
        // 슬라이스 템플릿 설정
        let sliceTemplate = series.slices.template;
        sliceTemplate.setAll({
            fillOpacity: 1,
            stroke: am5.color(0xffffff),
            strokeWidth: 0,
            strokeOpacity: 0,
        });
    
        // 색상 설정
        sliceTemplate.adapters.add("fill", function(fill, target) {
            let dataItem = target.dataItem;
            if (dataItem && dataItem.dataContext && dataItem.dataContext.color) {
                return dataItem.dataContext.color;
            }
            return fill;
        });
    
        // 레이블 라벨 비활성화
        series.ticks.template.setAll({
            strokeOpacity: 0,
        });
        series.labels.template.setAll({
            text: "",
        });
    
        // 범례 영역 생성 (수정)
        let legendContainer = container.children.push(
            am5.Container.new(root, {
                width: am5.percent(50),
                height: am5.percent(100),
                layout: root.verticalLayout,
                paddingLeft: 36,
            })
        );
    
        // 범례 생성
        let legend = legendContainer.children.push(
            am5.Legend.new(root, {
                width: am5.percent(100),
                centerY: am5.percent(50),
                y: am5.percent(50),
                layout: root.verticalLayout,
            })
        );

        // 범례 마커 스타일 설정
        legend.markers.template.setAll({
            width: 12,
            height: 12,
        });
        legend.markerRectangles.template.setAll({
            cornerRadiusTL: 10,
            cornerRadiusTR: 10,
            cornerRadiusBL: 10,
            cornerRadiusBR: 10,
        });
    
        // 범례 스타일 설정
        legend.labels.template.setAll({
            fontSize: 16,
            fontWeight: "400",
            textAlign: "left",
            width: 100,
            x: 20,
        });
        legend.valueLabels.template.setAll({
            fontSize: 16,
            fontWeight: "400",
            textAlign: "right",
            x: am5.percent(100),
        });
    
        // 먼저 시리즈에 데이터 추가 (순서 중요)
        series.data.setAll(data);
        
        // 범례에 데이터 설정
        legend.data.setAll(series.dataItems);
    
        // 애니메이션 효과
        series.appear(1000, 100);
        legend.appear(1000, 100);
    }

    // 모든 차트 생성
    createPieChart("chart1", chartData1);
    createPieChart("chart2", chartData2);
    createPieChart("chart3", chartData1);
    createPieChart("chart4", chartData2);
    createPieChart("chart5", chartData1);
    createPieChart("chart6", chartData2);
}

/* 키워드별 언급량 차트 초기화 함수 */
function initKeywordChart() {
    // 차트 요소 존재 확인
    if (!document.getElementById("chart7")) return;
    
    // 차트 데이터 - 날짜별로 3개 카테고리의 언급량 데이터 포함
    const keywordData = [
        {
            date: "09-02",
            "뉴스": 14,
            "트위터": 18,
            "블로그": 10,
        },
        {
            date: "09-03",
            "뉴스": 30,
            "트위터": 37,
            "블로그": 14,
        },
        {
            date: "09-04",
            "뉴스": 24,
            "트위터": 28,
            "블로그": 8,
        },
        {
            date: "09-05",
            "뉴스": 32,
            "트위터": 40,
            "블로그": 20,
        },
        {
            date: "09-06",
            "뉴스": 47,
            "트위터": 49,
            "블로그": 22,
        },
        {
            date: "09-07",
            "뉴스": 53,
            "트위터": 53,
            "블로그": 26,
        },
        {
            date: "09-08",
            "뉴스": 59,
            "트위터": 55,
            "블로그": 20,
        },
        {
            date: "09-09",
            "뉴스": 78,
            "트위터": 54,
            "블로그": 21,
        }
    ];
    
    // 시리즈별 색상 정의
    const seriesColors = {
        "뉴스": am5.color(0xF53C80),
        "트위터": am5.color(0x1326A7),
        "블로그": am5.color(0x39EABE),
    };
    
    // amCharts가 로드된 후 차트 생성
    am5.ready(function() {
        // 차트 생성 함수 호출
        createMultiLineChart("chart7", keywordData, seriesColors);
    });
    
    // 다중 라인 차트 생성 함수
    function createMultiLineChart(elementId, data, seriesColors) {
        // 루트 요소 생성
        let root = am5.Root.new(elementId);
 
        // 차트 로고 제거
        root._logo.dispose();
 
        // 차트 테마 설정
        root.setThemes([am5themes_Animated.new(root)]);
        
        // 그리드 테마 설정
        let myTheme = am5.Theme.new(root);
        myTheme.rule("Grid").setAll({
            stroke: am5.color(0xF53C80),
            strokeOpacity: 0.2,
        });
        root.setThemes([
            am5themes_Animated.new(root),
            myTheme,
        ]);
        
        // 차트 생성
        let chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "none",
            wheelY: "none",
            layout: root.verticalLayout,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 10,
            paddingBottom: 0,
        }));
        
        // X축 생성
        let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
            maxDeviation: 0.5,
            groupData: false,
            baseInterval: {
                timeUnit: "day",
                count: 1,
            },
            markUnitChange: false,
            renderer: am5xy.AxisRendererX.new(root, {}),
        }));
        xAxis.data.setAll(data);

        // X축 날짜 형식 설정
        xAxis.get("dateFormats")["day"] = "MM.dd";
        
        // X축 렌더러 설정
        let xRenderer = xAxis.get("renderer");
        xRenderer.labels.template.setAll({
            height: 2,
            fill: am5.color(0xf9f9f9),
            fontSize: 0,
        });
        xRenderer.grid.template.setAll({
            forceHidden: true,
        });
        
        // Y축 생성
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 1,
            renderer: am5xy.AxisRendererY.new(root, {}),
            
        }));
        
        // Y축 렌더러 설정
        let yRenderer = yAxis.get("renderer");
        yRenderer.labels.template.setAll({
            forceHidden: true,
        });

        // 커서 설정 _ 설정은 되어있어야만 툴팁이 나옴
        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);
        cursor.lineX.set("visible", false);

        // 시리즈 생성 함수
        function createSeries(name, field, color) {
            // 시리즈 생성
            let series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
                name: name,
                minBulletDistance: 10,
                tension: 0.6,
                connect: true,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: field,
                valueXField: "date",
                stroke: color,
                fill: color,
                tooltip: am5.Tooltip.new(root, {
                    labelText: "{name} : {valueY}건",
                }),
            }));
            
            // 시리즈 스트로크 설정
            series.strokes.template.setAll({
                strokeWidth: 2,
                visible: true,
            });
            
            // 불릿 설정
            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    sprite: am5.Circle.new(root, {
                        radius: 5,
                        fill: color,
                    }),
                });
            });
            
            // 데이터 프로세서 설정
            series.data.processor = am5.DataProcessor.new(root, {
                dateFormat: "MM.dd",
                dateFields: ["date"],
            });
            
            // 데이터 설정
            series.data.setAll(data);
            series.appear(1000);
            
            return series;
        }
        
        // 3개의 시리즈 생성
        const diplomacySeries = createSeries("뉴스", "뉴스", seriesColors["뉴스"]);
        const securitySeries = createSeries("트위터", "트위터", seriesColors["트위터"]);
        const economySeries = createSeries("블로그", "블로그", seriesColors["블로그"]);
        
        // 애니메이션 효과
        chart.series.each(function(series) {
            series.appear(1000, 100);
        });
        
        chart.appear(1000, 100);
    }
}

/* 연관어 차트 초기화 함수 */
function initRelatedChart() {

    // 차트 요소 존재 확인 - chart8 ID 사용
    const chartDiv = document.getElementById("chart8");
    if (!chartDiv) { return; }
        
    // 차트가 이미 존재하는 경우 삭제 (메모리 누수 방지)
    if (chartDiv._chart) { chartDiv._chart.dispose(); }
        
    // Root 엘리먼트 생성
    let root = am5.Root.new(chartDiv);

    // 차트 로고 제거
    root._logo.dispose();

    // 차트 테마 설정
    root.setThemes([am5themes_Animated.new(root)]);
        
    // 차트 참조 저장 (재사용 목적)
    chartDiv._chart = root;
            
    // 차트 생성 - 수평 레이아웃으로 차트와 범례 배치
    const chart = root.container.children.push(
        am5.Container.new(root, {
            width: am5.percent(100),
            height: am5.percent(100),
            layout: root.horizontalLayout
        })
    );
         
    // 워드 클라우드 컨테이너 생성
    const wordCloudContainer = chart.children.push(
        am5.Container.new(root, {
            width: am5.percent(100),
            height: am5.percent(100),
            layout: root.horizontalLayout
        })
    );
        
    // 범례 컨테이너 생성
    const legendContainer = chart.children.push(
        am5.Container.new(root, {
            width: am5.percent(20),
            height: am5.percent(100),
            layout: root.verticalLayout,
        })
    );

    // 카테고리 색상 정의
    const categoryColors = {
        "조직/빌딩": am5.color(0x6424AC),
        "지역/장소": am5.color(0xBD26C9),
        "학문/분야": am5.color(0xE729B5),
        "문화/예술": am5.color(0x3245DB),
    };
        
    // 단어 데이터를 배열로 관리
    const wordData = [
        { tag: "북한", value: 100, category: "조직/빌딩" },
        { tag: "유엔", value: 80, category: "조직/빌딩" },
        { tag: "안보리", value: 40, category: "조직/빌딩" },
        { tag: "미사일", value: 35, category: "조직/빌딩" },
        { tag: "안보실장", value: 28, category: "조직/빌딩" },
        { tag: "외교장관", value: 60, category: "조직/빌딩" },
        
        { tag: "전투기", value: 38, category: "지역/장소" },
        { tag: "탄도미사일", value: 12, category: "지역/장소" },
        { tag: "행사", value: 20, category: "지역/장소" },
        { tag: "한반도", value: 40, category: "지역/장소" },
        
        { tag: "함참의장", value: 37, category: "학문/분야" },
        { tag: "후미오", value: 30, category: "학문/분야" },
        { tag: "중거리탄도", value: 32, category: "학문/분야" },
        { tag: "한미", value: 90, category: "학문/분야" },
        { tag: "방위", value: 60, category: "학문/분야" },
        { tag: "중거리", value: 30, category: "학문/분야" },
        { tag: "속보", value: 3, category: "학문/분야" },
        
        { tag: "공조", value: 2, category: "문화/예술" },
        { tag: "뉴스", value: 10, category: "문화/예술" },
        { tag: "일본", value: 8, category: "문화/예술" },
        { tag: "대량살상무기", value: 4, category: "문화/예술" },
        { tag: "위반", value: 4, category: "문화/예술" },
        { tag: "NCS", value: 4, category: "문화/예술" },
        { tag: "주제", value: 58, category: "문화/예술" },
        { tag: "한미동맹", value: 4, category: "문화/예술" },
    ];
        
    // 데이터 전처리
    const processedData = [];
    wordData.forEach(item => {
        if (!item || !item.tag || !item.value) return;
        
        // 값이 유효한지 확인
        if (isNaN(item.value) || item.value <= 0) {
            return;
        }
        
        const color = categoryColors[item.category] || categoryColors.default;
        
        processedData.push({
            category: item.category,
            tag: item.tag,
            weight: item.value,
            color: color,
        });
    });
        
    // 워드 클라우드 시리즈 생성
    const series = wordCloudContainer.children.push(
        am5wc.WordCloud.new(root, {
            labelField: "category",
            categoryField: "tag",
            valueField: "weight",
            minFontSize: am5.percent(10),
            maxFontSize: am5.percent(50),
            minWordLength: 2,
            randomness: 0.1,
            // angles: [0]
        })
    );
 
    // 라벨 스타일 설정
    series.labels.template.setAll({
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        fontFamily: "Noto Sans KR, sans-serif",
        cursorOverStyle: "pointer",
        tooltipText: "{tag}[{category}]: {weight}"
    });
        
    // 색상 설정
    series.labels.template.adapters.add("fill", function(fill, target) {
        if (target.dataItem && target.dataItem.dataContext) {
            return target.dataItem.dataContext.color || categoryColors.default;
        }
        return fill;
    });
        
    // 데이터 설정
    series.data.setAll(processedData);
    
    // 범례 생성
    const legend = legendContainer.children.push(
        am5.Legend.new(root, {
            nameField: "name",
            fillField: "color",
            strokeField: "color",
            width: am5.percent(100),
            height: am5.percent(100),
            centerX: am5.percent(100),
            centerY: am5.percent(100),
            x: am5.percent(100),
            y: am5.percent(100),
            layout: root.verticalLayout,
            paddingLeft: 10,
        })
    );
        
    // 범례 마커 설정
    legend.markers.template.setAll({
        width: 12,
        height: 12,
    });
    legend.markerRectangles.template.setAll({
        cornerRadiusTL: 10,
        cornerRadiusTR: 10,
        cornerRadiusBL: 10,
        cornerRadiusBR: 10,
    });
    
    // 범례 항목 스타일 설정
    legend.labels.template.setAll({
        fontSize: 14,
        fontWeight: "400",
        textAlign: "left",
        width: 100,
        x: 22,
        fill: am5.color(0x555555),
    });
    
    // 범례 항목 컨테이너 스타일
    legend.itemContainers.template.setAll({
        cursorOverStyle: "pointer"
    });
        
    // 범례 데이터 생성
    const legendData = Object.entries(categoryColors)
        .filter(([category]) => category !== "default")
        .map(([category, color]) => {
            return {
                name: category,
                color: color,
                category: category,
                isActive: true,
            };
        });
    
    // 범례 데이터 설정
    legend.data.setAll(legendData);
    // legend.appear(1000, 100);
}

/* 숫자 카운트업 애니메이션 함수 */
function countUp(element) {
    // 요소의 타겟 숫자 가져오기
    const targetNumber = parseInt(element.textContent.replace(/,/g, ''));
    let startNumber = 0;
    
    // 시작 시간
    let startTime = null;
    const duration = 2000; // 애니메이션 지속 시간 (ms)
    
    // 애니메이션 함수
    function animateNumber(timestamp) {
        if (!startTime) startTime = timestamp;
        
        // 경과 시간 계산
        const elapsedTime = timestamp - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // easing 함수 (swing 효과)
        const easedProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
        
        // 현재 숫자 계산
        const currentNumber = Math.ceil(easedProgress * targetNumber);
        
        // 숫자 포맷팅 (천 단위 콤마)
        element.textContent = currentNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        // 애니메이션 완료 체크
        if (progress < 1) {
            requestAnimationFrame(animateNumber);
        }
    }
    
    // 애니메이션 시작
    requestAnimationFrame(animateNumber);
    
    // 애니메이션 실행 표시
    element.dataset.animated = 'true';
}

/* 숫자 증가 애니메이션 관찰 */
function setupCountUpObserver() {
    const options = {
        root: null, // 뷰포트를 기준으로 함
        rootMargin: '10px',
        threshold: 1 // 100% 이상 보일 때 실행
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // 요소가 화면에 보이고, 아직 애니메이션이 실행되지 않았을 때
            if (entry.isIntersecting && entry.target.dataset.animated !== 'true') {
                countUp(entry.target);
                
                // 선택적: 한 번만 실행하려면 관찰 중단
                // observer.unobserve(entry.target);
            }
            // 선택적: 요소가 화면에서 사라질 때 애니메이션 초기화 (다시 보일 때 재실행하려면)
            else if (!entry.isIntersecting) {
                entry.target.dataset.animated = 'false';
            }
        });
    }, options);
    
    // 모든 .number 요소 관찰 시작
    document.querySelectorAll('.number').forEach(element => {
        observer.observe(element);
    });
}