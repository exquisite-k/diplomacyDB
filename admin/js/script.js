/* DOM이 완전히 로드된 후 스크립트 실행 */
document.addEventListener('DOMContentLoaded', function() {
    /* [수정] - 브라우저 사이즈 정보 추적 */
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;


    /* ##### 데이터 정의 ##### */
    // 일간 차트 데이터 정의
    const dailyData = [
        {
            country: "일반",
            value: 1901,
            color: am5.color(0x0B468B),
        },
        {
            country: "비밀",
            value: 731,
            color: am5.color(0x487FEE),
        },
        {
            country: "뉴스",
            value: 3084,
            color: am5.color(0x43E2C3),
        },
        {
            country: "해외",
            value: 2815,
            color: am5.color(0x38CFF2),
        },
        {
            country: "SNS",
            value: 5425,
            color: am5.color(0xAB82E8),
        },
        {
            country: "그외",
            value: 3681,
            color: am5.color(0xFFB74D),
        },
    ];
    
    // 내부 차트 데이터 정의
    const internalData = [
        {
            category: "일반",
            value: 1901,
            color: am5.color(0x0B468B),
        },
        {
            category: "비밀",
            value: 640,
            color: am5.color(0x487FEE),
        },
    ];
    
    // 외부 차트 데이터 정의
    const externalData = [
        {
            category: "뉴스",
            value: 5550,
            color: am5.color(0x38CFF1),
        },
        {
            category: "해외",
            value: 4320,
            color: am5.color(0x43E1C3),
        },
        {
            category: "SNS",
            value: 12350,
            color: am5.color(0xAB82E8),
        },
        
        {
            category: "그외",
            value: 1203,
            color: am5.color(0xFFB74D),
        },
    ];

    // 로그인 통계 데이터 생성
    const loginData = [
        { day: 1, value: 97, },
        { day: 2, value: 105, },
        { day: 3, value: 113, },
        { day: 4, value: 67, },
        { day: 5, value: 32, },
        { day: 6, value: 77, },
        { day: 7, value: 151, },
        { day: 8, value: 138, },
        { day: 9, value: 120, },
        { day: 10, value: 177, },
        { day: 11, value: 215, },
        { day: 12, value: 186, },
        { day: 13, value: 118, },
        { day: 14, value: 103, },
        { day: 15, value: 97, },
        { day: 16, value: 162, },
        { day: 17, value: 212, },
        { day: 18, value: 194, },
        { day: 19, value: 187, },
        { day: 20, value: 261, },
        { day: 21, value: 325, },
        { day: 22, value: 330, },
        { day: 23, value: 337, },
        { day: 24, value: 342, },
        { day: 25, value: 349, },
        { day: 26, value: 327, },
        { day: 27, value: 315, },
        { day: 28, value: 304, },
        { day: 29, value: 347, },
        { day: 30, value: 367, },
    ];

    // AI별 사용통계 데이터 생성
    const aiUsageData = [
        { title: "문서작성", value: 164, },
        { title: "검색", value: 257, },
        { title: "요약", value: 89, },
        { title: "번역", value: 244, },
    ];

    // 페이지별 이용량 데이터 생성
    const pageUsageData = [
        { title: "고객지원", value: 31 },
        { title: "AI 도우미", value: 754 },
        { title: "외교 인사 분석", value: 375 },
        { title: "이슈 브리핑", value: 414 },
    ];

    // 통계 데이터 정의
    const statisticsData = [
        {
            title: "번역",
            stats: [
                { label: "응답수", value: "244건" },
                { label: "평균속도", value: "0.5s" }
            ],
            lastUpdateDate: "2025.09.25."
        },
        {
            title: "요약",
            stats: [
                { label: "응답수", value: "89건" },
                { label: "평균속도", value: "1s" }
            ],
            lastUpdateDate: "2025.09.25."
        },
        {
            title: "검색",
            stats: [
                { label: "응답수", value: "257건" },
                { label: "평균속도", value: "0.3s" }
            ],
            lastUpdateDate: "2025.09.25."
        },
        {
            title: "문서작성",
            stats: [
                { label: "응답수", value: "164건" },
                { label: "평균속도", value: "0.35s" }
            ],
            lastUpdateDate: "2025.09.25."
        }
    ];

    // 추가 생성 될될 통계 데이터 정의
    const statisticsAddData = [
        {
            title: "추가내용01",
            stats: [
                { label: "응답수", value: "244건" },
                { label: "평균속도", value: "0.5s" }
            ],
            lastUpdateDate: "2025.09.25."
        },
        {
            title: "추가내용02",
            stats: [
                { label: "응답수", value: "89건" },
                { label: "평균속도", value: "1s" }
            ],
            lastUpdateDate: "2025.09.25."
        },
        {
            title: "추가내용03",
            stats: [
                { label: "응답수", value: "257건" },
                { label: "평균속도", value: "0.3s" }
            ],
            lastUpdateDate: "2025.09.25."
        },
        {
            title: "추가내용04",
            stats: [
                { label: "응답수", value: "164건" },
                { label: "평균속도", value: "0.35s" }
            ],
            lastUpdateDate: "2025.09.25."
        },
        {
            title: "추가내용05",
            stats: [
                { label: "응답수", value: "244건" },
                { label: "평균속도", value: "0.5s" }
            ],
            lastUpdateDate: "2025.09.25."
        },
        {
            title: "추가내용06",
            stats: [
                { label: "응답수", value: "89건" },
                { label: "평균속도", value: "1s" }
            ],
            lastUpdateDate: "2025.09.25."
        },
        {
            title: "추가내용07",
            stats: [
                { label: "응답수", value: "257건" },
                { label: "평균속도", value: "0.3s" }
            ],
            lastUpdateDate: "2025.09.25."
        },
        {
            title: "추가내용08",
            stats: [
                { label: "응답수", value: "164건" },
                { label: "평균속도", value: "0.35s" }
            ],
            lastUpdateDate: "2025.09.25."
        },
        {
            title: "추가내용09",
            stats: [
                { label: "응답수", value: "89건" },
                { label: "평균속도", value: "1s" }
            ],
            lastUpdateDate: "2025.09.25."
        },
        {
            title: "추가내용10",
            stats: [
                { label: "응답수", value: "257건" },
                { label: "평균속도", value: "0.3s" }
            ],
            lastUpdateDate: "2025.09.25."
        },
        {
            title: "추가내용11",
            stats: [
                { label: "응답수", value: "164건" },
                { label: "평균속도", value: "0.35s" }
            ],
            lastUpdateDate: "2025.09.25."
        }
    ];

    
    /* ##### 차트 생성 ##### */
    // 일간 차트 생성
    createDailyLineChart("daily-line-chart", dailyData);
    
    // 내부 파이 차트 생성
    createPieChart("internal-pie-chart", internalData);
    
    // 외부 파이 차트 생성
    createPieChart("external-pie-chart", externalData);

    // AI별 사용통계 가로 바 차트 생성
    createHorizontalBarChart("ai-usage-chart", aiUsageData);
    
    // 페이지별 이용량 가로 바 차트 생성
    createHorizontalBarChart("page-usage-chart", pageUsageData);

    // 로그인 라인 차트 생성
    createLoginLineChart("login-chart", loginData);


    /* ##### 기타 생성 ##### */
    // 원형 프로그레스 차트 생성
    createCircleProgressCharts();
    
    // 통계 데이터 렌더링
    renderStatisticsItems(statisticsData);
    
    // 더보기 버튼 이벤트 설정
    setupMoreButton(statisticsData, statisticsAddData);
    
    // 메인 네비게이션 활성화 설정
    setupMainNavigation();


    /* ##### 기타 ##### */
    // 데이터 관리 함수를 전역으로 노출
    window.addStatisticsItem = (title, stats, lastUpdateDate) => {
        const newItem = { title, stats, lastUpdateDate };
        statisticsData.push(newItem);
        renderStatisticsItems(statisticsData);
        return statisticsData;
    };
    window.updateStatisticsItem = (index, newData) => {
        if (index >= 0 && index < statisticsData.length) {
            Object.assign(statisticsData[index], newData);
            renderStatisticsItems(statisticsData);
        }
        return statisticsData;
    };
    window.getStatisticsData = () => {
        return [...statisticsData]; // 복사본 반환
    };
    
    /* 창 크기 변경 시 차트 반응형 처리 */
    window.addEventListener('resize', function() {
        // 차트 사이즈 리셋을 위한 타이머 설정
        if (this.resizeTimer) clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(function() {
            // 모든 amCharts 루트 요소에 접근하여 크기 조정
            am5.array.each(am5.registry.rootElements, function(root) {
                root.resize();
            });
            
            // 원형 프로그레스 바 크기 조정
            document.querySelectorAll('.circle-progress').forEach(element => {
                if (element.progressInstance) {
                    element.progressInstance.resize();
                }
            });
        }, 200);
    });
});

