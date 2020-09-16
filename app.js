const express = require("express");
const getDate = require("./date");
const app = express();
const date = require(__dirname + "/date.js");

let items = ["Dogs", "Big Dogs", "Small dogs"];
let workItems = [];

app.set("view engine","ejs");

app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));


app.get("/", function(req, res){
    
    let day = date.getDate();

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