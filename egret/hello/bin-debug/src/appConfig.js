var game;
(function (game) {
    var Direction;
    (function (Direction) {
        Direction[Direction["UP"] = 0] = "UP";
        Direction[Direction["DOWN"] = 1] = "DOWN";
        Direction[Direction["LEFT"] = 2] = "LEFT";
        Direction[Direction["RIGHT"] = 3] = "RIGHT";
        Direction[Direction["DOWNLEFT"] = 4] = "DOWNLEFT";
        Direction[Direction["DOWNRIGHT"] = 5] = "DOWNRIGHT";
        Direction[Direction["UPLEFT"] = 6] = "UPLEFT";
        Direction[Direction["UPRIGHT"] = 7] = "UPRIGHT";
    })(Direction = game.Direction || (game.Direction = {}));
    game.N = 10;
})(game || (game = {}));
//# sourceMappingURL=appConfig.js.map