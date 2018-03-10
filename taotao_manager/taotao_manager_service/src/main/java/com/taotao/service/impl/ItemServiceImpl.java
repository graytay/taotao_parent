package com.taotao.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.taotao.mapper.TbItemDescMapper;
import com.taotao.mapper.TbItemMapper;
import com.taotao.pojo.*;
import com.taotao.service.ItemService;
import com.taotao.util.IDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ItemServiceImpl implements ItemService{
    @Autowired
    private TbItemMapper itemMapper;
    @Autowired
    private TbItemDescMapper descMapper;
    @Override
    public EasyUIDataGridResult getItemList(Integer page, Integer rows) {
        PageHelper.startPage(page,rows);
         TbItemExample example=new TbItemExample();
        List<TbItem> list=itemMapper.selectByExample(example);
        PageInfo<TbItem> pageInfo=new PageInfo<TbItem>(list);
        EasyUIDataGridResult result=new EasyUIDataGridResult();
        result.setTotal(pageInfo.getTotal());
        result.setRows(pageInfo.getList());
        return result;
    }

    @Override
    public TaoTaoResult saveItem(TbItem tbItem, String desc) {
        //生成商品id
        long itemId= IDUtils.genItemId();
        //补全tbitem属性
        tbItem.setId(itemId);
        //商品状态   1-正常  2-下架 3-删除
        tbItem.setStatus((byte )1);
        Date date=new Date();
        tbItem.setCreated(date);
        tbItem.setUpdated(date);
        itemMapper.insert(tbItem);
        TbItemDesc tbItemDesc=new TbItemDesc();
        //补全TbItemDesc属性
        tbItemDesc.setItemId(itemId);
        tbItemDesc.setCreated(date);
        tbItemDesc.setItemDesc(desc);
        tbItemDesc.setUpdated(date);
        descMapper.insert(tbItemDesc);

        return TaoTaoResult.ok();
    }
}
