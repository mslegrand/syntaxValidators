# syntaxValidators
peg source for pegjs: Used for creating parser to check syntax for the ACE editor

This is a rather specialized collection of scripts, designed solely to create a parser
to be called by a worker for the ptr-mode in the ACE editor. The steps involved here
are


## The Process (Revised)

0. May want to backup ptR.peg, ptrparse.js, parseTail.js just in case
1. Make appropriate changes to
    + ptR.peg
        + may need to use buildSvgrParseList to accomplish this
    + parseTail.js (optional)
2. Compile 
```
    pegjs -o ptrparse.js ptR.peg
```
3. Merge parseTail.js into ptrparse.js and place results in TrestleTech/Ace
```
./makePtrParse.r
```
4. CompileAce
```
./compileAce.sh
```
5. Copy build to pointR project
```
./copyBuild2PointR.sh
```
