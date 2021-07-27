//create new node app
const express = require("express"); // require express module
const https = require("https"); // include HTTPS module
const bodyParser = require("body-parser"); // include body parser.
const app = express(); // create app which initializes express


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});  // end of root get request

//now catch the info of the form on website using app.post
app.post("/", function(req,res){
  // "res" is the response that our server sends back to client
  // using native node https module to make HTTPS request to external server
  const query = req.body.cityName;
  const apiKey = "fa7556bb141eec9254661299579146f0";
  const unitType = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey+ "&units=" + unitType;

  https.get(url, function(response){
    // console.log(response.statusCode); // Logs status code of the JSON respone of openweathermap API

    // calling the on method from the response, then use a callback function log data
    response.on("data", function(data){
      const weatherData = JSON.parse(data);

      // turns JSON in string fromat into Javascript object,
      // you can do the opposite and turn an object into a string using JSON.stringify

      // console.log(weatherData);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      // part of the JSON is the icon id for weather conditions
      const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<a href='/'>Home</a>")
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The temprature in" + query + " is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send(); 
    }) // end of response to openweathermap API
  }) // end of internal get request to openweathermap API
})






app.listen(3000, function(){
console.log(("Server running on port 3000"));
}) // callback function is server is running
