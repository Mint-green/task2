<?php
$id=$_POST['id'];
$msg=$_POST['msg'];

$con=mysqli_connect('localhost','root','','test1');
mysqli_query($con,"SET NAMES utf8mb4");

$sql1="UPDATE messages SET msg = '$msg' WHERE id = '$id'";
$sql2="SELECT date FROM messages WHERE id = '$id'";
$sql3="SELECT username FROM messages WHERE id = '$id'";
$update=mysqli_query($con,$sql1);
$date1=mysqli_query($con,$sql2);
$username1=mysqli_query($con,$sql3);

$date=mysqli_fetch_assoc($date1);
$username=mysqli_fetch_assoc($username1);
$result=[
    'id' => $id,
    'username' => $username['username'],
    'msg' => $msg,
    'date' => $date['date']
];
echo json_encode($result);
mysqli_close($con);
?>