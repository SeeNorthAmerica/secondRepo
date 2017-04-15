//initialize firebase
  var config = {
    apiKey: "AIzaSyA5VaFM-AvDWzYEXpt3mQTgjnV3GHIsO2w",
    authDomain: "seenorthamerica-6688a.firebaseapp.com",
    databaseURL: "https://seenorthamerica-6688a.firebaseio.com",
    projectId: "seenorthamerica-6688a",
    storageBucket: "seenorthamerica-6688a.appspot.com",
    messagingSenderId: "919570607813"
  };
  firebase.initializeApp(config);
   var database = firebase.database();
 
// places to visit
	   $(document).ready(function() {
      $("#map").hide(); 
    });

  var placesToVisit = ["comedy-clubs","restaurants","retail-services","theater"];
	var sightsToSee = ["museums","travel","outdoor-adventures"];
	var thingsToDo = ["activities-events","massage","spa","wine-tasting","yoga"];
	// unique deals
	var uniqueDeals = ["college","crafts_hobbies","fitness","food-grocery","kids","health-beauty","movies_music_games","photograpy-services","treats"];


  function displayMap() {
    $("#map").show();
    var map,
    dir;
    var toCity = ($("#dest-city-input").val());
    var toState = ($("#dest-state-input").val());
    var fromCity = ($("#curr-city-input").val());
    var fromState = ($("#curr-state-input").val());
    var start = (fromCity + " " + fromState);
    var end = (toCity + " " + toState);


    map = L.map('map', {
      layers: MQ.mapLayer(),
      center: [ 35.2271, -80.8431 ],
      zoom: 15
    });

    dir = MQ.routing.directions();

    dir.route({
      locations: [
        start , end
      ]
  });

map.addLayer(MQ.routing.routeLayer({
  directions: dir,
  fitBounds: true
}));

  }


	function renderDirections() {
		$("#estimatedDistanceOutput").empty();
		$("#estimatedTravelTimeOutput").empty();
        var toCity = ($("#dest-city-input").val());
        var toState = ($("#dest-state-input").val());
        var fromCity = ($("#curr-city-input").val());
        var fromState = ($("#curr-state-input").val());
        var queryURL = 'https://www.mapquestapi.com/directions/v2/optimizedRoute?json={"locations":["' + fromCity + ',' + fromState + '","' + toCity + ',' + toState + '"]}&outFormat=json&key=uOBx9yqfnesCqlEImZOMQYshfmGNQWn3';
          console.log(queryURL);

      	$.ajax({url:queryURL,method:"GET"})

        .done(function(response) {
          	var results = response.route;
          	console.log(results);
          	var distance = results.distance;
          	var p = $("<p>").html(distance + " miles");
          	var time = results.formattedTime;

          	console.log(distance);
          	console.log(time);

            $("#estimatedDistanceOutput").append(p);
            $("#estimatedTravelTimeOutput").append(time);
        });
    }

	  function renderDeals() {
      $("#dealsSection").empty();
        for (var i = 0; i < uniqueDeals.length; i++) {
          var d = $("<button>");
               // Adding a class
              d.addClass("uniqueDeals");
              // Added a data-attribute
              d.attr("data-search", uniqueDeals[i]);
              // Provided the initial button text
              d.text(uniqueDeals[i]);
              // Added the button to the HTML
              $("#dealsSection").append(d);
        }
    } 
	
    function renderThingsToDo() {
		  $("#thingsToDoSection").empty();
        for (var i = 0; i < thingsToDo.length; i++) {
          	var c = $("<button>");
               // Adding a class
            c.addClass("things");
              // Added a data-attribute
            c.attr("data-search", thingsToDo[i]);
              // Provided the initial button text
            c.text(thingsToDo[i]);
              // Added the button to the HTML
            $("#thingsToDoSection").prepend(c);
        }
    } 

    function renderPlacesToVisit() {
		  $("#placesToVisitSection").empty();
        for (var i = 0; i < placesToVisit.length; i++) {
          	var b = $("<button>");
               // Adding a class
            b.addClass("places");
              // Added a data-attribute
            b.attr("data-search", placesToVisit[i]);
              // Provided the initial button text
            b.text(placesToVisit[i]);
              // Added the button to the HTML
            $("#placesToVisitSection").prepend(b);
        }
    } 

    function renderSightsToSee() {
		  $("#sightsToSeeSection").empty();
        for (var i = 0; i < sightsToSee.length; i++) {
          	var a = $("<button>");
               // Adding a class
            a.addClass("sights");
              // Added a data-attribute
            a.attr("data-search", sightsToSee[i]);
              // Provided the initial button text
            a.text(sightsToSee[i]);
              // Added the button to the HTML
            $("#sightsToSeeSection").prepend(a);
        }
    } 

    function displayDealsInfo() {
        var to = ($("#dest-city-input").val());
        var x = $(this).data("search");
        var queryURL = 'http://api.sqoot.com/v2/deals?api_key=vt9izh&location="' + to + '"&category_slugs=' + x + '';
        console.log(queryURL);
       
       $.ajax({url:queryURL,method:"GET"})
     	          .done(function(response) {
                var z = [];
                var results1 = response.deals;

                for (var i=0; i<results1.length ; i++) {
                var providerName1 = results1[i].deal.provider_name;
                var categoryName1 = results1[i].deal.category_name;
                var shortTitle1 = results1[i].deal.short_title;
                var description1 = results1[i].deal.description;
                var images1 = results1[i].deal.image_url;
                var dealValue1 = results1[i].deal.value;
                var dealPrice1 = results1[i].deal.price;
                var discountAmount1 = results1[i].deal.discount_amount;
                var merchantName1 = results1[i].deal.merchant.name;
                var u1 = $("<p>").html("<strong> " + merchantName1 + " </strong>");
                var merchantAddress1 = results1[i].deal.merchant.address;
                var merchantLocality1 = results1[i].deal.merchant.locality;
                var merchantRegion1 = results1[i].deal.merchant.region;
                var locaz1 = $("<p>").html(merchantAddress1 + ", " + merchantLocality1 + ", " + merchantRegion1);
                var purchaseIt1 = results1[i].deal.url;
                
                $.each(results1[i], function(i, results1) { 
                  z.push("<tr><td><img src='"+ images1 +"' class='url' height='100%' width='100%'></img></td><td>" 
                    + merchantName1 + "</td></tr><tr><td>"+ merchantAddress1 + ", " + merchantLocality1 + ", " + merchantRegion1 + "</td></tr><tr><td>"
                    +shortTitle1+ "</td></tr><tr><td>"+ description1+ "</td></tr><tr><td>Value: $ " 
                    + dealValue1+ "</td></tr><tr><td>Your Price: $ " + dealPrice1+ "</td></tr><tr><td>Discount Amount: $ " + discountAmount1 
                    + "</td></tr><tr><td><a href='"+ purchaseIt1 + "'>Purchase This Deal Here</a></td><tr>");           
                });
              }
               $('#dealsTable').html(z);
            });
    }

  	function displayPlacesInfo() {
        var to = ($("#dest-city-input").val());
        var x = $(this).data("search");
        var queryURL = 'http://api.sqoot.com/v2/deals?api_key=vt9izh&location="' + to + '"&category_slugs=' + x + '';
        console.log(queryURL);
       
       $.ajax({url:queryURL,method:"GET"})
                .done(function(response) {
                var z = [];
                var results1 = response.deals;

                for (var i=0; i<results1.length ; i++) {
                var providerName1 = results1[i].deal.provider_name;
                var categoryName1 = results1[i].deal.category_name;
                var shortTitle1 = results1[i].deal.short_title;
                var description1 = results1[i].deal.description;
                var images1 = results1[i].deal.image_url;
                var dealValue1 = results1[i].deal.value;
                var dealPrice1 = results1[i].deal.price;
                var discountAmount1 = results1[i].deal.discount_amount;
                var merchantName1 = results1[i].deal.merchant.name;
                var u1 = $("<p>").html("<strong> " + merchantName1 + " </strong>");
                var merchantAddress1 = results1[i].deal.merchant.address;
                var merchantLocality1 = results1[i].deal.merchant.locality;
                var merchantRegion1 = results1[i].deal.merchant.region;
                var locaz1 = $("<p>").html(merchantAddress1 + ", " + merchantLocality1 + ", " + merchantRegion1);
                var purchaseIt1 = results1[i].deal.url;
                
                $.each(results1[i], function(i, results1) { 
                  z.push("<tr><td><img src='"+ images1 +"' class='url' height='100%' width='100%'></img></td><td>" 
                    + merchantName1 + "</td></tr><tr><td>"+ merchantAddress1 + ", " + merchantLocality1 + ", " + merchantRegion1 + "</td></tr><tr><td>"
                    +shortTitle1+ "</td></tr><tr><td>"+ description1+ "</td></tr><tr><td>Value: $ " 
                    + dealValue1+ "</td></tr><tr><td>Your Price: $ " + dealPrice1+ "</td></tr><tr><td>Discount Amount: $ " + discountAmount1 
                    + "</td></tr><tr><td><a href='"+ purchaseIt1 + "'>Purchase This Deal Here</a></td><tr>");           
                });
              }
               $('#placesTable').html(z);
            });
    }

  	function displaySightsInfo() {
        var to = ($("#dest-city-input").val());
        var x = $(this).data("search");
        var queryURL = 'http://api.sqoot.com/v2/deals?api_key=vt9izh&location="' + to + '"&category_slugs=' + x + '';
        console.log(queryURL);
       
       $.ajax({url:queryURL,method:"GET"})
                .done(function(response) {
                var z = [];
                var results1 = response.deals;

                for (var i=0; i<results1.length ; i++) {
                var providerName1 = results1[i].deal.provider_name;
                var categoryName1 = results1[i].deal.category_name;
                var shortTitle1 = results1[i].deal.short_title;
                var description1 = results1[i].deal.description;
                var images1 = results1[i].deal.image_url;
                var dealValue1 = results1[i].deal.value;
                var dealPrice1 = results1[i].deal.price;
                var discountAmount1 = results1[i].deal.discount_amount;
                var merchantName1 = results1[i].deal.merchant.name;
                var u1 = $("<p>").html("<strong> " + merchantName1 + " </strong>");
                var merchantAddress1 = results1[i].deal.merchant.address;
                var merchantLocality1 = results1[i].deal.merchant.locality;
                var merchantRegion1 = results1[i].deal.merchant.region;
                var locaz1 = $("<p>").html(merchantAddress1 + ", " + merchantLocality1 + ", " + merchantRegion1);
                var purchaseIt1 = results1[i].deal.url;
                
                $.each(results1[i], function(i, results1) { 
                  z.push("<tr><td><img src='"+ images1 +"' class='url' height='100%' width='100%'></img></td><td>" 
                    + merchantName1 + "</td></tr><tr><td>"+ merchantAddress1 + ", " + merchantLocality1 + ", " + merchantRegion1 + "</td></tr><tr><td>"
                    +shortTitle1+ "</td></tr><tr><td>"+ description1+ "</td></tr><tr><td>Value: $ " 
                    + dealValue1+ "</td></tr><tr><td>Your Price: $ " + dealPrice1+ "</td></tr><tr><td>Discount Amount: $ " + discountAmount1 
                    + "</td></tr><tr><td><a href='"+ purchaseIt1 + "'>Purchase This Deal Here</a></td><tr>");           
                });
              }
               $('#sightsTable').html(z);
            });
    }

  	function displayThingsInfo() {
        var to = ($("#dest-city-input").val());
        var x = $(this).data("search");
        var queryURL = 'http://api.sqoot.com/v2/deals?api_key=vt9izh&location="' + to + '"&category_slugs=' + x + '';
        console.log(queryURL);
       
       $.ajax({url:queryURL,method:"GET"})
                .done(function(response) {
                var z = [];
                var results1 = response.deals;

                for (var i=0; i<results1.length ; i++) {
                var providerName1 = results1[i].deal.provider_name;
                var categoryName1 = results1[i].deal.category_name;
                var shortTitle1 = results1[i].deal.short_title;
                var description1 = results1[i].deal.description;
                var images1 = results1[i].deal.image_url;
                var dealValue1 = results1[i].deal.value;
                var dealPrice1 = results1[i].deal.price;
                var discountAmount1 = results1[i].deal.discount_amount;
                var merchantName1 = results1[i].deal.merchant.name;
                var u1 = $("<p>").html("<strong> " + merchantName1 + " </strong>");
                var merchantAddress1 = results1[i].deal.merchant.address;
                var merchantLocality1 = results1[i].deal.merchant.locality;
                var merchantRegion1 = results1[i].deal.merchant.region;
                var locaz1 = $("<p>").html(merchantAddress1 + ", " + merchantLocality1 + ", " + merchantRegion1);
                var purchaseIt1 = results1[i].deal.url;
                
      
                $.each(results1[i], function(i, results1) { 
                  z.push("<tr><td><img src='"+ images1 +"' class='url' height='100%' width='100%'></img></td><td>" 
                    + merchantName1 + "</td></tr><tr><td>"+ merchantAddress1 + ", " + merchantLocality1 + ", " + merchantRegion1 + "</td></tr><tr><td>"
                    +shortTitle1+ "</td></tr><tr><td>"+ description1+ "</td></tr><tr><td>Value: $ " 
                    + dealValue1+ "</td></tr><tr><td>Your Price: $ " + dealPrice1+ "</td></tr><tr><td>Discount Amount: $ " + discountAmount1 
                    + "</td></tr><tr><td><a href='"+ purchaseIt1 + "'>Purchase This Deal Here</a></td><tr>");           
                });
              }
               $('#thingsTable').append(z);
               
            });
    }


	$("#submit").click(function(){
		event.preventDefault();
    	$("#currentLocationOutput").empty();
    	$("#destinOutput").empty();
    	$("#estimatedDistanceOutput").empty();
    	$("#estimatedTravelTimeOutput").empty();
    	$("#currentLocationOutput").append((($("#curr-city-input")).val()) + "," + (($("#curr-state-input")).val()));
    	$("#destinOutput").append((($("#dest-city-input")).val()) + "," + (($("#dest-state-input")).val()));
        renderDirections();
        renderDeals();
        renderThingsToDo();
        renderPlacesToVisit();
        renderSightsToSee();
        displayMap();
     });
	
	$(document).on("click", ".uniqueDeals", displayDealsInfo);
  $(document).on("click", ".places", displayPlacesInfo);
  $(document).on("click", ".sights", displaySightsInfo);
  $(document).on("click", ".things", displayThingsInfo);
 
  //uploads data to database
  database.ref().push();
  // 3. Create Firebase event for adding locations to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  $(document).on("click", ".uniqueDeals", displayDealsInfo);
  $(document).on("click", ".places", displayPlacesInfo);
  $(document).on("click", ".sights", displaySightsInfo);
  $(document).on("click", ".things", displayThingsInfo);
 
 });