async function showStats () {
  const stats = await getStats()

  const domComision = document.querySelector('.dashboard-comision .dashboard-number')
  const domSolicitante = document.querySelector('.dashboard-solicitante .dashboard-number')
  const domConductor = document.querySelector('.dashboard-conductor .dashboard-number')
  const domViaje = document.querySelector('.dashboard-viaje .dashboard-number')
  const domCalificacion = document.querySelector('.dashboard-calificacion')
  const domTipoVehiculo = document.querySelector('.dashboard-tipo-vehiculo')

  domComision.textContent = parseFloat(stats.comision || '0').toFixed(2)
  domSolicitante.textContent = parseInt(stats.solicitante || '0')
  domConductor.textContent = parseInt(stats.conductor || '0')
  domViaje.textContent = parseInt(stats.viaje || '0')

  renderStats('Viajes por calificación', stats.calificacion || [], domCalificacion, 'Calificación')
  renderStats('Viajes por tipo de vehículo', stats.tipoVehiculo || [], domTipoVehiculo, 'Tipo de Vehículo')
}

async function getStats () {
  return await fetch('/api/v1/stats/general').then(r => r.json())
}

function renderStats (title, results, domChart, legend) {
  const legends = []
  const data = []

  results.forEach(entry => {
    legends.push(entry.name)
    data.push(parseFloat(entry.total))
  });

  const myChart = echarts.init(domChart, 'light', {
    renderer: 'svg',
    useDirtyRect: false
  });

  const option = {
    title: {
      text: title,
      textStyle: {
        fontWeight: 'normal'
      }
    },
    tooltip: {},
    legend: {
      data: [legend]
    },
    xAxis: {
      data,
    },
    yAxis: {},
    series: [
      {
        name: legend,
        type: 'bar',
        data,
      }
    ]
  };

  if (option && typeof option === 'object') {
    myChart.setOption(option);
  }

  window.addEventListener('resize', myChart.resize);
}

showStats()
