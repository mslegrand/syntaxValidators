#!/usr/bin/Rscript --vanilla

# readom the source
sourceFile<-"./ptrparse.js"
targetFile<-"./TrestleTech/ace/lib/ace/mode/ptr/ptrparse.js"
sourceTail<-"./parseTail.js"

src<-readLines(sourceFile)
srcTail<-readLines(sourceTail)
pos1<-grep("use strict",src)
int01<-1:(pos1-1)
src1<-src[int01]
src<-src[-int01]

pos2<-grep("var mssgStack=",src)
pos3<-grep("peg\\$result = peg\\$startRuleFunction",src)

int23<-pos2:(pos3-1)
src2<-src[int23]
src<-src[-int23]

pos4<-grep("module\\.exports",src)-1
src<-src[1:pos4]

srcHead<-c('"use strict";','var PTRPARSER = (function(){')
  
src<-c(srcHead, src1, src2, src, srcTail)
src<-paste0("    ",src)
src<-c(
"define(function(require, exports, module) {",
src,
"});"
)
#src<-paste0(src,collapse="\n")
cat(src,file=targetFile, sep="\n")
