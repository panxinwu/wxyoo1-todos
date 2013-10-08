<?php  
    header('Content-Type: application/json; charset=utf-8');    
    //不能通过$_POST获取。因为$_POST['paramName'] 只能接收Content-Type: application/x-www-form-urlencoded提交的数据  
    $man = json_decode(file_get_contents("php://input"));  
    var_dump($man);
    file_put_contents("data.txt", $man->name);  
    echo true;    
?> 