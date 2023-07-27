
// var ajaxurl = 'http://47.92.215.156:30010/';
var ajaxurl = 'http://tapshark.co/app/';
var picurl = 'http://47.92.215.156/';

function getQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

function isMobile(mobile){
	var matchrs = mobile.match(/^((13[0-9])|(14[5,7])|(15[^4,\D])|(17[0,6,7,8])|(18[0-9]))\d{8}$/);
	return matchrs;
}

function isEmail(email){
	return email.match(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/);
}

