/* Ultimate Fade-in slideshow (v2.6.1)*/

var fadeSlideShow_descpanel={
	controls: [['img/x.png', 7, 7], ['restore.png', 10, 11], ['img/blank.png', 256, 55]], //full URL and dimensions of close, restore, and loading images
	fontStyle: 'normal 11px Verdana', //font style for text descriptions
	slidespeed: 200 //speed of description panel animation (in millisec)
}

//No need to edit beyond here...

jQuery.noConflict()

function fadeSlideShow(settingarg){
	this.setting=settingarg
	settingarg=null
	var setting=this.setting
	setting.fadeduration=setting.fadeduration? parseInt(setting.fadeduration) : 500
	setting.curimage=(setting.persist)? fadeSlideShow.routines.getCookie("gallery-"+setting.wrapperid) : 0
	setting.curimage=setting.curimage || 0 //account for curimage being null if cookie is empty
	setting.currentstep=0 //keep track of # of slides slideshow has gone through (applicable in displaymode='auto' only)
	setting.totalsteps=setting.imagearray.length*(setting.displaymode.cycles>0? setting.displaymode.cycles : Infinity) //Total steps limit (applicable in displaymode='auto' only w/ cycles>0)
	setting.fglayer=0, setting.bglayer=1 //index of active and background layer (switches after each change of slide)
	setting.isflexible = /\%/.test(setting.dimensions[0]) || /\%/.test(setting.dimensions[1]) // test if one of slideshow dimension sides is a percentage value
	setting.oninit=setting.oninit || function(){}
	setting.onslide=setting.onslide || function(){}
	if (setting.displaymode.randomize) //randomly shuffle order of images?
		setting.imagearray.sort(function() {return 0.5 - Math.random()})
	var preloadimages=[] //preload images
	setting.longestdesc="" //get longest description of all slides. If no desciptions defined, variable contains ""
	for (var i=0; i<setting.imagearray.length; i++){ //preload images
		preloadimages[i]=new Image()
		preloadimages[i].src=setting.imagearray[i][0]
		if (setting.imagearray[i][3] && setting.imagearray[i][3].length>setting.longestdesc.length)
			setting.longestdesc=setting.imagearray[i][3]
	}
	
	var closebutt=fadeSlideShow_descpanel.controls[0] //add close button to "desc" panel if descreveal="always"
	setting.closebutton=(setting.descreveal=="always")? '<img class="close" src="'+closebutt[0]+'" style="float:right;cursor:hand;cursor:pointer;width:'+closebutt[1]+'px;height:'+closebutt[2]+'px;margin-left:2px" title="Hide Description" />' : ''
	var slideshow=this
	jQuery(document).ready(function($){ //fire on DOM ready
		var setting=slideshow.setting
		var fullhtml=fadeSlideShow.routines.getFullHTML(setting.imagearray) //get full HTML of entire slideshow
		setting.$wrapperdiv=$('#'+setting.wrapperid).css({position:'absolute', margin:"auto", visibility:'visible', overflow:'hidden', width:setting.dimensions[0], height:setting.dimensions[1]}).empty() //main slideshow DIV
		setting.dimensions = [ // get dimensions of slideshow in pixels
			setting.$wrapperdiv.outerWidth(),
			setting.$wrapperdiv.outerHeight()
		]
		if (setting.$wrapperdiv.length==0){ //if no wrapper DIV found
			alert("Error: DIV with ID \""+setting.wrapperid+"\" not found on page.")
			return
		}
		setting.$gallerylayers=$('<div class="gallerylayer"></div><div class="gallerylayer"></div>') //two stacked DIVs to display the actual slide 
			.css({margin:'auto', width:'512px', height:'380px'})//, position:'absolute', background:'#565656', opacity: '0'
			.appendTo(setting.$wrapperdiv)
		var $loadingimg=$('<img src="'+fadeSlideShow_descpanel.controls[2][0]+'" style="position:absolute;width:'+fadeSlideShow_descpanel.controls[2][1]+'px;height:'+fadeSlideShow_descpanel.controls[2][2]+'px" />')
			.css({zIndex:1000,left:setting.dimensions[0]/2-fadeSlideShow_descpanel.controls[2][1]/2, top:setting.dimensions[1]/2-fadeSlideShow_descpanel.controls[2][2]/2}) //center loading gif
			.appendTo(setting.$wrapperdiv)
		var $curimage=setting.$gallerylayers.html(fullhtml).find('img').hide().eq(setting.curimage) //prefill both layers with entire slideshow content, hide all images, and return current image
		if (setting.longestdesc!="" && setting.descreveal!="none"){ //if at least one slide contains a description (versus feature is enabled but no descriptions defined) and descreveal not explicitly disabled
			fadeSlideShow.routines.adddescpanel($, setting)
			if (setting.descreveal=="always"){ //position desc panel so it's visible to begin with
				setting.$descpanel.css({top:setting.dimensions[1]-setting.panelheight})
				setting.$descinner.click(function(e){ //asign click behavior to "close" icon
					if (e.target.className=="close"){
						slideshow.showhidedescpanel('hide')
					}
				})
				setting.$restorebutton.click(function(e){ //asign click behavior to "restore" icon
					slideshow.showhidedescpanel('show')
					$(this).css({visibility:'hidden'})
				})
			}
			else if (setting.descreveal=="ondemand"){ //display desc panel on demand (mouseover)
				setting.$wrapperdiv.bind('mouseenter', function(){slideshow.showhidedescpanel('show')})
				setting.$wrapperdiv.bind('mouseleave', function(){slideshow.showhidedescpanel('hide')})
			}
		}
		setting.$wrapperdiv.bind('mouseleave', function(){setting.ismouseover=false})

		if (setting.$wrapperdiv.swipe){ // if swipe enabled (swipe function exists)
			var swipeOptions={ // swipe object variables
				triggerOnTouchEnd : true,
				triggerOnTouchLeave : true,
				threshold: 75,
				allowPageScroll: 'vertical',
				excludedElements:[]
			}

			swipeOptions.swipeStatus = function(event, phase, direction, distance){
				var evtparent = event.target.parentNode // check parent element of target image
				if (phase == 'start' && evtparent.tagName == 'A'){ // cancel A action when finger makes contact with element
					evtparent.onclick = function(){
						return false
					}
				}
				if (phase == 'cancel' && evtparent.tagName == 'A'){ // if swipe action canceled (so no proper swipe), enable A action
					evtparent.onclick = function(){
						return true
					}
				}
				if (phase == 'end'){
					var navkeyword = /(right)/i.test(direction)? 'prev' : 'next'
					if ( /(left)|(right)/i.test(direction) )
					slideshow.navigate(navkeyword)
				}
			}

			setting.$wrapperdiv.swipe(swipeOptions)
		} // end setting.$wrapperdiv.swipe check

		slideshow.paginateinit($);
		function loaded_or_error(){
			$loadingimg.hide()
			setting.$wrapperdiv.bind('touchstart mouseenter', function(e){ //pause slideshow mouseover
/*				setting.ismouseover = true;
				if(e.type === 'touchstart'){
					clearTimeout(setting.ismouseovertimer);
					setting.ismouseovertimer = setTimeout(function(){setting.ismouseover = false;}, 600);
				}*/
			});
			slideshow.showslide(setting.curimage)
		}
		if ($curimage.get(0).complete){loaded_or_error(); //accounf for IE firing image.onload too soon for cached and small images
		} else { //initialize slideshow when first image has fully loaded or errors out
			$(new Image()).bind('load error', loaded_or_error).attr('src', $curimage.attr('src'));
		}
		setting.oninit.call(slideshow) //trigger oninit() event

		$(window).bind('resize', function(){ // when window is resized, reposition description panel and images
			var slideshowdimensions = [
				setting.$wrapperdiv.outerWidth(),
				setting.$wrapperdiv.outerHeight()
			]
			if (slideshowdimensions[0] == setting.dimensions[0] && slideshowdimensions[1] == setting.dimensions[1]){ // if no change in image dimensions, just exit
				return
			}

			setting.dimensions = slideshowdimensions // refresh image dimensions data
			if (setting.$descpanel && setting.$descpanel.length == 1){ // if description panel enabled for slideshow
				setting.$descpanel
					.find('div')
					.css({width:setting.$descpanel.width()-8})
					.eq(2) // reference hidden description panel (used to calculate height of longest message
					.css({height:'auto', background:'blue'}).html(setting.closebutton + setting.longestdesc).end() // populate hidden DIV with longest message
				setting.panelheight = setting.$descpanel.find('div').eq(2).outerHeight() // then get height of that DIV
				setting.$descpanel.css({height: setting.panelheight}) // reset main description panel height
				if (!setting.$restorebutton || (setting.$restorebutton && setting.$restorebutton.css('visibility') == 'hidden')){ // if panel doesn't contain restore button (meaning it should always be repositioned onresize), or there is restore button and it's currenty hidden (meaning panel is currently not minimized)
					setting.$descpanel.css({top:setting.dimensions[1]-setting.panelheight})
				}
			}
			var $slideimage=setting.$gallerylayers.eq(setting.fglayer).find('img').eq(setting.curimage)
			var imgdimensions=[$slideimage.width(), $slideimage.height()] //center align image
			$slideimage.css({marginLeft: (imgdimensions[0]>0 && imgdimensions[0]<setting.dimensions[0])? setting.dimensions[0]/2-imgdimensions[0]/2 : 0})
			$slideimage.css({marginTop: (imgdimensions[1]>0 && imgdimensions[1]<setting.dimensions[1])? setting.dimensions[1]/2-imgdimensions[1]/2 : 0})
		})
		$(window).bind('unload', function(){ //clean up and persist
			if (slideshow.setting.persist) //remember last shown image's index
				fadeSlideShow.routines.setCookie("gallery-"+setting.wrapperid, setting.curimage)
			jQuery.each(slideshow.setting, function(k){
				if (slideshow.setting[k] instanceof Array){
					for (var i=0; i<slideshow.setting[k].length; i++){
						if (slideshow.setting[k][i].tagName=="DIV") //catches 2 gallerylayer divs, gallerystatus div
							slideshow.setting[k][i].innerHTML=null
						slideshow.setting[k][i]=null
					}
				}
			})
			slideshow=slideshow.setting=null
		})
	})
}

