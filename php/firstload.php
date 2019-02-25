<?php
header('Content-Type: application/json');
// session_start();
// $_SESSION["username"]="4";

// echo $_SESSION["username"];

$con=mysqli_connect('localhost','root','','test1');
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