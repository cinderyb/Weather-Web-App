const { Console } = require("console");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const https = require("https");


app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    
    const query = req.body.cityName;
    const apiKey = "998c8c2d369a5970aab1b9a3fd8960d9";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid=" + apiKey;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const cityName = weatherData.name;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";


            res.write("<h1>The temperature in " + cityName + " is " + temp + " degress Celcius.</h1>")
            res.write("<p>The weather is currently " + weatherDescription + ".</p>");
            res.write("<img src = "+imageURL+">");
            
            res.send();
            
    });

    });
});








app.listen(3000, function(){
    console.log("server is running on port 3000");
});