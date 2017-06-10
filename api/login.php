<?php

	function checkCookie(){
		if(isset($_COOKIE["username"])) 
			return true;
		else
			return false;
	}

	function passwordEncrypt($row,$password){
		return md5(md5($row['id']) . $password);
	}

	function setCookies($email,$password){
		setcookie("username",$email,time()+60*60*24);
		setcookie("password",$password,time() + 60*60*24);
	}

	function getEmailFromLink($link,$data){
		return mysqli_real_escape_string($link,$data["email"]);
	}

	function getDecodedData(){
		return json_decode(file_get_contents('php://input'), true);
	}

	//link with the database
	$link = mysqli_connect("localhost","root","","scutops_madhu");

	//if there was an error in establishing the link
	if(mysqli_connect_error())
		echo "Connection failed";
	
	$data = getDecodedData();
	if (!isset($json_result))
		 $json_result = new stdClass();

	$email = getEmailFromLink($link,$data);
	$password = $data["password"];

	//if there is a cookie
	if(checkCookie()){
		$json_result->result = true;
		$json_result->description = "Login successful";
	}
	else{	
	$query = "SELECT * FROM `user_details` WHERE `email` = '$email'";
	if($result = mysqli_query($link,$query)){
		if($row = mysqli_fetch_array($result)){
			$password = passwordEncrypt($row,$password);
			if($password == $row["password"]){
				$json_result->result = true;
				$json_result->description = "Login successful";
				setCookies($email,$password);
			}
			else{
				$json_result->result = false;
				$json_result->description = "Wrong password";
			}	
		}
		else{
			$json_result->result = false;
			$json_result->description = "Wrong email";
		}
	}
	}

	$json_result = json_encode($json_result);
	echo $json_result;
	
?>