/* ########## amchart 생성 ########## */
/**
    * 차트 아이디, 데이터 배열을 인자로 받아 차트 생성
    * @param {string} elementId - 차트를 생성할 요소의 ID
    * @param {Array} data - 차트에 표시할 데이터 배열
*/
/* 세로 바(일간) 차트 생성 함수 */
function createDailyLineChart(elementId, data) {
    // amCharts 5 루트 요소 생성
    let root = am5.Root.new(elementId);
    root._logo.dispose();
  
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);
  
    // Create chart
    let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "none",
            wheelY: "none",
            pinchZoomX: false,
            pinchZoomY: false,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
        })
    );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("visible", false);
    cursor.lineY.set("visible", false);
  
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
        minGridDistance: 10,
    });
    xRenderer.labels.template.setAll({
        paddingTop: 16,
        paddingBottom: 16,
        fontSize: 18,
    });
    xRenderer.grid.template.setAll({visible: false,});
    let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.3,
            categoryField: "country",
            renderer: xRenderer,
        })
    );
    let yRenderer = am5xy.AxisRendererY.new(root, {});
    yRenderer.labels.template.setAll({visible: false,});
    yRenderer.grid.template.setAll({visible: false,});
    let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
            maxDeviation: 0.3,
            renderer: yRenderer,
        })
    );
  
    // Create series
    let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            sequencedInterpolation: true,
            categoryXField: "country",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}",
            }),
        })
    );
    series.columns.template.setAll({
        width: am5.percent(70),
        cornerRadiusTL: am5.percent(20),
        cornerRadiusTR: am5.percent(20),
        cornerRadiusBL: am5.percent(0),
        cornerRadiusBR: am5.percent(0),
    });
    
    // 데이터의 color 속성을 사용하도록 어댑터 수정
    series.columns.template.adapters.add("fill", function (fill, target) {
        let dataItem = target.dataItem;
        if (dataItem && dataItem.dataContext) {
            return dataItem.dataContext.color;
        }
        return fill;
    });
    series.columns.template.adapters.add("stroke", function (stroke, target) {
        let dataItem = target.dataItem;
        if (dataItem && dataItem.dataContext) {
            return dataItem.dataContext.color;
        }
        return stroke;
    });
    
    // 차트 내부에 값 표시
    // series.bullets.push(function () {
    //     return am5.Bullet.new(root, {
    //         locationY: 0.5,
    //         sprite: am5.Label.new(root, {
    //             text: "{valueY}",
    //             fill: root.interfaceColors.get("alternativeText"),
    //             centerX: am5.p50,
    //             centerY: am5.p50,
    //             populateText: true,
    //         }),
    //     });
    // });
  
    xAxis.data.setAll(data);
    series.data.setAll(data);
  
    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);
}

