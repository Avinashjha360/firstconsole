const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

const { parse } = require('path');


app.get('/',function (req,res) {

res.sendFile(__dirname+"/index.html");

    
})

app.post('/',function(req,res){
    const city = req.body.cityname;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=53fc7a6806831afb49db5ffb8440ab02&units=metric"

    https.get(url,function(response){
        response.on("data",function (data) {
            const w = JSON.parse(data);
            const temp = w.main.temp;
            const desc = w.weather[0].description;
            const icon = w.weather[0].icon;
            const imgUrl= "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>The Temperature in "+city+" is "+temp+"degree celcius</h1>");
            res.write("<h4>The Current Weather is "+desc+"</h4>");
            res.write("<img src="+imgUrl+">");
            res.send();

        })
    });
});




app.listen(3000,function(){
    console.log("Server is running on 3000.");
})