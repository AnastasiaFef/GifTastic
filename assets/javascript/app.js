$(document).ready(function(){

	//make a list for pre-created buttons
	var buttons=["cat", "dog", "monkey"];
	console.log(buttons[0]);

	//add buttons to the DOM
	for(var i=0; i<buttons.length; i++){
		var new_button= $("<div>");
		new_button.attr("class", "btn btn-primary");
		new_button.attr("role", "button");
		new_button.attr("data-text", buttons[i]);
		new_button.text(buttons[i]);
		$("#button-container").append(new_button);
	};

	//on button click
	//get data-text of button to add to gif URL
	//return 10 gifs with rating
	//add each git with rating to DOM 
	//add X to remove gif


	//on click add-button
	//get text
	//create a new button, add text to text and attr "data-text"









})