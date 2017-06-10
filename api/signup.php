<?php

	function passwordEncrypt($row,$password){
		return md5(md5($row['id']) . $password);
	}

	function setCookies($email,$password){
		setcookie("username",$email,time()+60*60*24);
		setcookie("password",$password,time() + 60*60*24);
	}

	function escapeStringFromLink($link,$data,$string){
		return mysqli_real_escape_string($link,$data[$string]);
	}

	function updatePassword($password,$email,$link){
		$query = "UPDATE `user_details` SET `password` = '$password' WHERE `email`='$email'";
		$result = mysqli_query($link,$query);
	}

	function getDecodedData(){
		return json_decode(file_get_contents('php://input'), true);
	}

	function isEmpty($data){
		if (!isset($json_result))
		 	$json_result = new stdClass();
		if(empty($data['email'])){
			$json_result->result = false;
			$json_result->description = "Email cannot be left blank";
		}
		else if(empty($data['password'])){
			$json_result->result = false;
			$json_result->description = "Password cannot be left blank";
		}else if(empty($data['phone_number'])){
			$json_result->result = false;
			$json_result->description = "Phone Number cannot be left blank";
		}else if(empty($data['address'])){
			$json_result->result = false;
			$json_result->description = "Address cannot be left blank";
		}
		return $json_result;
	}

	function validateData(){

	}

	//Connecting to the database
	$link = mysqli_connect("localhost","root","","scutops_madhu");

	if(mysqli_connect_error())
		echo "Connection failed";

	
	$data = getDecodedData();
	if (!isset($json_result))
		 $json_result = new stdClass();

	$json_result = isEmpty($data);
	if($json_result->result)
	{
	if(!filter_var($data['email'],FILTER_VALIDATE_EMAIL)){		
		$json_result->result = false;
		$json_result->description = "Please enter a valid email id";
	}
	else{
	$email = escapeStringFromLink($link,$data,"email");
	$password = escapeStringFromLink($link,$data,"password");
	$phone_number = escapeStringFromLink($link,$data,"phone_number");
	$address = escapeStringFromLink($link,$data,"address");
 	$landmark = escapeStringFromLink($link,$data,"landmark");

	$query = "SELECT * FROM `user_details` WHERE `email` = '$email'";
	if($result = mysqli_query($link,$query)){
		if($row = mysqli_fetch_array($result)){
			$json_result->result = false;
			$json_result->description = "This email is already signed up";
		}
		else{

			$query = "INSERT INTO `user_details` (`email`,`password`,`phone_number`,`address`,`landmark`) VALUES ('$email','$password','$phone_number','$address','$landmark')";
			if($result = mysqli_query($link,$query)){
				//find id of the new data
				$query = "SELECT * FROM `user_details` WHERE `email`='$email' ";//level 4 password encryption
				$result = mysqli_query($link,$query);
				$row = mysqli_fetch_array($result);
				
				$password = passwordEncrypt($row,$password);
				updatePassword($password,$email,$link);

				$json_result->result = true;
				$json_result->description = "Signed up Successfully";

				setCookies($email,$password);

				
		}
	}
}
}
}


	$json_result = json_encode($json_result);

	echo $json_result;
?>