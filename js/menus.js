//$(".dropbtn1").hover(dropShowHide(this.id));

function dropShowHide(dropName) {
	var dropdownBox = dropName + '-wrap';
	dropdownBox = document.getElementById(dropdownBox);
  	if(dropdownBox.style.display == "block"){
  		dropdownBox.style.display = "none";
  	}
  	else{
  		dropdownBox.style.display = "block";
  	}
}

function insertMenu(){
//check if portrait iPad
if( $(window).innerWidth() <= 768 ){

menuHam();

	}

//for wider widths, load full dropdown menu
	else{
	menuMain();
	}
}

//add hamburger menu html
function menuHam(){
		jQuery(function($){
    	     $( '#hamburger' ).click(function(){
    	     $('.accordion-menu').toggleClass('expand')
    	     })
        });
//end script for show/hide

document.write('\
<div id="hamburger">\
<ul class="accordion-menu">\
	<li class="has-children">\
		<input type="checkbox" name="group-1" id="group-1">\
		<label for="group-1">ABOUT</label>\
    	<ul>\
    		<li><a href="ourstory.html">Our Story</a></li>\
    		<li><a href="ourteam.html">Our Team</a></li>\
    		<li><a href="ourclients.html">Our Clients</a></li>\
    		<li><a href="areas.html">Therapeutic Areas</a></li>\
    	</ul>\
    </li>\
\
	<li class="has-children">\
		<input type="checkbox" name="group-2" id="group-2">\
		<label for="group-2">SERVICES</label>\
		<ul>\
    		<li><a href="training.html">Life Sciences Training</a></li>\
    		<li><a href="medcom.html">Medical Communications</a></li>\
    	</ul>\
	</li>\
	\
	<li class="has-children">\
		<input type="checkbox" name="group-3" id="group-3">\
		<label for="group-3">CONTACT</label>\
		<ul>\
    		<li><a href="contact.php">Contact</a></li>\
    		<li><a href="careers.html">Careers</a></li>\
    	</ul>\
    </li>\
    \
    <li class="no-children">\
		<!--<input type="checkbox" name="group-4" id="group-4">\
		<label for="group-4">NEWS & VIEWS</label>-->\
		<p style="margin-left:2px;"><a href="news.html">NEWS & VIEWS</a></p></li>\
</ul> <!-- accordion-menu -->\
\
<div id="social_media">\
	<div id="ham_mediabtn3" class="linkedin" style="float:right; margin-top:40px; width:50px;"><a href="https://www.linkedin.com/company/educational-resource-systems-inc."></a></div>\
	<div id="ham_mediabtn2" class="twitter" style="float:right; margin-top:40px; width:50px;"><a href=""></a></div>\
	<!--<div id="mediabtn1" class="facebook" style="float:right; margin-top:40px; width:50px;"><a href=""></a></div>-->\
</div>\
</div><!--end hamburger-->\
</div>\
');
}

function menuMain(){
document.write('\
\
<nav id="nav">\
 <ul>\
<li><div class="dropdown"><div id="dropbtn1" onclick="dropShowHide(this.id);"></div>\
 <div id="dropbtn1-wrap">\
 <div id="empty_box" style="background-color:red; height:24px; opacity:0;"></div>\
 <div class="dropdown-content">\
    <a href="ourstory.html">OUR STORY</a>\
    <a href="ourteam.html">OUR TEAM</a>\
    <a href="ourclients.html">OUR CLIENTS</a>\
    <a href="areas.html">THERAPEUTIC AREAS</a>\
  </div>\
  </div>\
 </div>\
</li>\
 <li><div class="dropdown"><div id="dropbtn2" onclick="dropShowHide(this.id);"></div>\
 <div id="dropbtn2-wrap">\
 <div id="empty_box" style="background-color:red; height:24px; opacity:0;"></div>\
 <div class="dropdown-content">\
    <a href="training.html">LIFE SCIENCES TRAINING</a>\
    <a href="medcom.html">MEDICAL COMMUNICATIONS</a>\
  </div>\
  </div>\
  </div>\
</li>\
<a href="news.html"><li><div id="dropbtn3" style="opacity:1;"></div></li></a>\
<li><div class="dropdown"><div id="dropbtn4" onclick="dropShowHide(this.id);"></div>\
	<div id="dropbtn4-wrap">\
	<div id="empty_box" style="background-color:red; height:24px; opacity:0;"></div>\
	<div class="dropdown-content">\
    <a href="contact.php">CONTACT US</a>\
    <a href="careers.html">CAREERS</a>\
  </div>\
  </div>\
  </div>\
</li>\
<!--<li><div id="mediabtn1"<a href=""></a></div></li>-->\
<a target="_blank" href="https://twitter.com/_ERS_"><li><div id="mediabtn2"</div></li></a>\
<a target="_blank" href="https://www.linkedin.com/company/educational-resource-systems-inc."><li><div id="mediabtn3"</div></li></a>\
 </ul>\
</nav>\
\
');
}

function footer(){
document.write('\
            <div id="footerGroup">\
            <div class="notlast_footerButton" id="footerButton"><div>\
                <div><a href="mailto:info@educationalresource.com"><div><img class="footerIcon" src="img/btn/btn_email.png" /></div><div>info@educationalresource.com</div></a></div></div></div>\
            <div class="notlast_footerButton" id="footerButton"><div>\
                <div><a href="tel:17328420202"><div><img class="footerIcon" src="img/btn/btn_phone.png" /></div><div>732.842.0202</div></a></div></div></div>\
            <div id="footerButton">\
                <div><div><img class="footerIcon" src="img/btn/btn_location.png" /></div>\
                    <div><a target="_blank" href="https://goo.gl/maps/QDHETZKE1nG2">The Galleria at 2 Bridge Ave, #623<br />\
                    Red Bank, New Jersey 07701</a></div></div></div>\
            </div>\
			<div class="social_media2">\
				<div><a href="https://www.linkedin.com/company/educational-resource-systems-inc."><img src="img/btn/btn_linkedIn.png"></a></div>\
				<div><a href=""><img src="img/btn/btn_twitter.png"></a></div>\
				<!--<div><a href=""><img src="img/btn/btn_facebook.png"></a></div>-->\
			</div>\
            <div id="copyright">\
                <p>&copy; \
                    <script language="javascript" type="text/javascript">\
                    var today = new Date();\
                    var year = today.getFullYear();\
                    document.write(year);\
                    </script> \
                    Educational Resource Systems. All&nbsp;Rights&nbsp;Reserved. </p>\
            </div>\
');
}

$( document ).ready(function() {
	$("#mobile-menu").click(function(){
		if ($('#mini-menu').css('display') == 'block'){
			$("#mini-menu").hide();
			$("#menu_text").html("Menu");
		}
		else{
			$("#mini-menu").show();
			$("#menu_text").html("close");
		}
	});
	
	$(".has-children").click(function(){
		if ($(this).children('div').css('display') == 'block'){
			$(this).children('div').hide();
			$(this).children('label').removeClass('open');
		}
		else{
			$(this).children('div').show();
			$(this).children('label').addClass('open');
		}
	});
});