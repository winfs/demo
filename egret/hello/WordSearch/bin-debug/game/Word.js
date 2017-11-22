var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var Word = (function () {
        function Word() {
            this.chars = [];
        }
        return Word;
    }());
    game.Word = Word;
    __reflect(Word.prototype, "game.Word");
})(game || (game = {}));
//# sourceMappingURL=Word.js.map