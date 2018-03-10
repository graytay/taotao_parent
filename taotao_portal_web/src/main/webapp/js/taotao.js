var TT = TAOTAO = {
	checkLogin : function(){
		var _ticket = $.cookie("TT_TOKEN");//jquery获取本地cookie中的token数据
        var aa = $.cookie("aa");//jquery获取本地cookie中的token数据
		alert(aa);
		if(!_ticket){//如果没有cookie的token的值
			alert("没有值");
			return ;
		}
		$.ajax({
			url : "http://localhost:8088/user/token/" + _ticket,//jquery内置支持jsonp  自动拼接callback=
			dataType : "json",
			type : "POST",
			success : function(data){//这里就是处理 jsonp返回请求的函数
				if(data.status == 200){
					var username = data.data.username;//获取用户名
					var html = username + "，欢迎来到淘淘！<a href=\"http://www.taotao.com/user/logout.html\" class=\"link-logout\">[退出]</a>";
					$("#loginbar").html(html);//替换原来的数据
				}
			}
		});
	}
}

$(function(){
	// 查看是否已经登录，如果已经登录查询登录信息
	TT.checkLogin();
});