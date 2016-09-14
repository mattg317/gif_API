$(document).ready(function(){

console.log("working");

var topics = ['football', 'soccer', 'rugby', 'hockey', 'basketball', 'baseball', 'golf'];


//Gif Ajax================\
function displayGif(){
	$('#gif').empty();
	var gif = $(this).attr('data-name');
	var queryURL= 'https://crossorigin.me/http://api.giphy.com/v1/gifs/search?q='+gif+'&limit=10&api_key=dc6zaTOxFJmzC';  

	$.ajax({url: queryURL, method: 'GET'}).done(function(response){

		console.log(response);
		console.log("still: "+ response.data[0].images.fixed_height_still);
		console.log(response.data[0].id);
		console.log('line 16'+ response.data[0].images.downsized)
		console.log(response.data.length)

			// Loop throught the api 
			for(var i=0, n = response.data.length; i<n;i++){

				var info = $('<div class="info">'); //creat div for gif
				//grab moving gif     
				var gifAuto= response.data[i].images.fixed_height.url;
				//grab still image 
				var gifStill = response.data[i].images.fixed_height_still.url;
				//
				var gifFull =$('<img class="pics">').attr('src', gifStill).data('still', gifStill).data('animate', gifAuto).data('state','still');

				//store dive package and rating into var infpo
				var rating= $('<p>').text('Rating: '+response.data[i].rating);
				info.append(rating, gifFull);
				//appened to gif section
				$('#gif').append(info);	
			
			
			};
//Animates gif on click as well as stops it===================================
			$('.pics').on('click',function(){
				console.log('click');
			
				var state= $(this).data('state');
				console.log(state)

					 if ( state == 'still'){
		                $(this).attr('src', $(this).data('animate'));
		                $(this).data('state', 'animate');
			            }
			          else{
		                $(this).attr('src', $(this).data('still'));
		                $(this).data('state', 'still');
	            	};//else

			})



	});




}



//render buttons==============================

function renderButtons(){

	$(".buttons").empty();
	$('#gifinput').val('');

	
	for(var i=0, n=topics.length; i<n; i++){
		console.log("go")
		var b = $('<button>')

		b.addClass('topicBtn');
		b.attr('data-name', topics[i]);
		b.text(topics[i]);
		$('.buttons').append(b);
	}
}
//Add buttons=====================================

$('#addGif').on('click',function(){
	var topic = $('#gifinput').val().trim();

	topics.push(topic);
	renderButtons();

	console.log(topic);

	return false;

});


//Call function=======
renderButtons();
// displayGif();
//Call the the functon on the clicks===================================
$(document).on('click', '.topicBtn', '.gif', displayGif);

});//document ready