
$("#picsContainer2").hide(100);
$("#picsContainer4").hide(100);
$("#addCloset").hide(100); 

  $("#myBtn, #silhouette").on("click", function () {
    $('#picsContainer2').delay(4000).fadeIn('slow');
    $('#picsContainer4').delay(4000).fadeIn('slow');
    $('#addCloset').delay(2000).fadeIn('slow');
    $("#myBtnRow, #silhouette").hide(2000).fadeout('slow');
    M.AutoInit();

});

var windowTimeout = setTimeout(function () {
  $('#addCloset').delay(2000).fadeIn('slow');
  $("#myBtnRow, #silhouette").hide(2000).fadeout('slow');
  $('#picsContainer2').delay(4000).fadeIn('slow');
  $('#picsContainer4').delay(4000).fadeIn('slow');

  M.AutoInit();
}, 4000);

$('#picsContainer2').delay(5000).animate({
  bottom: '-30px'}, "slow");

  $(document).ready(function () {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function (data) {
      $(".member-name").text(data.email);
    });
  
  
    // Uploading pictures
    function getHomePics() {
      $.ajax({
        type: "GET",
        url: "/api/home",
        dataType: "JSON",
      }).then((result) => {
        console.log(result);
        postHomePics(result);
      }).catch((err) => {
        console.log(err);
      });
    }
  
    function getDonatePics() {
      $.ajax({
        type: "GET",
        url: "/api/donate",
        dataType: "JSON",
      }).then((result) => {
        console.log(result);
        postDonatePics(result);
      }).catch((err) => {
        console.log(err);
      });
    }

    getHomePics()
    getDonatePics()
  
    function postHomePics(results) {
      results.forEach(pic => {
        var picLink = pic.clothingLink.slice(7);
            var carousel = `<div class="carousel-item card" style="border-radius: 30px;">
            <img style="border-radius: 30px;" class="card-image hoverable materialboxed" src="${picLink}" alt="Card image cap"></img>
            </div>`
            var card = `
            <div class="col s3 card hoverable" style="border-radius: 30px; float: left; margin: 10px; text-align: center; left: 75px;">
            <i style="z-index: 5px; left:-50px; bottom: -30px;" id="favoriteItem" class="material-icons waves-effect">favorite_border</i>
            <img style="border-radius: 30px;" class="materialboxed card-image" src="${picLink}" alt="Card image cap"></img>
            <button style="border-radius: 30px;" class = "btn pink lighten-4 waves-effect" id="wearCard" data-id="${pic.id}" >Wear</button>
            <button style="border-radius: 30px;" class="btn pink lighten-4 waves-effect" action="donate1" id="donateCard" data-id="${pic.id}" >Donate</button>
            <button style="border-radius: 30px;" class = "btn pink lighten-4 waves-effect" id="deleteCard" data-id="${pic.id}" >Delete</button>
            </div>`
          
            $("#picsContainer4").prepend(card)
        $("#picsContainer3").prepend(carousel)
        M.AutoInit();
  
      });
    }
        
    function postDonatePics(results) {
      results.forEach(pic => {
        var picLink = pic.clothingLink.slice(7);
  
        var card = `
        <div class="col s3 card hoverable" style="border-radius: 30px; float: left; margin: 10px; text-align:center; left: 125px;">
        <i style="z-index: 5px; left:80px; bottom: -30px;" id="favoriteItem" class="material-icons waves-effect">favorite_border</i>
        <img style="border-radius: 30px; text-align: center;" class="materialboxed card-image" src="${picLink}" alt="Card image cap"></img>
        <button style="border-radius: 30px;" class = "btn pink lighten-4 waves-effect" id="wearCard" data-id="${pic.id}" >Wear</button>
        <button style="border-radius: 30px;" class="btn pink lighten-4 waves-effect" action="donate1" id="donateCard" data-id="${pic.id}" >Donate</button>
        <button style="border-radius: 30px;" class = "btn pink lighten-4 waves-effect" id="deleteCard" data-id="${pic.id}" >Delete</button>
        </div>`
        $("#picsDonate").prepend(card)
      });
    }
    ////// deletinggg////////////
    $(document).on("click", "#deleteCard", handlePostDelete)
    function deleteCloths(id) {
      $.ajax({
        method: "DELETE",
        url: "/api/home/" + id
      })
        .then(function () {
          reloadPage()
          getHomePics();
        });
    }
  
    function handlePostDelete() {
      var currentCloths = $(this)
        .data("id");
      console.log(currentCloths)
      deleteCloths(currentCloths);
    }
    // This Reload/Refreshes page after Delete button is pressed
    function reloadPage() {
      location.reload(true);
    }
  
    
    $(document).on("click", "#donateCard", handleDonate)
    function donateCloths(id) {
      $.ajax({
        method: "PUT",
        url: "/api/home/" + id
      })
        .then(function () {
          reloadPage();
          getHomePics();
        });
    };
    function handleDonate() {
      var currentCloths = $(this)
        .data("id");
      console.log(currentCloths)
      $("#picsDonate").prepend(currentCloths);
      donateCloths(currentCloths);
  
    }

  }); 

  
  $('.materialboxed').materialbox();
  $('select').formSelect();
  $('.carousel').carousel();
  


