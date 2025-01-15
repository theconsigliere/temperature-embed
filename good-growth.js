// display temperature on national trust website
console.clear()

const getTemperature = async () => {
  const response = await fetch(
    "https://europe-west1-amigo-actions.cloudfunctions.net/recruitment-mock-weather-endpoint/forecast?appid=a2ef86c41a&lat=27.987850&lon=86.925026"
  ).catch(handleError)

  const data = await response.json()

  const result = {
    degreeTemp: data.list[0].main.temp.toFixed(1),
    description: data.list[0].weather[0].description,
    icon_url: `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`,
  }

  return result
}

const handleError = () => {
  console.error("Error fetching temperature:", error)
}

const createWidget = (temperature) => {
  const widget = document.createElement("div")

  // add all const to session storage
  sessionStorage.setItem("temp", JSON.stringify(temperature))

  widget.classList.add("temperature-widget")
  widget.innerHTML = ``
  widget.innerHTML = `
        <div class="twidget" style="padding: 0 10px;background-color:black;margin:5px 0;width:fit-content;">
                <div className="twidget__flex" style="display: flex; justify-content: flex-start; align-items: center;">
                   <p class="twidget__description" style="margin:0;color:white;font-size: 15px;">currently: </p>
                    <p class="twidget__temp" style="margin:0;color:white;margin:0 10px;" >${temperature.degreeTemp}°C</p>
                    <img class="twidget__icon" src="${temperature.icon_url}" width="22px" height="22px" style="margin:10px; "/>
                    <p class="twidget__description" style="margin:0;color:white;font-size: 15px;">${temperature.description}</p>
                </div>
        </div>
    `
  return widget
}

const init = async () => {
  const div = document.querySelector('[data-testid="place-postal-address"]')
  // check it session storage has temp
  const temp = sessionStorage.getItem("temp")
  let widget = null

  if (temp) {
    widget = createWidget(JSON.parse(temp))
  } else {
    const temperature = await getTemperature()
    widget = createWidget(temperature)
  }

  div.appendChild(widget)
}

init()
