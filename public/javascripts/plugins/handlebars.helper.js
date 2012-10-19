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

Handlebars.registerHelper("getimgsrc", function(htmlstr,single) {
    var reg=/<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
    var arr = [];
    while(tem=reg.exec(htmlstr)){
        arr.push(tem[2]);
    }

    if(single)
        return arr[0]
    else
        return arr;
});

Handlebars.registerHelper("disHtml", function(html,options) {
    var fn = options.fn, inverse = options.inverse;
    var reg=/<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
    var arr = [];
    while(tem=reg.exec(html)){
        arr.push(tem[2]);
    }
    var ret = "", data;
    var text=  html.replace(/<\/?[^<>]+>/g,'');

    if (options.data) {
        data = Handlebars.createFrame(options.data);
    }


    if (data) { data.hasimg = arr[0]?true:false,
                data.coverimg = arr[0],
                data.imgs = arr,
                data.text = text,
                data.html = html
              }
    return fn(html, { data: data });
});

Handlebars.registerHelper("debug", function(optionalValue,description) {
    console.log(description);
    console.log("\nCurrent Context(this):");
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


// a iterate over a specific portion of a list.
// usage: {{#slice items offset="1" limit="5"}}{{name}}{{/slice}} : items 1 thru 6
// usage: {{#slice items limit="10"}}{{name}}{{/slice}} : items 0 thru 9
// usage: {{#slice items offset="3"}}{{name}}{{/slice}} : items 3 thru context.length
// defaults are offset=0, limit=5
// todo: combine parameters into single string like python or ruby slice ("start:length" or "start,length")
Handlebars.registerHelper('slice', function(context, block) {
  var ret = "",
      offset = parseInt(block.hash.offset) || 0,
      limit = parseInt(block.hash.limit) || 5,
      i = (offset < context.length) ? offset : 0,
      j = ((limit + offset) < context.length) ? (limit + offset) : context.length;

  for(i,j; i<j; i++) {
    ret += block(context[i]);
  }

  return ret;
});




//  return a comma-serperated list from an iterable object
// usage: {{#toSentance tags}}{{name}}{{/toSentance}}
Handlebars.registerHelper('toSentance', function(context, block) {
  var ret = "";
  for(var i=0, j=context.length; i<j; i++) {
    ret = ret + block(context[i]);
    if (i<j-1) {
      ret = ret + ", ";
    };
  }
  return ret;
});



//  format an ISO date using Moment.js
//  http://momentjs.com/
//  moment syntax example: moment(Date("2011-07-18T15:50:52")).format("MMMM YYYY")
//  usage: {{dateFormat creation_date format="MMMM YYYY"}}
Handlebars.registerHelper('dateFormat', function(context, block) {
  if (window.moment) {
    var f = block.hash.format || "MMM Do, YYYY";
    return moment(Date(context)).format(f);
  }else{
    return context;   //  moment plugin not available. return data as is.
  };
});


// page a list for specification number of per page
// usage: {{#page items page=5}}{{name}}{{/page}}
// defaults are page=5
// todo:
Handlebars.registerHelper('page', function(context, options) {
    var fn = options.fn, inverse = options.inverse;
    var ret = "", data,pagetmpl=[];
    var tmpl = options.hash.tmpl || [];                 // tmpl is array like[[],[]..]
    var nPage = parseInt(options.hash.page) || 5; // list element per page
    var pageCount =Math.ceil(context.length/nPage);

    if(tmpl){
        for(var i = 0; i < pageCount;i++){
            pagetmpl[i] = parseInt(Math.random()*(tmpl.length));
        }
    }

    if (options.data) {
        data = Handlebars.createFrame(options.data);
    }

    if(context && context.length > 0) {
        for(var i=0, j=context.length; i<j; i++) {
            if (data) { data.index = i,
                        data.page = parseInt(i/nPage),
                        data.pIndex = i%nPage,
                        data.pStart=i%nPage?false:true,
                        data.pEnd=(i%nPage===0 && i!=0),
                        data.end=(i===(j-1)),

                        data.tmpl = tmpl[pagetmpl[data.page]]?tmpl[pagetmpl[data.page]][data.pIndex]:''
                        // data.tmpl = tmpl[data.page][data.pIndex]
                      }
            ret = ret + fn(context[i], { data: data });
        }
    } else {
        ret = inverse(this);
    }
    return ret;
});


var topic_tmpl = [["w-25 h-70","w-50 h-70 box-b-l box-b-r","w-25 h-70","w-50 h-30 box-b-r title-top","w-50 h-30 title-top"],
                  ["w-30 h-60 box-b-r title-top","w-70 h-60 box-img-left title-top","w-40 h-40 box-img-left box-b-r title-top","w-30 h-40 box-b-r title-top","w-30 h-40 title-top"]
                 ];
