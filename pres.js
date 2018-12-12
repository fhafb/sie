// Load SVG template
document.addEventListener("DOMContentLoaded",function(event) {
	// Load external SVG defs
	let xhttp=new XMLHttpRequest();
	xhttp.open('GET','svgtemplate_defs.svg',true);
	xhttp.onreadystatechange=function() {
		if (this.readyState==XMLHttpRequest.DONE && this.status==200) document.getElementsByTagName('body')[0].insertAdjacentHTML('afterbegin',this.responseText);
	}
	xhttp.send();
});


// Animation of slide with arrows
let animl=0,lasttime=null,
		svgPath=document.getElementById("arrow001"),
		svgPath2=document.getElementById("arrow002"),
		svgImage1=document.getElementById("im001"),
		svgImage2=document.getElementById("im002");
let stopanim001id=false;

function anim001(time) {
	if (lasttime!=null) animl+=(time-lasttime)*0.001;
	if (animl>=2) animl-=2;
	lasttime=time;
	if (animl<=1) {
		let y=animl;
		svgPath.setAttribute('d','M 240 150 c '+(60*y)+' '+(-60*y)+', '+(y*y*240+2*y*(1-y)*60)+' '+(-y*y*60-2*y*(1-y)*60)+', '+(3*y*(1-y)**2*60+3*y*y*(1-y)*240+y**3*300)+' '+(-3*y*(1-y)**2*60-3*y*y*(1-y)*60));
		svgPath2.setAttribute('d','M '+
				((1-y)**3*540+3*y*(1-y)**2*480+3*y*y*(1-y)*300+y**3*240)+' '+((1-y)**3*250+3*y*(1-y)**2*310+3*y*y*(1-y)*310+y**3*250)+' C '+
				((1-y)**2*480+2*y*(1-y)*300+y*y*240)+' '+((1-y)**2*310+2*y*(1-y)*310+y**2*250)+', '+
				((1-y)*300+y*240)+' '+((1-y)*310+y*250)+', 240 250');
		svgImage1.style.opacity=""+animl;
		svgImage2.style.opacity=""+(1-animl);
	} else {
		let y=animl-1;
		svgPath.setAttribute('d','M '+
				((1-y)**3*240+3*y*(1-y)**2*300+3*y*y*(1-y)*480+y**3*540)+' '+((1-y)**3*150+3*y*(1-y)**2*90+3*y*y*(1-y)*90+y**3*150)+' C '+
				((1-y)**2*300+2*y*(1-y)*480+y*y*540)+' '+((1-y)**2*90+2*y*(1-y)*90+y**2*150)+', '+
				((1-y)*480+y*540)+' '+((1-y)*90+y*150)+', 540 150');
		svgPath2.setAttribute('d','M 540 250 c '+(-60*y)+' '+(60*y)+', '+(-y*y*240-2*y*(1-y)*60)+' '+(y*y*60+2*y*(1-y)*60)+', '+(-3*y*(1-y)**2*60-3*y*y*(1-y)*240-y**3*300)+' '+(3*y*(1-y)**2*60+3*y*y*(1-y)*60));
		svgImage1.style.opacity=""+(2-animl);
		svgImage2.style.opacity=""+(animl-1);
	}
	if (!stopanim001id) requestAnimationFrame(anim001);
}

function activate_arrows() {
	stopanim001id=false;
	animl=0;
	lasttime=null;
	anim001();
}

function deactivate_arrows() {
	stopanim001id=true;
}

function run_svg_animations(slide) {
	slide.find('animate').each(function() {
		$(this)[0].beginElement();
	});
}

function stop_svg_animations(slide) {
	slide.find('animate').each(function() {
		$(this)[0].endElement();
	});
}

