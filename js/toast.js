//  // toast函数
// function toast (message = '', ms = '2000') {
//   // js写法
//   var outerDiv = document.createElement('div')
//   outerDiv.id = 'outer-div'
//   outerDiv.className = 'toast-box'
//   var innerDiv = document.createElement('div')
//   innerDiv.id = 'inner-div'
//   innerDiv.className = 'toast-para'
//   addCSS('.toast-box{ width:100%; position: fixed; left: 0; top: 50%; margin-top: -1.2rem; text-align: center; z-index: 99999999999999; }.toast-para { max-width: 8rem; min-width: 4rem; height: 1.5rem; display: inline-block; line-height: 1.5rem; margin: auto; font-size: 0.5rem; color: white; background: rgba(0,0,0,.3); border-radius: 1rem; word-wrap: break-word; word-break: break-all; padding: 0 1rem; }')
//   innerDiv.innerText = message
//   outerDiv.appendChild(innerDiv)
//   document.body.appendChild(outerDiv)
//   setTimeout(function () {
//     outerDiv.remove()
//   }, ms)
// }

// // 动态添加样式
// function addCSS (cssText) {
//   var style = document.createElement('style') // 创建一个style元素
//   var head = document.head || document.getElementsByTagName('head')[0] // 获取head元素
//   style.type = 'text/css' // 这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
//   if (style.styleSheet) { // IE
//     var func = function () {
//       try { // 防止IE中stylesheet数量超过限制而发生错误
//         style.styleSheet.cssText = cssText
//       } catch (e) {
//       }
//     }
//     // 如果当前styleSheet还不能用，则放到异步中则行
//     if (style.styleSheet.disabled) {
//       setTimeout(func, 10)
//     } else {
//       func()
//     }
//   } else { // w3c
//     // w3c浏览器中只要创建文本节点插入到style元素中就行了
//     var textNode = document.createTextNode(cssText)
//     style.appendChild(textNode)
//   }
//   head.appendChild(style) // 把创建的style元素插入到head中
// }
//toast 封装
function toast(text){
	var toRequestWait = $("#webtoast");
	if(toRequestWait.length==0){
		var toRequestWait_html = "";
		toRequestWait_html+="<div id='webtoast' class='toast-mask'>";
		toRequestWait_html+="	<div class='alertbox-toast'>";
		toRequestWait_html+="		<p id='text'>"+text+"</p>";
		toRequestWait_html+="	</div>";
		toRequestWait_html+="<div>";
		toRequestWait = $(toRequestWait_html);
	}
	var $text = toRequestWait.find("#text");
	$text.html(text);
	$text.fadeOut(0);//先隐藏
	toRequestWait.appendTo("body");
  
  $(".alertbox-toast>p").css({
	"width": "150px",
    "border-radius": "5px",
    "-webkit-border-radius": "5px",
    "color": "#fff",
    "font-size": "18px",
	"padding": "10px",
    "background-color": "#343446",
    "text-align": "center",
    "position": "fixed",
    "top": "50%",
    "left":"50%",
    "transform":"translate(-50%,-50%)",
    "z-index":"1998"
  });

	$text.fadeIn(500,function(){
		setTimeout(function(){
			$text.fadeOut(1000,function(){
				toRequestWait.remove();
			});
		},2000)
	});
}
// 封装弹出框
function promptBox(options){
	var default_config={
		success:undefined, //点击确认后的回调
		cancel:undefined,//点击取消后的回调
		cancelText:"取消",//true 按钮文案
		successText:"确认",//false 按钮文案
		titleMsg:"是否确定?"//提示消息
	}

	var config=$.extend({},default_config,options);
	var promptBox_html="";
	promptBox_html+='<div id="promptBox" style="display:none">';
    promptBox_html+='	<div id="promptBoxMsg">';
    promptBox_html+='	   <p>'+config.titleMsg+'</p>';
    promptBox_html+='	   <span id="promptBoxCancel">'+config.cancelText+'</span><span id="promptBoxSuccess">'+config.successText+'</span>';
    promptBox_html+='	</div>'
    promptBox_html+='</div>'
	$(promptBox_html).appendTo("body");
    var fixedTop=document.body.scrollTop;
    $("#promptBox").css({
		"width":"100%",
		"height":"100%",
		"position":"fixed",
		"bottom":"0",
		"left":"0",
		"background":"rgba(0,0,0,.3)",
		"z-index":"1998"
	})
    $("#promptBoxMsg").css({
		"width":"7.22rem",
		"height":"2.78rem",
		"border-radius":"0.26rem",
		"text-align":"center",
		"background":"#fff",
		"font-size":"0.48rem",
		"position":"absolute",
		"top":"50%",
		"left":"50%",
		'z-index':'1997',
		"transform":"translate(-50%,-50%)"
	});
    $("#promptBoxMsg p").css({
		"color":"#555555",
		"height":"1.5rem",
		"line-height":"1.5rem"
    });
    $("#promptBoxMsg span").css({
		"width": "50%",
		"height":"1.2rem",
		"line-height":"1.2rem",
      	"border-top":"1px solid #d4d4d8",
		"position":"absolute",
		"bottom":"0",
		"color":"#67a7fe",
		"font-size":"0.42rem"
	});
    $("#promptBoxSuccess").css({
		"right":"0",
		"margin-left":"-1px",
		"border-left":"1px solid #d4d4d8"
	});
    $("#promptBoxCancel").css({
		"left":"0"
	});
    // document.body.scrollTop=fixedTop;
    // $("html,body").animate({scrollTop:fixedTop},500);
    $("#promptBox").show();
    // $("html,body").animate({scrollTop:fixedTop},0);

    // $("body,html").css({
	// 	"height":"auto",
	// 	"overflow":"hidden"
	// });
	$(document).on('touchmove',function(e){
		e.preventDefault();
	})
    document.documentElement.style.overflowY = 'hidden';

    $("#promptBoxSuccess").unbind("click").click(function(){
    	if(config.success){
    		config.success();
		}
		$("#promptBox").remove();
    	document.documentElement.style.overflowY = 'auto';
        // $("body,html").css({
		// 	"height":"auto",
		// 	"overflow":"auto"
		// });
		$(document).unbind("touchmove");
	});
	$("#promptBoxCancel").unbind("click").click(function(){
    	if(config.cancel){
    		config.cancel();
		}
		$("#promptBox").remove();
    	document.documentElement.style.overflowY = 'auto';
        // $("body,html").css({
		// 	"height":"auto",
		// 	"overflow":"auto"
		// });
		$(document).unbind("touchmove");
	})
}

//判断某值是否为空, 为空返回true,否则返回false
function isNull(value){
	if(value&&value.trim().length>0){
		return false;
	}
	return true;
}