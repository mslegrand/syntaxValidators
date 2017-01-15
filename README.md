# syntaxValidators
peg source for pegjs: Used for creating parser to check syntax for the ACE editor

This is a rather specialized collection of scripts, designed solely to create a parser
to be called by a worker for the ptr-mode in the ACE editor. The steps involved here
are

1. edit:  ptR.peg
2.  compile: pegjs -o ptrparse.js ptR.peg
3.  merge: parseTail.js is to be merged into ptrparse.js
4.  copy: ptrparse.js to the local ace repository
5.  compile ace:  node ./Makefile.dryice.js -m -nc
6.  test the results
7.  when ok, copt to ptR repository

steps 3 and 4 are combined into the makePtrParse.r script. 
