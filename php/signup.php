<?php
header('Content-Type: application/json');

// $id=$_POST['id'];
$username=$_POST['username'];
$password=$_POST['password'];
$checkpwd=$_POST['checkpwd'];

$con=mysqli_connect('localhost','root','','test1');
if(!$con){
    die("连接错误:".mysqli_connect_error());
    echo '数据库连接错误';
}
// else {
//     echo '连接成功';
// }
mysqli_query($con, 'SET NAMES utf8mb4');
// $sql="select 'username' from persons where username='$username'";
$resultmsg ='注册成功';
// $result=mysqli_query($con,$sql);



$stmt1 = mysqli_prepare($con, "SELECT username FROM persons WHERE username=?");
mysqli_stmt_bind_param($stmt1, 's', $username);
mysqli_stmt_execute($stmt1);
mysqli_stmt_bind_result($stmt1, $result);
mysqli_stmt_fetch($stmt1);
mysqli_stmt_close($stmt1);

// var_dump($result);
if($result !=false){
// if(mysqli_num_rows($result)>0){
    $result =[
        'errcode'=>1,
        'errmsg'=>'用户名已被占用',
        'data'=>'',
        ];
}
else if($password!=$checkpwd){
    $result =[
        'errcode'=>2,
        'errmsg'=>'两次输入的密码不一致',
        'data'=>''
        ];
}
else{
    mysqli_query($con, "INSERT INTO `persons` (`username`,`password`) VALUES ('$username','$password')" );
    $result =[
        'errcode'=>0,
        'errmsg'=> $resultmsg,
        'data'=>'',
    ];
    session_start();
    $_SESSION['username'] =$username;
}
/*
// 以下代码用于测试，仅作为结构和部分写法的参考
if (rand() % 3) {
    $result = [
        'errcode' => 233,
        'errmsg' => '吔屎啦你！',
        'data' => ''
    ];
} else {
    $result = [
        "errcode" => 0,
        "errmsg" => "",
        "data" => []
    ];
}
*/
echo json_encode($result);
mysqli_close($con);
?>




