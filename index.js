require('./mongoconnet')
const express = require("express")
const  bodyParser =require("body-parser");
const  mongoose =require( "mongoose");
const fileupload = require('express-fileupload');
const  cors =require("cors");
const poster = require("./routes/post")
const app = express();

const dotenv = require("dotenv")  
dotenv.config({path:"./config.env"})

app.use(fileupload())
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));  
app.use(cors());
app.use(poster); 
app.use (express.static('public'))



app.get('/',(req,res)=>{
  res.send('Service Started ')
});
app.get('/goods',(req,res)=>{
  res.send('Sell goods AND PRODUCTS ')
});
app.get('/price',(req,res)=>{
  res.send('Price will be declared later...')
});


const CONNECTION_URL ="mongodb+srv://Nodejstutorial:Nodejstutorial123@cluster0.0y601.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5111;

mongoose
.connect(CONNECTION_URL).then(()=>{console.log('connect to mongoose')})
  .then(() =>
    app.listen(PORT, () => console.log(`server runnunig on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));