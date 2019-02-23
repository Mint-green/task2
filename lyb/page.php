<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge"> -->
    <title>TEST</title>
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
    <link rel="stylesheet" type="text/css" media="screen" href="ly.css" />
    <!-- <script src="main.js"></script> -->
</head>
<body>

<?php
header('Content-Type: application/json');

$page=$_GET['p'];
$con=mysqli_connect('localhost','root','','test1');
// $all=mysqli_query($con,"select * From messages ");
// mysqli_num_rows($all);
if(!$con){
    echo "数据库连接失败" ;
    exit;
}
    


mysqli_query($con,"SET NAMES UTF8mb4");

$sql="SELECT * FROM messages LIMIT " . ($page-1)*5 .", 5";
$result=mysqli_query($con,$sql);
while($row = mysqli_fetch_assoc($result)){
    for (i in $row){
        echo  '<div id="content-box' . $row.[i].username . '"><div class="content-box"><div class="content">' .
        '<div class="username"><label id="content-username' . $row.[i].id . '">' . $row.[i].username . '</label>' . 
        ' : ' . '</div>' . $row.[i].msg .
        '</div>' . '<div class="message">' . '<p class="msgtime">' . $row.[i].date . '</p>' .
        '<button id="change' . $row.[i].id . '" onclick="changefunction()" class="button">更改</button>' .
        '<button id="delete' . $row.[i].id . '" onclick="deletefunction()" class="button">删除</button>' .
        '</div>' . '</div>' . '</div>';
    }
}




mysqli_close($con);



?>
</body>
</html>