/* 파이 차트(내부, 외부) 생성 함수 */
function createPieChart(elementId, data) {
    // amCharts 5 루트 요소 생성
    let root = am5.Root.new(elementId);
    root._logo.dispose();
    
    // 애니메이션 테마 설정
    root.setThemes([
        am5themes_Animated.new(root)
    ]);
    
    /* 모바일 대응 반응형 패딩 설정 */
    let isMobile = window.innerWidth < 768;
    
    // 메인 컨테이너 생성 (수평 레이아웃)
    let mainContainer = root.container.children.push(
        am5.Container.new(root, {
            width: am5.percent(100),
            height: am5.percent(100),
            layout: root.horizontalLayout,
        })
    );
    
    // 차트 생성 (오른쪽에 배치)
    let chart = mainContainer.children.push(
        am5percent.PieChart.new(root, {
            width: am5.percent(50),
            radius: am5.percent(90),
            centerX: am5.percent(80),
            centerY: am5.percent(50),
            x: am5.percent(90),
            y: am5.percent(50),
            layout: root.horizontalLayout,
        })
    );
  
    // 시리즈 생성
    let series = chart.series.push(
        am5percent.PieSeries.new(root, {
            valueField: "value",
            categoryField: "category",
            alignLabels: false,
            legendValueText: "{valueY}",
        })
    );
    
    // 슬라이스 설정
    series.slices.template.setAll({
        strokeWidth: 0,
        stroke: am5.color(0xffffff),
        strokeOpacity: 0,
        tooltipText: "{category}: {value}"
    });
    
    // 색상 설정을 위한 어댑터
    series.slices.template.adapters.add("fill", function(fill, target) {
        let dataItem = target.dataItem;
        if (dataItem) {
            return dataItem.dataContext.color;
        }
        return fill;
    });

    // 라벨 설정
    series.labels.template.setAll({
        text: "[#fff][fontSize:16][fontWeight:600]{value}",
        inside: true,
        radius: 40,
    });

    // 라벨 연결선 제거
    series.ticks.template.setAll({
        stroke: am5.color(0xffffff),
        strokeWidth: 0,
        strokeOpacity: 0,
    });
    series.ticks.template.set("visible", false);

    // 범례 생성 (좌측에 배치)
    let legend = mainContainer.children.push(
        am5.Legend.new(root, {
            width: am5.percent(30),
            x: am5.percent(0),
            y: am5.percent(100),
            centerX: am5.percent(0),
            centerY: am5.percent(100),
            marginRight: 15,
            layout: am5.GridLayout.new(root, {
                maxColumns: 2,
                fixedWidthGrid: true
            }),
        })
    );
    
    // 범례 폰트 크기 설정
    legend.labels.template.setAll({
        fontSize: 16,
        fontWeight: "400"
    });

    // 범례 마커 모서리 둥글게 설정
    legend.markerRectangles.template.setAll({
        width: 10,
        height: 10,
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        x: am5.percent(50),
        y: am5.percent(50),
        cornerRadiusTL: 10,
        cornerRadiusTR: 10,
        cornerRadiusBL: 10,
        cornerRadiusBR: 10,
    });

    // 범례 간격 제거
    legend.valueLabels.template.set("forceHidden", true);
    
  
    // 데이터 설정
    series.data.setAll(data);
    
    // 범례와 시리즈 연결
    legend.data.setAll(series.dataItems);
    
    // 애니메이션 설정
    series.appear(1000, 100);
    legend.appear(1000, 100);
}

