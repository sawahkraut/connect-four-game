(function() {
    var allSlots = $(".slot");

    var victories = [
        [allSlots.eq(0), allSlots.eq(7), allSlots.eq(14), allSlots.eq(21)],
        [allSlots.eq(1), allSlots.eq(8), allSlots.eq(15), allSlots.eq(22)],
        [allSlots.eq(8), allSlots.eq(15), allSlots.eq(22), allSlots.eq(29)],
        [allSlots.eq(2), allSlots.eq(9), allSlots.eq(16), allSlots.eq(23)],
        [allSlots.eq(14), allSlots.eq(21), allSlots.eq(28), allSlots.eq(35)],
        [allSlots.eq(7), allSlots.eq(14), allSlots.eq(21), allSlots.eq(28)],
        [allSlots.eq(6), allSlots.eq(13), allSlots.eq(20), allSlots.eq(27)],
        [allSlots.eq(13), allSlots.eq(20), allSlots.eq(27), allSlots.eq(34)],
        [allSlots.eq(20), allSlots.eq(27), allSlots.eq(34), allSlots.eq(41)],
        [allSlots.eq(12), allSlots.eq(19), allSlots.eq(26), allSlots.eq(33)],
        [allSlots.eq(19), allSlots.eq(26), allSlots.eq(33), allSlots.eq(40)],
        [allSlots.eq(18), allSlots.eq(25), allSlots.eq(32), allSlots.eq(39)],
        [allSlots.eq(18), allSlots.eq(13), allSlots.eq(8), allSlots.eq(3)],
        [allSlots.eq(24), allSlots.eq(19), allSlots.eq(14), allSlots.eq(9)],
        [allSlots.eq(19), allSlots.eq(14), allSlots.eq(9), allSlots.eq(4)],
        [allSlots.eq(30), allSlots.eq(25), allSlots.eq(20), allSlots.eq(15)],
        [allSlots.eq(25), allSlots.eq(20), allSlots.eq(15), allSlots.eq(10)],
        [allSlots.eq(20), allSlots.eq(15), allSlots.eq(10), allSlots.eq(5)],
        [allSlots.eq(36), allSlots.eq(31), allSlots.eq(26), allSlots.eq(21)],
        [allSlots.eq(31), allSlots.eq(26), allSlots.eq(21), allSlots.eq(16)],
        [allSlots.eq(26), allSlots.eq(21), allSlots.eq(16), allSlots.eq(11)],
        [allSlots.eq(37), allSlots.eq(32), allSlots.eq(27), allSlots.eq(22)],
        [allSlots.eq(32), allSlots.eq(27), allSlots.eq(22), allSlots.eq(17)],
        [allSlots.eq(38), allSlots.eq(33), allSlots.eq(28), allSlots.eq(23)]
    ];
    $("#player1Score").text(localStorage.getItem("player1"));
    $("#player2Score").text(localStorage.getItem("player2"));

    var currentPlayer = "player1";
    $("#resetScore").on("click", function() {
        localStorage.setItem("player1", 0);
        localStorage.setItem("player2", 0);
        $("#player1Score").text(localStorage.getItem("player1"));
        $("#player2Score").text(localStorage.getItem("player2"));
    });

    $(".column").on("click", function(e) {
        var slotsColumn = $(e.currentTarget).find(".slot");
        for (var i = 5; i >= 0; i--) {
            if (
                slotsColumn
                    .eq(i)
                    .find(".hole")
                    .hasClass("semi")
            ) {
                slotsColumn
                    .eq(i)
                    .find(".hole")
                    .removeClass("semi");
                break;
            }
        }

        if (checkforVictory(slotsColumn)) {
            victory(currentPlayer);
            return;
        } else if (checkforVictory($(".column").find(".row" + i))) {
            victory(currentPlayer);
        } else if (diagonal(victories)) {
            victory(currentPlayer);
        }

        switchPlayers();
    });

    $(".column").on("mouseenter", function(e) {
        var slotsColumn = $(e.currentTarget).find(".slot");
        for (var i = 5; i >= 0; i--) {
            if (
                !slotsColumn.eq(i).hasClass("player1") &&
                !slotsColumn.eq(i).hasClass("player2")
            ) {
                slotsColumn.eq(i).addClass(currentPlayer);
                slotsColumn
                    .eq(i)
                    .find(".hole")
                    .addClass("semi");
                break;
            }
        }
    });

    $(".column").on("mouseleave", function(e) {
        var slotsColumn = $(e.currentTarget).find(".slot");
        for (var i = 5; i >= 0; i--) {
            if (
                slotsColumn
                    .eq(i)
                    .find(".hole")
                    .hasClass("semi")
            ) {
                slotsColumn.eq(i).removeClass(currentPlayer);
                slotsColumn
                    .eq(i)
                    .find(".hole")
                    .removeClass("semi");
                break;
            }
        }
    });

    function diagonal(victories) {
        for (var i = 0; i < victories.length; i++) {
            for (var x = 0; x < victories[i].length; x++) {
                if (!victories[i][x].hasClass(currentPlayer)) {
                    break;
                }
            }
            if (x == 4) {
                return true;
            }
        }
        return null;
    }
    function switchPlayers() {
        if (currentPlayer == "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }
    function checkforVictory(slots) {
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                count++;
                if (count == 4) {
                    console.log(currentPlayer, i);
                    return true;
                }
            } else {
                count = 0;
            }
        }
    }
    function victory(player) {
        var popup = $(".popup");

        movePopUp();
        function movePopUp() {
            popup.css({
                display: "flex"
            });
            $(".overlay").css({
                display: "block"
            });
            $(".overlay").addClass("on");
        }
        console.log("victory!, the winner is " + player);
        if (localStorage.getItem(currentPlayer)) {
            localStorage.setItem(
                currentPlayer,
                Number(localStorage.getItem(currentPlayer)) + 1
            );

            $("#player1Score").text(localStorage.getItem("player1"));
            $("#player2Score").text(localStorage.getItem("player2"));

            console.log(localStorage.getItem(currentPlayer));
        } else {
            localStorage.setItem(currentPlayer, 1);
            console.log(localStorage.getItem(currentPlayer));
        }
    }
})();
