/**
 * 분석 포털 관리자 대시보드 JavaScript
 * amCharts 5를 활용한 차트 구현
 */

// DOM이 완전히 로드된 후 스크립트 실행
document.addEventListener('DOMContentLoaded', function() {
  // 내부 파이 차트 생성
  createInternalPieChart();
  
  // 외부 파이 차트 생성
  createExternalPieChart();
  
  // 원형 프로그레스 차트 생성
  createCircleProgressCharts();
  
  // 로그인 라인 차트 생성
  createLoginLineChart();
});

/**
 * 내부 차트 (파이 차트) 생성 함수
 */
function createInternalPieChart() {
  // amCharts 5 루트 요소 생성
  let root = am5.Root.new("internal-pie-chart");
  
  // 애니메이션 테마 설정
  root.setThemes([
    am5themes_Animated.new(root)
  ]);
  
  // 차트 생성
  let chart = root.container.children.push(
    am5percent.PieChart.new(root, {
      layout: root.verticalLayout,
      innerRadius: am5.percent(50)
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

/**
 * 외부 차트 (파이 차트) 생성 함수
 */
function createExternalPieChart() {
  // amCharts 5 루트 요소 생성
  let root = am5.Root.new("external-pie-chart");
  
  // 애니메이션 테마 설정
  root.setThemes([
    am5themes_Animated.new(root)
  ]);
  
  // 차트 생성
  let chart = root.container.children.push(
    am5percent.PieChart.new(root, {
      layout: root.verticalLayout,
      innerRadius: am5.percent(50)
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

/**
 * 원형 프로그레스 차트 생성 함수
 */
function createCircleProgressCharts() {
  // CPU 사용률 차트
  createCircleProgress("cpu-usage", 70, 0x0B468B);
  
  // 네트워크 트래픽 차트
  createCircleProgress("network-traffic", 30, 0x00BFA5);
  
  // DR 백업 차트 (시계 형태)
  createCircleProgress("dr-backup", 80, 0xFDD835); // 80%는 시각적 표현용
  
  // 시스템 상태 차트
  createCircleProgress("system-status", 100, 0xFF8A65);
}

/**
 * 개별 원형 프로그레스 차트 생성 함수
 * @param {string} elementId - 차트가 생성될 HTML 요소의 ID
 * @param {number} value - 표시할 값 (0-100)
 * @param {number} color - 색상 (16진수)
 */
function createCircleProgress(elementId, value, color) {
  // amCharts 5 루트 요소 생성
  let root = am5.Root.new(elementId);
  
  // 애니메이션 테마 설정
  root.setThemes([
    am5themes_Animated.new(root)
  ]);
  
  // 원형 차트 생성
  let chart = root.container.children.push(
    am5percent.PieChart.new(root, {
      startAngle: 180,
      endAngle: 540,
      layout: root.verticalLayout,
      innerRadius: am5.percent(80)
    })
  );
  
  // 데이터 설정
  let data = [
    {
      category: "Progress",
      value: value,
      color: am5.color(color)
    },
    {
      category: "Empty",
      value: 100 - value,
      color: am5.color(color).lighten(0.8)
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
    stroke: null,
    strokeWidth: 0,
    tooltipText: ""
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

/**
 * 로그인 통계 라인 차트 생성 함수
 */
function createLoginLineChart() {
  // amCharts 5 루트 요소 생성
  let root = am5.Root.new("login-chart");
  
  // 애니메이션 테마 설정
  root.setThemes([
    am5themes_Animated.new(root)
  ]);
  
  // 차트 생성
  let chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout,
      pinchZoomX: true
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
