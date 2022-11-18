document.querySelector('.busca').addEventListener('submit', (event)=>{
    event.preventDefault();
    let input = document.querySelector('#searchInput').value;
    if(input !== ''){
        showWarning('Carregando...');
        getCity(input);
    }
});

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

function getCity(city){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`;
    let results = fetch(url);
    results.then(result => {
        return result.json();
    }).then(json => {
        showInfo({
            name: json.name,
            country: json.sys.country,
            city: json.sys.city,
            temp: json.main.temp,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg
        });
    });
}

function showInfo(json){
    showWarning('');
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
    document.querySelector('.resultado').style.display = 'block';
}
