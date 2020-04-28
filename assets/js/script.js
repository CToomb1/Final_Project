// var searchForm = document.querySelector("#searchform");
var searchInput = document.querySelector('#searchinput');
// var clearbtn = document.querySelector("#clearButton");
var searchResults = document.querySelector("#searchResponse");
var Searchbtn = document.querySelector("#search");
var foodR = document.getElementById('foodResponse');
var parent1 = document.getElementById('foodday');
var parent = document.getElementById('forcast');

function handleformsubmit(event) {
    event.preventDefault();
    console.log(searchInput.value)
    removeoldforecast();
    removeoldfoodcast();

    var cityID = searchInput.value;
    if (!cityID) {
        return false;
    }

    runData(cityID);
}
function removeoldforecast() {
    Array.from(parent.children).forEach(child => { parent.removeChild(child) });
}
function removeoldfoodcast() {
    Array.from(parent1.children).forEach(child => { parent1.removeChild(child) });
}
Searchbtn.addEventListener("click", handleformsubmit);

function runData(cityID) {
    var queryUrl = 'https://api.openweathermap.org/data/2.5/forecast/?q=' + cityID + "&units=imperial&APPID=e37e1b254dd810c3870001c45995ed30"
    $.ajax({
        url: queryUrl,
        method: 'GET',
        origin: '*',
    })
        .then(function (weatherRES) {
            console.log(weatherRES.list[0].weather[0]);
            var dayOne = {
                cityname: weatherRES.city.name,
                Datenanme: weatherRES.list[0].dt_txt,
                IconImage: weatherRES.list[0].weather[0].icon,
                Temp: weatherRES.list[0].main.temp,
                food: weatherRES.list[0].weather[0].description,
            };
            var dayTwo = {
                cityname: weatherRES.city.name,
                Datenanme: weatherRES.list[8].dt_txt,
                IconImage: weatherRES.list[8].weather[0].icon,
                Temp: weatherRES.list[8].main.temp,
            };
            var dayThree = {
                cityname: weatherRES.city.name,
                Datenanme: weatherRES.list[16].dt_txt,
                IconImage: weatherRES.list[16].weather[0].icon,
                Temp: weatherRES.list[16].main.temp,
            };
            var dayFour = {
                cityname: weatherRES.city.name,
                Datenanme: weatherRES.list[24].dt_txt,
                IconImage: weatherRES.list[24].weather[0].icon,
                Temp: weatherRES.list[24].main.temp,
            };
            var dayFive = {
                cityname: weatherRES.city.name,
                Datenanme: weatherRES.list[32].dt_txt,
                IconImage: weatherRES.list[32].weather[0].icon,
                Temp: weatherRES.list[32].main.temp,
            };
            var forecast = [dayOne, dayTwo, dayThree, dayFour, dayFive];
            console.log(dayFive.food)
            let mapping = {
                'clear sky': 'American',
                'light rain': 'chinese',
                'overcast clouds': 'italian',
                'light snow': 'japanese',
                'snow': 'Mexican',
                'scattered clouds': 'Caribbean',
                'broken clouds': 'Cajun',
            }
            searchResults(forecast)
            console.log(dayOne.food)
            food(mapping[dayOne.food])
        });
    function food(foodType = 'Chinese') {
        var queryUrl = "https://api.spoonacular.com/recipes/search?cuisine=" + foodType + "&apiKey=dca66fb5322341b49c535563addea129&number=100"
        $.ajax({
            url: queryUrl,
            method: 'GET',
            origin: '*',
        })
            .then(function (searchResults) {
                console.log(searchResults);
                let index = Math.floor(Math.random() * searchResults.results.length)
                var mon = {
                    FoodPic: searchResults.results[index].image,
                    PrepTime: searchResults.results[index].readyInMinutes,
                    Servings: searchResults.results[index].servings,
                    description: searchResults.results[index].title,
                };
                index = Math.floor(Math.random() * searchResults.results.length)
                var tue = {
                    FoodPic: searchResults.results[index].image,
                    PrepTime: searchResults.results[index].readyInMinutes,
                    Servings: searchResults.results[index].servings,
                    description: searchResults.results[index].title,
                };
                index = Math.floor(Math.random() * searchResults.results.length)
                var wed = {
                    FoodPic: searchResults.results[index].image,
                    PrepTime: searchResults.results[index].readyInMinutes,
                    Servings: searchResults.results[index].servings,
                    description: searchResults.results[index].title,
                };
                index = Math.floor(Math.random() * searchResults.results.length)
                var thu = {
                    FoodPic: searchResults.results[index].image,
                    PrepTime: searchResults.results[index].readyInMinutes,
                    Servings: searchResults.results[index].servings,
                    description: searchResults.results[index].title,
                };
                index = Math.floor(Math.random() * searchResults.results.length)
                var fri = {
                    FoodPic: searchResults.results[index].image,
                    PrepTime: searchResults.results[index].readyInMinutes,
                    Servings: searchResults.results[index].servings,
                    description: searchResults.results[index].title,
                };
                var foodday = [mon, tue, wed, thu, fri];
                console.log(foodday);
                foodR(foodday);
            });
    }
    function searchResults(forecast) {
        var Fiveday = document.getElementById('Day');
        for (var i = 0; i < forecast.length; i++) {
            var card = document.createElement("div");
            card.classList.add('column');
            var date = document.createElement('div');
            var dateObj = new Date(forecast[i].Datenanme);
            date.innerHTML = dateObj.getMonth() + '1' + '-' + dateObj.getDate() + '-' + dateObj.getFullYear();
            var Temp = document.createElement('div');
            Temp.innerHTML = 'Temp: ' + forecast[i].Temp + "&deg;F"
            var icon = document.createElement('img')
            icon.innerHTML = forecast[i].IconImage
            icon.setAttribute('src', 'http://openweathermap.org/img/w/' + forecast[i].IconImage + '.png');
            card.appendChild(date);
            card.appendChild(icon);
            card.appendChild(Temp);
            parent.appendChild(card);
        }
    }
    function foodR(foodday) {
        var fday = document.getElementById('Day1');
        for (var i = 0; i < foodday.length; i++) {
            var card = document.createElement('div');
            card.classList.add('column');
            var pic = document.createElement('img');
            var imgName = foodday[i].FoodPic;
            pic.setAttribute('alt', foodday[i].FoodPic);
            pic.setAttribute('src', 'https://spoonacular.com/recipeImages/' + imgName);
            var time = document.createElement('div');
            time.innerHTML = 'Prep Time: ' + foodday[i].PrepTime + "mins"
            var serving = document.createElement('div');
            serving.innerHTML = 'Servings: ' + foodday[i].Servings + "people"
            var des = document.createElement('div');
            des.innerHTML = 'Title:' + foodday[i].description;
            console.log(foodday[i])

            card.appendChild(pic);
            card.appendChild(des);
            card.appendChild(time);
            card.appendChild(serving);
            

            parent1.appendChild(card);
        }
    }
}