fadeSlideShow.prototype={

	navigate:function(keyword){
		var setting=this.setting
		clearTimeout(setting.playtimer)
		if (setting.displaymode.type=="auto"){ //in auto mode
			setting.displaymode.type="manual" //switch to "manual" mode when nav buttons are clicked on
			setting.displaymode.wraparound=true //set wraparound option to true
		}
		if (!isNaN(parseInt(keyword))){ //go to specific slide?
			this.showslide(parseInt(keyword))
		}
		else if (/(prev)|(next)/i.test(keyword)){ //go back or forth inside slide?
			this.showslide(keyword.toLowerCase())
		}
	},

	showslide:function(keyword){
		var slideshow=this
		var setting=slideshow.setting
		if (setting.displaymode.type=="auto" && setting.ismouseover && setting.currentstep<=setting.totalsteps){ //if slideshow in autoplay mode and mouse is over it, pause it
			setting.playtimer=setTimeout(function(){slideshow.showslide('next')}, setting.displaymode.pause)
			return
		}
		var totalimages=setting.imagearray.length
		var imgindex=(keyword=="next")? (setting.curimage<totalimages-1? setting.curimage+1 : 0)
			: (keyword=="prev")? (setting.curimage>0? setting.curimage-1 : totalimages-1)
			: Math.min(keyword, totalimages-1)
		var $slideimage=setting.$gallerylayers.eq(setting.bglayer).find('img').hide().eq(imgindex).show() //hide all images except current one
		var imgdimensions=[$slideimage.width(), $slideimage.height()] //center align image
		$slideimage.css({marginLeft: (imgdimensions[0]>0 && imgdimensions[0]<setting.dimensions[0])? setting.dimensions[0]/2-imgdimensions[0]/2 : 0})
		$slideimage.css({marginTop: (imgdimensions[1]>0 && imgdimensions[1]<setting.dimensions[1])? setting.dimensions[1]/2-imgdimensions[1]/2 : 0})
		if (setting.descreveal=="peekaboo" && setting.longestdesc!=""){ //if descreveal is set to "peekaboo", make sure description panel is hidden before next slide is shown
			clearTimeout(setting.hidedesctimer) //clear hide desc panel timer
			slideshow.showhidedescpanel('hide', 0) //and hide it immediately
		}
		setting.$gallerylayers.eq(setting.bglayer).css({zIndex:1000, opacity:0.5}) //background layer becomes foreground
			.stop().css({opacity:0}).animate({opacity:1}, setting.fadeduration, function(){ //Callback function after fade animation is complete:
				clearTimeout(setting.playtimer)
				try{
					setting.onslide.call(slideshow, setting.$gallerylayers.eq(setting.fglayer).get(0), setting.curimage)
				}catch(e){
					alert("Fade In Slideshow error: An error has occured somwhere in your code attached to the \"onslide\" event: "+e)
				}
				if (setting.descreveal=="peekaboo" && setting.longestdesc!=""){
					slideshow.showhidedescpanel('show')
					setting.hidedesctimer=setTimeout(function(){slideshow.showhidedescpanel('hide')}, setting.displaymode.pause-fadeSlideShow_descpanel.slidespeed)
				}	
				setting.currentstep+=1
				if (setting.displaymode.type=="auto"){
					if (setting.currentstep<=setting.totalsteps || setting.displaymode.cycles==0)
						setting.playtimer=setTimeout(function(){slideshow.showslide('next')}, setting.displaymode.pause)
				}
			}) //end callback function
		setting.$gallerylayers.eq(setting.fglayer).css({zIndex:999}) //foreground layer becomes background
		setting.fglayer=setting.bglayer
		setting.bglayer=(setting.bglayer==0)? 1 : 0
		setting.curimage=imgindex
		if (setting.$descpanel){
			setting.$descpanel.css({visibility:(setting.imagearray[imgindex][3])? 'visible' : 'hidden'})
			if (setting.imagearray[imgindex][3]) //if this slide contains a description
				setting.$descinner.empty().html(setting.closebutton + setting.imagearray[imgindex][3])
		}
		if (setting.displaymode.type=="manual" && !setting.displaymode.wraparound){
			this.paginatecontrol()
		}
		if (setting.$status) //if status container defined
			setting.$status.html(setting.curimage+1 + "/" + totalimages)
	},

	showhidedescpanel:function(state, animateduration){
		var setting=this.setting
		var endpoint=(state=="show")? setting.dimensions[1]-setting.panelheight : this.setting.dimensions[1]
		setting.$descpanel.stop().animate({top:endpoint}, (typeof animateduration!="undefined"? animateduration : fadeSlideShow_descpanel.slidespeed), function(){
			if (setting.descreveal=="always" && state=="hide")
				setting.$restorebutton.css({visibility:'visible'}) //show restore button
		})
	},

	paginateinit:function($){
		var slideshow=this
		var setting=this.setting
		if (setting.togglerid){ //if toggler div defined
			setting.$togglerdiv=$("#"+setting.togglerid)
			setting.$prev=setting.$togglerdiv.find('.prev').data('action', 'prev')
			setting.$next=setting.$togglerdiv.find('.next').data('action', 'next')
			setting.$prev.add(setting.$next).click(function(e){ //assign click behavior to prev and next controls
				var $target=$(this)
				slideshow.navigate($target.data('action'))
				e.preventDefault()
			})
			setting.$status=setting.$togglerdiv.find('.status')
		}
	},

	paginatecontrol:function(){
		var setting=this.setting
			setting.$prev.css({opacity:(setting.curimage==0)? 0.4 : 1}).data('action', (setting.curimage==0)? 'none' : 'prev')
			setting.$next.css({opacity:(setting.curimage==setting.imagearray.length-1)? 0.4 : 1}).data('action', (setting.curimage==setting.imagearray.length-1)? 'none' : 'next')
			if (document.documentMode==8){ //in IE8 standards mode, apply opacity to inner image of link
				setting.$prev.find('img:eq(0)').css({opacity:(setting.curimage==0)? 0.4 : 1})
				setting.$next.find('img:eq(0)').css({opacity:(setting.curimage==setting.imagearray.length-1)? 0.4 : 1})
			}
	}

	
}

