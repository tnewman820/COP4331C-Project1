<?php
	$inData = getRequestInfo();
	
	$userId = $inData["username"];
	$userId = $inData["password"];
	$userId = $inData["phonenumber"];

	$conn = new mysqli("localhost", "tnewman820", "Password00115!", "tnewman8_COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "insert into Database (Users) VALUES (" . $userId . ",'" . $username . "','" . $password . "', '" . $phonenumber . "')";
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		$conn->close();
	}
	
	returnWithError("");
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
