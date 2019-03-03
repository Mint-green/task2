<?php

$commentid=$_POST['commentid'];
$guestname=$_POST['guestname'];
$hostname=$_POST['hostname'];
$msg=$_POST['msg'];

$ini= parse_ini_file("../php/login.ini");
$con =mysqli_connect($ini["servername"],$ini["username"],$ini["password"],$ini["dbname"]);
if(!$con){
    die('连接错误'.mysqli_connect_error());
    echo '数据库连接错误';
}

mysqli_query($con,"SET NAMES utf8mb4");

$sql = "INSERT INTO replymsg(commentid, guestname, hostname, msg) VALUES ('$commentid','$guestname','$hostname','$msg')";
// echo $sql;
mysqli_query($con,$sql);
// $date1 = mysqli_query($con,"SELECT * from replymsg ORDER BY id desc limit 1");
$id1 = mysqli_query($con,"SELECT * from replymsg ORDER BY id desc limit 1");
// echo $date;
// echo $id;
// $date = $date1[date];
// $date = mysqli_fetch_assoc($date1);
$id = mysqli_fetch_assoc($id1);

$result=[
    'id' => $id['id'],
    'guestname' => $guestname,
    'hostname' => $hostname,
    'msg' => $msg,
    'date' => $id['date']
];
echo json_encode($result);
mysqli_close($con);
?>