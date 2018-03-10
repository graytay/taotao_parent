package com.taotao.content.service;

import com.taotao.pojo.EasyTreeNode;

import java.util.List;

public interface ContentCategoryService {
    List<EasyTreeNode> getCategoryList(Long parentId);
}
