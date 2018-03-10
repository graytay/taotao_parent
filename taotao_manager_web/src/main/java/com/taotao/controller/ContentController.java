package com.taotao.controller;

import com.taotao.content.service.ContentCategoryService;
import com.taotao.pojo.EasyTreeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class ContentController {
    @Autowired
    private ContentCategoryService service;
    @RequestMapping("/content/category/list")
    @ResponseBody
    public List<EasyTreeNode> getCategoryList(@RequestParam(value = "id" ,defaultValue = "0")Long parentId){
        return service.getCategoryList(parentId);
    }
}
