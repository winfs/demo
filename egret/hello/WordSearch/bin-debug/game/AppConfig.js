var game;
(function (game) {
    game.M = 10;
    game.N = 14;
    var Mode;
    (function (Mode) {
        Mode[Mode["CLASSIC"] = 0] = "CLASSIC";
        Mode[Mode["NORMAL"] = 1] = "NORMAL";
    })(Mode = game.Mode || (game.Mode = {}));
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
    var PaintColor;
    (function (PaintColor) {
        PaintColor[PaintColor["RED"] = 16737945] = "RED";
        PaintColor[PaintColor["BLUE"] = 2003199] = "BLUE";
        PaintColor[PaintColor["GREEN"] = 3394764] = "GREEN";
    })(PaintColor = game.PaintColor || (game.PaintColor = {}));
    game.Color = [
        "RED", "BLUE", "GREEN"
    ];
})(game || (game = {}));
//# sourceMappingURL=AppConfig.js.map