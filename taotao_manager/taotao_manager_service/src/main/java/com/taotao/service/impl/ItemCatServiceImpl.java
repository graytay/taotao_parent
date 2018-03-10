package com.taotao.service.impl;

import com.taotao.mapper.TbItemCatMapper;
import com.taotao.pojo.EasyTreeNode;
import com.taotao.pojo.EasyUIDataGridResult;
import com.taotao.pojo.TbItemCat;
import com.taotao.pojo.TbItemCatExample;
import com.taotao.service.ItemCatService;
import com.taotao.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItemCatServiceImpl implements ItemCatService{
    @Autowired
    private TbItemCatMapper itemCatMapper;

    @Override
    public List<EasyTreeNode> getItemCatList(Long parentId) {
        TbItemCatExample itemCatExample=new TbItemCatExample();
        //设置查询条件
        itemCatExample.createCriteria().andParentIdEqualTo(parentId);
        List<TbItemCat> tbItemCats = itemCatMapper.selectByExample(itemCatExample);
List<EasyTreeNode> list=new ArrayList<>();
        for (TbItemCat tbItemCat : tbItemCats) {
            EasyTreeNode easyTreeNode=new EasyTreeNode();
            easyTreeNode.setText(tbItemCat.getName());
            easyTreeNode.setId(tbItemCat.getId());
            easyTreeNode.setText(tbItemCat.getIsParent()?"closed":"open");
            list.add(easyTreeNode);
        }
        return list;
    }
}
