<!doctype html>
<html class="">

<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1, user-scalable=0">
<title>ERS | Educational resource Systems Inc.</title>

<link href="css/contactStyle.css" rel="stylesheet" type="text/css">
<link href="css/mobile_style.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="css/mobile_accordion-style.css" type="text/css">

<script src="js/respond.min.js"></script>
<script type="text/javascript" src="../js/jquery-1.8.1.min.js"></script>
<script type="text/javascript" src="../js/jquery.flexslider-min.js"></script>
<script type="text/javascript" src="../js/classie.js"></script>
<script type="text/javascript" src="js/menus.js"></script>
<script type="text/javascript" src="js/header_size.js"></script>

<?php 
	include("../includes/includesPHP.php"); 
	// SMTP needs accurate times, set the timezone for PHP
	//date_default_timezone_set('Etc/UTC');
	date_default_timezone_set('America/New_York');
	require '../includes/PHPMailer-master/PHPMailerAutoload.php';
?>

</head>
<body>

<script>
	$(window).load(function() { 
    /* initialize header sizing script from header_size.js */
    init();
  });
</script>


<div class="imageSection" id="mainBlock"> <img style="width:100%;" src="img/pages/contact_header.png"></div>
        
<div id="menu" style="margin-top:-20px;">

<ul class="accordion-menu" id="mini-menu" style="display:none;">
	<li class="no-children" style="cursor:pointer;">
		<a href ="mobile.html" style="font-size:16;">HOME</a>		
    </li>
	<li class="has-children">
		<input type="checkbox" name="group-1" id="group-1">
		<label for="group-1">ABOUT</label>
    	<ul>
    		<li><a href="ourstory.html">Our Story</a></li>
    		<li><a href="ourteam.html">Our Team</a></li>
    		<li><a href="ourclients.html">Our Clients</a></li>
    		<li><a href="areas.html">Therapeutic Areas</a></li>
    	</ul>
    </li>

	<li class="has-children">
		<input type="checkbox" name="group-2" id="group-2">
		<label for="group-2">SERVICES</label>
		<ul>
    		<li><a href="training.html">Life Science Training</a></li>
    		<li><a href="medcom.html">Medical Com</a></li>
    	</ul>
	</li>
	
	<li class="has-children">
		<input type="checkbox" name="group-3" id="group-3">
		<label for="group-3">CONTACT</label>
		<ul>
    		<li><a href="contact.php">Contact</a></li>
    		<li><a href="careers.html">Careers</a></li>
    	</ul>	
    </li>
    
    <li class="no-children" style="cursor:pointer;">
		<!--<input type="checkbox" name="group-4" id="group-4">
		<label for="group-4">NEWS & VIEWS</label>-->
		
		<a href ="news.html" style="font-size:16;">NEWS & VIEWS</a>	
		
    </li>
</ul> <!-- accordion-menu -->
</div>

<div id="menuButton" onclick="miniMenu();">MENU</div>
        
