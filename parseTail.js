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
    peg$parse(_input, options );
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
}; //end of ptr$parse

function ptr$context( _input, _cursorPos ){
    mssgStack.length=0;
    contextStack.length=0;
    if ( 'object' === typeof _input) {
      _input = undefined;
    }
    _input = _input || '';
    //var options={};
    var options={cursorPos: _cursorPos};
    var contextCandidate = {
            tok: "",
            pos: {line: -1, col: -1}
    };
    try{
        if( _input  && 
            "string"=== typeof _input && 
            _input.length >0
        ){    
            result = peg$parse(_input, options );
            //now get the context with the largest start value
           
            console.log("contextStack=");
            console.log(JSON.stringify(contextStack));
            for( var i=0, len=contextStack.length; i<len; i++)
           {
               contx=contextStack[i];
               console.log(JSON.stringify(contx));
               var comp=comparePos(
                        contextCandidate.pos.line,
                        contextCandidate.pos.col,
                        contx.location.start.line,
                        contx.location.start.column
                )
                console.log(comp);
               
                if(
                    comparePos(
                        contextCandidate.pos.line,
                        contextCandidate.pos.col,
                        contx.location.start.line,
                        contx.location.start.column
                    )==1
                ){
                    contextCandidate.pos.line=contx.location.start.line ;
                    contextCandidate.pos.col=contx.location.start.column;
                    contextCandidate.tok=contx.token;
                }
            }
        }
    } catch(e){
       if( e instanceof peg$SyntaxError){
           var mssg= "error";
        if(e.message && e.location.start.line){
            addError(
            "Unexpected Symbol: " + e.found, e.location, "error")
           }
       }
    }
    console.log("contextCandidate=");
    console.log(JSON.stringify(contextCandidate));
    return contextCandidate;
};


function ptr$availableCompletions( _input, _cursorPos ){
    mssgStack.length=0;
    var cntx = ptr$context( _input, _cursorPos );
    available=[];
    if(cntx.length>0){
        var tok = cntx[0];
        var availAttr= acceptedAttributes[tok];
        var availCntnt= acceptContentEle[tok];
        available= availAttr.concat(availCntnt);
    }
    return available;
}

function ptr$scope(  _input, _cursorPos){
    console.log("Enter ptr$scope");
    console.log("_cursorPos=");
    console.log(JSON.stringify(_cursorPos));
    //mssgStack.length=0;
    //contextStack.length=0;
        return ptr$context( _input, _cursorPos ).tok;
}


return {
  version: '0.2.0',
  parse: ptr$parse,
  scope:  ptr$scope,
  attributeMap:	acceptedAttributes,
  contentMap: 	acceptContentEle
};

})();

module.exports.PTRPARSER = PTRPARSER;




