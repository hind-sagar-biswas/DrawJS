var name = "drJs-img-";
var lineWidth = 10;
var color = "#333333";

var dateObj = new Date();
name += dateObj.getTime();

document.querySelector("#name"). value = name;
document.querySelector("#nameShow").innerHTML = name + ".png";

function update(property) {
	if(property == 0) {
			document.querySelector("#nameShow").innerHTML = document.querySelector("#name").value;
		name = document.querySelector("#name").value;
	}
	if(property == 1) lineWidth = document.querySelector("#lineWidth").value;
	if(property == 2) {
			document.querySelector("#colorDisplay").style.background = document.querySelector("#color").value;
		color = document.querySelector("#color").value;
	}
}

window.addEventListener("load", () => {
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext("2d");
	
	//canvas.width = window.innerWidth - 12;
	canvas.innerWidth = window.innerHeight / 1.5;;
	canvas.height =  window.innerHeight / 1.5;;
	
	var painting = false;
	
	function startPainting(e) {
		painting = true;
		paint(e)
	}
	function finishPainting() {
		painting = false;
		ctx.beginPath();
	}
	function paint(e) {
		if(!painting) return;
		
		ctx.lineWidth = 10;
		ctx.lineCap = "round";
		ctx.strokeStyle = color;
		
		ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
	}
	function paintOnTouch(e) {
		if(!painting) return;
		
		var touch = e.touches[0];
		var x = touch.pageX;
		var y = touch.pageY;
// or taking offset into consideration
		var x_2 = touch.pageX - canvas.offsetLeft;
		var y_2 = touch.pageY - canvas.offsetTop;
		
		ctx.lineWidth = lineWidth;
		ctx.lineCap = "round";
		ctx.strokeStyle = color;
		
		ctx.lineTo(x_2, y_2);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(x_2, y_2);
	}
	 document.getElementById("clearCanvas").addEventListener("click", () => { ctx.clearRect(0, 0, canvas.width, canvas.height) });
	document.querySelector("#download").addEventListener("click", () => {
		// create temporary link  
		var tmpLink = document.createElement( 'a' );  
		tmpLink.download = name + ".png"; // set the name of the download file 
		tmpLink.href = canvas.toDataURL("image/png");;  
  	
		// temporarily add link to body and initiate the download  
		document.body.appendChild( tmpLink );  
		tmpLink.click();  
		document.body.removeChild( tmpLink );
});

	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", finishPainting);
	canvas.addEventListener("mousemove", paint);
	canvas.addEventListener("touchstart", startPainting);
	canvas.addEventListener("touchend", finishPainting);
	canvas.addEventListener("touchmove", paintOnTouch);
});