<?php

	function deleteCookies(){
		setcookie("username","",time()-3600);
		setcookie("password","",time()-3600);
	}
	//echo "cookie released";
	deleteCookies();
?>