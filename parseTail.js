//this.message  = message;
//  this.expected = expected;
//  this.found    = found;
//  this.location = location;
//  this.name     = "SyntaxError";

function ptr$parse(_input) {
mssgStack.length=0;
//console.log("Enter ptr$parse");
//console.log(typeof _input);  
if ( 'object' === typeof _input) {
  _input = undefined;
}

_input = _input || '';
var options={};
  
var okResult={message: "ok"};
var results=[];

try{
    //console.log("Enter ptr$parse: try{");
    if(_input  && typeof _input=="string" && _input.length >0){    
        result = peg$parse(_input, options );
        //console.log("Exit ptr$parse: try{ if(");
    }
    //console.log("Exit ptr$parse: try{ if(");
} catch(e){
    //console.log("ptrparse exception");
    //console.log(e.message);
   if( e instanceof peg$SyntaxError){
       var mssg= "error";
        if(e.message && e.location.start.line){
            addError(
            "Unexpected Symbol: " + e.found, e.location, "error")
            //e.message,e.location, "error")
            //return({
             //   message: e.message,
             //   found: e.found,
             //   index: e.location.start.offset,
             //   line: e.location.start.line,
             //   column: e.location.start.column, 
            //});
            
            
            //mssg=e.message;
            //var error = new SyntaxError(mssg);
            //error.index  = e.location.start.offset;;
            //error.line   = e.location.start.line;
            //error.column = e.location.start.column;;
            //throw error; 
        }

   }
   
}
// copy warnStack to results
//console.log("copy mssgStack to results");
//console.log("mssgStack.length=" + mssgStack.length );
mssgStack.forEach( function( warning ){
    var message =warning.message;
    var location=warning.location;
    var type=warning.type; 
    console.log(message);
    console.log(location.start.line);
    console.log(location.start.column);
    //console.log(location.end.line);
    //console.log(location.end.column);
    results.push({
        row: location.start.line-1,
        column: location.start.column-1,
        text: message,
        type: type
    })
})


//console.log("Exit ptr$parse");

return results;
};

return {
  version: '0.1.2',
  parse: ptr$parse
};

})();

module.exports.PTRPARSER = PTRPARSER;




