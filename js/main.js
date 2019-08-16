//activeState[0] = impress
//activeState[1] = practice
//activeState[2] = learn
const activeState = [false, false, false];

var $impress_section = $("#impress");
var $practice_section = $("#practice");
var $learn_section = $("#learn");

loadContent();

function loadContent() {
  $(document).ready(function() {
    $.get("html/impress.html", function(data) {
      $impress_section.append(data);
    });
    $.get("html/practice.html", function(data) {
      $practice_section.append(data);
    });
    $.get("html/learn.html", function(data) {
      $learn_section.append(data);
    });
  });
}

$(document).ready(function() {
  $("#impress-menu").on("click", () => {
    activateSection($("#impress-content-container"), 0);
    $("#impress-menu").removeClass("inactive");
  });
  $("#practice-menu").on("click", () => {
    activateSection($("#practice-content-container"), 0);
    $("#practice-menu").removeClass("inactive");
  });
  $("#learn-menu").on("click", () => {
    activateSection($("#learn-content-container"), 0);
    $("#learn-menu").removeClass("inactive");
  });
  $("#logo-image").on("click", () => {
    removeAllActiveSections();
  });
});

function activateSection(element, index) {
  if (activeState[index]) {
    removeAllActiveSections();
    activeState[index] = false;
  } else {
    element.addClass("active");
    setActiveState(index);
  }
  setInactive();
}

function removeAllActiveSections() {
  $("#impress-content-container").removeClass("active");
  $("#practice-content-container").removeClass("active");
  $("#learn-content-container").removeClass("active");
  $("#impress-menu").removeClass("inactive");
  $("#practice-menu").removeClass("inactive");
  $("#learn-menu").removeClass("inactive");
}

function setInactive() {
  $("#impress-menu").addClass("inactive");
  $("#practice-menu").addClass("inactive");
  $("#learn-menu").addClass("inactive");
}

function setActiveState(section) {
  for (let i = 0; i < activeState.length - 1; i++) {
    activeState[i] = false;
  }
  activeState[section] = true;
}
