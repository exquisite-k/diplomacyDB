/**
 * AI 분석 포털 차트 기능
 * - amChart5 라이브러리 활용
 * - 인물 관계도, 키워드 언급량, 언급어 차트
 * - 데이터 수집 현황 차트
 */

// DOM이 로드된 후 차트 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 인물 관계도 차트 초기화
    initPersonNetworkChart();

    // 키워드 언급량 차트 초기화
    initKeywordTrendChart();

    // 언급어 차트 초기화
    initKeywordMentionChart();

    // 데이터 수집 현황 차트 초기화
    initDataStatsCharts();
});

/**
 * 인물 관계도 차트 데이터
 * - 각 인물의 관계 정보
 */
const personNetworkData = {
    name: "트럼프 관련 인물",
    children: [
        {
            name: "도널드 트럼프",
            value: 100,
            role: "미국 전 대통령",
            children: [
                {
                    name: "블라디미르 푸틴",
                    value: 50,
                    role: "러시아 대통령",
                    linkStrength: "강함"
                }
            ]
        },
        {
            name: "시진핑",
            value: 80,
            role: "중국 국가주석",
            linkStrength: "중간"
        },
        {
            name: "윤석열",
            value: 60,
            role: "한국 대통령",
            linkStrength: "약함"
        },
        {
            name: "무역관세 이슈",
            value: 90,
            linkStrength: "강함"
        },
        {
            name: "노르드스트롬",
            value: 40,
            role: "유럽 회사",
            linkStrength: "약함"
        },
    ]
};

/**
    * 인물 관계도 차트 초기화 함수
    * - 포스 다이렉티드 그래프 사용
*/
function initPersonNetworkChart() {
    // 차트 영역 확인
    const chartDiv = document.getElementById('personNetworkChart');
    if (!chartDiv) return;

    // Root 생성
    const root = am5.Root.new(chartDiv);
    
    // 테마 설정
    root.setThemes([
        am5themes_Animated.new(root)
    ]);
  
    // 차트 생성
    const chart = root.container.children.push(
        am5.ForceDirected.new(root, {
            downDepth: 1,
            initialDepth: 2,
            valueField: "value",
            categoryField: "name",
            childDataField: "children",
            centerStrength: 0.5,
            minRadius: 20,
            maxRadius: 50,
            manyBodyStrength: -15,
            linkWithStrength: true,
        })
    );
  
    // 차트 데이터 적용
    chart.data.setAll([personNetworkData]);
    
    // 노드 템플릿 설정
    const nodeTemplate = chart.nodes.template;
    
    // 노드 스타일링
    nodeTemplate.set("tooltipText", "{name}: {role}");
    nodeTemplate.set("fillOpacity", 0.8);
    
    // 원형 불릿 스타일
    nodeTemplate.setAll({
        strokeWidth: 2,
        stroke: am5.color(0xffffff),
        fill: am5.color(0x0052cc),
    });
  
    // 텍스트 레이블 설정
    nodeTemplate.label.setAll({
        fontSize: 12,
        fill: am5.color(0x333333),
        text: "{name}",
        paddingLeft: 0,
        paddingRight: 0,
        centerX: am5.p50,
        centerY: am5.p100
    });
  
    // 링크 스타일
    chart.links.template.set("strokeWidth", 2);
    chart.links.template.set("strokeOpacity", 0.5);
}

/**
 * 키워드 언급량 추이 차트 데이터
 */
const keywordTrendData = [
    { date: "2023-12-01", 관세: 10, 무역: 5, 경제: 8 },
    { date: "2023-12-08", 관세: 12, 무역: 6, 경제: 9 },
    { date: "2023-12-15", 관세: 15, 무역: 8, 경제: 7 },
    { date: "2023-12-22", 관세: 18, 무역: 10, 경제: 10 },
    { date: "2023-12-29", 관세: 20, 무역: 12, 경제: 13 },
    { date: "2024-01-05", 관세: 25, 무역: 15, 경제: 16 },
    { date: "2024-01-12", 관세: 30, 무역: 18, 경제: 19 },
    { date: "2024-01-19", 관세: 35, 무역: 20, 경제: 20 }
];

/**
 * 키워드 언급량 차트 초기화 함수
 * - XY 차트 사용
 * - 라인 시리즈로 시간에 따른 추이 표시
 */
