---
layout: base
title: PHP发送Email类
---
<pre>
class sendEMLude{
  private
    $ht = 'smtp.163.com',//用来发送邮件的服务器
    $emailFrom = 'username@163.com',//用来发送邮件的邮箱
    $psw = '*******************',
    $fromUser = 'Admin',
    $set = 'gb2312',
    $M, $content, $subject $to, $user;
    private static
      $inc;
  final protected function __construct(){
    error_reporting(2039);
    //先在网上下载个PHPMail 
    include_once ROOT . 'PHPMail/class.phpmailer.php';
    $this->M = new PHPMailer();
    //设置语言，这是简体中文
    $this->M->SetLanguage('zh_cn');
    $this->M->IsSMTP();
    //邮箱服务器 
    $this->M->Host = $this->ht;
    $this->M->SMTPDebug = 0;
    $this->M->SMTPAuth = true;
    //用来发送邮件的邮箱地址，与上面的服务器要关联
     $this->M->Username = $this->emailFrom;
    //用来发送邮件的邮箱密码
     $this->M->Password = $this->psw;
      $this->M->FromName =  $this->fromUser;
      $this->M->CharSet = $this->set;//编码
  }
  public static function int(){
    if(!self::$inc instanceof self)
          self::$inc = new self();
    return self::$inc;
  }
  public function setEmail($h, $e, $p, $f='', $c=''){
    $this->ht = $h;
    $this->emailFrom = $e;
    $this->psw = $p;
    $this->fromUser =$f;
    $this->set = $c;
  }
  public function writeEml($t, $u, $s, $c ){
    $this->to = $t;
    $this->user = $u;
    $this->subject = $s;
    $this->content = $c;
  }
  public function sendMail(){
    $sendM = $this->M;
    $sendM->SetFrom($sendM->Username, $sendM->FromName);
    //邮件的主题 
    $sendM->Subject = $this->subject;
    //邮件的内容 
    $sendM->MsgHTML($this->content);
    //有接收邮件的邮箱地址（就是要寄出去的地址）
    $sendM->AddAddress($this->to,'<用户：' . $this->user .  '> Email：');
    return $sendM->Send();
  }
}
//调用方法：
$send = sendEMLude::inc();
$send->writeEml('要寄往的地址', '寄件人的称呼', '邮件主题', '邮件内容'); 
$send->sendMail();
</pre>
