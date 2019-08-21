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

var trigger = false;

$(document).ready(function() {
  $("#impress-menu").on("click", () => {
    activateSection($("#impress-content-container"), 0);
    $("#impress-menu").removeClass("inactive");
    if (trigger) {
      $("#vertical-scroll-overlay").css("opacity", 0);
      setTimeout(function() {
        $("#vertical-scroll-overlay").css("display", "none");
      }, 500);
      index = 3;
    } else {
      $.get("html/vertical-scroll-overlay.html", function(data) {
        $("#main-container").append(data);
        setTimeout(function() {
          $("#vertical-scroll-overlay").css("opacity", 0.9);
        }, 100);
        $("#vertical-scroll-overlay").on("click", () => {
          $("#vertical-scroll-overlay").css("opacity", 0);
          setTimeout(function() {
            $("#vertical-scroll-overlay").css("display", "none");
          }, 500);
          index = 3;
        });
      });
    }
    trigger = true;
  });
  $("#practice-menu").on("click", () => {
    activateSection($("#practice-content-container"), 1);
    $("#practice-menu").removeClass("inactive");
    index = 7;
  });
  $("#learn-menu").on("click", () => {
    activateSection($("#learn-content-container"), 2);
    $("#learn-menu").removeClass("inactive");
    index = 8;
  });
  $("#logo-image").on("click", () => {
    removeAllActiveSections();
  });
});

function activateSection(element, index) {
  removeAllActiveSections();

  if (activeState[index]) {
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
    console.log("hello");
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
  hammer.on("swipeleft", function() {
    console.log("swipe left");
  });
  hammer.on("swiperight", function() {
    console.log("right swipe");
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
var skip = false;
var skipIntro = false;

function navigateDown() {
  switch (index) {
    case 0:
      index = 1;
      if (!skipIntro) {
        $("#scroll-overlay").css("opacity", 0);
        setTimeout(function() {
          $("#scroll-overlay").css("display", "none");
        }, 500);
        skipIntro = true;
      } else {
        setInactive();
        $("#impress-menu").removeClass("inactive");
      }

      break;
    case 1:
      activateSection($("#impress-content-container"), 0);
      $("#impress-menu").removeClass("inactive");
      console.log(skip);
      if (!skip) {
        index = 2;
      } else {
        index = 5;
      }
      break;
    case 2:
      $.get("html/vertical-scroll-overlay.html", function(data) {
        $("#main-container").append(data);
        setTimeout(function() {
          $("#vertical-scroll-overlay").css("opacity", 0.9);
        }, 100);
        $("#vertical-scroll-overlay").on("click", () => {
          $("#vertical-scroll-overlay").css("opacity", 0);
          setTimeout(function() {
            $("#vertical-scroll-overlay").css("display", "none");
          }, 500);
          index = 3;
        });
      });

      index = 3;
      break;
    case 3:
      if (!skip) {
        $("#vertical-scroll-overlay").css("opacity", 0);
        setTimeout(function() {
          $("#vertical-scroll-overlay").css("display", "none");
        }, 500);
        skip = true;
        index = 4;
      } else {
        index = 4;
        navigateDown();
      }

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

function navigateUp() {
  switch (index) {
    case 1:
      $("#impress-menu").removeClass("inactive");
      $("#learn-menu").removeClass("inactive");
      $("#practice-menu").removeClass("inactive");
      index = 0;

      break;
    case 2:
      activateSection($("#impress-content-container"), 0);
      $("#impress-menu").removeClass("inactive");
      index = 1;
      break;
    case 3:
      $("#vertical-scroll-overlay").css("opacity", 0);
      setTimeout(function() {
        $("#vertical-scroll-overlay").css("display", "none");
      }, 500);
      index = 3;
      break;
    case 4:
      skip = true;
      index = 2;
      navigateUp();
      break;
    case 5:
      activateSection($("#impress-content-container"), 0);
      $("#impress-menu").removeClass("inactive");
      index = 2;
      break;
    case 6:
      activateSection($("#practice-content-container"), 0);
      $("#practice-menu").removeClass("inactive");
      index = 5;
      break;
    case 7:
      activateSection($("#practice-content-container"), 0);

      $("#practice-menu").removeClass("inactive");
      index = 6;
      break;
    case 8:
      activateSection($("#learn-content-container"), 0);
      $("#learn-menu").removeClass("inactive");
      index = 7;
      break;
  }
}
