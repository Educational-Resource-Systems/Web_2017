// Re-direct the user to the Mobile site if using an iPhone/iPod/Android
if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)))
{
	location.replace("mobile/mobile.html");
}
else if((navigator.userAgent.match(/Android/i)))
{
	location.replace("mobile/mobile.html");
}



//new page load
//largest width already set. this will adjust if width is iPad sized
$(window).load(function() {
    
    if( $(window).innerWidth() <= 800 ){
    	$("#menu1").css("display","none");
    	$("#menu2").css("display","block");
    	$( "header").css( "min-width", "560px" );
    	$("#titleCard_text").css("top","125px");
    	$("#titleCard_text h1").css("font-size","23px");
    	$("#titleCard_text h2").css("font-size","20px");
    	/*$( "#footerGroup").css( "width", "768px" );
    	$( "#footerGroup").css( "font-size", "10px" );
    	$( "#footerButton").css( "margin-left", "20px" );
    	$( "#footerButton").css( "margin-right", "10px" );*/
    	$( ".left-accordion").css( "width", "80%" );
    	$( ".right-accordion").css( "width", "80%" );
    	$( ".left-accordion").css( "margin-left", "65px" );
    	$( ".right-accordion").css( "margin-left", "65px" );
    }
    else if( $(window).innerWidth() <= 1024 ){
    	$("#menu1").css("display","block");
    	$("#menu2").css("display","none");
    	$( "header").css( "min-width", "1024px" );
    	/*$( "#footerButton").css( "margin-left", "30px" );
    	$( "#footerButton").css( "margin-right", "30px" );
    	$( "#footerButton").css( "margin-bottom", "40px" );
    	$( "#footerGroup").css( "font-size", "10px" );
    	$( "#footerGroup").css( "width", "800px" );*/
    	$("#titleCard_text").css("top","150px");
    	$("#titleCard_text h1").css("font-size","25px");
    	$("#titleCard_text h2").css("font-size","23px");
    	$( ".accordion-title").css( "font-size", "1.2em" );
    	$( ".accordion-title").css( "min-width", "430px" );
    	$( ".left-accordion").css( "margin-left", "-20px" );
    	$( ".right-accordion").css( "margin-left", "100px" );
    	$( ".left-accordion").css( "width", "40%" );
    	$( ".right-accordion").css( "width", "40%" );
    }
     else if( $(window).innerWidth() > 1024 ){
    	$( ".left-accordion").css( "margin-left", "50px" );
    }
});
  
  
//resizing elements as browser window resizes
$(window).resize(function(){
	
	//ipad portrait
    if( $(window).innerWidth() <= 800 ){
    	$("#menu1").css("display","none");
    	$("#menu2").css("display","block");
    	$( "header").css( "min-width", "560px" );
    	/*$( "#footerGroup").css( "width", "768px" );
    	$( "#footerButton").css( "margin-left", "20px" );
    	$( "#footerButton").css( "margin-right", "10px" );*/
    	$("#titleCard_text").css("top","125px");
    	$("#titleCard_text h1").css("font-size","23px");
    	$("#titleCard_text h2").css("font-size","20px");
    	$( ".left-accordion").css( "width", "80%" );
    	$( ".right-accordion").css( "width", "80%" );
    	$( ".left-accordion").css( "margin-left", "65px" );
    	$( ".right-accordion").css( "margin-left", "65px" );
    }
	
	//ipad landscape
    else if( $(window).innerWidth() <= 1024 ){
    	$("#menu1").css("display","block");
    	$("#menu2").css("display","none");
    	$( "header").css( "min-width", "1024px" );
    	/*$( "#footerButton").css( "margin-left", "30px" );
    	$( "#footerButton").css( "margin-right", "30px" );
    	$( "#footerButton").css( "margin-bottom", "40px" );
    	$( "#footerGroup").css( "font-size", "10px" );
    	$( "#footerGroup").css( "width", "800px" );*/
    	$("#titleCard_text").css("top","150px");
    	$("#titleCard_text h1").css("font-size","25px");
    	$("#titleCard_text h2").css("font-size","23px");
    	$( ".accordion-title").css( "font-size", "1.2em" );
    	$( ".accordion-title").css( "min-width", "430px" );
    	$( ".left-accordion").css( "margin-left", "-20px" );
    	$( ".right-accordion").css( "margin-left", "100px" );
    	$( ".left-accordion").css( "width", "40%" );
    	$( ".right-accordion").css( "width", "40%" );
    }
    
    //browser
    else if( $(window).innerWidth() > 1024 ){
    	/*$( "#footerButton").css( "margin-left", "80px" );
    	$( "#footerButton").css( "margin-right", "50px" );
    	$( "#footerButton").css( "margin-bottom", "10px" );
    	$( "#footerGroup").css( "font-size", "14px" );
    	$( "#footerGroup").css( "width", "1050px" );*/
    	$("#titleCard_text").css("top","200px");
    	$("#titleCard_text h1").css("font-size","3vw");
    	$("#titleCard_text h2").css("font-size","2vw");
    	$( ".accordion-title").css( "font-size", "1.4em" );
    	$( ".accordion-title").css( "min-width", "480px" );
    	$( ".left-accordion").css( "margin-left", "50px" );
    	$( ".right-accordion").css( "margin-left", "10px" );
    	$( ".left-accordion").css( "width", "45%" );
    	$( ".right-accordion").css( "width", "45%" );
    }
});