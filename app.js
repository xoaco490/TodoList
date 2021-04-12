const express = require("express");
//const getDate = require("./date");
const app = express();
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose")
const _= require("lodash");
/*let items = ["Dogs", "Big Dogs", "Small dogs"];
let workItems = [];*/
//1 field name type string!!!
mongoose.connect('mongodb://localhost:27017/todolistDB', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

const itemSchema = new mongoose.Schema({
    item:{
        type: String,
        required: true
    }
});

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({item:"Welcome to your todolist!"})

const item2 = new Item({item:"Hit the + button to add a new item."})

const item3 = new Item({item:"<-- Hit this to delete an item."})

const defaultItems = [item1,item2,item3];

const listSchema = {
    name: String,
    items: [itemSchema]
};

const List = mongoose.model("List", listSchema);

//Item.insertMany(defaultItems,function(err){
//    if(err){console.log(err);}
//    else{console.log("Succesfuly saved all the items into DB")}
//});

app.set("view engine","ejs");

app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));


app.get("/", function(req, res) {

    Item.find({}, (err, itemsList) => {
   
      if(itemsList.length === 0){
        Item.insertMany(defaultItems, (err) => { (err) ? console.log(err) : console.log("Succesfully saved defaults items to DB.") });
        itemsList = defaultItems;
      }
   
      res.render("list", {listTitle: "Today", newListItems: itemsList});
   
    });
   
});

app.post("/", function(req,res){
    const itemName = req.body.newItem;
    const listName = req.body.list;
    const item = new Item({
        item: itemName
    });

    if(listName === "Today"){
        item.save();
        res.redirect("/");
    } else {
        List.findOne({name: listName}, function(err, foundList) {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        });
    }


});



app.post("/", function(req,res){
    let item = req.body.newItem;
    if(req.body.list == "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        //items.push(Item);
        res.redirect("/");
    }
});

app.get("/:customListName", function(req,res){
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name: customListName}, function(err, foundList){
        if(!err){
            if(!foundList){
                //Create a new list
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save()
                res.redirect("/"+customListName)
            }else{
                //Show an existing list
                res.render("list",{listTitle: foundList.name, newListItems: foundList.items})
            }
        }
    });

});




app.post("/del", function(req, res) {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if(listName === "Today"){
        Item.findByIdAndRemove(checkedItemId, function(err){
            if(!err){
                    console.log("succesfully deleted checked item.");
            }
        });
    } else {
        List.findOneAndUpdate({name: listName},{$pull: {items: {_id: checkedItemId}}},function(err,foundList){
            if(!err){
                res.redirect("/"+listName);
            }
        });
    }



});


app.listen(3000, function(){
    console.log("Server is on port 3000")
});