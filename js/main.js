//activeState[0] = impress
//activeState[1] = practice
//activeState[2] = learn
const activeState = [false, false, false];

$(document).ready(function() {
  $("#impress-menu").on("click", () => {
    $.get("html/impress.html", function(data) {
      $("#impress").append(data);
    });
  });
});
