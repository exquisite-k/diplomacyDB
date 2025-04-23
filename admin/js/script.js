/* DOM이 완전히 로드된 후 스크립트 실행 */
document.addEventListener('DOMContentLoaded', function() {
    /* [수정] - 브라우저 사이즈 정보 추적 */
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    // 내부 파이 차트 생성
    createInternalPieChart();
    
    // 외부 파이 차트 생성
    createExternalPieChart();
    
    // 원형 프로그레스 차트 생성
    createCircleProgressCharts();
    
    // 로그인 라인 차트 생성
    createLoginLineChart();
    
    /* [수정] - 창 크기 변경 시 차트 반응형 처리 */
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
/* 내부 차트 (파이 차트) 생성 함수 */
function createInternalPieChart() {
    // amCharts 5 루트 요소 생성
    let root = am5.Root.new("internal-pie-chart");
    
    // 애니메이션 테마 설정
    root.setThemes([
        am5themes_Animated.new(root)
    ]);
    
    /* [수정] - 모바일 대응 반응형 패딩 설정 */
    let isMobile = window.innerWidth < 768;
    
    // 차트 생성
    let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
            layout: root.verticalLayout,
            innerRadius: am5.percent(50),
            /* [수정] - 반응형 패딩 */
            paddingLeft: isMobile ? 0 : 10,
            paddingRight: isMobile ? 0 : 10
        })
    );
  
    // 데이터 설정
    let data = [
        {
            category: "일반",
            value: 1901,
            color: am5.color(0x0B468B)
        },
        {
            category: "비밀",
            value: 640,
            color: am5.color(0x487FEE)
        }
    ];
  
  // 시리즈 생성
    let series = chart.series.push(
        am5percent.PieSeries.new(root, {
            valueField: "value",
            categoryField: "category",
            alignLabels: false
        })
    );
    
    // 슬라이스 설정
    series.slices.template.setAll({
        stroke: am5.color(0xffffff),
        strokeWidth: 2,
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
    
    // 레이블 제거
    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);
  
    // 데이터 설정
    series.data.setAll(data);
    
    // 애니메이션 설정
    series.appear(1000, 100);
}

/* 외부 차트 (파이 차트) 생성 함수 */
function createExternalPieChart() {
    // amCharts 5 루트 요소 생성
    let root = am5.Root.new("external-pie-chart");
    
    // 애니메이션 테마 설정
    root.setThemes([
        am5themes_Animated.new(root)
    ]);
    
    /* [수정] - 모바일 대응 반응형 패딩 설정 */
    let isMobile = window.innerWidth < 768;
    
    // 차트 생성
    let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
            layout: root.verticalLayout,
            innerRadius: am5.percent(50),
            /* [수정] - 반응형 패딩 */
            paddingLeft: isMobile ? 0 : 10,
            paddingRight: isMobile ? 0 : 10
        })
    );
    
    // 데이터 설정
    let data = [
        {
            category: "SNS",
            value: 1203,
            color: am5.color(0xAB82E8)
        },
        {
            category: "뉴스",
            value: 4320,
            color: am5.color(0x43E1C3)
        },
        {
            category: "그외",
            value: 5550,
            color: am5.color(0xFFB74D)
        },
        {
            category: "해외",
            value: 12350,
            color: am5.color(0x38CFF1)
        }
    ];
    
    // 시리즈 생성
    let series = chart.series.push(
        am5percent.PieSeries.new(root, {
            valueField: "value",
            categoryField: "category",
            alignLabels: false
        })
    );
    
    // 슬라이스 설정
    series.slices.template.setAll({
        stroke: am5.color(0xffffff),
        strokeWidth: 2,
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
    
    // 레이블 제거
    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);
    
    // 데이터 설정
    series.data.setAll(data);
    
    // 애니메이션 설정
    series.appear(1000, 100);
}