<div class="imageSection" id="mainBlock"> <img style="width:100%;" src="img/pages/contact_title.png"></div>
    
    <div class="contactBlock" style="position:relative; width:400px; margin-left:auto; margin-right:auto;">
    <div class="contactForm" style="float:left; width:300px; margin-left:45px; font-family:'Avenir', sans-serif; text-align:left;">
    	<?php
		// Below is contact form code. On the first load of the page, it allows the user to fill out the form.
		// After the submit button is pressed, it links back to this page again. If it has been filled out correctly
		// it will send the email, clearing the values previously entered. If the form was filled out incorrectly, it 
		// sets which information was incorrect and re-echos the form with the added inconsistencies below.
		// The session variables are to test if the page was refreshed and the data is the same, therefore meaning the
		// email should only be sent once.
		if ( isset( $_REQUEST['email'] ) )
		{
			$formHasBeenSet = true;
		
			// Collect the forms information
			$email    = $_REQUEST['email'];
			$name     = $_REQUEST['name'];		
			$company  = $_REQUEST['company'];
			$question = $_REQUEST['question'];
		
			// Test the mandatory form fields (email and name)
			// Is the email valid?
			if( valEmail( $email ) )
				$validEmail = true;
			else
				$validEmail = false;
			// Is the name valid?
			$name = trim($name);
			if( $name != '' )
				$validName = true;
			else
				$validName = false;
		
			// Should the email be sent?
			if( $validName && $validEmail )
				$sendEmail = true;
			else
				$sendEmail = false;
			
			// Finally, the below code retests if this "Submit" of the form was simply a page refresh
			// and will block a resend of the same data twice.
		
			// Test if the form data is the same as last session, if so don't send email
			if( $_SESSION['email'] == $email && $_SESSION['name'] == $name && $_SESSION['company'] == $company && $_SESSION['question'] == $question )
			{
				$sendEmail = false;
				$dataTheSame = true;
			}
			else
			{
				// Save the new input variables in session for one refresh.
				$_SESSION['email'] = $email;
				$_SESSION['name'] = $name;		
				$_SESSION['company'] = $company;
				$_SESSION['question'] = $question;
			
				$dataTheSame = false;
			}
		}
		else
		{
			$formHasBeenSet = false;
		}
	
		// Begin echoing the form
		echo "<form name='input' action='contact.php' method='get'> <div id='leftCol'> <p class='title'>NAME*"; 
		// If the form was set and the name was invalido
		if( $formHasBeenSet && !$validName )
		{
			echo "  <span style='color:red'>Please enter your name.</span>";
		}
		echo "</p> <p class='if_TypeI'> <input type='text' name='name'";
		// Display the name previously entered
		if( $formHasBeenSet )
		{
			echo " value='$name'";
		}
		echo "/> </p> <p class='title'>COMPANY </p> <p class='if_TypeI'> <input type='text' name='company'"; 
		// Display the company previously entered
		if( $formHasBeenSet )
		{
			echo " value='$company'";
		}
		echo "/> </p> <p class='title'>EMAIL*";
		// If the form was set and the email was invalid
		if( $formHasBeenSet && !$validEmail )
		{
			echo "  <span style='color:red'>Please enter a valid email address.</span>";
		}
		echo "</p> <p class='if_TypeI'> <input type='text' name='email'"; 
		// Display the email previously entered
		if( $formHasBeenSet )
		{
			echo " value='$email'";
		}
		echo "size='25' /> </p> <p class='title'>QUESTIONS/COMMENTS </p> <p class='if_TypeII'> <textarea style='resize:none' cols='31' rows='7' name='question'>";
		// Display the name previously entered if entered
		if( $formHasBeenSet )
		{
			echo "$question";
		}
		echo "</textarea> </p> 
		
		<input class='btn' type='submit' height='42px' width='360px' border='0' value='SUBMIT MESSAGE' alt='SUBMIT MESSAGE'>
		
		</form>";

		// If form has been filled out correctly, send email)
		if ( $formHasBeenSet && $sendEmail )
		{
			// Sends the email, testing whether or not it failed
			// CHANGE FIRST PARAMETER TO: 'ers_info@educationalresource.com'
			//$mailSuccess = mail( "ers_info@educationalresource.com", "$name from $company", $question, "From: <$email>" );

			//Create a new PHPMailer instance
			$mail = new PHPMailer;
			//Tell PHPMailer to use SMTP
			$mail->isSMTP();
			//Enable SMTP debugging
			// 0 = off (for production use)
			// 1 = client messages
			// 2 = client and server messages
			$mail->SMTPDebug = 0;
			//Ask for HTML-friendly debug output
			$mail->Debugoutput = 'html';
			//Set the hostname of the mail server
			$mail->Host = "secure.emailsrvr.com";
			//Set the SMTP port number - likely to be 25, 465 or 587
			$mail->Port = 465;
			//Whether to use SMTP authentication
			$mail->SMTPAuth = true;
			$mail->SMTPSecure = "ssl";
			//Username to use for SMTP authentication
			$mail->Username = "ers_info@educationalresource.com";
			//Password to use for SMTP authentication
			$mail->Password = "Fish20!5";
			//Set who the message is to be sent from
			$mail->setFrom($email, $name);
			//Set an alternative reply-to address
			//$mail->addReplyTo('replyto@example.com', $name);
			//Set who the message is to be sent to
			$mail->addAddress('ers_info@educationalresource.com', 'ers_info@educationalresource.com');
			//Set the subject line
			$mail->Subject = 'Question/Comment from ' . $name;
			// Set the body of the email
			$mail->Body = "Company: " . $company . "<br /> Question/Comment: <br />" . $question;
			//Replace the plain text body with one created manually
			$mail->AltBody = 'This is a plain-text message body';
			if( $mail->send() )
			{
				echo "<div style='color:rgb(0,61,161); font-size:20px; font-style:italic;'>Thank you for using our mail form!</div>";
			}
			else
			{
				echo "<div style='color:red;'>Email failed.</div>";
				//echo "Mailer Error: " . $mail->ErrorInfo;
			}
		}
		else if( $formHasBeenSet && $dataTheSame && $validName && $validEmail )
		{
			echo "<div style='color:red;'>Form data is the same. This email was already successfully sent.</div>";
		}
		?>
    </div>
    </div>

    <div id="map" style="height:200px; width:200px; float:left; margin-left:58px; margin-top:30px; margin-bottom:20px;"></div>

    
    <script type='text/javascript'>
    	function initMap(){
    		var ERS = {lat: 40.3503972, lng: -74.0754935};
        	var map = new google.maps.Map(document.getElementById('map'), {
          	zoom: 15,
          	center: ERS
        	});
        	var marker = new google.maps.Marker({
          	position: ERS,
          	map: map
        	});
        	var infowindow = new google.maps.InfoWindow({
    		content: '<b>Educational Resource Systems Inc.</b> </br> The Galleria at 2 Bridge Ave </br> Suite #623 </br> Red Bank, NJ 07701'
  			});
			marker.addListener('click', function() {
    		infowindow.open(map, marker);
  			});
      	}
    </script>
    
    <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyA5aiAaj_3qpTM2cTJ9iFYJGdlH-0QboY4&callback=initMap' async defer></script>

    </div>
    
    <div class="bottomDiv"></div>

<!----- footer ----->
<div class="footer" style="height:350px;">
    <script>footer();</script>
</div> 
</body>
</html>


