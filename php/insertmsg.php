<?php
header('Content-Type: application/json');
$username = $_POST['username'];
$msg = $_POST['msg'];

// $con=mysqli_connect('localhost','root','','test1');
$ini= parse_ini_file("login.ini");
$con =mysqli_connect($ini["servername"],$ini["username"],$ini["password"],$ini["dbname"]);
if(!$con){
    die('连接错误'.mysqli_connect_error());
}

mysqli_query($con,"SET NAMES utf8mb4");
$sql = "INSERT INTO messages(username, msg) VALUES ('$username','$msg')";
// echo $sql;
mysqli_query($con,$sql);
$date1 = mysqli_query($con,"SELECT * from messages ORDER BY id desc limit 1");
$id1 = mysqli_query($con,"SELECT * from messages ORDER BY id desc limit 1");
// echo $date;
// echo $id;
// $date = $date1[date];
$date = mysqli_fetch_assoc($date1);
$id = mysqli_fetch_assoc($id1);

$result=[
    'id' => $id['id'],
    'username' => $username,
    'msg' => $msg,
    'date' => $date['date']
];
echo json_encode($result);
mysqli_close($con);
?>