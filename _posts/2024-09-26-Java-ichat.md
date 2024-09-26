---
layout: base
title: Java聊天小工具
---
//可以群聊，端口不一定是8888

import java.io.*;

import java.net.*;

class sDemo implements Runnable{

    private DatagramSocket Ds;
    
    sDemo(DatagramSocket DS) {
    
        Ds = DS;
        
    }
    
    public void run(){
    
        try{
        
            BufferedReader Br = new BufferedReader(new InputStreamReader(System.in));
            
            String str = null;
            
            while((str = Br.readLine()) != null) {
            
                if(";;".equals(str))
                
                    break;
                    
                byte[] bt = str.getBytes();
                
                DatagramPacket Dp = new DatagramPacket(bt, bt.length, InetAddress.getByName("192.168.1.255"), 8888);
                
                Ds.send(Dp);
                
             }
             
             Ds.close();
             
        }catch(Exception e){}
        
    }
    
}

class rDemo implements Runnable{

    private DatagramSocket Ds;
    
    rDemo(DatagramSocket ds) {
    
       Ds = ds;
       
    }
    
    public void run(){
    
        try{
        
            while (true){
            
                byte[] bt = new byte[1024];
                
                DatagramPacket Dp = new DatagramPacket(bt, bt.length);
                
                Ds.receive(Dp);

                String IP = Dp.getAddress().getHostAddress();
                
                String Data = new String(Dp.getData(), 0, Dp.getLength());

                System.out.println("Message::" + IP + "...." + Data);
                
            }
            
        }catch(Exception e){}
        
    }
    
}

class srDemo{

    public static void main(String[] args) throws Exception{
    
        DatagramSocket SD = new DatagramSocket();
        
        DatagramSocket RD = new DatagramSocket(8888);
        
        new Thread(new sDemo(SD)).start();
        
        new Thread(new rDemo(RD)).start();
        
    }
    
} 
