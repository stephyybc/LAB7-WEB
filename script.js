$(document).ready(function() {

// Start your code from here
$(document).ready(function() {

    var animals= ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", 
    "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", 
    "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", 
    "serval", "salamander", "frog"];

    function populateButtons(array){
        $("#animal-buttons").empty();

        array.forEach(element => {
            var a=$("<button>");
            a.text(element);
            a.addClass("animal-button")
            a.attr("data-type", element)
            $("#animal-buttons").append(a);
        });
    }

    $("#animal-buttons").on("click", ".animal-button", function(){
        //alert("click"); //test alert

        $("#animals").empty();

        //search term
        var type = $(this).attr("data-type");
        //alert(type); //test alert

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=bW9CQfGxZnXyYWbOhmX5GSm0oLjKtJhJ&q=&limit=10";

        $.ajax ({
            url: queryURL,
            method: "GET"
        })  
        .then(function(response){
            console.log(response); //test console log request
            response.data.forEach(gif => {
                var animalDiv = $(`<div class='animal-item'>`);
                var rating = gif.rating;

                var p = $("<p>").text("Rating: "+ rating);
                
                var animated = gif.images.fixed_height.url;
                var still = gif.images.fixed_height_still.url;

                var animalImage = $("<img>");
                animalImage.attr("src", still);
                animalImage.attr("data-still", still);
                animalImage.attr("data-animated", animated);
                animalImage.attr("data-state", "still");
                animalImage.addClass("animal-image");

                animalDiv.append(p);
                animalDiv.append(animalImage);

                $("#animals").append(animalDiv);
            })
        })              
    })

    $("#animals").on("click", ".animal-image", function(){
        //alert("."); //test alert
        
        var state = $(this).attr("data-state");

        if(state === "still"){
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animated");
        }
        else{
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })

    $("#add-animal").on("click", function(e){
        e.preventDefault();

        var newItem = $("input").val();
        
        animals.push(newItem);
        populateButtons(animals);
    })


    populateButtons(animals);

    /*
    // Metodo manual
    var a=$("<button>");
    a.text("dog");
    $("#animal-buttons").append(a);
    */
});
