exports.getDate =  function(){
    let today = new Date();
    
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    //por alguna razon es-AR y es-ES no funcionan revisar.
    return today.toLocaleDateString("en-US", options);;
};

exports.getDay = function(){
    let today = new Date();
    
    let options = {
        weekday: "long"
    };
    return today.toLocaleDateString("en-US", options)
};