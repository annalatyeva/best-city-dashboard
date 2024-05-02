const EkbGrowthIndexArr = Object.values(Cities[0].growthIndex);
const SpbGrowthIndexArr = Object.values(Cities[1].growthIndex);
const MscGrowthIndexArr = Object.values(Cities[2].growthIndex);
let minGrowthIndexArr = [];
let maxGrowthIndexArr = [];

// Создание массива минимальных и максимальных значений индекса развития
for (let i = 0; i < EkbGrowthIndexArr.length; i++) {
	minGrowthIndexArr.push(Math.min(EkbGrowthIndexArr[i], SpbGrowthIndexArr[i], MscGrowthIndexArr[i]));
	maxGrowthIndexArr.push(Math.max(EkbGrowthIndexArr[i], SpbGrowthIndexArr[i], MscGrowthIndexArr[i]));
}

// Определение размера подписей к графикам
function getChartsFontSize() {
	if (screenWidth >= 1500) {
		return 16;
	} else if (screenWidth >= 1200) {
		return 17;
	} else if (screenWidth >= 800) {
		return 16;
	}
}

//Создание и заполнение разметки
function showData(city, index, region, GrowthIndexArr, AgePeopleMax) {
	function showTooltip(tooltipUrl) {
		return `<span class='url-tooltip'>По материалам сайта ${tooltipUrl}</span>`;
	}

	document.getElementById(city).innerHTML = `<h2 class='CityName'>${Cities[index].city}</h2>
  <div class='dashboard-container'>
    <div class='dashboard-container_item dark-blue'>
      <div class='data'>${Cities[index].averageSalary + " руб."}
        <img class='info-img' src='assets/info-icon.png'>
        ${showTooltip(UrlTooltips.averageSalaryUrl)}
      </div>
      <div class='data-label'>cредняя зарплата</div>
    </div>
    <div class='dashboard-container_item blue'>
      <div class='data'>${Cities[index].ecology}
        <img class='info-img' src='assets/info-icon.png'>
        ${showTooltip(UrlTooltips.ecologyUrl)}
      </div>
      <div class='data-label'>уровень загрязнения воздуха</div>
    </div>
    <div class='dashboard-container_item light-blue'>
      <div class='data'>${Cities[index].density() + " чел./км" + "&sup2;"}
        <img class='info-img' src='assets/info-icon.png'>
        ${showTooltip(UrlTooltips.populationUrl)}
      </div>
      <div class='data-label'>плотность населения</div>
    </div>
  </div>
  <div class='dashboard-container-second'>
    <div>
      <div class='dashboard-container_item-second dark-green'>
        <div class='data data-second'>${Cities[index].buyNewFlat + " руб./м" + "&sup2;"}
          <img class='info-img' src='assets/info-icon.png'>
          ${showTooltip(UrlTooltips.buyFlatUrl)}
        </div>
        <div class='data-label-second'>цена квартир в новостройках</div>
      </div>
      <div class='dashboard-container_item-second green'>
        <div class='data data-second'>${Cities[index].buyNoNewFlat + " руб./м" + "&sup2;"}
          <img class='info-img' src='assets/info-icon.png'>
          ${showTooltip(UrlTooltips.buyFlatUrl)}
        </div>
        <div class='data-label-second'>цена квартир  во вторичке</div>
      </div>
    </div>
    <div>
      <div class='dashboard-container_item-second light-green'>
        <div class='data data-second'>${Cities[index].tempMax + "&deg;" + "C"}
          <img class='info-img' src='assets/info-icon.png'>
          ${showTooltip(UrlTooltips.tempUrl)}
        </div>
        <div class='data-label-second'>средняя температура летом</div>
      </div>
      <div class='dashboard-container_item-second very-light-green'>
        <div class='data data-second'>${Cities[index].tempMin + "&deg;" + "C"}
          <img class='info-img' src='assets/info-icon.png'>
          ${showTooltip(UrlTooltips.tempUrl)}
        </div>
        <div class='data-label-second'>средняя температура зимой</div>
      </div>
    </div>
  </div>
  <div class='light-blue'>
    <div class='chart-title'>Индекс развития региона
      <img class='info-img' src='assets/info-icon.png'>
      ${showTooltip(UrlTooltips.growthIndexUrl)}
    </div>
  </div>
  <div class='charts mobileChartLabels'>
    <canvas id='${city}mobileChartLabels'></canvas>
  </div>
  <div class='charts-container'>
    <div class='charts'>
      <canvas id='${city}GrowthIndexFirst'></canvas>
    </div>
    <div class='charts'>
      <canvas id='${city}GrowthIndexSecond'></canvas>
    </div>
    <div class='charts mobileCharts'>
      <canvas id='${city}GrowthIndexThird'></canvas>
    </div>
    <div class='light-blue w-100'>
      <div class='chart-title'>Возрастно-половая пирамида
        <img class='info-img' src='assets/info-icon.png'>
        ${showTooltip(UrlTooltips.populationUrl)}
      </div>
    </div>
    <div class='charts'>
      <canvas id='${city}MenWomen'></canvas>
    </div>
  </div>
</div>`;

	//Создание графиков в десктопной версии
	function addBigScreenCharts() {
		new Chart(document.getElementById(`${city}GrowthIndexFirst`), {
			type: "radar",
			data: {
				labels: growthIndexLabels.slice(0, 12),
				datasets: [
					{
						label: region,
						data: GrowthIndexArr.slice(0, 12),
						fill: true,
						backgroundColor: "rgba(255, 99, 132, 0.3)",
						borderColor: "rgb(255, 99, 132)",
						borderWidth: 2,
						pointBackgroundColor: "rgb(255, 99, 132)",
						pointBorderColor: "#fff",
						pointHoverBackgroundColor: "#fff",
						pointHoverBorderColor: "rgb(255, 99, 132)",
					},
					{
						label: "Минимальные значения",
						data: minGrowthIndexArr.slice(0, 12),
						fill: true,
						backgroundColor: "rgba(54, 162, 235, 0.3)",
						borderColor: "rgb(54, 162, 235, 0)",
						pointBackgroundColor: "rgb(54, 162, 235)",
						pointBorderColor: "#fff",
						pointHoverBackgroundColor: "#fff",
						pointHoverBorderColor: "rgb(54, 162, 235)",
					},
					{
						label: "Максимальные значения",
						data: maxGrowthIndexArr.slice(0, 12),
						fill: true,
						backgroundColor: "rgba(54, 162, 90, 0.2)",
						borderColor: "rgb(54, 162, 235, 0)",
						pointBackgroundColor: "rgb(54, 162, 90)",
						pointBorderColor: "#fff",
						pointHoverBackgroundColor: "#fff",
						pointHoverBorderColor: "rgb(54, 162, 235)",
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
				aspectRatio: screenWidth <= 1500 ? 1 | 1 : 2 | 0.9,
				plugins: {
					legend: {
						labels: {
							font: {
								size: getChartsFontSize(),
							},
						},
					},
				},
				elements: {
					line: {
						borderWidth: 3,
					},
				},
				scales: {
					r: {
						beginAtZero: true,
						max: 10,
						grid: {
							circular: true,
						},
						ticks: {
							stepSize: 2,
						},
						pointLabels: {
							font: {
								size: getChartsFontSize(),
							},
						},
					},
				},
			},
		});

		new Chart(document.getElementById(`${city}GrowthIndexSecond`), {
			type: "radar",
			data: {
				labels: growthIndexLabels.slice(12),
				datasets: [
					{
						label: region,
						data: GrowthIndexArr.slice(12),
						fill: true,
						backgroundColor: "rgba(255, 99, 132, 0.3)",
						borderColor: "rgb(255, 99, 132)",
						borderWidth: 2,
						pointBackgroundColor: "rgb(255, 99, 132)",
						pointBorderColor: "#fff",
						pointHoverBackgroundColor: "#fff",
						pointHoverBorderColor: "rgb(255, 99, 132)",
					},
					{
						label: "Минимальные значения",
						data: minGrowthIndexArr.slice(12),
						fill: true,
						backgroundColor: "rgba(54, 162, 235, 0.3)",
						borderColor: "rgb(54, 162, 235, 0)",
						pointBackgroundColor: "rgb(54, 162, 235)",
						pointBorderColor: "#fff",
						pointHoverBackgroundColor: "#fff",
						pointHoverBorderColor: "rgb(54, 162, 235)",
					},
					{
						label: "Максимальные значения",
						data: maxGrowthIndexArr.slice(12),
						fill: true,
						backgroundColor: "rgba(54, 162, 90, 0.2)",
						borderColor: "rgb(54, 162, 235, 0)",
						pointBackgroundColor: "rgb(54, 162, 90)",
						pointBorderColor: "#fff",
						pointHoverBackgroundColor: "#fff",
						pointHoverBorderColor: "rgb(54, 162, 235)",
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
				aspectRatio: screenWidth <= 1500 ? 1 | 1 : 2 | 0.9,
				plugins: {
					legend: {
						labels: {
							font: {
								size: getChartsFontSize(),
							},
						},
					},
				},
				elements: {
					line: {
						borderWidth: 3,
					},
				},
				scales: {
					r: {
						beginAtZero: true,
						max: 10,
						grid: {
							circular: true,
						},
						ticks: {
							stepSize: 2,
						},
						pointLabels: {
							font: {
								size: getChartsFontSize(),
							},
						},
					},
				},
			},
		});
	}

	//Создание графиков в мобильной версии
	function addMobileScreenCharts() {
		new Chart(document.getElementById(`${city}mobileChartLabels`), {
			data: {
				datasets: [
					{
						type: "bar",
						label: region,
						backgroundColor: "rgba(255, 99, 132, 0.3)",
						borderColor: "black",
						borderWidth: 1,
					},
					{
						type: "bar",
						label: "Максимальные значения",
						backgroundColor: "rgba(54, 162, 90, 1)",
						borderColor: "black",
						borderWidth: 1,
					},
					{
						type: "bar",
						label: "Минимальные значения",
						backgroundColor: "rgba(54, 162, 235, 1)",
						borderColor: "rgba(54, 162, 235, 1)",
						borderColor: "black",
						borderWidth: 1,
					},
				],
			},
			options: {
				plugins: {
					legend: {
						labels: {
							font: {
								size: getChartsFontSize(),
							},
						},
					},
				},
				scales: {
					x: {
						display: false,
					},
					y: {
						display: false,
					},
				},
			},
		});
		new Chart(document.getElementById(`${city}GrowthIndexFirst`), {
			data: {
				labels: growthIndexLabels.slice(0, 7),
				datasets: [
					{
						type: "bar",
						label: region,
						data: GrowthIndexArr.slice(0, 7),
						backgroundColor: "rgba(255, 99, 132, 0.3)",
						barPercentage: 1,
						borderColor: "black",
						borderWidth: 1,
					},
					{
						type: "line",
						label: "Максимальные значения",
						data: maxGrowthIndexArr.slice(0, 7),
						backgroundColor: "rgba(54, 162, 90, 1)",
						barPercentage: 1,
						borderColor: "rgba(54, 162, 90, 1)",
						borderWidth: 2,
					},
					{
						type: "line",
						label: "Минимальные значения",
						data: minGrowthIndexArr.slice(0, 7),
						backgroundColor: "rgba(54, 162, 235, 1)",
						borderColor: "rgba(54, 162, 235, 1)",
						barPercentage: 1,
						borderColor: "rgba(54, 162, 235, 1)",
						borderWidth: 2,
					},
				],
			},
			options: {
				aspectRatio: 1.2 | 0.5,
				plugins: {
					legend: false,
				},
				scales: {
					y: {
						ticks: {
							stepSize: 2,
						},
						beginAtZero: true,
						max: 10,
					},
					x: {
						stacked: true,
						ticks: {
							stepSize: 2,
						},
						ticks: {
							autoSkip: false,
							maxRotation: 90,
							minRotation: 90,
							font: {
								size: getChartsFontSize(),
							},
						},
					},
				},
			},
		});
		new Chart(document.getElementById(`${city}GrowthIndexSecond`), {
			data: {
				labels: growthIndexLabels.slice(7, 15),
				datasets: [
					{
						type: "bar",
						label: region,
						data: GrowthIndexArr.slice(7, 15),
						backgroundColor: "rgba(255, 99, 132, 0.3)",
						barPercentage: 1,
						borderColor: "black",
						borderWidth: 1,
					},
					{
						type: "line",
						label: "Максимальные значения",
						data: maxGrowthIndexArr.slice(7, 15),
						backgroundColor: "rgba(54, 162, 90, 1)",
						barPercentage: 1,
						borderColor: "rgba(54, 162, 90, 1)",
						borderWidth: 2,
					},
					{
						type: "line",
						label: "Минимальные значения",
						data: minGrowthIndexArr.slice(7, 15),
						backgroundColor: "rgba(54, 162, 235, 1)",
						borderColor: "rgba(54, 162, 235, 1)",
						barPercentage: 1,
						borderColor: "rgba(54, 162, 235, 1)",
						borderWidth: 2,
					},
				],
			},
			options: {
				plugins: {
					legend: false,
				},
				aspectRatio: 1.2 | 0.5,
				scales: {
					y: {
						ticks: {
							stepSize: 2,
						},
						beginAtZero: true,
						max: 10,
					},
					x: {
						stacked: true,
						ticks: {
							autoSkip: false,
							maxRotation: 90,
							minRotation: 90,
							font: {
								size: getChartsFontSize(),
							},
						},
					},
				},
			},
		});

		new Chart(document.getElementById(`${city}GrowthIndexThird`), {
			data: {
				labels: growthIndexLabels.slice(15),
				datasets: [
					{
						type: "bar",
						label: region,
						data: GrowthIndexArr.slice(15),
						backgroundColor: "rgba(255, 99, 132, 0.3)",
						barPercentage: 1,
						borderColor: "black",
						borderWidth: 1,
					},
					{
						type: "line",
						label: "Максимальные значения",
						data: maxGrowthIndexArr.slice(15),
						backgroundColor: "rgba(54, 162, 90, 1)",
						barPercentage: 1,
						borderColor: "rgba(54, 162, 90, 1)",
						borderWidth: 2,
					},
					{
						type: "line",
						label: "Минимальные значения",
						data: minGrowthIndexArr.slice(15),
						backgroundColor: "rgba(54, 162, 235, 1)",
						borderColor: "rgba(54, 162, 235, 1)",
						barPercentage: 1,
						borderColor: "rgba(54, 162, 235, 1)",
						borderWidth: 2,
					},
				],
			},
			options: {
				plugins: {
					legend: false,
				},
				aspectRatio: 1.2 | 0.5,
				scales: {
					y: {
						ticks: {
							stepSize: 2,
						},
						beginAtZero: true,
						max: 10,
					},
					x: {
						stacked: true,
						ticks: {
							autoSkip: false,
							maxRotation: 90,
							minRotation: 90,
							font: {
								size: getChartsFontSize(),
							},
						},
					},
				},
			},
		});
	}

	//Вызов функции создания графиков в зависимости от ширины экрана
	if (screenWidth > 800) {
		addBigScreenCharts();
	} else {
		addMobileScreenCharts();
	}

	//Создания половозрастной пирамиды
	new Chart(document.getElementById(`${city}MenWomen`), {
		type: "bar",
		data: {
			labels: Object.keys(Cities[index].men).reverse(),
			datasets: [
				{
					label: "Мужчины",
					data: Object.values(Cities[index].men)
						.reverse()
						.map((el) => -el),
					backgroundColor: "lightBlue",
					barPercentage: 1,
					categoryPercentage: 1,
					borderColor: "black",
					borderWidth: 1,
					borderSkipped: "middle",
					borderSkipped: "left",
				},
				{
					label: "Женщины",
					data: Object.values(Cities[index].women).reverse(),
					backgroundColor: "pink",
					barPercentage: 1,
					categoryPercentage: 1,
					borderColor: "black",
					borderWidth: 1,
					borderSkipped: "middle",
				},
			],
		},
		options: {
			plugins: {
				tooltip: {
					callbacks: {
						label: (ttItem) => Math.abs(ttItem.parsed.x),
					},
				},
				legend: {
					labels: {
						font: {
							size: screenWidth >= 1500 ? 16 : 17,
						},
					},
				},
			},
			indexAxis: "y",
			scales: {
				y: {
					stacked: true,
					grid: {
						display: false,
					},
				},
				x: {
					min: -AgePeopleMax,
					max: AgePeopleMax,
					ticks: {
						callback: (val) => Math.abs(val),
						font: {
							size: getChartsFontSize(),
						},
					},
				},
			},
		},
	});
}

showData("Ekb", 0, "Свердловская область", EkbGrowthIndexArr, 70000);
showData("Spb", 1, "Ленинградская область", SpbGrowthIndexArr, 280000);
showData("Msk", 2, "Московская область", MscGrowthIndexArr, 640000);

//Создание владок
let tabs = new Tabby("[data-tabs]");
