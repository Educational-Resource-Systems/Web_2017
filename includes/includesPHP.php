<?php

// Validates an email address
function valEmail( $email )
{
	// Validate the email address
	if( filter_var( $email, FILTER_VALIDATE_EMAIL) )
	{
		return true;
	}
	else
	{
		return false;
	}
}

?>