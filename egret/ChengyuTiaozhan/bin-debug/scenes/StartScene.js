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
     * 开始界面
     */
    var StartScene = (function (_super) {
        __extends(StartScene, _super);
        function StartScene() {
            var _this = _super.call(this) || this;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
            _this.skinName = "skins.StartSceneSkin";
            return _this;
        }
        StartScene.prototype.onComplete = function () {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
            this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        };
        StartScene.prototype.onTouchTap = function () {
            egret.log("====进入选择关卡界面====");
            game.SceneManager.getInstance().dispath(game.SceneType.GAME_LEVEL, this);
        };
        StartScene.prototype.start = function () {
            this.btn_start.touchEnabled = true;
            this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        };
        StartScene.prototype.end = function () {
            this.btn_start.touchEnabled = false;
            if (this.btn_start.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            }
        };
        return StartScene;
    }(game.BaseScene));
    game.StartScene = StartScene;
    __reflect(StartScene.prototype, "game.StartScene");
})(game || (game = {}));
//# sourceMappingURL=StartScene.js.map