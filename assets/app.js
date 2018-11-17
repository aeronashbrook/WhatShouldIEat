var LATI = 0;
var LONG = 0;
var zipInput = 0;
var cuisineInput2 = "";
var cuisineInput1 = "";
var timeInput = "";
var allergyInput = "";
var clickCounter = 0;

$(document).ready(function(){
    // Hiding pages until they are called by button clicks
    $("#InOutPage").hide();
    $("#MealTypePage1").hide();
    $("#MealTypePage2").hide();
    $("#CuisinePage1").hide();
    $("#CuisinePage2").hide();
    $("#PricePage").hide();
    $("#TimePage").hide();
    $("#AllergyPage").hide();
    $("#LocationPage").hide();
    $("#MapPage").hide();
    $("#resultsPage").hide();

    $("#getStarted").on("click", function() {
        $("#startPage").hide();
        $("#InOutPage").show();
    });

        $("#DineInButton").on("click", function() {
            $("#InOutPage").hide();
            $("#MealTypePage1").show();
        });

            $("#BreakfastButton1").on("click", function() {
                $("#MealTypePage1").hide();
                $("#TimePage").show();
                cuisineInput1 = "breakfast"
                console.log(cuisineInput1);
            }); 

            $("#DinnerButton1").on("click", function() {
                $("#MealTypePage1").hide();
                $("#CuisinePage1").show();
            }); 

                $("#AmericanButton1").on("click", function() {
                    $("#CuisinePage1").hide();
                    $("#TimePage").show();
                    cuisineInput1 = "American Dinner"
                }); 

                $("#ChineseButton1").on("click", function() {
                    $("#CuisinePage1").hide();
                    $("#TimePage").show();
                    cuisineInput1 = "Chinese Dinner"
                }); 

                $("#MexicanButton1").on("click", function() {
                    $("#CuisinePage1").hide();
                    $("#TimePage").show();
                    cuisineInput1 = "Mexican Dinner"
                }); 

                $("#ItalianButton1").on("click", function() {
                    $("#CuisinePage1").hide();
                    $("#TimePage").show();
                    cuisineInput1 = "Italian Dinner"
                }); 

                $("#IndianButton1").on("click", function() {
                    $("#CuisinePage1").hide();
                    $("#TimePage").show();
                    cuisineInput1 = "Indian Dinner"
                }); 

                $("#MediterraneanButton1").on("click", function() {
                    $("#CuisinePage1").hide();
                    $("#TimePage").show();
                    cuisineInput1 = "Mediterranean Dinner"
                }); 

            $("#DessertButton1").on("click", function() {
                $("#MealTypePage1").hide();
                $("#TimePage").show();
                cuisineInput1 = "Dessert";
            }); 

                $("#U30Button").on("click", function() {
                    $("#TimePage").hide();
                    $("#resultsPage").show();
                    timeInput = "0-30";
                    getRecipes();
                    clickCounter++;
                    database.ref().set({
                        clickCount: clickCounter
                      });
                });

                $("#U60Button").on("click", function() {
                    $("#TimePage").hide();
                    $("#resultsPage").show();
                    timeInput = "0-60";
                    getRecipes();
                    clickCounter++;
                    database.ref().set({
                        clickCount: clickCounter
                      });
                });

                $("#U90Button").on("click", function() {
                    $("#TimePage").hide();
                    $("#resultsPage").show();
                    timeInput = "0-90";
                    getRecipes();
                    clickCounter++;
                    database.ref().set({
                        clickCount: clickCounter
                      });
                });

                $("#noLimitButton").on("click", function() {
                    $("#TimePage").hide();
                    $("#resultsPage").show();
                    timeInput = "0-360";
                    getRecipes();
                    clickCounter++;
                    database.ref().set({
                        clickCount: clickCounter
                      });
                });

        $("#EatOutButton").on("click", function() {
            $("#InOutPage").hide();
            $("#MealTypePage2").show();
        });

            $("#BreakfastButton2").on("click", function() {
                $("#MealTypePage2").hide();
                $("#LocationPage").show();
                cuisineInput2 = "Breakfast";
                console.log(cuisineInput2)
            }); 

            $("#DinnerButton2").on("click", function() {
                $("#MealTypePage2").hide();
                $("#CuisinePage2").show();
            });   

                $("#AmericanButton2").on("click", function() {
                    $("#CuisinePage2").hide();
                    $("#LocationPage").show();
                    cuisineInput2 = 'American';
                }); 

                $("#ChineseButton2").on("click", function() {
                    $("#CuisinePage2").hide();
                    $("#LocationPage").show();
                    cuisineInput2 = 'Chinese';
                }); 

                $("#MexicanButton2").on("click", function() {
                    $("#CuisinePage2").hide();
                    $("#LocationPage").show();
                    cuisineInput2 = 'Mexican';
                    console.log(cuisineInput2)
                }); 

                $("#ItalianButton2").on("click", function() {
                    $("#CuisinePage2").hide();
                    $("#LocationPage").show();
                    cuisineInput2 = 'Italian';
                }); 

                $("#IndianButton2").on("click", function() {
                    $("#CuisinePage2").hide();
                    $("#LocationPage").show();
                    cuisineInput2 = 'Indian';
                }); 

                $("#MediterraneanButton2").on("click", function() {
                    $("#CuisinePage2").hide();
                    $("#LocationPage").show();
                    cuisineInput2 = "Mediterranean";
                }); 

            $("#DessertButton2").on("click", function() {
                $("#MealTypePage2").hide();
                $("#LocationPage").show();
                cuisineInput2 = "Dessert";
            }); 

                    $("#LocationSubmitButton").on("click", function(submitfunction) {
                        zipInput = $("#zipCode").val().trim();
                        console.log(zipInput)
                        // attempt at making a zip code validator
                        if (zipInput <= 99999) {
                            submitfunction.preventDefault();
                        $("#LocationPage").hide();
                        $("#MapPage").show();
                        getLatLng();
                        $("#MapPageText").append(cuisineInput2 + " places near you")
                        clickCounter++;
                        database.ref().set({
                            clickCount: clickCounter
                          });
                        }
                        else {
                            $("#zipCode").val("")
                            $("#zipValidate").text("Please enter a valid zip code")
                            submitfunction.preventDefault();
                        }
                        
                        
});
// function that uses a Google Maps API to convert user zip code input into lat/lng coordinates
function getLatLng(){
    var convertUrl = "https://maps.googleapis.com/maps/api/geocode/json"

    convertUrl += '?' + $.param({
        'address' : zipInput,
        'key' : 'AIzaSyDNrl5Q5pMMYeQdFRM_QI3GkEvfNS0l6f4',
    })
        $.ajax({
          url: convertUrl,
          method: "GET"
        }).then(function(response) {
            console.log(response);
            LATI = response.results[0].geometry.location.lat
            LONG = response.results[0].geometry.location.lng
            console.log(LATI)
            console.log(LONG)
        }).then(function(){
            var mapMarker = {lat: LATI, lng: LONG};
            console.log(mapMarker)
            map = new google.maps.Map(document.getElementById('map'), {
                center: mapMarker,
                zoom: 12,
            });

            infowindow = new google.maps.InfoWindow();
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: mapMarker,
                radius: 8000,
                type: ['restaurant'],
                keyword: cuisineInput2,
            }, callback);
            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                    }
                }
                }
                
                function createMarker(place) {
                var placeLoc = place.geometry.location;
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });
                
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(place.name);
                    infowindow.open(map, this);
                });
                }
        });
         
}
//recipe API
function getRecipes(){
    var recipeUrl = "https://api.edamam.com/search"

    recipeUrl += '?' + $.param({
        'app_id' : '488cc2c7',
        'app_key' : '4106fa5be713020ac3aa4ed940f8a53b',
        'q' : cuisineInput1,
        'time' : timeInput,
    })
    $.ajax({
        url: recipeUrl,
        method: "GET"
        }).then(function(response) {
            var results = response.hits;
            console.log(response);
            for (var i = 0; i < results.length; i++) {
                var newRecipe = $("<tr>").append(
                    $("<td>").append("<img src='" + results[i].recipe.image + "' alt=foodimage height='100' width='100'>"),
                    $("<td>").text(results[i].recipe.label),
                    $("<td>").append("<a href='" + results[i].recipe.shareAs + "'>See Recipe</>"),
                );
                
                $("#resultsTable > tbody").append(newRecipe);
            }
        });
}

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCdFRkmJfLAKDEqnFAgMETIgqKU33HrFRI",
    authDomain: "whatshouldieat-dcdc9.firebaseapp.com",
    databaseURL: "https://whatshouldieat-dcdc9.firebaseio.com",
    // projectId: "whatshouldieat-dcdc9",
    storageBucket: "whatshouldieat-dcdc9.appspot.com",
    // messagingSenderId: "817351097037"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  database.ref().on("value", function(snapshot) {
    console.log(snapshot.val());
    $("#mapResults").text(snapshot.val().clickCount + " users helped");
    $("#counterResults").text(snapshot.val().clickCount + " users helped");
    clickCounter = snapshot.val().clickCount;
  });
});
