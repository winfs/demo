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
    var LevelIcon = (function (_super) {
        __extends(LevelIcon, _super);
        // private _lb_label:string = "";
        function LevelIcon() {
            var _this = _super.call(this) || this;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
            _this.skinName = "skins.LevelIconSkin";
            return _this;
        }
        Object.defineProperty(LevelIcon.prototype, "Level", {
            get: function () {
                // return parseInt(this._lb_label);
                return parseInt(this.lb_level.text);
            },
            set: function (value) {
                /*
                this._lb_label = value.toString();
                if (this.lb_level) {
                    this.lb_level.text = this._lb_label;
                }
                */
                this.lb_level.text = value.toString();
            },
            enumerable: true,
            configurable: true
        });
        LevelIcon.prototype.onComplete = function () {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
            /*
            if (this.lb_level) {
                this.lb_level.text = this._lb_label;
            }
            */
        };
        return LevelIcon;
    }(eui.Button));
    game.LevelIcon = LevelIcon;
    __reflect(LevelIcon.prototype, "game.LevelIcon");
})(game || (game = {}));
//# sourceMappingURL=LevelIcon.js.map