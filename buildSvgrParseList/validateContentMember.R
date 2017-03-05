source("./tableLoader.R")
requireTable( es.DT, AVEL.DT, AVD.DT, eaCS.DT, PA.DT, COP.DT)
content.DT<-es.DT[ variable=="content.model"]
svgR.DT<-content.DT[element=='svg']
svgR.DT$element<-'svgR'
content.DT<-rbind(content.DT, svgR.DT)
category.DT<-es.DT[ variable=="category"]
category.DT$value<-tolower(category.DT$value)

contentNames<-unique(content.DT$value)
contentList<-lapply(contentNames, function(cn){
  if(grepl("s:$", cn )){
    cnn<-gsub("s:", "", cn)
    category.DT[value==cnn]$element
  } else {
    cn
  }
})


names(contentList)<-contentNames
contentList
cll<-lapply(unique(content.DT$element), function(el){
  cv<-content.DT[element==el]$value
  cl<-unlist(contentList[cv])
  if(length(cl)==1 && cl=="Any elements or character data."){
    rtv<-""
  } else {
    v<-paste0('"', cl, '"')
    v<-paste0(v, collapse=", ")
    v<-gsub("[-:]",".",v)
    el<-gsub("[-:]",".",el)
    el<-paste0("'",el,"'")
    rtv<-paste(el,":", "[", v, "]")
  }
  rtv
})

clll<-cll[cll!=""]
clll<-paste0(clll,",")

all.elements<-unique(content.DT$element) #unique(es.DT$element)
all.elements<-gsub("[-:]",".",all.elements)
#all.elements<-paste0("'",all.elements,"'") 
all.elements<-all.elements[order(-nchar(all.elements), all.elements)]

allEleRule<-paste0('"',all.elements,'"', collapse="/ ")

txt0<-c(
  "var allElements = [",
   paste0('"', all.elements,'"', collapse=', '),
  "];\n"
)
txt1<-c(
  " var acceptContentEle = { ",
  clll,
  "};\n"
)
txt<-paste0(c(txt0,txt1), collapse="\n")
cat(txt,file = "validateContentMember2.txt")

# txt<-paste0(clll, collapse=",\n")
# cat(txt,file = "validateContentMember.txt")
# #txt<-gsub("-",".",txt)
# #txt<-gsub(":",".",txt)
# 
# cat(txt)
# 
# all.elements<-unique(es.DT$element)
# all.elements<-gsub("[-:]","$", all.elements) #can't use dot in js name
# txt<-paste0('"',all.elements,'"', collapse=', ')

# unique(es.DT$element)->all.elements
# unique(es.DT[ variable=="content.model"]$value)->all.values
# unique(es.DT[ variable=="category"]$value)->all.cats
# elemArgLookUp <- lapply(all.elements, function(elName){
#   elemArgs<-es.DT[element==elName & variable=="content.model"]$value
#   elemArgs<-paste0('"',elemArgs,'"',collapse=", ")
#   paste(elName, ": [", elemArgs, "]")
# })
# 
# cat(paste(elemArgLookUp, collapse=",\n"))
#   