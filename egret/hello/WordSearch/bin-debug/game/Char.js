var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var Char = (function () {
        function Char() {
        }
        return Char;
    }());
    game.Char = Char;
    __reflect(Char.prototype, "game.Char");
})(game || (game = {}));
//# sourceMappingURL=Char.js.map