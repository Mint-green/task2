<?php

$id=$_POST['id'];//得到原帖id


// $con=mysqli_connect('localhost','root','','test1');
$ini= parse_ini_file("../php/login.ini");
$con =mysqli_connect($ini["servername"],$ini["username"],$ini["password"],$ini["dbname"]);
if(!$con){
    die('连接错误'.mysqli_connect_error());
    echo '数据库连接错误';
}

mysqli_query($con,"SET NAMES utf8mb4");

$sql="SELECT * FROM replymsg WHERE commentid = '$id'";
$all=mysqli_query($con,$sql);

while($result=mysqli_fetch_assoc($all))
{
    $arr[]=$result;
}


echo json_encode($arr); 
mysqli_close($con);

?>