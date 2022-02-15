const express = require("express");
const https=require("https");
const bodyParser=require("body-parser");


const { dirname } = require("path");
// native module bundelled with Node.js

const app=express();
// initalise new app

app.use(bodyParser.urlencoded({extended:true}));

//our app use body parser 
//urlencoded({extended:true}--->>>transforms the text-based JSON input into JS-accessible variables 
// the extended: true precises that the req.body object will contain values of any type instead of just strings.




app.get("/" , function(req,res){


    // adding html file or rendring html file 
    res.sendFile(__dirname +"/index.html");

    // res.send("server is running")
});

app.post("/",function(req,res){
    // console.log(req.body.cityname)
    // console.log("post recieved")
    
    const query =req.body.cityname;
    const appkey="c9f3d36fa2d0e459489160189da350ce";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?units="+ units +"&appid="+ appkey +"&q=" + query;

    //never forget to write htttps://

    https.get(url , function(response){
        console.log(response.statusCode);

        //use on function to take data made a function which takes data and respond through console log data
        response.on("data", function(data){

            //console.log(data);--->> returns data in hexa decimal so we use

            const weatherData=JSON.parse(data)
            //console.log(weatherData);
            // to print javascript 

            // const object={
            //     name:"tanya",
            //     favouritefood:"momos"
            // }
            // console.log(JSON.stringify(object));
            //stringify converts javascript to string 

            // to print specific data
            const temp =weatherData.main.temp
            // console.log(temp);

            //to write path we can use json.parser view extension

            const weatherDescription=weatherData.weather[0].description
            // console.log(weatherDescription);

            const icon=weatherData.weather[0].icon
            const imageURL="https://openweathermap.org/img/wn/" + icon + "@2x.png"

            //wrote this because 2 res files cannot be executed 
            res.write("<p>The wheather is currently "+ weatherDescription);

            res.write("<h1>The temprature in " + query +" is "+ temp+"degree celsius</h1>");
            res.write("<img src=" + imageURL +">");
            res.send()
            
            


        
        })
    })
})





app.listen(3300,function(){
    console.log("server started on port 3300");
})