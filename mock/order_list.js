module.exports = function(param){
  var pageIndex=Number(param.pageIndex);
  var pageSize=Number(param.pageSize);
  
  var start=(pageIndex-1)*pageSize+1;
  if(pageIndex==3) pageSize=pageSize-1;
  var end=pageIndex*pageSize;
  var res={};
  res.IsSuccess=true;
  res.Content="成功";
  var list=[];
  for(var i=start;i<=end;i++)
  {i
    list.push({
      name:"我是一个名字"+i,
      intro:"我是一个简介"+i,
      desc:"我是一个描述"+i,
      tag:[{id:1,name:"标签1"},{id:2,name:"标签2"}]
    });
  }
  if(pageIndex>3) list=null;
  res.data=list;
  return res
}