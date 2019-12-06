// inside main_javascript.js 
  
function start() {
	//
	
	// Canvas Vars
	var can = document.getElementById('canvas');
	var fall = document.getElementById("fall");
	fall.src="";
	//User Vals
	var height = document.getElementById("height").value;
	var mass = document.getElementById("mass").value;
	var gravity = document.getElementById("gravity").value;
	var e = document.getElementById("orient");
	var oriented = e.options[e.selectedIndex].value;
	
	//Preset Vals
	var Cd1 = .7;
	var Cd2 = 1;
	var p = 1.225;
	var A1 = .18;
	var A2 = .41 * 1.7;
	var k1 = (p * A1 * Cd1) / 2;
	var k2 = (p * A2 * Cd2) / 2;
	var initialT = new Date();
	
	// Calculated Values
	var dy = 0;
	var v = 0;
	var vt1 = Math.sqrt((2*mass*gravity)/(p*Cd1*A1));
	var vt2 = Math.sqrt((2*mass*gravity)/(p*Cd2*A2));
	var Fd = 0;

	
	// Document Vals
	var t = document.getElementById("t");
	var y = document.getElementById("y");
	var drag = document.getElementById("drag");
	var fgravity = document.getElementById("fgravity");
	var velocity = document.getElementById("velocity");
	var Fg = mass * gravity;
	Fg = Fg.toFixed(2);	
	fgravity.value = Fg;
	//Nosedive
	if (oriented == 1) {
		initialT = new Date();
		can.play();
		fall.src="falling.png";
		function noseDive() {
			var instantT = new Date();
			var time = instantT - initialT;
			time /= 1000;
			v = vt1 * Math.tanh((gravity * time / vt1));
			dy = height - (((vt1 * vt1) / gravity) * Math.log(Math.cosh((gravity*time)/vt1)));
			Fd = k1 * (v * v);
			if (Fd >= Fg) {
				v = vt1;
				Fd = Fg;
			}
			// Round to 2 Decimal Places
			Fd = Fd.toFixed(2);
			v = v.toFixed(2);
			
			
			// Set HTML values
			velocity.value=v;
			t.value=time;
			drag.value=Fd;
			fgravity.value=Fg;
			y.value=dy;
			if (dy <= 0) {
				y.value=0;
				clearInterval(or1);
				stop1();
			}
		}
		var or1 = setInterval(noseDive,20);
	}
	else if(oriented == 2) {
		initialT = new Date();
		can.play();
		fall.src="spread.png";
		function spreadDive() {
			var instantT = new Date();
			var time = instantT - initialT;
			time /= 1000;
			v = vt2 * Math.tanh((gravity * time / vt2));
			dy = height - (((vt2 * vt2) / gravity) * Math.log(Math.cosh((gravity*time)/vt2)));
			Fd = k2 * (v * v);
			if (Fd >= Fg) {
				v = vt2;
				Fd = Fg;
			}
			// Round to 2 Decimal Places
			Fd = Fd.toFixed(2);
			v = v.toFixed(2);
			
			
			// Set HTML values
			velocity.value=v;
			t.value=time;
			drag.value=Fd;
			fgravity.value=Fg;
			y.value=dy;
			if (dy <= 0) {
				y.value=0;
				stop2();
				clearInterval(or2);
			}
		}
		var or2 = setInterval(spreadDive,20);
	}
	function stop1() {
		var pos = 350;
		function draw() {
			if (pos > 725) {
				clearInterval(s);
				fall.src="nosedivee.gif";
				can.loop = false;
				can.pause();
			}
			else {
				pos++;
				fall.style.top = pos + "px";
			}
			
		}
		var s = setInterval(draw, .1);

		var time1 = new Date();
		function checkDone() {
			var cur = new Date() - time1;
			cur /= 1000;
			cur.toFixed(2);
			if (cur > 3) {
				fall.src="flat.png";
				fall.style.top = "805px";
				clearInterval(checkDone);
			}
		}
		setInterval(checkDone,.1);
	}
	function stop2() {
		var pos2 = 350;
		function draw2() {
			if (pos2 > 732) {
				clearInterval(s2);
				can.loop = false;
				can.pause();
			}
			else {
				pos2++;
				fall.style.top = pos2 + "px";
			}
		}
		
		var s2 = setInterval(draw2, .1);;
	}
} 
