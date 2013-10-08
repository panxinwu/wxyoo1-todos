<?php
// 本类由系统自动生成，仅供测试用途
class IndexAction extends Action {
    public function index(){
	
    $this->display();
	}
	public function save(){
     $man = json_decode(file_get_contents("php://input"),true);
     var_dump($man);
     $Todos   =   D('Todos');
     $Todos->add($man);
    }
    public function fetch(){
        $all_todos = M("Todos");
        $list = $all_todos -> select();
       // var_dump($list);
        foreach($list as $k=>$v){
            if($list[$k]['done'] == '0'){
                $list[$k]['done'] = false;
            }
        }
        $this->ajaxReturn($list,'JSON');
        //die(json_encode($list));
    }
}