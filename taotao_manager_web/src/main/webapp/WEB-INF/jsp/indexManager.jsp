<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script type="text/javascript">
    //发送ajax请求
    function importAllIndex() {
        $.ajax({
            type: "POST",
            url: "/importAll",
            timeout:3000000,
            success: function(msg){
                if(msg.status==200){
                    alert( "导入成功");
                }
            }
        });
    }
</script>
<div class="easyui-layout" data-options="fit:true">
    <a href="javascript:importAllIndex();" class="easyui-linkbutton">一键导入索引数据</a>
</div>