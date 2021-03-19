var lineWidth = 10;
var color = "#333333";

function ret() {return false}

function update(property) {
	if(property == 1) lineWidth = document.querySelector("#lineWidth").value;
	if(property == 2) color = document.querySelector("#color").value;
}

window.addEventListener("load", () => {
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext("2d");
	
	canvas.width = window.innerWidth / 1.1;
	canvas.height = window.innerHeight / 1.25;
	
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
		
		ctx.lineTo(e.clientX, e.clientY);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(e.clientX, e.clientY);
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
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", finishPainting);
	canvas.addEventListener("mousemove", paint);
	canvas.addEventListener("touchstart", startPainting);
	canvas.addEventListener("touchend", finishPainting);
	canvas.addEventListener("touchmove", paintOnTouch);
});