var cols = ["R", "G", "B", "Y"],
  turn,
  userclick,
  simonclick,
  clicking;

function main() {
  clicking = false;
  userclick = [];
  simonclick = [];
  simonsTurn();
  $(".st").attr("disabled", true);
  turn = 1;
  $("#score").val(turn);
}

function check() {
  var same = true;
  for (var i = 0; i < simonclick.length; i++) {
    if (simonclick[i] != userclick[i]) {
      same = false;
    }
  }
  if (same) {
    turn += 1;
    $("#score").val(turn);
    userclick = [];
    simonsTurn();
  } else {
    alert("You Lose!");
    $(".st").attr("disabled", false);
  }
}

function simonsTurn() {
  var gen = [];
  gen.push(Math.floor(Math.random() * 4));
  for (var i = 0; i < gen.length; i++) {
    simonclick.push(cols[gen[i]]);
  }
  (function loopLight(t) {
    $("#" + simonclick[t]).animate({
        opacity: 0.5
      },
      500,
      function() {
        $(this).css("opacity", 1);
      }
    );
    t += 1;
    if (t < simonclick.length) {
      setTimeout(function() {
        loopLight(t);
      }, 1000);
    }
  })(0);
  usersTurn();
}

function usersTurn() {
  $(".btn").click(function() {
    if (userclick.length < simonclick.length && !clicking) {
      clicking = true;
      userclick.push($(this).attr("id"));
      if (userclick.length == simonclick.length) {
        check();
      }
      setTimeout(function() {
        clicking = false;
      }, 50);
    }
  });

}

$(".btn").on("mousedown", function() {
  $(this).css("opacity", 0.5);
});
$(".btn").on("mouseup", function() {
  $(this).css("opacity", 0.75);
});

$(".btn").hover(
  function() {
    $(this).css("opacity", 0.9);
  },
  function() {
    $(this).css("opacity", 1);
  }
);