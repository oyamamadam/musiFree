<?php
if(isset($_GET) && count($_GET)){
	if($_GET['action']=='getFans'){
		echo file_get_contents("http://185.112.248.75:8877/finduser?user=".$_GET['user']);
	}
	elseif($_GET['action']=='getMusicals'){
		echo file_get_contents("http://185.112.248.75:8877/musicals?user=".$_GET['user']);
	}
}
 