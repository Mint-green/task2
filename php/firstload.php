<?php
header('Content-Type: application/json');
// session_start();
// $_SESSION["username"]="4";

// echo $_SESSION["username"];

// $con=mysqli_connect('localhost','root','','test1');
$ini= parse_ini_file("login.ini");
$con =mysqli_connect($ini["servername"],$ini["username"],$ini["password"],$ini["dbname"]);
if(!$con){
    die('连接错误'.mysqli_connect_error());
    echo '数据库连接错误';
}
mysqli_query($con,"SET NAMES utf8mb4");
$all=mysqli_query($con,"select * From messages ");

// $arr=[];
while($result=mysqli_fetch_assoc($all))
{
    $arr[]=$result;
    }

echo json_encode($arr);
mysqli_close($con);
// // 方法二
// $i=0;
// while($row=mysqli_fetch_array($all,MYSQLI_ASSOC))
// {
//     $arr[$i]=[
//         'id' => $row['id'],
//         'username' => $row['username'],
//         'password' => $row['password'],
//         'date' => $row['date'],s
//         'times' => $row['times'],
//     ];
//     $i=$i+1;
// }
// echo json_encode($arr);


// $con=mysqli_connect('localhost','root','','test1');
// $all=mysqli_query($con,"select * From messages ");

// $arr=[];
// while($result=mysqli_fetch_assoc($all))
// {
//     $arr[]=$result;
//     }

// echo json_encode($arr);


?>