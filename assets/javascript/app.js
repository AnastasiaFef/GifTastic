$(document).ready(function(){

	//make a list for pre-created buttons
	var buttons=["cat", "dog", "monkey"];
	var query_url="http://api.giphy.com/v1/gifs/search?limit=10&api_key=dc6zaTOxFJmzC&q="

	//add buttons to the DOM
	for(var i=0; i<buttons.length; i++){
		var new_button= $("<div>");
		new_button.attr("class", "btn btn-primary animal-btn");
		new_button.attr("role", "button");
		new_button.attr("data-text", buttons[i]);
		new_button.text(buttons[i]);
		$("#button-container").append(new_button);
	};

	//on .animal_button click
	$(".animal-btn").on("click", function(){
		console.log("In on click")
		//get data-text of button to add to gif URL
		var selected_animal=$(this).attr("data-text");
		console.log(selected_animal);
		//return 10 gifs with rating
		$.ajax({
			url: query_url+selected_animal,
			method:"GET"
		}).done(function(response){
		//add each git with rating to DOM 
			number_of_gifs = response.data.length
			for (var i=0; i<number_of_gifs; i++){
				// var array= response.data
				var still_img= response.data[i].images.original_still.url;
				var img_mp4= response.data[i].images.original_mp4.mp4;
				var rating=response.data[i].rating
				var gif_box=$("<div>");
				var gif_element= $("<img>");
				gif_element.attr("src", still_img);
				gif_box.attr("class", "gif")
				gif_element.attr("alt", selected_animal);
				gif_box.append(gif_element);
				gif_box.append("<p>Rating: "+rating+"</p>")
				$("#gif-container").prepend(gif_box)
			};
		//add X to remove gif
		})
	})


	//on click on #add-button
	$(".add-btn").on("click", function(){
	//get text
		var text=$("#animal-input").val();
	//check if that was already added
		var used=false;
		for(var i=0; i<buttons.length; i++){
			if(text===buttons[i]){
				used = true;
			}
		}
	//create a new button, add text to text and attr "data-text", push to Buttons array
		if(!used){

		}
		else{
			alert("Button "+text +" already exists");
		}
	})

	//on click on X remove the gif

	//on click on GIF, stop or start it




})