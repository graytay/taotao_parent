package com.taotao.content.service.impl;

import com.taotao.content.service.ContentCategoryService;
import com.taotao.mapper.TbContentCategoryMapper;
import com.taotao.pojo.EasyTreeNode;
import com.taotao.pojo.TbContentCategory;
import com.taotao.pojo.TbContentCategoryExample;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class ContentCategoryServiceImpl implements ContentCategoryService{
    @Autowired
    private TbContentCategoryMapper mapper;
    @Override
    public List<EasyTreeNode> getCategoryList(Long parentId) {
        //创建example
        TbContentCategoryExample example=new TbContentCategoryExample();
        example.createCriteria().andParentIdEqualTo(parentId);
        //执行查询语句
        List<TbContentCategory> list = mapper.selectByExample(example);
        List<EasyTreeNode> nodes=new ArrayList<>();
        for (TbContentCategory category : list) {
            EasyTreeNode node=new EasyTreeNode();
            node.setId(category.getId());
            node.setText(category.getName());
            node.setState(category.getIsParent()?"closed":"open");
            nodes.add(node);
        }
        return nodes;
    }
}
