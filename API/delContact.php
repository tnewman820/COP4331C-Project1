<?php
	$inData = getRequestInfo();
	$Id = $inData["Id"];
	#$UserId = $inData["UserId"];


	$conn = new mysqli("localhost", "tnewman820", "Password00115!", "tnewman8_COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "DELETE from `Contacts` where (`Id`)  = (" . $Id . ")";
		#$sql = "DELETE from `Contacts` where (`Id`, `UserId`)  = (" . $Id . ")"; alternate command, to relate the Id to the user
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		$conn->close();
	}
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