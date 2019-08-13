//activeState[0] = impress
//activeState[1] = practice
//activeState[2] = learn
const activeState = [false, false, false];

var $impress = $("#impress");

$(document).ready(function() {
  $("#impress-menu").on("click", () => {
    if (activeState[0] === false) {
      $.get("html/impress.html", function(data) {
        $impress.append(data);
        $impress.show("slow");
        activeState[0] = true;
      });
    }
  });
});

function setActiveState(section) {
  for (let aState of activeState) {
    aState = false;
  }
  section = true;
}
