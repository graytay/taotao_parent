<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div>
	 <ul id="contentCategory" class="easyui-tree">  </ul>
</div>
<div id="contentCategoryMenu" class="easyui-menu" style="width:120px;" data-options="onClick:menuHandler">
    <div data-options="iconCls:'icon-add',name:'add'">添加</div>
    <div data-options="iconCls:'icon-remove',name:'rename'">重命名</div>
    <div class="menu-sep"></div>
    <div data-options="iconCls:'icon-remove',name:'delete'">删除</div>
</div>
<script type="text/javascript">
    //页面加载的时候 执行
$(function(){
    //在ul中创建一颗树
	$("#contentCategory").tree({
		url : '/content/category/list',//?id=1
		animate: true,
		method : "GET",
        //右击鼠标时触发  node就是被右击的那个节点对象
		onContextMenu: function(e,node){
		    //失效原来的鼠标的默认的点击事件
            e.preventDefault();
            //获取被选中的树的节点
            $(this).tree('select',node.target);
            //显示菜单项
            $('#contentCategoryMenu').menu('show',{
                //配置鼠标跟随
                left: e.pageX,
                top: e.pageY
            });
        },
        //这就是当节点被编辑并 鼠标移开时触发
        //node就是被编辑的那个节点（新增的节点）
        onAfterEdit : function(node){
		    //获取自己
        	var _tree = $(this);
        	//如果是节点为0 说明是要新增
        	if(node.id == 0){
        		// 新增节点
        		$.post("/content/category/create",{parentId:node.parentId,name:node.text},function(data){
        		    //如果成功的
        			if(data.status == 200){
                        //更新target指定的节点数据
        				_tree.tree("update",{
            				target : node.target,
                            //taotaoresult--->包含了一个对象(对象里有一个属性 id)  contentCategory对象实例
            				id : data.data.id
            			});
        			}else{
        				$.messager.alert('提示','创建'+node.text+' 分类失败!');
        			}
        		});
        	}else{
        	    //重命名
        		$.post("/content/category/update",{id:node.id,name:node.text});
        	}
        }
	});
});
//菜单项被点击的时候触发
function menuHandler(item){
    //获取树控件对象
	var tree = $("#contentCategory");
	//获取被选中的树的节点的对象
	var node = tree.tree("getSelected");
    //如果被点击的是添加的选项执行业务逻辑
    // 1=="1"     true
    //1==="1"     false
	if(item.name === "add"){

        //添加一个节点
		tree.tree('append', {
		    //大括号就是节点的配置项
            //新增的节点的父节点就是被右击鼠标的那个节点
            parent: (node?node.target:null),
            //数据
            data: [{
                text: '新建分类',
                id : 0,
                //设置新增的节点的父节点
                parentId : node.id
            }]
        });

        //获取id值为0的节点 就是新增的那个节点
		var _node = tree.tree('find',0);//根节点
        //选中新增的节点   开始进入编辑的模式
		tree.tree("select",_node.target).tree('beginEdit',_node.target);


	}else if(item.name === "rename"){
		tree.tree('beginEdit',node.target);
	}else if(item.name === "delete"){
		$.messager.confirm('确认','确定删除名为 '+node.text+' 的分类吗？',function(r){
			if(r){
				$.post("/content/category/delete",{id:node.id},function(){
					tree.tree("remove",node.target);
				});	
			}
		});
	}
}
</script>