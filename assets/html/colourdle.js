let root = document.documentElement;
let inputBoxes = [["chance1_1", "chance1_2", "chance1_3"], ["chance2_1", "chance2_2", "chance2_3"], ["chance3_1", "chance3_2", "chance3_3"], ["chance4_1", "chance4_2", "chance4_3"], ["chance5_1", "chance5_2", "chance5_3"]];
let inputRects = ["--inputRect1", "--inputRect2", "--inputRect3", "--inputRect4", "--inputRect5"];
let inputArrows = [["arrowR1", "arrowG1", "arrowB1"], ["arrowR2", "arrowG2", "arrowB2"], ["arrowR3", "arrowG3", "arrowB3"], ["arrowR4", "arrowG4", "arrowB4"], ["arrowR5", "arrowG5", "arrowB5"]];
let count = 0;
randomizeColour();

function randomizeColour()
{
	var r = Math.floor(Math.random() * 255);
	var g = Math.floor(Math.random() * 255);
	var b = Math.floor(Math.random() * 255);
	var newCol = rgbToHex(r, g, b);
	// console.log(hexToRgb(newCol));
	root.style.setProperty('--col', newCol);
}

function checkInputColour()
{
	var r = document.getElementById('redInput').value;
	var g = document.getElementById('greenInput').value;
	var b = document.getElementById('blueInput').value;
	if(r == "" || g == "" || b == "")
	{
		alert("No colour selected!");
	}
	else
	{
		var rectCol = hexToRgb(getComputedStyle(root).getPropertyValue('--col'));
		var inputCol = hexToRgb(rgbToHex(r, g, b));
		if(rectCol.r == inputCol.r && rectCol.g == inputCol.g && rectCol.b == inputCol.b)
		{
			alert("Correct!");
		}
		else
		{
			var rArrow = document.getElementById(inputArrows[count][0]);
			var gArrow = document.getElementById(inputArrows[count][1]);
			var bArrow = document.getElementById(inputArrows[count][2]);
			if(rectCol.r > inputCol.r)
			{
				rArrow.innerText = "▲";
				showArrow(inputArrows[count][0]);
				//toggleArrow("arrowR");
			}
			else if(rectCol.r < inputCol.r)
			{
				rArrow.innerText = "▼";
				showArrow(inputArrows[count][0]);
				//toggleArrow("arrowR");
			}
			if(rectCol.g > inputCol.g)
			{
				gArrow.innerText = "▲";
				showArrow(inputArrows[count][1]);
				//toggleArrow("arrowG");
			}
			else if(rectCol.g < inputCol.g)
			{
				gArrow.innerText = "▼";
				showArrow(inputArrows[count][1]);
				//toggleArrow("arrowG");
			}
			if(rectCol.b > inputCol.b)
			{
				bArrow.innerText = "▲";
				showArrow(inputArrows[count][2]);
				//toggleArrow("arrowB");
			}
			else if(rectCol.b < inputCol.b)
			{
				bArrow.innerText = "▼";
				showArrow(inputArrows[count][2]);
				//toggleArrow("arrowG");
			}
		}

		root.style.setProperty(inputRects[count], rgbToHex(inputCol.r, inputCol.g, inputCol.b));
		count++;
	}
	if(count == inputRects.length)
	{	
		var col = hexToRgb(getComputedStyle(root).getPropertyValue('--col'));
		var x = document.getElementById("answer");
		x.innerText = "The correct answer is: " + col.r + " " + col.g + " " + col.b;
		x.style.visibility = "visible";
		return;
	}
}

function moveInputColour()
{
	var r = document.getElementById('redInput').value;
	var g = document.getElementById('greenInput').value;
	var b = document.getElementById('blueInput').value;

	if(r>255 || r<0 || g>255 || g<0 || b>255 || b<0)
	{
		alert("One or more input was outside of range.\nPlease input between 0 and 255.");
		clearInput();
		return;
	}

	var rInput = document.getElementById(inputBoxes[count][0]);
	var gInput = document.getElementById(inputBoxes[count][1]);
	var bInput = document.getElementById(inputBoxes[count][2]);
	rInput.innerText = r;
	gInput.innerText = g;
	bInput.innerText = b;
	checkInputColour();
	clearInput();
}

// Clearing user inputs
function clearInput()
{
	document.getElementById('redInput').value = "";
	document.getElementById('greenInput').value = "";
	document.getElementById('blueInput').value = "";
}

function showAnswer(r, g, b)
{
	var x = document.getElementById("answer");
	document.getElementById('redInput').innerText = "The correct answer is: " + r + " " + g + " " + b;
	x.style.visibility = "visible";
}


function showArrow(id)
{
	var x = document.getElementById(id);
	if(x.style.visibility = "hidden")
	{
		x.style.visibility = "visible";
	}
}

function hideArrow(id)
{
	var x = document.getElementById(id);
	if(x.style.visibility == "visible")
	{
		x.style.visibility = "hidden";
	}
}

function checkValue(id)
{
	var val = parseInt(document.getElementById(id).value, 10);
	if(val > 255 || val < 0)
	{
		alert("Value outside specified min/max. Please input a value between 0 and 255.");
		document.getElementById(id).value = "";
	}
}

/*--------------------------------------------------------------------------------------------------------------------------------*/
/*Converting between colour types*/
function rgbToHex(r, g, b)
{
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function componentToHex(c)
{
	var num = parseInt(c, 10);
	var hex = num.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}
/*--------------------------------------------------------------------------------------------------------------------------------*/