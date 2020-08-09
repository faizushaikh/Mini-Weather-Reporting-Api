const express= require("express");
const https= require("https");
const app=express();

//handlebars templating
const exphbs = require('express-handlebars');
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

//getting json data
app.get("/",function(req,res){
  const url="https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22";
    https.get(url,function(response){
        response.on("data",function(data){
        const weatherData= JSON.parse(data);
        const city=weatherData.name;
        const weather=weatherData.weather[0].main;
        const description=weatherData.weather[0].description;
        const curTemp= weatherData.main.temp;
        const maxTemp=weatherData.main.temp_max;
        const minTemp=weatherData.main.temp_min;
        const press=weatherData.main.pressure;
        const humidity=weatherData.main.humidity;
        const visibility=weatherData.visibility;

res.render('home',{city:city,weather:weather,description:description,curTemp:curTemp,maxTemp:maxTemp,minTemp:minTemp,press:press,humidity:humidity,visibility:visibility});

        // writing JSON data to a file
        var json = JSON.stringify(weatherData);
        var fs = require('fs');
         fs.writeFile('myjsonfile.json', json, 'utf8', function(){

        });


      })

    });





})

app.listen(3000,function(){
  console.log("app is running");
})