/* 라인(로그인 통계) 차트 생성 함수 */
function createLoginLineChart(elementId, data) {
    // amCharts 5 루트 요소 생성
    let root = am5.Root.new(elementId);
    root._logo.dispose();
    
    // 애니메이션 테마 설정
    root.setThemes([
        am5themes_Animated.new(root)
    ]);
    
    // 차트 생성
    let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "none",
            wheelY: "none",
            pinchZoomX: false,
            pinchZoomY: false,
            layout: root.verticalLayout,
            paddingBottom: 0,
            paddingTop: 10,
            paddingLeft: 0,
            paddingRight: 0,
        })
    );

    let xRenderer = am5xy.AxisRendererX.new(root, {
        minGridDistance: 20,
    });
    xRenderer.grid.template.setAll({visible: false,});
    xRenderer.labels.template.setAll({
        fontSize: 12,
        step: 0.1,
    });
    let yRenderer = am5xy.AxisRendererY.new(root, {
        minGridDistance: 50,
    });
    yRenderer.labels.template.setAll({
        fontSize: 12,
        step: 1,
        paddingRight: 8,
    });

    // X축 생성
    let xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
            maxDeviation: 1,
            min: 1,
            max: 31,
            strictMinMax: true,
            renderer: xRenderer,
        })
    );
    
    // Y축 생성
    let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
            maxDeviation: 1,
            extraMax: 0.01,
            min: 0,
            max: 400,
            strictMinMax: true,
            renderer: yRenderer,
        })
    );
    
    // 단일 컬러 설정
    let color = am5.color(0x1B5292);

    // 툴팁 설정
    let tooltip = am5.Tooltip.new(root, {
        getFillFromSprite: false,
        autoTextColor: false,
        labelText: "{valueX}일 {valueY}회",
    });
    tooltip.label.setAll({
        fontSize: 14,
        fill: am5.color(0xffffff),
    });
    tooltip.get("background").setAll({
        fill: color,
        fillOpacity: 0.8,
    });

    // 시리즈 생성
    let series = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
            tension: 0.3,
            connect: true,
            name: "로그인 수",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "day",
            minDistance: 10,
            tooltip: tooltip,
        })
    );

    // 차트 컬러 설정
    let rangeDataItem = yAxis.makeDataItem({});
    let range = series.createAxisRange(rangeDataItem);
    range.strokes.template.setAll({
        stroke: color,
    });
    
    // 선 스타일 설정
    series.strokes.template.setAll({
        stroke: am5.color(0x000000),
        strokeWidth: 2,
    });
    
    // 커서 설정
    chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "none",
        xAxis: xAxis,
        yAxis: yAxis,
    }));
    
    // 데이터 설정
    series.data.setAll(data);

    // 툴팁 설정
    series.set("tooltip", tooltip);
    
    // 애니메이션 설정
    series.appear(1000, 100);
}

