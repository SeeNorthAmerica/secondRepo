// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCY53nr-TmREfyr2teXpQ-tS4CI5WjZs5E",
    authDomain: "see-north-america.firebaseapp.com",
    databaseURL: "https://see-north-america.firebaseio.com",
    projectId: "see-north-america",
    storageBucket: "",
    messagingSenderId: "596900265462"
  };

  firebase.initializeApp(config);
   var database = firebase.database();
 
// places to visit
     $(document).ready(function() {
      $("#travelInfo").show();
      $("#map").hide(); 
      $("#destination").hide();
      $("#deals").hide();
    });

//deals categories used to gernerate buttons for api call
  var placesToVisit = ["comedy-clubs","restaurants","retail-services","theater"];
  var sightsToSee = ["museums","travel","outdoor-adventures"];
  var thingsToDo = ["activities-events","massage","spa","wine-tasting","yoga"];
  // unique deals
  var uniqueDeals = ["college","crafts_hobbies","fitness","food-grocery","kids","health-beauty","movies_music_games","photograpy-services","treats"];


//takes in user input for ajax call to mapquest
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

//display leaflet map from mapquest using user input locations
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

//generate ajax directions, driving distance, and driving time from user inputs
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
            var distanceThere = [];
            var timeThere = [];

            console.log(distance);
            console.log(time);

            $("#estimatedDistanceOutput").append(p);
            $("#estimatedTravelTimeOutput").append(time); 
            distanceThere.push(distance); 
            timeThere.push(time);          

            //Gather form data for saved trip on click
            $("#saveTrip").on("click",function(){
              event.preventDefault();
              var toCity = ($("#dest-city-input").val().trim());
              var toState = ($("#dest-state-input").val().trim());
              var fromCity = ($("#curr-city-input").val().trim());
              var fromState = ($("#curr-state-input").val().trim());

              // send saved trip  to Firebase Database
              var savedTrip = {
                toCity: toCity,
                toState: toState,
                fromCity: fromCity,
                fromState: fromState,
                distance: distanceThere,
                time: timeThere
              }
              database.ref().push(savedTrip);
              //alert user their save was successful
              alert("This trip has been successfully saved! Please go to your saved trips tab to view details.");
            })
        });
    }

//gather saved trip data from database and show it on screen
database.ref().on("child_added", function(snapshot){
  var toCity = snapshot.val().toCity;
  var toState = snapshot.val().toState;
  var fromCity = snapshot.val().fromCity;
  var fromState = snapshot.val().fromState;
  var distance = snapshot.val().distance;
  var time = snapshot.val().time;

  $("#tripsTable > tbody").append("<tr><td>"+toCity+", " + toState + "</td><td>"+ fromCity+ ", " + fromState+
   "</td><td>"+ distance + " miles</td><td>" + time + "</td></tr>");
})

//add buttons for 'unique interest deals' category
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
  
  //add buttons for 'things to do' category
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


    //add buttons for 'places to visit' category
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

    //add buttons for 'sights to see' category
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


    //ajax call to generate deals based on which button user selected
    function displayDealsInfo() {
        var to = ($("#dest-city-input").val());
        var x = $(this).data("search");
        var queryURL = 'http://api.sqoot.com/v2/deals?api_key=vt9izh&location="' + to + '"&category_slugs=' + x + '';
        console.log(queryURL);
       
       $.ajax({url:queryURL,method:"GET"})

            .done(function(response) {
                var z = [];
                var results1 = response.deals;
                var found = results1.length;
                //for each response, collect the following data
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
                //for each response, append to deals table
                $.each(results1[i], function(i, results1) { 
                   z.push("<tr><td><strong>" + merchantName1 + "</strong></td></tr><tr><td>" + "Location: " + merchantAddress1 + ", " + merchantLocality1 + ", " 
                    + merchantRegion1 + "</td></tr><tr><td><img src='"+ images1 +"' class='url' height='100%' width='100%'></img></td></tr><tr><td><strong>" +shortTitle1+
                     description1+ "</strong></td></tr><tr><td>Value: $ "+ dealValue1+ "</td></tr><tr><td>Your Price: $ " + dealPrice1+ "</td></tr><tr><td>Discount Amount: $ "
                      + discountAmount1+ "</td></tr><tr><td><a href='"+ purchaseIt1 + "'>Purchase This Deal Here</a><hr></td></tr>");           
                });

                }
                //show results or "0 results found"
               $('#dealsTable').html(" " + found + " results found" + z);
            });
    }

//on initial submit, gather data to display map function, show deals sections, and render buttons
  $("#submit").click(function(){
    event.preventDefault();
      $("#currentLocationOutput").empty();
      $("#destinOutput").empty();
      $("#estimatedDistanceOutput").empty();
      $("#estimatedTravelTimeOutput").empty();
      $("#currentLocationOutput").append((($("#curr-city-input")).val()) + ", " + (($("#curr-state-input")).val()));
      $("#destinOutput").append((($("#dest-city-input")).val()) + ", " + (($("#dest-state-input")).val()));
      $("#travelInfo").hide();
      $("#destination").show();
      $("#deals").show();
        renderDirections();
        renderDeals();
        renderThingsToDo();
        renderPlacesToVisit();
        renderSightsToSee();
        displayMap();
     });
  
  //render deals function based on user input selected
  $(document).on("click", ".uniqueDeals", displayDealsInfo);
  $(document).on("click", ".places", displayDealsInfo);
  $(document).on("click", ".sights", displayDealsInfo);
  $(document).on("click", ".things", displayDealsInfo);
 
  //uploads data to database
  database.ref().push();
  // 3. Create Firebase event for adding locations to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  $(document).on("click", ".uniqueDeals", displayDealsInfo);
  $(document).on("click", ".places", displayPlacesInfo);
  $(document).on("click", ".sights", displaySightsInfo);
  $(document).on("click", ".things", displayThingsInfo);
 
 });



  // FirebaseUI config.
      var uiConfig = {
        callbacks: {
          signInSuccess: function(currentUser, credential, redirectUrl) {
            // Do something.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
          }
        },
        credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
        // Query parameter name for mode.
        queryParameterForWidgetMode: 'mode',
        // Query parameter name for sign in success url.
        queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: 'userSNA.html',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            // Whether the display name should be displayed in the Sign Up page.
            requireDisplayName: true
          }
          // {
          //   provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          //   // Invisible reCAPTCHA with image challenge and bottom left badge.
          //   recaptchaParameters: {
          //     type: 'image',
          //     size: 'invisible',
          //     badge: 'bottomleft'
          //   }
          // }
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>'
      };

      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);