/* 로그인 통계 라인 차트 생성 함수 */
function createLoginLineChart() {
    // amCharts 5 루트 요소 생성
    let root = am5.Root.new("login-chart");
    
    // 애니메이션 테마 설정
    root.setThemes([
        am5themes_Animated.new(root)
    ]);
    
    /* [수정] - 모바일/태블릿 대응 */
    let isMobile = window.innerWidth < 768;
    let isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    // 차트 생성
    let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout,
            pinchZoomX: true,
            /* [수정] - 반응형 패딩 조정 */
            paddingLeft: isMobile ? 10 : 20,
            paddingRight: isMobile ? 10 : 20
        })
    );
    
    // X축 생성
    let xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
            maxDeviation: 0.1,
            min: 1,
            max: 30,
            strictMinMax: true,
            renderer: am5xy.AxisRendererX.new(root, {})
        })
    );
    
    /* [수정] - 모바일에서는 X축 레이블 간격 조정 */
    if (isMobile) {
        xAxis.get("renderer").labels.template.setAll({
            fontSize: 10,
            step: 2
        });
    }
    
    // Y축 생성
    let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
            maxDeviation: 0,
            min: 0,
            max: 400,
            strictMinMax: true,
            renderer: am5xy.AxisRendererY.new(root, {})
        })
    );
    
    /* [수정] - 모바일에서는 Y축 레이블 간격 조정 */
    if (isMobile) {
        yAxis.get("renderer").labels.template.setAll({
            fontSize: 10
        });
    }
    
    // 시리즈 생성
    let series = chart.series.push(
        am5xy.LineSeries.new(root, {
            name: "로그인 수",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "day",
            tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}회"
            })
        })
    );
    
    // 선 스타일 설정
    series.strokes.template.setAll({
        strokeWidth: 2,
        stroke: am5.color(0x1B5292)
    });
    
    // 커서 설정
    chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "none",
        xAxis: xAxis,
        yAxis: yAxis
    }));
    
    // 가상의 로그인 데이터 생성 (실제로는 서버에서 데이터를 불러와야 함)
    let data = [];
    for (let i = 1; i <= 30; i++) {
        // 주말에는 로그인이 적고, 평일에는 많은 패턴 생성
        let isWeekend = i % 7 === 0 || i % 7 === 6;
        let base = isWeekend ? 100 : 200;
        let randomFactor = Math.random() * 150;
        data.push({
            day: i,
            value: Math.round(base + randomFactor)
        });
    }
    
    // 데이터 설정
    series.data.setAll(data);
    
    // 애니메이션 설정
    series.appear(1000, 100);
}


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
    canvas.style.width = '100%';
    canvas.style.height = '120px';
    element.appendChild(canvas);
    
    // 프로그레스 바 인스턴스 생성
    const progressBar = new CircularProgressBar(canvas.id, {
        lineWidth: 10,
        color: color,
        backgroundColor: `${color}20`, // 20% 투명도
        value: value,
        showText: false
    });
    
    // 프로그레스 인스턴스 저장
    element.progressInstance = progressBar;
    
    // 텍스트 요소 추가
    const textContainer = document.createElement('div');
    textContainer.className = 'progress-text';
    textContainer.style.textAlign = 'center';
    textContainer.style.marginTop = '10px';
    
    const labelSpan = document.createElement('span');
    labelSpan.className = 'label';
    labelSpan.style.display = 'block';
    labelSpan.style.fontSize = '18px';
    labelSpan.style.color = '#222222';
    labelSpan.style.marginBottom = '5px';
    labelSpan.textContent = labelText;
    
    const valueSpan = document.createElement('span');
    valueSpan.className = 'value';
    valueSpan.style.display = 'block';
    valueSpan.style.fontSize = '24px';
    valueSpan.style.fontWeight = 'bold';
    valueSpan.style.color = '#222222';
    valueSpan.textContent = valueText;
    
    textContainer.appendChild(labelSpan);
    textContainer.appendChild(valueSpan);
    element.appendChild(textContainer);
}
