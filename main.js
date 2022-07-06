

DOMlocation = document.querySelector('#location')
DOMtemp = document.querySelector('#temp')
DOMforcast = document.querySelector('#currentForcast')
DOMinput = document.getElementById('content')
DOMbtn = document.getElementById('button')
url = 'toronto'



/*document.getElementById('form').onsubmit = () =>{
DOMinput.value = city
}
*/





window.addEventListener('load', () =>{
    getData()
    newCity = JSON.parse(localStorage.getItem('newCity')) || [];
    document.getElementById('form').addEventListener('submit', e =>{
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

function DisplayNewData(){
    


    last = newCity.pop()

    url = last.cityName
    

    document.getElementById('location').innerHTML = `${url}`
    
}

const getData = async () =>{
    /*TODO:
        - add a displayLoading() function */
        displayLoading()
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${url}&units=metric&appid=149ab2caa32bd30c71275c70cb1bb0cb`, { mode: 'cors' })
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        /*TODO:
        - add a hideLoading() function */
        hideLoading()
        icon = document.getElementById('icon')
        let weatherImage = response.weather[0].icon
        icon.src = `https://openweathermap.org/img/wn/${weatherImage}@4x.png`
        forcast = response.weather[0].description
        city = response.name
        DOMlocation.innerHTML = city + ' ' + response.sys.country        
        temp = response.main.temp
        tempString = temp.toString()
        tempFeel = response.main.feels_like
        console.log(tempString)
        DOMforcast.innerHTML = forcast
        DOMtemp.innerHTML = tempString.slice(0, -3) + 'C'
        console.log(tempFeel)
        
    }).catch(err => {console.log(err)});
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


