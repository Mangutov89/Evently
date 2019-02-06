
var page = 0;

function getEvents(keyword) {

  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG&keyword=" + keyword + "&stateCode=OR&city=portland&size=30&page=" + page,
    async:true,
    dataType: "json",
    success: function(json) {
          getEvents.json = json;
          showEvents(json);
  		   },
    error: function(xhr, status, err) {
  			  console.log(err);
  		   }
  });
}

function convertTime(time) {
  let timeSplit = time.split(":");
  timeSplit.pop();
  let convertedTime;
  if(Number(timeSplit[0]) > 12) {
    timeSplit[0] -= 12;
    timeSplit[0].toString();
    convertedTime = timeSplit.join(":") + " PM";
  } else {
    convertedTime =  timeSplit.join(":") + " AM";
  }
  return convertedTime;
}

function checkIfUndefined(elementArr) {
  debugger;
  for(let i = 0; i < elementArr.length; i++){
    if(elementArr[i] === undefined) {
      elementArr[i] = '-';
    }
  }
  // elementArr.forEach(function (element) {
  // });
}

function showEvents(json) {
  let events = json._embedded.events;
  $('.results').remove();
  $('.col-xs-8').append('<ul class="results"></ul>');
  console.log(events);

  events.forEach(function (event){
    let elementsArr = [event.images, event.name, event._embedded.venues, event.dates.start.localDate, event.dates.start.localTime, event.priceRanges];
    checkIfUndefined(elementsArr);
    //dependant
    let images = elementsArr[0];
    let venues = elementsArr[2];
    let priceRange = elementsArr[5];
    //independent
    let eventName = elementsArr[1];
    let eventDate = elementsArr[3];
    let eventTime = elementsArr[4];


    let imageURL = (event.images) ? event.images[0].url : 'img/e-logo.png';
    let venueName = (event._embedded.venues) ? event._embedded.venues[0].name :'-';
    let priceMin = (event.priceRanges) ? event.priceRanges[0].min : '-';
    let priceMax = (event.priceRanges) ? event.priceRanges[0].max : '-';

    // add list item
    $('.results').append('<li class="result-item"><div class="test img-container"><img class="test-image" src="' + imageURL + '"</img></div> <div class="test test-content"><h2 class="event-title">' + eventName + '</h2><p class="event-description">' + venueName + '</p><p class="event-date">' + eventDate + '</p><p class="event-date">' + convertTime(eventTime) + '</p><p class="price">Prices From: $' + priceMin + ' to $' + priceMax + '</p></div></li>');
  });
}




$(document).ready(function () {
  $("#search").click(function() {
    var keyword = $("#bar").val();
    getEvents(keyword);
  });
});
