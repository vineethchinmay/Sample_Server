
function Onload_func(length, width, result)
{

	var body = document.getElementsByTagName("body")[0];
	$("#names").remove();
	var tbl = document.createElement("table");
	tbl.setAttribute("id","names");
	tbl.setAttribute("align","center");
	var tblBody = document.createElement("tbody");

	for (var i = 0; i < length; i++) 
	{
		var row = document.createElement("tr");
		var cell = document.createElement("td");
		var cellText = document.createTextNode(result[i].first_name);
		cell.appendChild(cellText);
		row.appendChild(cell);
		var cell = document.createElement("td");
		var cellText = document.createTextNode(result[i].last_name);
		cell.appendChild(cellText);
		row.appendChild(cell);
		tblBody.appendChild(row);
	}

	tbl.appendChild(tblBody);
	body.appendChild(tbl);
	tbl.setAttribute("border", "2");
	
};