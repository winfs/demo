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
     * Scene基类
     */
    var BaseScene = (function (_super) {
        __extends(BaseScene, _super);
        function BaseScene() {
            return _super.call(this) || this;
        }
        BaseScene.getInstance = function () {
            if (this.instance == null) {
                this.instance = new this();
            }
            return this.instance;
        };
        /**
         * 进入场景时，注册场景内的事件侦听器
         */
        BaseScene.prototype.start = function () {
        };
        /**
         * 离开场景时，移除场景内的事件侦听器
         */
        BaseScene.prototype.end = function () {
        };
        return BaseScene;
    }(eui.Component));
    game.BaseScene = BaseScene;
    __reflect(BaseScene.prototype, "game.BaseScene");
})(game || (game = {}));
//# sourceMappingURL=BaseScene.js.map