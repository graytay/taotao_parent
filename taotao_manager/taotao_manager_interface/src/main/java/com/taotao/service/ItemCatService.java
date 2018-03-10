package com.taotao.service;

import com.taotao.pojo.EasyTreeNode;

import java.util.List;

public interface ItemCatService {
    List<EasyTreeNode>getItemCatList(Long parentId);
}
