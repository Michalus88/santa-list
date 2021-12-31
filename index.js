const express = require('express');
const { engine } = require('express-handlebars');

const app = express();

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.get("/",(req,res)=>{
    res.send("home")
})

app.listen(3000)