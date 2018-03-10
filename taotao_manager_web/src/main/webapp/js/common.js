Date.prototype.format = function(format){ 
    var o =  { 
    "M+" : this.getMonth()+1, //month 
    "d+" : this.getDate(), //day 
    "h+" : this.getHours(), //hour 
    "m+" : this.getMinutes(), //minute 
    "s+" : this.getSeconds(), //second 
    "q+" : Math.floor((this.getMonth()+3)/3), //quarter 
    "S" : this.getMilliseconds() //millisecond 
    };
    if(/(y+)/.test(format)){ 
    	format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
    for(var k in o)  { 
	    if(new RegExp("("+ k +")").test(format)){ 
	    	format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
	    } 
    } 
    return format; 
};

var TT = TAOTAO = {
	// 编辑器参数
	kingEditorParams : {
		//指定上传文件参数名称  <input type="file" name="uploadFile">
		filePostName  : "uploadFile",
		//指定上传文件请求的url。
		uploadJson : '/pic/upload',
		//上传类型，分别为image、flash、media、file
		dir : "image"
	},
	// 格式化时间
	formatDateTime : function(val,row){
		var now = new Date(val);
    	return now.format("yyyy-MM-dd hh:mm:ss");
	},
	// 格式化连接
	formatUrl : function(val,row){
		if(val){
			return "<a href='"+val+"' target='_blank'>查看</a>";			
		}
		return "";
	},
	// 格式化价格
	formatPrice : function(val,row){
		return (val/1000).toFixed(2);
	},
	// 格式化商品的状态
	formatItemStatus : function formatStatus(val,row){
        if (val == 1){
            return '正常';
        } else if(val == 2){
        	return '<span style="color:red;">下架</span>';
        } else {
        	return '未知';
        }
    },
    
    init : function(data){
    	// 初始化图片上传组件
    	this.initPicUpload(data);
    	// 初始化选择类目组件
    	this.initItemCat(data);
    },
    // 初始化图片上传组件
    initPicUpload : function(data){
        //循环
    	$(".picFileUpload").each(function(i,e){
    	    //把元素转成jquery对象
    		var _ele = $(e);
    		//获取到<a标签的元素的兄弟节点 <div class=".pic"></div> 删除元素
    		_ele.siblings("div.pics").remove();
    		//追加一个元素
    		_ele.after('<div class="pics"><ul></ul></div>');
    		
        	//给“上传图片按钮”绑定click事件 触发
        	$(e).click(function(){
        	    //找到form表单   效果等同于$("#itemAddForm")
        		var form = $(this).parentsUntil("form").parent("form");
        		//打开图片上传窗口 kindEditor的对象  创建一个多图片上传的组件
        		KindEditor.editor(TT.kingEditorParams).loadPlugin('multiimage',function(){
        			var editor = this;
        			editor.plugin.multiImageDialog({
                        //点击全部插入的时候 触发的事件
						clickFn : function(urlList) {//urllist是路径的数组
							var imgArray = [];//定义一个数组
							KindEditor.each(urlList, function(i, data) {
							    //data是一个JSON对象
								imgArray.push(data.url);//添加数据到数组中
								// 回显图片
                            //获取到<div class="pics"><ul></ul></div> 在ul下拼接li
								form.find(".pics ul").append("<li><a href='"+data.url+"' target='_blank'><img src='"+data.url+"' width='80' height='50' /></a></li>");
							});
							//循环成功之后：<div clas="pics"><ul><li></li><li></li></ul></div>
                            //获取表单中名字是image的隐藏域  并设置值为 imgArray.join(",")：将数组的元素通过 “，”进行连接拼接成一个字符串
							form.find("[name=image]").val(imgArray.join(","));
							editor.hideDialog();
						}
					});
        		});
        	});
    	});
    },
    
    // 初始化选择类目组件
    initItemCat : function(data){
    	//此方法在页面初始化的时候被调用了
    	//类选择器获取到点击的按钮
    	$(".selectItemCat").each(function(i,e){
    		//将元素转为jquery的对象
    		var _ele = $(e);
    		if(data && data.cid){
    			_ele.after("<span style='margin-left:10px;'>"+data.cid+"</span>");
    		}else{
    			//在元素的后边追加标签<span style='margin-left:10px;'></span>
    			_ele.after("<span style='margin-left:10px;'></span>");
    		}
    		//解绑再绑定事件  当按钮被点击的时候 触发以下的业务逻辑
    		_ele.unbind('click').click(function(){
    			//$("<div>")创建一个div标签，添加CSS的样式 之后在<div>标签里面创建<ul>----><div><ul></ul></div>                     $("div"):获取
    			$("<div>").css({padding:"5px"}).html("<ul>")
				//打开一个窗口
    			.window({
    				width:'500',
    			    height:"450",
    			    modal:true,
    			    closed:true,
    			    iconCls:'icon-save',
    			    title:'选择类目',

					//当窗口被打开的时候触发以下的业务逻辑
    			    onOpen : function(){
    					//构建树的控件


						//获取窗口本身
    			    	var _win = this;
    			    	//获取当前的窗口的ul的标签里面创建一棵树
    			    	$("ul",_win).tree({
							//异步请求的数据的URL
    			    		url:'/item/cat/list',//?id=111
    			    		animate:true,
							//当点击树的节点的时候触发
							//node:就是被点击的节点对象
    			    		onClick : function(node){
    			    			//extjs
								//判断被点击的节点是否是一个叶子节点  如果是就执行以下的业务逻辑
    			    			if($(this).tree("isLeaf",node.target)){
    			    				// 填写到cid中
									//获取隐藏域 赋值为被点击节点的ID的值
    			    				_ele.parent().find("[name=cid]").val(node.id);
    			    				//获取到的就是刚才添加的标签<span>男表 </span> 在标签的中间添加文本
                                   // <span  cid="291">男表 </span>
    			    				_ele.next().text(node.text).attr("cid",node.id);
									//关闭窗口
    			    				$(_win).window('close');

    			    				if(data && data.fun){
    			    					alert(data);
    			    					data.fun.call(this,node);
    			    				}
    			    			}
    			    		}
    			    	});
    			    },
					//当关闭窗口的时候
    			    onClose : function(){
    			    	//吧当前的窗口销毁。
    			    	$(this).window("destroy");
    			    }
    			}).window('open');
    		});
    	});
    },
    
    createEditor : function(select){
    	return KindEditor.create(select, TT.kingEditorParams);
    },
    
    /**
     * 创建一个窗口，关闭窗口后销毁该窗口对象。<br/>
     * 
     * 默认：<br/>
     * width : 80% <br/>
     * height : 80% <br/>
     * title : (空字符串) <br/>
     * 
     * 参数：<br/>
     * width : <br/>
     * height : <br/>
     * title : <br/>
     * url : 必填参数 <br/>
     * onLoad : function 加载完窗口内容后执行<br/>
     * 
     * 
     */
    createWindow : function(params){
    	$("<div>").css({padding:"5px"}).window({
    		width : params.width?params.width:"80%",
    		height : params.height?params.height:"80%",
    		modal:true,
    		title : params.title?params.title:" ",
    		href : params.url,
		    onClose : function(){
		    	$(this).window("destroy");
		    },
		    onLoad : function(){
		    	if(params.onLoad){
		    		params.onLoad.call(this);
		    	}
		    }
    	}).window("open");
    },
    
    closeCurrentWindow : function(){
    	$(".panel-tool-close").click();
    },
    
    changeItemParam : function(node,formId){
    	$.getJSON("/item/param/query/itemcatid/" + node.id,function(data){
			  if(data.status == 200 && data.data){
				 $("#"+formId+" .params").show();
				 var paramData = JSON.parse(data.data.paramData);
				 var html = "<ul>";
				 for(var i in paramData){
					 var pd = paramData[i];
					 html+="<li><table>";
					 html+="<tr><td colspan=\"2\" class=\"group\">"+pd.group+"</td></tr>";
					 
					 for(var j in pd.params){
						 var ps = pd.params[j];
						 html+="<tr><td class=\"param\"><span>"+ps+"</span>: </td><td><input autocomplete=\"off\" type=\"text\"/></td></tr>";
					 }
					 
					 html+="</li></table>";
				 }
				 html+= "</ul>";
				 $("#"+formId+" .params td").eq(1).html(html);
			  }else{
				 $("#"+formId+" .params").hide();
				 $("#"+formId+" .params td").eq(1).empty();
			  }
		  });
    },
    getSelectionsIds : function (select){
    	var list = $(select);
    	var sels = list.datagrid("getSelections");
    	var ids = [];
    	for(var i in sels){
    		ids.push(sels[i].id);
    	}
    	ids = ids.join(",");
    	return ids;
    },
    
    /**
     * 初始化单图片上传组件 <br/>
     * 选择器为：.onePicUpload <br/>
     * 上传完成后会设置input内容以及在input后面追加<img> 
     */
    initOnePicUpload : function(){
    	$(".onePicUpload").click(function(){
			var _self = $(this);
			KindEditor.editor(TT.kingEditorParams).loadPlugin('image', function() {
				this.plugin.imageDialog({
					showRemote : false,
					clickFn : function(url, title, width, height, border, align) {
						var input = _self.siblings("input");
						input.parent().find("img").remove();
						input.val(url);
						input.after("<a href='"+url+"' target='_blank'><img src='"+url+"' width='80' height='50'/></a>");
						this.hideDialog();
					}
				});
			});
		});
    }
};
