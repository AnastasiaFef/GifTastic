$(document).ready(function(){

	//make a list for pre-created buttons
	var buttons=["cat", "dog", "monkey"];
	var query_url="http://api.giphy.com/v1/gifs/search?limit=10&api_key=dc6zaTOxFJmzC&q="

	//add buttons to the DOM
	for(var i=0; i<buttons.length; i++){
		var animal = buttons[i];
		display_button();
	};

	//on .animal_button click
	$(document).on("click",".animal-btn", function(){
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
			console.log(response);
			number_of_gifs = response.data.length
			for (var i=0; i<number_of_gifs; i++){
				// var array= response.data
				var still_img= response.data[i].images.original_still.url;
				var img_animated= response.data[i].images.fixed_height.url.split("?")[0];
				var rating=response.data[i].rating
				var gif_box=$("<div>");
				var gif_element= $("<img>");
				gif_element.attr("src", still_img);
				gif_box.attr("class", "gif");
				gif_element.attr("class", "gif_img");
				gif_element.attr("data-still_img", still_img);
				gif_element.attr("data-img_animated", img_animated);
				gif_element.attr("data-state", "still");
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
		var text=$("#animal-input").val().trim();
		if(text.length<1){
			alert("Please insert some text");
			return;
		}
	//check if that was already added
		var used=false;
		for(var i=0; i<buttons.length; i++){
			if(text===buttons[i]){
				used = true;
			}
		}
	//create a new button 
	//add text to text and attr "data-text"
	//push to Buttons array
	//clear input field
		if(!used){
			animal=text;
			display_button(); 
			buttons.push(text);
		}
		else{
			alert("Button "+text +" already exists");
		}
		$("#animal-input").val("");
	})

	function display_button(){
		var new_button= $("<div>");
		new_button.attr("class", "btn btn-primary animal-btn");
		new_button.attr("role", "button");
		new_button.attr("data-text", animal);
		new_button.text(animal);
		$("#button-container").append(new_button);
	}

	//on click on X remove the gif

	//on click on GIF, stop or start it
	$(document).on("click",".gif_img", function(){
		console.log($(this).attr("data-state"))
		var status=$(this).attr("data-state")
		if(status=="still"){
			var img_animated=$(this).data("img_animated");
			console.log("img mp4: "+ img_animated)
			$(this).attr("src",img_animated);
			$(this).attr("data-state", "animate");
		}
		else if($(this).attr("data-state")=="animate"){
			var still_img=$(this).data("still_img");
			console.log("still img: "+still_img)
			$(this).attr("src", still_img);
			$(this).attr("data-state", "still");
		}
	})
})