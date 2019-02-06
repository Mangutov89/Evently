// $(function () {
//     var body = $('body');
//     var backgrounds = [
//       'url(img/crowd-bg2.jpg)',
//       'url(img/megan.jpg)'];
//     var current = 0;
//
//     function nextBackground() {
//         body.css(
//             'background',
//         backgrounds[current = ++current % backgrounds.length]);
//
//         setTimeout(nextBackground, 5000);
//     }
//     setTimeout(nextBackground, 5000);
//     body.css('background', backgrounds[0]);
//     body.addClass('.image-settings');
// });

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


function showEvents(json) {

  console.log(json);

}





$(function() {


  $("#search").click(function() {
     var keyword = $("#bar").val();
     getEvents(keyword);
  });

});