/* 가로 바(AI별 사용통계, 페이지별 이용량) 차트 생성 함수 */
function createHorizontalBarChart(elementId, data) {
    // Create root element
    let root = am5.Root.new(elementId);
    root._logo.dispose();

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "none",
            wheelY: "none",
            pinchZoomX: false,
            pinchZoomY: false,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
        })
    );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("visible", false);
    cursor.lineY.set("visible", false);

    // 단일 컬러 설정
    chart.set("colors",
        am5.ColorSet.new(root, {
            colors: [am5.color(0x487FEE)],
        })
    );

    // Create Renderer
    let xRenderer = am5xy.AxisRendererX.new(root, {
        minGridDistance: 10,
    });
    xRenderer.grid.template.setAll({visible: false,});

    let yRenderer = am5xy.AxisRendererY.new(root, {
        minorGridEnabled: false,
    });
    yRenderer.labels.template.setAll({
        fontSize: 14,
        oversizedBehavior: "wrap",
        maxWidth: 70,
        textAlign: "right",
    });
    yRenderer.grid.template.setAll({visible: false,});

    // Create axes
    let yAxis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.3,
            paddingLeft: 0,
            paddingRight: 10,
            categoryField: "title",
            renderer: yRenderer,
        })
    );
    let xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
            maxDeviation: 0,
            min: 0,
            renderer: xRenderer,
            forceHidden: true,
        })
    );

    // Create series
    let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            valueXField: "value",
            sequencedInterpolation: true,
            categoryYField: "title",
            tooltip: am5.Tooltip.new(root, {
                labelText: "[fontSize:14px]{title}: {value}",
            }),
        })
    );
    series.columns.template.setAll({
        height: am5.percent(50),
        cornerRadiusTL: 0,
        cornerRadiusTR: 4,
        cornerRadiusBL: 0,
        cornerRadiusBR: 4,
    });

    yAxis.data.setAll(data);
    series.data.setAll(data);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
};



