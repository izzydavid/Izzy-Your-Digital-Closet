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

  function getWearPics() {
    $.ajax({
      type: "GET",
      url: "/api/home",
      dataType: "JSON",
    }).then((result) => {
      console.log(result);
      postWearPics(result);
    }).catch((err) => {
      console.log(err);
    });
  }


  getHomePics()
  getDonatePics()
  getWearPics()

  function postHomePics(results) {
    results.forEach(pic => {
      var picLink = pic.clothingLink.slice(7);

      var card = `
          <div class="col s3 card hoverable" style="border-radius: 30px; float: left; margin: 10px; text-align: center; left: 75px;">
          <img style="border-radius: 30px;" class="materialboxed card-image" src="${picLink}" alt="Card image cap"></img>
          <button style="border-radius: 30px; width: 250px;" class="btn pink lighten-4 waves-effect" action="donate1" id="donateCard" data-id="${pic.id}" >Donate</button>
          <button style="border-radius: 30px; width: 250px;" class = "btn pink lighten-4 waves-effect" id="deleteCard" data-id="${pic.id}" >Delete</button>
          </div>`
          var carousel = `<div class="carousel-item" style="border-radius: 30px">
          <img style="border-radius: 30px;" class="card-image hoverable materialboxed" src="${picLink}" alt="Card image cap"></img>
          </div>`
      $("#picsContainer3").prepend(carousel)
      $("#picsContainer").prepend(card)

      // if (pic.type === "tops"){
      //   $("#topsPics").prepend(carousel);
      // }
      // if (pic.type === "bottoms"){
      //   $("#bottomsPics").prepend(carousel);
      // }
      // if (pic.type === "shoes"){
      //   $("#shoesPics").prepend(carousel);
      // }
      // if (pic.type === "accessories"){
      //   $("#accessoriesPics").prepend(carousel);
      // }
      M.AutoInit();

    });
  }
      
  function postDonatePics(results) {
    results.forEach(pic => {
      var picLink = pic.clothingLink.slice(7);

      var card = `<div class="col s4 card hoverable" style="border-radius: 30px; float: left; margin: 10px; text-align:center; left: 125px;">
      <img style="border-radius: 30px; text-align: center;" class="materialboxed card-image" src="${picLink}" alt="Card image cap"></img>
      <button style="border-radius: 30px; width: 250px;" class="btn pink lighten-4 waves-effect" action="donate1" id="donateCard" data-id="${pic.id}" >Donate</button>
      <button style="border-radius: 30px; width: 250px;" class = "btn pink lighten-4 waves-effect" id="deleteCard" data-id="${pic.id}" >Delete</button>
      </div>`
      $("#picsDonate").prepend(card)
    });
  }

  function postWearPics(results) {
    results.forEach(pic => {
      var picLink = pic.clothingLink.slice(7);
      var card = `<div class="col s4 card hoverable" style="border-radius: 30px; float: left; margin: 30px; height: 400px; text-align:center; left: 125px;">
      <img style="border-radius: 30px; text-align: center;" class="materialboxed card-image" src="${picLink}" alt="Card image cap"></img>
      <button style="border-radius: 30px; width: 250px;" class="btn pink lighten-4 waves-effect" action="donate1" id="donateCard" data-id="${pic.id}" >Donate</button>
      <button style="border-radius: 30px; width: 250px;" class = "btn pink lighten-4 waves-effect" id="deleteCard" data-id="${pic.id}" >Delete</button>
      </div>`
      $("#picsWear").prepend(card)
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
        getHomePics()
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
        getHomePics();
        reloadPage();
      });
  };
  function handleDonate() {
    var currentCloths = $(this)
      .data("id");
    console.log(currentCloths)
    $("#picsDonate").prepend(currentCloths);
    donateCloths(currentCloths);
;

  }

    
  $(document).on("click", "#wearCard", handleWear)
  function wearCloths(id) {
    $.ajax({
      method: "PUT",
      url: "/api/wear/" + id
    })
      .then(function () {
        reloadPage();
      });
  };
  function handleWear() {
    var currentCloths = $(this)
      .data("id");
    console.log(currentCloths)
    $("#picsWear").prepend(currentCloths);
    wearCloths(currentCloths);

  }


}); 


$("#picsContainer2").hide(100);

$("#myBtnRow, #silhouette").hide(100)



$('#picsContainer2').delay(5000).animate({
  bottom: '-30px'}, "slow");
$('.materialboxed').materialbox();
$('select').formSelect();
$('.carousel').carousel();