function initKeywordTrendChart() {
    // 차트 영역 확인
    const chartDiv = document.getElementById('keywordTrendChart');
    if (!chartDiv) return;

    // Root 생성
    const root = am5.Root.new(chartDiv);
    
    // 테마 설정
    root.setThemes([
        am5themes_Animated.new(root)
    ]);
    
    // 차트 생성
    const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout,
        })
    );
    
    // 데이터 생성
    chart.data.setAll(keywordTrendData);
    
    // X축 생성
    const xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
            categoryField: "date",
            renderer: am5xy.AxisRendererX.new(root, {}),
            tooltip: am5.Tooltip.new(root, {}),
        })
    );
    
    xAxis.data.setAll(keywordTrendData);
    
    // Y축 생성
    const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {}),
        })
    );
    
    // 시리즈 생성 함수
    function createSeries(name, field) {
        const series = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: field,
                categoryXField: "date",
                tooltip: am5.Tooltip.new(root, {
                    labelText: "{name}: {valueY}",
                }),
            })
        );
        
        series.strokes.template.setAll({
            strokeWidth: 2
        });
        
        series.data.setAll(keywordTrendData);
        
        return series;
    }
    
    // 각 키워드별 시리즈 생성
    createSeries("관세", "관세");
    createSeries("무역", "무역");
    createSeries("경제", "경제");
    
    // 범례 추가
    const legend = chart.children.push(
        am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50,
        })
    );
    
    legend.data.setAll(chart.series.values);
    
    // 차트 커서 추가
    chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "zoomX",
    }));
}

/**
    * 언급어 차트 데이터
*/
const mentionData = [
    { category: "관세", value: 30 },
    { category: "무역", value: 25 },
    { category: "미국", value: 20 },
    { category: "중국", value: 15 },
    { category: "경제", value: 12 },
    { category: "대통령", value: 10 },
    { category: "정책", value: 8 },
    { category: "대립", value: 7 },
    { category: "외교", value: 5 },
    { category: "통상", value: 4 }
];

/**
    * 언급어 차트 초기화 함수
    * - 레이더 차트 사용
*/
function initKeywordMentionChart() {
    // 차트 영역 확인
    const chartDiv = document.getElementById('keywordMentionChart');
    if (!chartDiv) return;

    // Root 생성
    const root = am5.Root.new(chartDiv);
    
    // 테마 설정
    root.setThemes([
        am5themes_Animated.new(root)
    ]);
    
    // 색상 설정
    const colors = {
        관세: "#0052cc",
        무역: "#005eff",
        미국: "#4d90fe",
        중국: "#8db9ff",
        경제: "#b3d1ff",
        대통령: "#ff6b6b",
        정책: "#ffa8a8",
        대립: "#ffd7d7",
        외교: "#69db7c",
        통상: "#a9e34b"
    };
    
    // 차트 생성 - 원형으로 단어 배치
    const container = root.container.children.push(
        am5.Container.new(root, {
            width: am5.percent(100),
            height: am5.percent(100),
            layout: root.horizontalLayout,
        })
    );
    
    // 데이터에 기반한 원형 배치
    const centerX = container.width() / 2;
    const centerY = container.height() / 2;
    const radius = Math.min(centerX, centerY) * 0.7;
    
    // 중앙 단어 추가
    container.children.push(
        am5.Circle.new(root, {
            radius: 60,
            fill: am5.color("#0052cc"),
            centerX: centerX,
            centerY: centerY,
            dx: 0,
            dy: 0,
        })
    );
    
    container.children.push(
        am5.Label.new(root, {
            text: "관세",
            fill: am5.color("#ffffff"),
            fontSize: 16,
            fontWeight: "bold",
            centerX: centerX,
            centerY: centerY,
            dx: 0,
            dy: 0,
        })
    );
    
    // 언급어 단어 추가
    mentionData.forEach((item, index) => {
        // 대략적인 원형 배치를 위한 각도 계산
        const angle = (index / mentionData.length) * Math.PI * 2;
        const bubbleRadius = (item.value / mentionData[0].value) * 30 + 15;
        
        // 위치 계산 (원형)
        let x = centerX + Math.cos(angle) * (radius - bubbleRadius * 1.2);
        let y = centerY + Math.sin(angle) * (radius - bubbleRadius * 1.2);
        
        // 선 그리기
        container.children.push(
            am5.Line.new(root, {
                stroke: am5.color("#cccccc"),
                strokeWidth: 1,
                strokeOpacity: 0.5,
                x1: centerX,
                y1: centerY,
                x2: x,
                y2: y,
            })
        );
        
        // 원 그리기
        container.children.push(
            am5.Circle.new(root, {
                radius: bubbleRadius,
                fill: colors[item.category] || am5.color("#999999"),
                centerX: 0,
                centerY: 0,
                dx: x,
                dy: y,
            })
        );
        
        // 텍스트 추가
        container.children.push(
            am5.Label.new(root, {
                text: item.category,
                fill: am5.color("#ffffff"),
                fontSize: 12,
                fontWeight: "500",
                centerX: 0,
                centerY: 0,
                dx: x,
                dy: y,
            })
        );
    });
}

