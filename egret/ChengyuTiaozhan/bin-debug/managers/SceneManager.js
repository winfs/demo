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
     * 场景管理类
     */
    var SceneManager = (function (_super) {
        __extends(SceneManager, _super);
        function SceneManager() {
            var _this = _super.call(this) || this;
            _this.scenes = {};
            return _this;
        }
        SceneManager.getInstance = function () {
            if (this.instance == null) {
                this.instance = new SceneManager();
            }
            return this.instance;
        };
        /**
         * 注册场景
         */
        SceneManager.prototype.register = function (type, scene) {
            this.scenes[type] = scene;
        };
        /**
         * 场景切换监听
         */
        SceneManager.prototype.start = function () {
            egret.log("====开启场景切换监听事件====");
            this.addEventListener(game.SceneEvent.TOGGLE_SCENE, this.onToggleScene, this);
        };
        /**
         * 发起场景切换事件
         */
        SceneManager.prototype.dispath = function (eventType, obj) {
            var sceneEvent = new game.SceneEvent(game.SceneEvent.TOGGLE_SCENE);
            sceneEvent.eventType = eventType;
            sceneEvent.obj = obj;
            this.dispatchEvent(sceneEvent);
        };
        /**
         * 场景切换处理
         */
        SceneManager.prototype.onToggleScene = function (evt) {
            egret.log("当前进入场景：", evt.eventType);
            evt.obj.end();
            this.removeChildren();
            var scene = this.scenes[evt.eventType];
            if (scene == null) {
                egret.error("场景" + evt.eventType + "不存在");
                return;
            }
            scene.start();
            this.addChild(scene);
        };
        return SceneManager;
    }(egret.DisplayObjectContainer));
    game.SceneManager = SceneManager;
    __reflect(SceneManager.prototype, "game.SceneManager");
})(game || (game = {}));
//# sourceMappingURL=SceneManager.js.map