/* ########## 원형 프로그레스 바 차트 생성 ########## */
/* [수정] - Swift에서 변환된 원형 프로그레스 바 클래스 추가 */
class CircularProgressBar {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        // 기본 옵션 설정
        this.options = {
            lineWidth: options.lineWidth || 3,
            color: options.color || '#0B468B',
            backgroundColor: options.backgroundColor || '#f1f1f1',
            textColor: options.textColor || '#000000',
            fontSize: options.fontSize || 16,
            value: options.value || 0,
            radius: options.radius || 0,
            showText: options.showText !== undefined ? options.showText : true
        };
        // 캔버스 크기 설정
        this.resize();
        // 초기 그리기
        this.draw();
    }
    // 크기 조정 메서드
    resize() {
        // 캔버스의 실제 크기를 설정
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        // 반지름 계산 (기본값이 0이면 캔버스 크기에 맞춤)
        if (!this.options.radius) {
            this.options.radius = Math.min(this.canvas.width, this.canvas.height) / 2 - this.options.lineWidth;
        }
        // 다시 그리기
        this.draw();
    }
    // 값 설정 메서드
    setValue(value) {
        if (value < 0) value = 0;
        if (value > 1) value = 1;
        this.options.value = value;
        this.draw();
    }
    // 그리기 메서드
    draw() {
        const ctx = this.ctx;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = this.options.radius;
        // 캔버스 초기화
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // 배경 원 그리기
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.lineWidth = this.options.lineWidth;
        ctx.strokeStyle = this.options.backgroundColor;
        ctx.stroke();
        // 프로그레스 원 그리기 (값이 0보다 클 때만)
        if (this.options.value > 0) {
            ctx.beginPath();
            // -Math.PI/2는 12시 방향에서 시작하기 위함
            ctx.arc(
                centerX, 
                centerY, 
                radius, 
                -Math.PI / 2, 
                -Math.PI / 2 + (Math.PI * 2 * this.options.value)
            );
            ctx.lineWidth = this.options.lineWidth;
            ctx.strokeStyle = this.options.color;
            ctx.lineCap = 'round';
            ctx.stroke();
        }
        // 텍스트 표시 (옵션으로 설정된 경우)
        if (this.options.showText) {
            const percentage = Math.round(this.options.value * 100);
            ctx.font = `${this.options.fontSize}px Arial`;
            ctx.fillStyle = this.options.textColor;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${percentage}%`, centerX, centerY);
        }
    }
}

/**
 * 원형 프로그레스 차트 생성 함수
 * [수정] - amCharts 대신 Canvas 기반 원형 프로그레스 바 사용
 */
function createCircleProgressCharts() {
    // Canvas 기반 원형 프로그레스 차트 생성
    createCanvasCircleProgress("cpu-usage", 0.7, "#0B468B", "CPU 사용률", "70%");
    createCanvasCircleProgress("network-traffic", 0.3, "#00BFA5", "네트워크 트래픽", "30%");
    createCanvasCircleProgress("dr-backup", 0.8, "#FDD835", "DR 백업", "01:52");
    createCanvasCircleProgress("system-status", 1.0, "#FF8A65", "장애 발생 여부", "정상");
}

/**
    * Canvas 기반 원형 프로그레스 차트 생성 함수
    * [수정] - Swift 코드를 JS로 변환하여 구현
    * @param {string} elementId - 차트가 생성될 HTML 요소의 ID
    * @param {number} value - 표시할 값 (0-1 사이)
    * @param {string} color - 프로그레스 바 색상 (CSS 색상 문자열)
    * @param {string} labelText - 라벨 텍스트
    * @param {string} valueText - 값 텍스트
*/
function createCanvasCircleProgress(elementId, value, color, labelText, valueText) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // 기존 내용 비우기
    element.innerHTML = '';
    
    // canvas 요소 생성
    const canvas = document.createElement('canvas');
    canvas.id = `${elementId}-canvas`;
    let size = 230;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    element.appendChild(canvas);
    
    // 프로그레스 바 인스턴스 생성
    const progressBar = new CircularProgressBar(canvas.id, {
        lineWidth: 20,
        color: color,
        backgroundColor: `${color}1c`, // 11% 투명도
        value: value,
        showText: false,
    });
    
    // 프로그레스 인스턴스 저장
    element.progressInstance = progressBar;
    
    // 텍스트 요소 추가
    const textContainer = document.createElement('p');
    textContainer.className = 'progress-text';
    
    const labelSpan = document.createElement('span');
    labelSpan.className = 'label';
    labelSpan.textContent = labelText;
    
    const valueSpan = document.createElement('span');
    valueSpan.className = 'value';
    valueSpan.textContent = valueText;
    
    textContainer.appendChild(labelSpan);
    textContainer.appendChild(valueSpan);
    element.appendChild(textContainer);
}

/* ########## 통계 아이템 생성 ########## */
/* 통계 아이템을 동적으로 생성하는 함수 */
function renderStatisticsItems(data) {
    const statisticsWrapper = document.querySelector('.statistics-wrapper');
    
    // 기존 내용 비우기
    if (statisticsWrapper) {
        statisticsWrapper.innerHTML = '';
        
        // 각 통계 데이터로 HTML 생성
        data.forEach(item => {
            const statsItemHTML = `
                <li class="statistics-item">
                    <h3 class="cont-title">${item.title}</h3>
                    <div class="statistics-content">
                        ${item.stats.map((stat, index, array) => `
                            <p class="stats-item">
                                <span class="label">${stat.label}</span>
                                <span class="value">${stat.value}</span>
                            </p>
                            ${index < array.length - 1 ? '<div class="stats-divider"></div>' : ''}
                        `).join('')}
                    </div>
                    <p class="stats-date">
                        <span>마지막 학습일시</span>
                        <span>${item.lastUpdateDate}</span>
                    </p>
                </li>
            `;
            
            statisticsWrapper.innerHTML += statsItemHTML;
        });
    }
}

/* 더보기 버튼 설정 함수 */
function setupMoreButton(originalData, additionalData) {
    const moreBtn = document.querySelector('.more-btn');
    if (!moreBtn) return;
    
    moreBtn.addEventListener('click', function() {
        // active 클래스 토글
        this.classList.toggle('active');
        
        // 기존 추가 통계 요소 찾기
        const additionalWrapper = document.querySelector('.statistics-wrapper.additional');
        
        // active 상태에 따른 처리
        if (this.classList.contains('active')) {
            // active 상태: 추가 통계 요소 생성
            if (!additionalWrapper) {
                const statisticsContainer = document.querySelector('.statistics-container article.container');
                if (statisticsContainer) {
                    // 새로운 statistics-wrapper 생성
                    const newWrapper = document.createElement('ul');
                    newWrapper.className = 'statistics-wrapper additional';
                    
                    // 원래 요소 뒤에 추가
                    const originalWrapper = document.querySelector('.statistics-wrapper:not(.additional)');
                    if (originalWrapper && originalWrapper.nextSibling) {
                        statisticsContainer.insertBefore(newWrapper, originalWrapper.nextSibling);
                    } else {
                        statisticsContainer.appendChild(newWrapper);
                    }
                    
                    // 내용 생성
                    additionalData.forEach(item => {
                        const statsItemHTML = `
                            <li class="statistics-item">
                                <h3 class="cont-title">${item.title}</h3>
                                <div class="statistics-content">
                                    ${item.stats.map((stat, index, array) => `
                                        <p class="stats-item">
                                            <span class="label">${stat.label}</span>
                                            <span class="value">${stat.value}</span>
                                        </p>
                                        ${index < array.length - 1 ? '<div class="stats-divider"></div>' : ''}
                                    `).join('')}
                                </div>
                                <p class="stats-date">
                                    <span>마지막 학습일시</span>
                                    <span>${item.lastUpdateDate}</span>
                                </p>
                            </li>
                        `;
                        
                        newWrapper.innerHTML += statsItemHTML;
                    });
                }
            } else {
                // 이미 존재하면 표시
                additionalWrapper.style.display = 'grid';
            }
            
            // 버튼 텍스트 변경
            const btnTextSpan = this.querySelector('span');
            if (btnTextSpan) {
                btnTextSpan.textContent = '접기';
            }
        } else {
            // inactive 상태: 추가 통계 요소 제거
            if (additionalWrapper) {
                additionalWrapper.style.display = 'none';
            }
            
            // 버튼 텍스트 복원
            const btnTextSpan = this.querySelector('span');
            if (btnTextSpan) {
                btnTextSpan.textContent = '더보기';
            }
        }
    });
}

/* 메인 네비게이션 활성화 함수 */
function setupMainNavigation() {
    const mainNavItems = document.querySelectorAll('.main-nav-item');
    
    mainNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 이미 active 클래스가 있으면 아무 작업 하지 않음
            if (this.classList.contains('active')) {
                return;
            }
            
            // 다른 모든 메뉴 아이템에서 active 클래스 제거
            mainNavItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // 현재 클릭한 항목에만 active 클래스 추가
            this.classList.add('active');
        });
    });
}