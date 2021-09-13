document
  .querySelector('.busca')
  .addEventListener('submit', async function (event) {
    event.preventDefault()

    let input = document.querySelector('#searchInput').value

    if (input !== '') {
      cleanInfo()
      showWarning('Carregando...')

      let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
        input
      )}&appid=1c4585753034fe1225c1b36567010cb9&units=metric&lang=pt_br`

      let results = await fetch(url)
      let json = await results.json()

      if (json.cod === 200) {
        showInfo({
          name: json.name,
          country: json.sys.country,
          temp: json.main.temp,
          tempIcon: json.weather[0].icon,
          windSpeed: json.wind.speed,
          windAngle: json.wind.deg
        })
      } else {
        cleanInfo()
        showWarning('Cidade não localizada.')
      }
    } else {
      cleanInfo()
    }
  })

function showWarning(msg) {
  const warning = document.querySelector('.aviso')
  warning.innerHTML = msg
}

function cleanInfo() {
  showWarning('')
  document.querySelector('.resultado').style.display = 'none'
}

function showInfo(json) {
  showWarning('')
  document.querySelector('.resultado').style.display = 'block'

  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>C</sup>`
  document.querySelector(
    '.ventoInfo'
  ).innerHTML = `${json.windSpeed} <span>km/h</span>`

  document
    .querySelector('.temp img')
    .setAttribute(
      'src',
      `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    )

  document.querySelector('.ventoPonto').style.transform = `rotate(${
    json.windAngle - 90
  }deg)`
}
