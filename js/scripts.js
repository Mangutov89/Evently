$(document).ready(function () {

  $("#landing-search").submit(function(e) {
    e.preventDefault();
    let keyword = "";
    keyword = $(".bar").val();
    localStorage.setItem("key",keyword);
    window.location.href = "search.html";
  });
});
