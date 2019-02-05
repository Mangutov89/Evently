
var page = 0;

function getEvents(keyword) {

  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG&keyword=" + keyword + "&dmaid=362&size=4&page=" + page,
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

function showEvents(json) {
  let events = json._embedded.events;
  // for each event...
  events.forEach(function (event){
    // debugger;
    // add list item
    $('.results').append('<li class="result-item"><div class="test img-contianer"><img class="test-image" src="' + event.images[0].url + '"</img></div> <div class="test test-content"><h2 class="event-title">' + event.name + '</h2><p class="event-description">' + event._embedded.venues[0].name + '</p><p class="event-date">' + event.dates.start.localDate + '</p><p class="event-date">' + convertTime(event.dates.start.localTime) + '</p></div></li>');

  });
  console.log(events);
  console.log(events[0].images[0].url);
}




$(document).ready(function () {
  $("#search").click(function() {
    var keyword = $("#bar").val();
    getEvents(keyword);
  });
});
