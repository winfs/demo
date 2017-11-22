var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    /**
     *  普通的一个字，用来做问题的字块使用
     */
    var Word = (function (_super) {
        __extends(Word, _super);
        function Word() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_tap, _this);
            return _this;
        }
        Word.prototype.onclick_tap = function () {
            console.log(this.lb_text.text);
            game.GameScene.getInstance().onclick_word(this);
        };
        // 这里没有做成属性的原因是因为当应用到eui的时候，Skin还未指定，运行时候会出现报错，
        // 如果指定了SkinName，那么就会产生两次eui的构建浪费内存
        Word.prototype.setWordText = function (value) {
            this.lb_text.text = value;
        };
        Word.prototype.getWordText = function () {
            return this.lb_text.text;
        };
        return Word;
    }(eui.Component));
    game.Word = Word;
    __reflect(Word.prototype, "game.Word");
})(game || (game = {}));
//# sourceMappingURL=Word.js.map