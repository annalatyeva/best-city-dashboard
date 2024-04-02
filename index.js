const EkbGrowthIndexArr = Object.values(Cities[0].growthIndex);
const SpbGrowthIndexArr = Object.values(Cities[1].growthIndex);
const MscGrowthIndexArr = Object.values(Cities[2].growthIndex);
let minGrowthIndexArr = [];
let maxGrowthIndexArr = [];

for (let i = 0; i < EkbGrowthIndexArr.length; i++) {
  minGrowthIndexArr.push(Math.min(EkbGrowthIndexArr[i], SpbGrowthIndexArr[i], MscGrowthIndexArr[i]));
  maxGrowthIndexArr.push(Math.max(EkbGrowthIndexArr[i], SpbGrowthIndexArr[i], MscGrowthIndexArr[i]));
}

function showData (city, index, region, GrowthIndexArr, AgePeopleMax) {
  document.getElementById(city).innerHTML = `<h2 id='${city}CityName' class='CityName'></h2>
  <div class='dashboard-container'>
    <div class='dashboard-container_item dark-blue'>
      <div id='${city}Salary' class='data'></div>
      <div class='data-label'>cредняя зарплата</div>
    </div>
    <div class='dashboard-container_item blue'>
      <div id='${city}Polution' class='data'></div>
      <div class='data-label'>уровень загрязнения воздуха</div>
    </div>
    <div class='dashboard-container_item light-blue'>
      <div id='${city}Density' class='data'></div>
      <div class='data-label'>плотность населения</div>
    </div>
  </div>
  <div class='dashboard-container-second'>
    <div>
      <div class='dashboard-container_item-second dark-green'>
        <div id='${city}BuyNewFlat' class='data data-second'></div>
        <div>цена квартир в новостройках</div>
      </div>
      <div class='dashboard-container_item-second green'>
        <div id='${city}BuyNoNewFlat' class='data data-second'></div>
        <div>цена квартир  во вторичке</div>
      </div>
    </div>
    <div>
      <div class='dashboard-container_item-second light-green'>
        <div id='${city}TempMax' class='data data-second'></div>
        <div>средняя температура летом</div>
      </div>
      <div class='dashboard-container_item-second very-light-green'>
        <div id='${city}TempMin' class='data data-second'></div>
        <div>средняя температура зимой</div>
      </div>
    </div>
  </div>
  <div class='charts-container'>
    <div class='charts'>
      <canvas id='${city}GrowthIndex'></canvas>
    </div>
    <div class='charts'>
      <canvas id='${city}MenWomen'></canvas>
    </div>
  </div>
</div>`;

document.getElementById(`${city}CityName`).textContent = Cities[index].city;
document.getElementById(`${city}Salary`).textContent = Cities[index].averageSalary + ' руб.'; 
document.getElementById(`${city}Polution`).textContent = Cities[index].ecology;
document.getElementById(`${city}Density`).innerHTML = Cities[index].density() + ' чел./км' + '&sup2;';

document.getElementById(`${city}BuyNewFlat`).innerHTML = Cities[index].buyNewFlat + ' руб./м' + '&sup2;';
document.getElementById(`${city}BuyNoNewFlat`).innerHTML = Cities[index].buyNoNewFlat + ' руб./м' + '&sup2;';

document.getElementById(`${city}TempMax`).innerHTML = Cities[index].tempMax + '&deg;' + 'C';
document.getElementById(`${city}TempMin`).innerHTML = Cities[index].tempMin + '&deg;' + 'C';

new Chart(document.getElementById(`${city}GrowthIndex`), {
  type: 'radar',
  data: {
  labels: [
      'Автодороги',
      'Железные дороги',
      'Авиаинфраструктура',
      'Генерация энергии',
      'Обеспеченность энергией',
      'Потребление энергии',
      'Распределительные сети',
      'Спортивные сооружения',
      'Детские сады',
      'Школы',
      'Ссузы',
      'Вузы',
      'Мадицина',
      'Отопление',
      'Водоснабжение',
      'Канализация',
      'Коммунальная инфраструктура',
      'Состояние жилья',
      'Высокоскоростной интернет',
      'Стационарная связь',
      'Мобильная связь',
      'Наличие интернета в огранизациях',
    ],
    datasets: [{
      label: region,
      data: GrowthIndexArr,
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }, {
      label: 'Минимальные значения',
      data: minGrowthIndexArr,
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.3)',
      borderColor: 'rgb(54, 162, 235, 0)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    },
    {
      label: 'Максимальные значения',
      data: maxGrowthIndexArr,
      fill: true,
      backgroundColor: 'rgba(54, 162, 90, 0.1)',
      borderColor: 'rgb(54, 162, 235, 0)',
      pointBackgroundColor: 'rgb(54, 162, 90)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    }
  ]},
  options: { 
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16
          }
        }
      }
  },
    elements: {
      line: {
        borderWidth: 3
      }
    }
  },
});

new Chart(document.getElementById(`${city}MenWomen`), {
  type: 'bar',
  data: {
    labels: Object.keys(Cities[index].men).reverse(),
    datasets: [{
        label: 'Мужчины',
        data: Object.values(Cities[index].men).reverse().map((el) => -el), 
        backgroundColor: 'lightBlue',
        barPercentage: 1,
        categoryPercentage: 1,
        borderColor: 'black',
        borderWidth: 1
      },
      {
        label: 'Женщины',
        data: Object.values(Cities[index].women).reverse(),
        backgroundColor: 'pink',
        barPercentage: 1,
        categoryPercentage: 1,
        borderColor: 'black',
        borderWidth: 1,
        borderSkipped: 'none' 
      }
    ]
  },
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          label: (ttItem) => (Math.abs(ttItem.parsed.x)) 
        }
      },
      legend: {
        labels: {
          font: {
            size: 16
          }
        }
      }
    },
    indexAxis: 'y',
    scales: {
      y: {
        stacked: true,
        grid: {
          display: false
        }
      },
      x: {
        min: -AgePeopleMax,
        max: AgePeopleMax,
        ticks: {
          callback: (val) => (Math.abs(val))
        }
      }
    }
  }
});
}

showData ('Ekb', 0, 'Свердловская область', EkbGrowthIndexArr, 70000);
showData ('Spb', 1, 'Ленинградская область', SpbGrowthIndexArr, 280000);
showData ('Msk', 2, 'Московская область', MscGrowthIndexArr, 640000);


let tabs = new Tabby('[data-tabs]');