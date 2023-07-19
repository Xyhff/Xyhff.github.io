/*rem自适应*/
function thissize() {
    var w = $('#wrap').width() / 640;
    $("html").css({ "font-size": 100 * w + "px" });
};

var lih3="";
var cls="";
var ksh = "";
//var ksn ="";
var csrq = "";
var yzm="";

/*首页点击进入相应的页面*/
$(function(){
	$("#bg").hide();
	$(".list-grade li").click(function(){		
		cls=$(this).find("p").attr("id");
//		if(cls=="grade-qua"){
//			alert('暂未开放，请按页面提醒时间查询！') ;
//			return ;
//		}
		$("#middle-grade,#grade-result").hide();
		$("#gd-inquiries").show();
		var jc = $(this).find("p").attr("jc");
		if(!jc || jc===""){
			globalqui($(this).find("p").text(),cls);
		}
		else{
			globalqui(jc,cls);
		}
	})
})

/*总体页面查询录取的样式：准考证号，姓名，出生日期，验证码*/
function globalqui(lih3,cls){
	$("#gd-inquiries").empty();
	var top= $("<div class='citytop'></div>");
	var title =$("<h3>"+lih3+"</h3>");
	var icon = $("<div class='iconback'></div>");
	$(top).append(title,icon);
	
	var content=$("<div class='content-1 grade-qui'></div>");
	var form= $("<form action='' method='get' autocomplete='on'></form>");
	var table = $("<table></table>");
	var tr1 = $("<tr><td>"+"准考证号："
				+"</td><td class='ksh'><input type='text' class='zk_ksh' placeholder='请输入准考证号' /></td></tr>");
	var tr2= $("<tr><td>"+"姓名："
				+"</td><td class='ksn'><input type='text' class='zk_xm' placeholder='请输入姓名' /></td></tr>");
//	if(cls=="grade-qua"){
//		var tr3= $("<tr><td>"+"出生日期："
//				+"</td><td class='csrq'><input type='text' class='zk_csrq' placeholder='例如9701(年月)' /></td></tr>");
//	}
//	else{
		var tr3= $("<tr><td>"+"出生日期："
				+"</td><td class='csrq'><input type='text' class='zk_csrq' placeholder='例如19980101' /></td></tr>");
//	}
	
	var tr4= $("<tr class='xgyzm'><td>"+"验证码："
	            +"</td><td class='val-code'><input type='text' class='zk_zkzh' id='addcode' placeholder='请输入验证码'  />"
				+"<img class='mycode mid-valcode' id='randomImage' onclick='refreshAddcode()' style='display:none' />"
				+"</td></tr>");
	var pcha = $("<p class='chek'><input type='button' value='<a href="jk/fake.html" target="_self">查询</a>' class='chax grade-chx' /></p>");
	$(table).append(tr1,tr2,tr3,tr4);
//	$(table).append(tr1,tr3,tr4);
	$(form).append(table,pcha);
	$(content).append(form);
	$("#gd-inquiries").append(top,content);
	
	$(".iconback").click(function(){
		$("#middle-grade").show();
		$("#gd-inquiries,#grade-result").hide();
	});
	
	
	/*点击查询传入参数--总入口*/
	$(".chek").click(function(){
		ksh = $(".zk_ksh").val();
		ksn = $(".zk_xm").val();
		csrq = $(".zk_csrq").val();
		yzm = $(".zk_zkzh").val();
		/*input必填项*/
		if(!ksh || !csrq || !yzm){
			alert("请输入相应的信息！");
			return false;
		}
		grade(cls, ksh , csrq, yzm, result, ksn );
//		result(cls,ksh,csrq,yzm);
	})
}


