<?php  
    header('Content-Type: application/json; charset=utf-8');    
    file_put_contents("data.txt", $_POST["name"]);  
    die(json_encode(array('name'=>'tom')));    
?> 