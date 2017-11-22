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
    // 继承自“问题字”，“答案字”是放在上面回答区域，
    // 由于当答案字点击的时候，答案字会消失并将对应的问题字还原显示
    var AnswerWord = (function (_super) {
        __extends(AnswerWord, _super);
        function AnswerWord() {
            var _this = _super.call(this) || this;
            _this.SelectWord = null;
            return _this;
        }
        // 方法重载
        AnswerWord.prototype.onclick_tap = function () {
            if (this.SelectWord != null) {
                this.SelectWord.visible = true;
                this.SelectWord = null;
                this.setWordText("");
            }
            console.log("AnswerWord");
        };
        // 当一个问题字被选择添加到回答的时，设置不可见，并保存到本对象中以后使用
        AnswerWord.prototype.SetSelectWord = function (word) {
            if (word != null) {
                this.setWordText(word.getWordText());
                this.SelectWord = word;
                word.visible = false;
            }
            else {
                this.setWordText("");
                this.SelectWord = null;
            }
        };
        return AnswerWord;
    }(game.Word));
    game.AnswerWord = AnswerWord;
    __reflect(AnswerWord.prototype, "game.AnswerWord");
})(game || (game = {}));
//# sourceMappingURL=AnswerWord .js.map