/*总体页面结果查询：*/
function result(ret){
	if(ret.success){
		var data = ret.data;
		if(data&&data.length>0){
			$(".content-1").empty();
			$("#grade-result").empty();
			var result =$("<div class='grade-result'></div>");
			var rstop = $("<div class='citytop'></div>");
			var rsh3 = $("<h3>"+"查询结果"+"</h3>");
			var icon =$("<div class='iconback'></div>");
			$(rstop).append(rsh3,icon);
			var recruitcontent = $("<div class='recruitcontent'></div>");
			$(result).append(rstop,recruitcontent);
			$("#grade-result").append(result);
			
			$(".iconback").click(function(){
				$("#middle-grade").show();
				$("#gd-inquiries,#grade-result").hide();
			});
			
			$("#gd-inquiries").hide();
			$("#grade-result").show();
			
			if(cls=="grade-qua"){
				gdrsdetail(data[0]);
			}
			if(cls=="gzgkcj-qua"){
				gzcjdetail(data[0]);
			}
			if(cls=="gzgklq-qua"){
				rcdetail(data[0]);
			}
			if(cls=="zzgkcj-qua"){
				zzcjdetail(data[0]);
			}
			if(cls=="zzgklq-qua"){
				zzdetail(data[0]);
			}
		}else{
			$("#gd-inquiries").show();
			refreshAddcode();
			alert("输入信息（考生号等）不匹配！");
		}
	}else{
		$("#gd-inquiries").show();
		refreshAddcode();
		alert(ret.msg) ;
	}
}

/*验证码*/
function refreshAddcode(){
	$("#addcode")[0].value='' ;
	$('#randomImage').attr('src', addcodeUrl + Math.random()) ;
	if ($("#addcode")[0].value===''){
		//$(".zk_ksh").focus();
		//$("#addcode")[0].focus() ;
	}
}
$(document).on("focus",".zk_csrq",function(){
	if($("#randomImage").css("display")=="none"){
		$("#randomImage").show();
		refreshAddcode();
	}
	else{
		$("#randomImage").show();
	}
});

function grade(cls, ksh , csrq, yzm, successFn , ksn) {
//	$(".content-1").empty();
	//console.log(cls, ksh, ksn , csrq,yzm);
	var cxjson = [{"csrq":csrq}];
	var tableName = "zkcj";
	if(cls=="grade-qua"){
		tableName = "zkcj";
		cxjson = [{"csrq":csrq, "zkzh_xm":ksn}];
	}
	if(cls=="gzgkcj-qua"){
		tableName = "gzgkcj";
		cxjson = [{"k9":csrq, "zkzh_xm":ksn}];
	}
	if(cls=="gzgklq-qua"){
		tableName = "gzgklq";
		cxjson = [{"k4":csrq, "zkzh_xm":ksn}];
	}
	if(cls=="zzgkcj-qua"){
		tableName = "zzgkcj";
		cxjson = [{"k5":csrq, "zkzh_xm":ksn}];
	}
	if(cls=="zzgklq-qua"){
		tableName = "zzgklq";
		cxjson = [{"k4":csrq, "zkzh_xm":ksn}];
	}
	$.getJSON(recruitUrl, {
			ks_h: ksh,
			addcode:yzm,
			t: tableName,
			req_json: JSON.stringify(cxjson)
		}, successFn) ;
}


//汕头中考
function gdrsdetail2(data){
	//alert("111");
	var gdrstable=$("<table></table>"); 
	var kxmtr=$("<tr><td class='cxjg_r2'>准考证号：</td><td class='cxjg_l2'>"+(data.ks_h?data.ks_h:"/")+"</td></tr>");
//	var bmtr1=$("<tr><td  class='cxjg_r4'>报名号：</td><td class='cxjg_l2'> "+(data.schoolno?data.schoolno:"/")+"</td></tr>");
	var xmtr1=$("<tr class='borttom2'><td  class='cxjg_r3'>姓名：</td><td class='cxjg_l2'>"+(data.zkzh_xm?data.zkzh_xm:"/")+"</td></tr>");
	
	var lqtr= $("<tr><td class='cxjg_r2'>录取学校：</td><td class='cxjg_l2'><span>"+(data.schoolname?data.schoolname:"/")+"</span></td></tr>");

//      $(gdrstable).append(kxmtr,bmtr1,xmtr1,lqtr);
	$(gdrstable).append(kxmtr,xmtr1,lqtr);
	$(".recruitcontent").append(gdrstable);
}

