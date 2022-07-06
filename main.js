

DOMlocation = document.querySelector('#location')
DOMtemp = document.querySelector('#temp')
DOMforcast = document.querySelector('#currentForcast')
DOMinput = document.getElementById('content')
DOMbtn = document.getElementById('button')
cityForUrl = 'toronto'


window.addEventListener('load', () => {
    getData()
    newCity = JSON.parse(localStorage.getItem('newCity')) || [];
    document.getElementById('form').addEventListener('submit', e => {
        e.preventDefault();

        const formData = {
            cityName: e.target.elements.content.value,
        }
        newCity.push(formData)
        localStorage.setItem('newCity', JSON.stringify(newCity))
        e.target.reset()

        DisplayNewData()
        //document.getElementById('submit').value = ''
        getData()

    })


})

function DisplayNewData() {



    last = newCity.pop()

    cityForUrl = last.cityName


    document.getElementById('location').innerHTML = `${cityForUrl}`

}

const getData = async () => {
    displayLoading()

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityForUrl}&units=metric&appid=149ab2caa32bd30c71275c70cb1bb0cb`, { mode: 'cors' })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            
            hideLoading()
            icon = document.getElementById('icon')
            let weatherImage = response.weather[0].icon
            icon.src = `https://openweathermap.org/img/wn/${weatherImage}@4x.png`
            forcast = response.weather[0].description
            city = response.name
            DOMlocation.innerHTML = city + ' ' + response.sys.country
            temp = response.main.temp
            tempString = temp.toString()
            
            
            DOMforcast.innerHTML = forcast
            DOMtemp.innerHTML = tempString.slice(0, -3) + 'C'
            

        }).catch(err => {
            displayLoading()
            console.log(err)
            window.alert('you gotta Enter a City ')
            cityForUrl = 'toronto'
            getData()
        })

}

loaderContainer = document.getElementById('loaderContainer')
wrapperContainer = document.getElementById('wrapper')
const displayLoading = () => {

    loaderContainer.classList.remove('hidden')
    wrapperContainer.classList.add('hidden')
};
const hideLoading = () => {
    wrapperContainer.classList.remove('hidden')
    loaderContainer.classList.add('hidden')

};


