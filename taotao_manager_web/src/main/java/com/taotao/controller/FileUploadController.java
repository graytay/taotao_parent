package com.taotao.controller;

import com.taotao.util.FastDFSClient;
import com.taotao.util.JsonUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Controller
public class FileUploadController {
    @Value("${TAOTAO_IMAGE_URL}")
    private String TAOTAO_IMAGE_URL;
    @RequestMapping(value="/pic/upload",produces = MediaType.TEXT_PLAIN_VALUE+";charset=utf-8")
    @ResponseBody
    public String uploadFile(MultipartFile uploadFile) {
        //取文件名
        try {
            String originalFilename = uploadFile.getOriginalFilename();
            String extName=originalFilename.substring(originalFilename.lastIndexOf(".")+1);
            //创建一个Fastdfs客户端
            FastDFSClient fastDFSClient=new FastDFSClient("classpath:resources/fastdsf.conf");
            //执行上传处理
            String path = fastDFSClient.uploadFile(uploadFile.getBytes(), extName);
            //拼接返回得url和ip地址，拼接完整得url
            String url=TAOTAO_IMAGE_URL+path;
            Map<String,Object> map=new HashMap<>();
            map.put("error",0);
            map.put("url",path);
            return JsonUtils.objectToJson(map);
        }catch (Exception e){
            e.printStackTrace();
            Map<String,Object> map=new HashMap<>();
            map.put("error",1);
            map.put("message","上传失败");
            return JsonUtils.objectToJson(map);
        }

    }
}
