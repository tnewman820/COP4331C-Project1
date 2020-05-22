var urlBase = 'http://branchout.space/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

/*------------------------------------------------------login system-----------------------------------------------------------------------*/
function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

//	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		userId = jsonObject.id;
		
		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}
		
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		saveCookie();
	
		window.location.href = "user";
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doRegister()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	var fname = document.getElementById("firstName").value;
	var lname = document.getElementById("lastName").value;
	var email = document.getElementById("emailAddress").value;
	var phonenum = document.getElementById("phoneNumber").value;
//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

//	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '", "firstname" : "' + fname + ', "lastName" : "' + lname + ', "email" : "' + email + ', "phone" : "' + phonenum + '}';
	var url = urlBase + '/RegUser.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		userId = jsonObject.id;
		
		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "Account creation unsuccessful";
			return;
		}
		if( login == "" )
		{
			document.getElementById("loginResult").innerHTML = "Username is required for signup!";
			return;
		}
		if( password == "" )
		{
			document.getElementById("loginResult").innerHTML = "Password is required for signup!";
			return;
		}
		if( fname == "" )
		{
			document.getElementById("loginResult").innerHTML = "First name is required for signup!";
			return;
		}
		if( lname == "" )
		{
			document.getElementById("loginResult").innerHTML = "Last name is required for signup!";
			return;
		}
		if( email == "" )
		{
			document.getElementById("loginResult").innerHTML = "Email is required for signup!";
			return;
		}
		if( phonenum == "" )
		{
			document.getElementById("loginResult").innerHTML = "Phone number is required for signup!";
			return;
		}
		
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		saveCookie();
	
		window.location.href = "user";
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}
function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}
/*----------------------------------------------------end login system---------------------------------------------------------------------*/

/*------------------------------------------------------cookie system----------------------------------------------------------------------*/

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ", lastName=" + lastName + ", userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "/";
	}
	else
	{
		document.getElementById("userName").innerHTML = "" + firstName + " " + lastName;
		document.getElementById("userId").innerHTML = "" + userId + "";
	}
}
/*----------------------------------------------------end cookie system--------------------------------------------------------------------*/

/*------------------------------------------------------contact system---------------------------------------------------------------------*/
function doCreateContact()
{
	var fname = document.getElementById("firstName").value;
	var lname = document.getElementById("lastName").value;
	var email = document.getElementById("emailAddress").value;
	var phonenum = document.getElementById("phoneNumber").value;
	document.getElementById("createResult").innerHTML = ""; 
	
	if(firstName == "" || lastName == "" || email == "" || phonenum == "")
	{
		document.getElementById("createResult").innerHTML = "Contact creation failed! Please fill out all fields!";
		return;

	}
	
	var jsonPayload = '{"userId" : "' + userId + '", "firstname" : "' + fname + ', "lastName" : "' + lname + ', "email" : "' + email + ', "phone" : "' + phonenum + '}';
	var url = urlBase + '/AddContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("createResult").innerHTML = "Contact has been added successfully";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("createResult").innerHTML = err.message;
	}
	
}

/*---------------------------------------------------end contact system--------------------------------------------------------------------*/

/*------------------------------------------------------extra functions--------------------------------------------------------------------*/

/*----------------------------------------------------end extra functions------------------------------------------------------------------*/

/*


function searchColor()
{
	var srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	
	var colorList = "";
	
	var jsonPayload = '{"search" : "' + srch + '","userId" : ' + userId + '}';
	var url = urlBase + '/SearchColors.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );
				
				for( var i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
}*/
	
	

