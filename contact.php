<?php session_start(); ?>
<!doctype html>
<html class="">

<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ERS | Educational Resource Systems Inc.</title>

<link href="css/boilerplate.css" rel="stylesheet" type="text/css">
<link href="css/style.css" rel="stylesheet" type="text/css">
<link href="css/contactStyle.css" rel="stylesheet" type="text/css">
<link href="css/content_style.css" rel="stylesheet" type="text/css">
<link href="css/grid.css" rel="stylesheet" type="text/css">
<link href="css/flexslider.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="css/accordion-style.css" type="text/css">
<link rel="stylesheet" href="css/custom.css" type="text/css">

<?php 
	include("includes/includesPHP.php"); 
	// SMTP needs accurate times, set the timezone for PHP
	//date_default_timezone_set('Etc/UTC');
	date_default_timezone_set('America/New_York');
	require 'includes/PHPMailer-master/PHPMailerAutoload.php';
?>

<script src="js/respond.min.js"></script>
<script type="text/javascript" src="js/jquery-1.8.1.min.js"></script>
<script type="text/javascript" src="js/jquery.flexslider-min.js"></script>
<script type="text/javascript" src="js/classie.js"></script>
<script type="text/javascript" src="js/header_size.js"></script>
<script type="text/javascript" src="js/menus.js"></script>
<script type="text/javascript" src="js/resize.js"></script>

 <script type="text/javascript" charset="utf-8">
  /*load slider script*/
  $(window).load(function() {
    $('.flexslider').flexslider();
    init();
  });
  /*resize for orientation change*/
  $(window).on("orientationchange",function(){
  		location.reload(true);
  });
	
</script>
<style> #header{background-color:rgba(0,0,0,0); box-shadow: 0px 3px 5px rgba(50, 50, 50, 0);} #header.smaller{background-color:rgba(0,0,0,.65); box-shadow: 0px 3px 5px rgba(50, 50, 50, .1);}</style>
</head>
<body>
<header id="header" class="non-mobile">
<div id="logo" onClick="location.href = 'index.html';"><a href=""></a></div>

<div id="header_menu">
<!--menu inserted from javascript-->

<!--<script>insertMenu();</script>-->

<div id="menu1"><script>menuMain();</script></div>

<div id="menu2"><script>menuHam();</script></div>


</div><!--end header menu-->

</header>

<!----- content ----->
    <div id="heading" class="imageSection non-mobile" style="width:100%;
	background-image: url(img/pages/contact_header.png);">
		<h1 style="text-shadow: 2px 2px 4px rgba(0,0,0,.5);">Drop Us a Line!</h1>
		<h2 style="text-shadow: 2px 2px 4px rgba(0,0,0,.5);">We’re looking forward to hearing from you!</h2>
    </div>
    </div>
    
<!--Mobile menu begin-->
<div class="mobile-only">
	<img style="width: 100%;" src="mobile/img/pages/contact_header.png">
</div>

<div class="mobile-only">

<div id="menu">

<div class="accordion-menu2" id="mini-menu" style="display:none;">
	<div class="no-children" style="cursor:pointer;">
		<a href ="mobile.html" style="font-size:16; color:gray;">HOME</a>		
    </div>
	<div class="has-children">
		<label for="group-1">ABOUT</label>
    	<div>
    		<a href="ourstory.html"><div>Our Story</div></a>
    		<a href="ourteam.html"><div>Our Team</div></a>
    		<a href="ourclients.html"><div>Our Clients</div></a>
    		<a href="areas.html"><div>Therapeutic Areas</div></a>
    	</div>
    </div>

	<div class="has-children">
		<label for="group-2">SERVICES</label>
		<div>
    		<a href="training.html"><div>Life Science Training</div></a>
    		<a href="medcom.html"><div>Medical Com</div></a>
    	</div>
	</div>
	
	<div class="has-children">
		<label for="group-3">CONTACT</label>
		<div>
    		<a href="contact.php"><div>Contact</div></a>
    		<a href="careers.html"><div>Careers</div></a>
    	</div>	
    </div>
    
    <div class="no-children" style="cursor:pointer;">
		<!--<label for="group-4">NEWS & VIEWS</label>-->
		
		<a href ="news.html" style="font-size:16;">NEWS & VIEWS</a>	
		
    </div>
</div> <!-- accordion-menu -->
</div>

<div id="mobile-menu">
	<div id="menu_text">Menu</div>
</div>
</div>
<!--Mobile menu end-->
    
	<div id="titleLine"></div><div class="titleBox" style="margin-top: -26px;"><p>CONTACT US!</p></div>
    <!--<div class="imageSection" id="mainBlock"> <img style="width:100%;" src="img/pages/contact_title.png"></div>-->
    
    <div class="contactBlock">
    <div class="contactForm">
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
    
    <img class="lineStyle" src="img/line.png">

    <div id="map"></div>
    
<!-- -----   This whole section is redundant don't need

 <div id="contactGroup" style="float:left; margin-left:50px; margin-top:50px; max-width:400px;">
        <img src="img/btn/btn_location_blue.png" />
        <p style="min-width:250px;">
            	The Galleria at 2 Bridge Ave<br />
            	Suite #623<br />
                Red Bank, New Jersey 07701<br />
                <a  target="_blank" href="https://goo.gl/maps/QDHETZKE1nG2">Get Directions</a>
        </p>
        
        <img src="img/btn/btn_email_blue.png" />
        <p><a href="mailto:info@educationalresource.com">info@educationalresource.com</a></p>
        
        <img src="img/btn/btn_phone_blue.png" />
        <p><a href="tel:17328420202">(732)842-0202</a></p>
        
        <div class="socialMedia">
        <a target="_blank" style="margin-right:10px;" href="https://twitter.com/_ERS_"><img src="img/btn/btn_twitter_circle.png" /></a>
        <a target="_blank" href="https://www.linkedin.com/company/educational-resource-systems-inc."><img src="img/btn/btn_linkedIn_circle.png" /></a>
        </div>
    </div>-->
    
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
    </div><!--end contact block-->
    
    <div class="bottomDiv"></div>


<!--back to top button -->
<div id="Up" class="backUp non-mobile" onclick="$(function () {$('body,html').animate({scrollTop: 0}, 800);});"></div>
<!----- footer ----->
<div class="footer">
	<script>footer();</script>
</div> 
</body>
</html>
