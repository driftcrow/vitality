Handlebars.registerHelper('toText',function(passedString){
    var text=  passedString.replace(/<\/?[^<>]+>/g,'');
    return new Handlebars.SafeString( text);
});
// if nprefix=1 then don't add prefix'
Handlebars.registerHelper('trimS', function(passedString, start, length , nprefix){
    var mlength = length,preS='',tailS='';
    var passedString =  passedString.replace(/<\/?[^<>]+>/g,'');


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

Handlebars.registerHelper("getimgsrc", function(htmlstr) {
    var reg=/<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
    var arr = [];
    while(tem=reg.exec(htmlstr)){
        arr.push(tem[2]);
    }
    return arr;
});

Handlebars.registerHelper("debug", function(optionalValue) {
    console.log("\nContext(this):");
    console.log("====================");
    console.log(this);

    console.log("--------------------");

    if (arguments.length > 1) {
        console.log("Value:");
        console.log("====================");
        console.log(optionalValue);
    }
});

Handlebars.registerHelper('checked', function(pValue){
    return ( pValue ? "checked" : '');
});


// Handlebars.registerHelper('dateF', function(pDate){
//     return new Handlebars.SafeString(pDate.getFullYear()+'-'+pDate.getMonth()+'-'+pDate.getDay());
// });


Handlebars.registerHelper('dateF', function(dt) {
    return (dt.getMonth()+1) + '/' + dt.getDate() + '/' + dt.getFullYear() + ' ' + (dt.getHours()+1) + ':'+dt.getMinutes();
});
