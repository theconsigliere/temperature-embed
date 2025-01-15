// display temperature on national trust website
console.clear()

const div = document.querySelector('[data-testid="place-postal-address"]')

const getTemperature = async () => {
  const response = await fetch(
    "https://europe-west1-amigo-actions.cloudfunctions.net/recruitment-mock-weather-endpoint/forecast?appid=a2ef86c41a&lat=27.987850&lon=86.925026"
  ).catch(handleError)

  const data = await response.json()
  const result = data.list[0]

  return result
}

const handleError = () => {
  console.error("Error fetching temperature:", error)
}

const createWidget = (temperature) => {
  const widget = document.createElement("div")

  const degreeTemp = temperature.main.temp.toFixed(1)
  const weather = temperature.weather[0]
  const description = weather.description
  const icon_url = `https://openweathermap.org/img/w/${weather.icon}.png`

  widget.classList.add("temperature-widget")
  widget.innerHTML = ``
  widget.innerHTML = `
        <div class="twidget" style="padding: 0 10px;background-color:black;margin:5px 0;width:fit-content;">
                <div className="twidget__flex" style="display: flex; justify-content: flex-start; align-items: center;">
                   <p class="twidget__description" style="margin:0;color:white;font-size: 15px;">currently: </p>
                    <p class="twidget__temp" style="margin:0;color:white;margin:0 10px;" >${degreeTemp}°C</p>
                    <img class="twidget__icon" src="${icon_url}" width="22px" height="22px" style="margin:10px; "/>
                    <p class="twidget__description" style="margin:0;color:white;font-size: 15px;">${description}</p>
                </div>
        </div>
    `
  return widget
}

const init = async () => {
  const temperature = await getTemperature()
  const widget = createWidget(temperature)
  div.appendChild(widget)
}

init()
