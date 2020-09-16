const express = require("express");
const getDate = require("./date");
const app = express();
const date = require(__dirname + "/date.js");

let items = ["Dogs", "Big Dogs", "Small dogs"];
let workItems = [];

app.set("view engine","ejs");

app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));

//app.use("view engine",ejs);

app.get("/", function(req, res){
    
    
    let day = date.getDate();
    /* var currentDay = today.getDay(); */
     
    //res.write("<h1>Hello chieff. everything is in order here.</h1>")
    //res.sendFile(__dirname + "/index.html")
    //res.write("<h1>Btw its fucking monday FFS</h1>");
    //res.send();
    // render siempre va a revisar dentro de la carpeta llamada views a buscar el archivo mencionado
    //res.sendFile(__dirname + "/index.html")
    //res.write("<h1>Cool, its not monday.</h1>");
    //res.send()
    
   /*  switch(currentDay){
        case 0:
            day = "Domingo";
            break;
        case 1:
            day = "Lunes";
            break;
        case 2:
            day = "Martes";
            break;
        case 3:
            day = "Miercoles";
            break;
        case 4:
            day = "Jueves";
            break;
        case 5:
            day = "Viernes";
            break;
        case 6:
            day = "Sabado";
            break;
             
        default:
            console.log("Error: el dia equivale a "+ currentDay)
    } */


    res.render("list", {listTitle:day, newListItems: items} );
});

app.post("/", function(req,res){
    let item = req.body.newItem;
    if(req.body.list == "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work list", newListItems: workItems} );
});



app.listen(3000, function(){
    console.log("Server is on port 3000")
});