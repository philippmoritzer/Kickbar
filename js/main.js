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
    $.get("html/impress/impress-1.html", function(data) {
      $("#impress-content-container").append(data);
    });

    $.get("html/practice.html", function(data) {
      $practice_section.append(data);
    });
    $.get("html/learn/learn-1.html", function(data) {
      $("#learn-content-container").append(data);
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
var impress_open = false;

$(document).ready(function() {
  $("#impress-menu").on("click", () => {
    activateSection($("#impress-content-container"), 0);
    if (!impress_open) {
      setTimeout(() => {
        initNavigationOverlay();
      }, 1000);
    } else {
      $("#main-container").remove("#image-navigation-overlay");
    }

    impress_open = !impress_open;
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

const impress_pages = [];

for (let i = 1; i <= 5; i++) {
  $.get("html/impress/impress-" + i + ".html", function(data) {
    impress_pages[i] = data;
  });
}

impress_index = 1;
//swipe
$(document).ready(function() {
  var container = document.getElementById("impress-content-container");
  var hammer = new Hammer.Manager(container, { touchAction: "pan-y" });
  var swipe = new Hammer.Swipe();
  hammer.add(swipe);
  hammer.on("swipeleft", function() {
    if (impress_index + 1 <= 5) {
      navigateImpress(impress_index + 1);
    }
  });
  hammer.on("swiperight", function() {
    if (impress_index - 1 >= 1) {
      navigateImpress(impress_index - 1);
    }
  });
});

function navigateImpress(index) {
  if (index >= 1 && index <= 5 && index !== impress_index) {
    if (index > impress_index) {
      impress_index = index;

      $("#impress-content-container").addClass("animated fadeOutLeft");

      setTimeout(function() {
        $("#impress-content-container")
          .empty()
          .append(impress_pages[impress_index]);
        $("#impress-content-container").removeClass("fadeInLeft");
        $("#impress-content-container").removeClass("fadeOutLeft");

        $("#impress-content-container").addClass("fadeInRight");
      }, 500);
    } else {
      impress_index = index;
      $("#impress-content-container").addClass("animated fadeOutRight");

      setTimeout(function() {
        $("#impress-content-container")
          .empty()
          .append(impress_pages[impress_index]);
        $("#impress-content-container").removeClass("fadeOutRight");
        $("#impress-content-container").removeClass("fadeInRight");

        $("#impress-content-container").addClass("fadeInLeft");
      }, 500);
    }
  }
}

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

$(window).resize(function() {
  $("#image-navigation-overlay").remove();
  if (impress_open) {
    initNavigationOverlay();
  }
});

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

function initNavigationOverlay() {
  $(document).ready(function() {
    var width = $("#impress-navigation-slide").width();
    var height = $("#impress-navigation-slide").height();

    var offset = $("#impress-navigation-slide").offset();
    var top = offset.top;
    var left = offset.left;

    $("#main-container").append(
      "<div id='image-navigation-overlay' class='image-navigation-overlay' style='top:" +
        top +
        "px; left: " +
        left +
        "px; width: " +
        width +
        "px; height:" +
        height +
        "px; '><div id='impress-navigation-1' style='width:" +
        width / 5 +
        "px;'></div><div id='impress-navigation-2' style='width:" +
        width / 5 +
        "px;'></div><div id='impress-navigation-3' style='width:" +
        width / 5 +
        "px;'></div><div id='impress-navigation-4' style='width:" +
        width / 5 +
        "px;'></div><div id='impress-navigation-5' style='width:" +
        width / 5 +
        "px;'></div>" +
        "</div>"
    );

    $("#impress-navigation-1").on("click", () => {
      navigateImpress(1);
    });
    $("#impress-navigation-2").on("click", () => {
      navigateImpress(2);
    });
    $("#impress-navigation-3").on("click", () => {
      navigateImpress(3);
    });
    $("#impress-navigation-4").on("click", () => {
      navigateImpress(4);
    });
    $("#impress-navigation-5").on("click", () => {
      navigateImpress(5);
    });
  });
}