/**
 * 데이터 수집 현황 차트 데이터
 */
const dataStatsData = {
    media: [
        { category: "언론사", value: 1500 },
        { category: "트위터", value: 1200 },
        { category: "네이버", value: 600 },
        { category: "유튜브", value: 300 },
        { category: "기타", value: 71 }
    ],
    characters: [
        { category: "정치", value: 450 },
        { category: "경제", value: 330 },
        { category: "전문가", value: 230 },
        { category: "연예", value: 153 },
        { category: "기타", value: 70 }
    ],
    congress: [
        { category: "법안", value: 800 },
        { category: "회의록", value: 640 },
        { category: "정책자료", value: 320 },
        { category: "성명서", value: 248 }
    ],
    government: [
        { category: "정부부처", value: 750 },
        { category: "지자체", value: 520 },
        { category: "보도자료", value: 280 },
        { category: "발표자료", value: 180 },
        { category: "기타", value: 70 }
    ]
};

/**
 * 데이터 수집 현황 차트 초기화 함수
 * - 각 섹션별 바 차트 생성
 */
function initDataStatsCharts() {
    createStatsChart('mediaChart', dataStatsData.media);
    createStatsChart('characterChart', dataStatsData.characters);
    createStatsChart('congressChart', dataStatsData.congress);
    createStatsChart('governmentChart', dataStatsData.government);
}

/**
 * 데이터 수집 현황 차트 생성 함수
 */
function createStatsChart(chartId, data) {
    // 차트 영역 확인
    const chartDiv = document.getElementById(chartId);
    if (!chartDiv) return;

    // Root 생성
    const root = am5.Root.new(chartDiv);
    
    // 테마 설정
    root.setThemes([
        am5themes_Animated.new(root)
    ]);
    
    // 차트 생성
    const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "none",
            wheelY: "none",
            paddingLeft: 0,
            paddingRight: 10,
            layout: root.verticalLayout,
        })
    );
    
    // 데이터 생성
    chart.data.setAll(data);
    
    // Y축 생성
    const yAxis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
            categoryField: "category",
            renderer: am5xy.AxisRendererY.new(root, {
                minGridDistance: 10,
                cellStartLocation: 0.1,
                cellEndLocation: 0.9,
            }),
        })
    );
    
    yAxis.data.setAll(data);
    
    // X축 생성
    const xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererX.new(root, {
                visible: false,
            })
        })
    );
    
    // 시리즈 생성
    const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
            name: "데이터 수집",
            xAxis: xAxis,
            yAxis: yAxis,
            valueXField: "value",
            categoryYField: "category",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{categoryY}: {valueX}",
            }),
        })
    );
    
    // 막대 스타일 지정
    series.columns.template.setAll({
        height: am5.p60,
        cornerRadiusTR: 4,
        cornerRadiusBR: 4
    });
    
    // 컬러 어댑터 추가
    series.columns.template.adapters.add("fill", function(fill, target) {
        const dataItem = target.dataItem;
        if (dataItem) {
            const categoryValue = dataItem.get("categoryY");
            const index = data.findIndex(item => item.category === categoryValue);
            
            // 색상 변화를 위한 색상 배열
            const colors = [
                am5.color("#0052cc"),
                am5.color("#3179ea"),
                am5.color("#63a0ff"),
                am5.color("#94c1ff"),
                am5.color("#c6dfff")
            ];
            
            return colors[index % colors.length];
        }
        return fill;
    });
    
    series.columns.template.adapters.add("stroke", function(stroke, target) {
        return am5.color("#ffffff");
    });
    
    // 데이터 연결
    series.data.setAll(data);
    
    // 컬럼 라벨 추가
    series.bullets.push(function() {
        return am5.Bullet.new(root, {
            sprite: am5.Label.new(root, {
                text: "{valueX}",
                fill: am5.color("#000000"),
                centerY: am5.p50,
                centerX: am5.p100,
                populateText: true,
            })
        });
    });
    
    // 애니메이션 추가
    series.appear(1000);
    chart.appear(1000, 100);
} 