function gdrsdetail(data){
	//alert("111");
	var gdrstable=$("<table></table>"); 
	var kxmtr=$("<tr><td class='cxjg_r2'>准考证号：</td><td class='cxjg_l2'>"+(data.ks_h?data.ks_h:"/")+"</td></tr>");
//	var bmtr1=$("<tr><td  class='cxjg_r4'>报名号：</td><td class='cxjg_l2'> "+(data.schoolno?data.schoolno:"/")+"</td></tr>");
	var xmtr1=$("<tr class='borttom2'><td  class='cxjg_r3'>姓名：</td><td class='cxjg_l2'>"+(data.zkzh_xm?data.zkzh_xm:"/")+"</td></tr>");
	
	var lqtr= $("<tr><td class='cxjg_r2'>录取学校：</td><td class='cxjg_l2'><span>"+(data.schoolname?data.schoolname:"/")+"</span></td></tr>");
	
	var xmtr=  $("<tr><td class='cxjg_r'>数学：</td><td class='cxjg_l'><span>"+(data.sx?data.sx:"/")
			+"</span></td><td class='cxjg_r'>语文：</td><td class='cxjg_l'><span>"+(data.yw?data.yw:"/")+"</span></td></tr>");	
	var lhywtr=$("<tr><td class='cxjg_r'>英语：</td><td class='cxjg_l'><span>"+(data.yy?data.yy:"/")
			+"</span></td><td class='cxjg_r'>道德与法治：</td><td class='cxjg_l'><span>"+(data.zz?data.zz:"/")+"</span></td></tr>");
	var sxyytr=$("<tr><td class='cxjg_r'>物理：</td><td class='cxjg_l'><span>"+(data.wl?data.wl:"/")
			+"</span></td><td class='cxjg_r'>化学：</td><td class='cxjg_l'><span>"+(data.hx?data.hx:"/")+"</span></td></tr>");
	var splstr=$("<tr><td class='cxjg_r'>历史：</td><td class='cxjg_l'><span>"+(data.ls?data.ls:"/")
			+"</span></td><td class='cxjg_r'>体育：</td><td class='cxjg_l'><span>"+(data.ty?data.ty:"/")+"</span></td></tr>");
	var wlhxtr=$("<tr><td class='cxjg_r'>综合素质：</td><td class='cxjg_l'><span>"+(data.zhszpd?data.zhszpd:"/")+"</span></td>" +
			"<td class='cxjg_r'>总分：</td><td class='cxjg_l'><span>"+(data.zf?data.zf:"/")+"</span></td></tr>");	
	var jmztr= $("<tr class='borttom2'><td class='cxjg_r'>投档分数：</td><td class='cxjg_l'><span>"+(data.lq?data.lq:"/")+"</span></td>" +
	      "<td class='cxjg_r'>同分投档序：</td><td class='cxjg_l'><span>"+(data.lq1?data.lq1:"/")
	      +"</span></td></tr>");

//      $(gdrstable).append(kxmtr,bmtr1,xmtr1, xmtr,lhywtr,sxyytr,splstr,wlhxtr,jmztr,lqtr);
	$(gdrstable).append(kxmtr,xmtr1, xmtr,lhywtr,sxyytr,splstr,wlhxtr,jmztr,lqtr);
//	$(gdrstable).append(kxmtr,bmtr1,xmtr1,lqtr);
	$(".recruitcontent").append(gdrstable);

var lqtr2= $("<p style='margin: 0 0.5rem;color: red;font-size: 14px;'>注：1、查询结果仅供参考，成绩与录取结果以市招生办印发的《成绩通知单》和《录取通知单》为准。</p>");	

var lqtr3= $("<p style='margin: 0 0.5rem 0 0.9rem;color: red;font-size: 14px;'>2、考生应在7月22日前到录取学校办理注册手续，否则视为自行放弃入学资格。</p>");


        $(".grade-result").append(lqtr2);

        $(".grade-result").append(lqtr3);

}



