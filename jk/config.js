var gradeUrl = "/zkcj" ; //"http://113.108.127.189:8080";
var jsonp = ""; //"&jsonp=?";//跨域配置
var schoolListUrl = gradeUrl + "/public/pg.do?method=getXx"+jsonp;
var yearsListUrl = gradeUrl + "/public/pg.do?method=getNf"+jsonp;
var detailListUrl = gradeUrl + "/public/pg.do?method=getFsx"+jsonp;
var gradechxUrl = gradeUrl + "/public/pg.do?method=getZkCj"+jsonp;
var recruitUrl = gradeUrl + "/public/pg.do?method=getTycx"+jsonp;//通用查询
var addcodeUrl = gradeUrl + "/login/login.addcode?_t=";
//recruitUrl = "http://10.0.6.71:8020/znpc_test/public/pg.do?method=getTycx"+jsonp;//通用查询
