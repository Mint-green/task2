<?php
session_start();
if(isset($_SESSION['username'])){
    $result = [
        'errcode' => 0,
        'errmsg' => $_SESSION['username']
    ];
}else{
    $result = [
        'errcode' => 1,
        'errmsg' => ''
    ];
}
echo json_encode($result);
?>