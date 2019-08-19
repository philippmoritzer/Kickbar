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
    $.get("html/scroll-overlay.html", function(data) {
      $("#main-container").append(data);
      setTimeout(function() {
        $("#scroll-overlay").css("opacity", 0.9);
      }, 100);
    });
  });
}

$(document).ready(function() {
  $("#impress-menu").on("click", () => {
    activateSection($("#impress-content-container"), 0);
    $("#impress-menu").removeClass("inactive");
  });
  $("#practice-menu").on("click", () => {
    activateSection($("#practice-content-container"), 1);
    $("#practice-menu").removeClass("inactive");
  });
  $("#learn-menu").on("click", () => {
    activateSection($("#learn-content-container"), 2);

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

$(document).ready(function() {
  var timerId;
  $(window).on("wheel", function(e) {
    var delta = e.originalEvent.deltaY;
    clearTimeout(timerId);
    timerId = setTimeout(function() {
      if (delta > 1) {
        navigateDown();
      } else {
        navigateUp();
      }
    }, 200);
  });
});

//swipe
$(document).ready(function() {
  var container = document.getElementById("main-container");
  var hammer = new Hammer.Manager(container, { touchAction: "auto" });
  var swipe = new Hammer.Swipe();
  hammer.add(swipe);
  hammer.on("swipedown", function() {
    navigateUp();
  });
  hammer.on("swipeup", function() {
    navigateDown();
  });
});

//swip impress container
// $(document).ready(function() {
//   var container = document.getElementById("main-container");
//   var hammer = new Hammer.Manager(container, { touchAction: "auto" });
//   var swipe = new Hammer.Swipe();
//   hammer.add(swipe);

//   hammer.on("", function() {
//     navigateUp();
//   });
//   hammer.on("swipeup", function() {
//     console.log("yup");
//     navigateDown();
//   });
// });

var index = 0;

function navigateDown() {
  switch (index) {
    case 0:
      $("#scroll-overlay").css("opacity", 0);
      setTimeout(function() {
        $("#scroll-overlay").css("display", "none");
      }, 500);
      index = 1;
      break;
    case 1:
      activateSection($("#impress-content-container"), 0);
      $("#impress-menu").removeClass("inactive");
      index = 2;
      break;
    case 2:
      $.get("html/vertical-scroll-overlay.html", function(data) {
        $("#main-container").append(data);
        setTimeout(function() {
          $("#vertical-scroll-overlay").css("opacity", 0.9);
        }, 100);
      });
      index = 3;
      break;
    case 3:
      $("#vertical-scroll-overlay").css("opacity", 0);
      setTimeout(function() {
        $("#vertical-scroll-overlay").css("display", "none");
      }, 500);

      index = 4;
      break;
    case 4:
      activateSection($("#practice-content-container"), 0);
      $("#practice-menu").removeClass("inactive");
      index = 5;
      break;
    case 5:
      activateSection($("#practice-content-container"), 0);
      $("#practice-menu").removeClass("inactive");
      index = 6;
      break;
    case 6:
      activateSection($("#learn-content-container"), 0);
      $("#learn-menu").removeClass("inactive");
      index = 7;
      break;
    case 7:
      activateSection($("#learn-content-container"), 0);
      $("#learn-menu").removeClass("inactive");
      index = 8;
      break;
  }
}

function navigateUp() {}
