const express=require("express");
const parser=require("body-parser");
const app=express();
const https=require("https");

app.use(parser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/index.html");
});

app.post("/success",function(req,res){
  var city=req.body.city;
  var query=city;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&APPID=12d357f9ff88003fd3acd782c3747979&units=metric"
  https.get(url,function(response)
 {
     console.log(response.statusCode);

     response.on("data",function(data){
       const weather=JSON.parse(data);
       const temp=weather.main.temp;
       const descrip=weather.weather[0].description;
       const icon=weather.weather[0].icon;
       const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
       res.send("<center><h1>The temperature in "+query+" is "+temp+" degrees Celcius!</h1><br><p>The Weather is currently "+descrip+" </p><br><img src="+imageURL+">");
   })
 })
});

app.listen(process.env.PORT || 3000,function()
{
  console.log("Server is running!");
});
