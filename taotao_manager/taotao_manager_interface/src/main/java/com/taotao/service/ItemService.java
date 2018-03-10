package com.taotao.service;

import com.taotao.pojo.EasyUIDataGridResult;
import com.taotao.pojo.TaoTaoResult;
import com.taotao.pojo.TbItem;

public interface ItemService {
    public EasyUIDataGridResult getItemList(Integer page, Integer rows);

    public TaoTaoResult saveItem(TbItem tbItem,String desc);
}