fadeSlideShow.routines={

	getSlideHTML:function(imgelement){
		var layerHTML=(imgelement[1])? '<a href="'+imgelement[1]+'" target="'+imgelement[2]+'">\n' : '' //hyperlink slide?
		layerHTML+='<img src="'+imgelement[0]+'" style="border-width:0;" />\n'
		layerHTML+=(imgelement[1])? '</a>\n' : ''
		return layerHTML //return HTML for this layer
	},

	getFullHTML:function(imagearray){
		var preloadhtml=''
		for (var i=0; i<imagearray.length; i++)
			preloadhtml+=this.getSlideHTML(imagearray[i])
		return preloadhtml
	},

	adddescpanel:function($, setting){
		setting.$descpanel=$('<div class="fadeslidedescdiv"></div>')
			.css({position:'absolute', visibility:'hidden', width:'100%', left:0, top:setting.dimensions[1], font:fadeSlideShow_descpanel.fontStyle, zIndex:'1001'})
			.appendTo(setting.$wrapperdiv)
		$('<div class="descpanelbg"></div><div class="descpanelfg"></div><div class="descpanelhidden"></div>') //create inner nav panel DIVs
			.css({position:'absolute', left:0, top:0, width:setting.$descpanel.width()-8, padding:'4px'})
			.eq(0).css({background:'black', opacity:0.7}).end() //"descpanelbg" div
			.eq(1).css({color:'white'}).html(setting.closebutton + setting.longestdesc).end() //"descpanelfg" div
			.eq(2).css({visibility: 'hidden', zIndex: -1}).html(setting.closebutton + setting.longestdesc).end() //"descpanelhidden" hidden div to re-get height of panel after populating it with text
			.appendTo(setting.$descpanel)
		setting.$descinner=setting.$descpanel.find('div.descpanelfg')
		setting.panelheight=setting.$descinner.outerHeight()
		setting.$descpanel.css({height:setting.panelheight}).find('div').css({height:'100%'})
		if (setting.descreveal=="always"){ //create restore button
			setting.$restorebutton=$('<img class="restore" title="Restore Description" src="' + fadeSlideShow_descpanel.controls[1][0] +'" style="position:absolute;visibility:hidden;right:0;bottom:0;z-index:1002;width:'+fadeSlideShow_descpanel.controls[1][1]+'px;height:'+fadeSlideShow_descpanel.controls[1][2]+'px;cursor:pointer;cursor:hand" />')
				.appendTo(setting.$wrapperdiv)


		}
	},


	getCookie:function(Name){ 
		var re=new RegExp(Name+"=[^;]+", "i"); //construct RE to search for target name/value pair
		if (document.cookie.match(re)) //if cookie found
			return document.cookie.match(re)[0].split("=")[1] //return its value
		return null
	},

	setCookie:function(name, value){
		document.cookie = name+"=" + value + ";path=/"
	}
}