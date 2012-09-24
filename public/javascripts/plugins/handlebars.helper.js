// if nprefix=1 then don't add prefix'
Handlebars.registerHelper('trimS', function(passedString, start, length , nprefix){
    var mlength = length,preS='',tailS='';

    if(! (nprefix === 1) )
    {
        if(start>0 && passedString.length>3){
            var preS= '...';
            mlength = length -3;
        } ;
        if(passedString.length>(start + length )){
            tailS = '...';
            mlength = mlength -3;
        };
    };
    var theString = preS + passedString.substr(start, mlength) + tailS;
    return new Handlebars.SafeString(theString);
});


Handlebars.registerHelper("debug", function(optionalValue) {
    console.log("\nCurrent Context");
    console.log("====================");
    console.log(this);

    if (arguments.length > 1) {
        console.log("Value");
        console.log("====================");
        console.log(optionalValue);
    }
});

// Handlebars.registerHelper('dateF', function(pDate){
//     return new Handlebars.SafeString(pDate.getFullYear()+'-'+pDate.getMonth()+'-'+pDate.getDay());
// });


Handlebars.registerHelper('dateF', function(dt) {
    return (dt.getMonth()+1) + '/' + dt.getDate() + '/' + dt.getFullYear() + ' ' + (dt.getHours()+1) + ':'+dt.getMinutes();
});
