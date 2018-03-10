package com.taotao.test.fastdfs;

import com.sun.demo.jvmti.hprof.Tracker;
import org.csource.common.MyException;
import org.csource.fastdfs.*;
import org.junit.Test;

import java.io.IOException;

public class TestFastdfs {
    @Test
    public void test2() throws IOException, MyException {
        ClientGlobal.init("X:\\Intel\\taotao_parent\\taotao_manager_web\\src\\main\\resources\\resources\\fastdsf.conf");
        //创建trackerclient对象
        TrackerClient client=new TrackerClient();
        //创建trackerserver对象
        TrackerServer server=client.getConnection();
        //创建storage对象
        StorageServer storageServer=null;
        //创建storage对象
        StorageClient storageClient=new StorageClient(server,storageServer);
        String[] strings = storageClient.upload_file("X:\\imgs\\1519738235822_1516690146989.jpg", "jpg", null);
        for (String string : strings) {
            System.out.println(string);
        }
    }
}