/*高中高考成绩查询*/
function gzcjdetail(data){
	//alert("222");
	var gdrstable=$("<table></table>");
	var kxmtr=$("<tr class='borttom'><td>"+"考生号："+data.ks_h+"</td><td class='pdnone'>"+"姓名："+data.xm+"</td></tr>");
	var lhywtr=$("<tr><td class='widthds'>"+"语文："+"<span>"+(data.k1?data.k1:"/")+"</span></td><td>"+"理科数学："+"<span>"+(data.k2?data.k2:"/")+"</span></td></tr>");
	var sxyytr=$("<tr><td class='widthds'>"+"文科数学："+"<span>"+(data.k3?data.k3:"/")+"</span></td><td>"+"外语："+"<span>"+(data.k4?data.k4:"/")+"</span></td></tr>");
	var splstr=$("<tr><td class='widthds'>"+"理科综合："+"<span>"+(data.k5?data.k5:"/")+"</span></td><td>"+"文科综合："+"<span>"+(data.k6?data.k6:"/")+"</span></td></tr>");
	var wlhxtr=$("<tr><td class='widthds'>"+"理科总分："+"<span>"+(data.k7?data.k7:"/")+"</span></td><td>"+"文科总分："+"<span>"+(data.k8?data.k8:"/")+"</span></td></tr>");
	
	$(gdrstable).append(kxmtr,lhywtr,sxyytr,splstr,wlhxtr);
	$(".recruitcontent").html(gdrstable);
	//$(".recruitcontent").html(rctable);
}

/*高中高考录取查询*/
function rcdetail(data){
	//alert("333");
	var rctable=$("<table></table>");
	var kstr=$("<tr class='jiange'><td>"+"考生号："+(data.ks_h?data.ks_h:"/")+"</td><td>"+"姓名："+(data.xm?data.xm:"/")+"</td></tr>");
	var lqxxtr=$("<tr><td>"+"录取学校："+"</td><td><span class='rujgb'>"+(data.k2?data.k2:"/")+"</span></td></tr>");
	var lqpctr=$("<tr><td>"+"录取批次："+"</td><td><span class='rujgb'>"+(data.k1?data.k1:"/")+"</span></td></tr>");
	var lqjgtr=$("<tr><td>"+"录取专业："+"</td><td><span class='rujgb'>"+(data.k3?data.k3:"/")+"</span></td></tr>");
	$(rctable).append(kstr,lqxxtr,lqpctr,lqjgtr);
	$(".recruitcontent").html(rctable);
}

/*职中高考成绩查询*/
function zzcjdetail(data){
	//alert("444");
	var gdrstable=$("<table></table>");
	var kxmtr=$("<tr class='borttom'><td>"+"考生号："+(data.ks_h?data.ks_h:"/")+"</td><td class='pdnone'>"+"姓名："+(data.xm?data.xm:"/")+"</td></tr>");
	var lhywtr=$("<tr><td class='widthds'>"+"语文："+"<span>"+(data.k1?data.k1:"/")+"</span></td><td>"+"数学："+"<span>"+(data.k2?data.k2:"/")+"</span></td></tr>");
	var sxyytr=$("<tr><td class='widthds'>"+"英语："+"<span>"+(data.k3?data.k3:"/")+"</span></td><td>"+"总分："+"<span>"+(data.k4?data.k4:"/")+"</span></td></tr>");
	$(gdrstable).append(kxmtr,lhywtr,sxyytr);
	$(".recruitcontent").html(gdrstable);
}

/*职中高考录取查询*/
function zzdetail(data){
	//alert("555");
	var rctable=$("<table></table>");
	var kstr=$("<tr class='jiange'><td>"+"考生号："+(data.ks_h?data.ks_h:"/")+"</td><td>"+"姓名："+(data.xm?data.xm:"/")+"</td></tr>");
	var lqxxtr=$("<tr><td>"+"录取学校："+"</td><td><span class='rujgb'>"+(data.k2?data.k2:"/")+"</span></td></tr>");
	var lqpctr=$("<tr><td>"+"录取批次："+"</td><td><span class='rujgb'>"+(data.k1?data.k1:"/")+"</span></td></tr>");
	var lqjgtr=$("<tr><td>"+"录取专业："+"</td><td><span class='rujgb'>"+(data.k3?data.k3:"/")+"</span></td></tr>");
	$(rctable).append(kstr,lqxxtr,lqpctr,lqjgtr);
	$(".recruitcontent").html(rctable);
}
