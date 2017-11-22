var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var Word = (function () {
        function Word() {
        }
        return Word;
    }());
    game.Word = Word;
    __reflect(Word.prototype, "game.Word");
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
})(game || (game = {}));
//# sourceMappingURL=Word.js.map