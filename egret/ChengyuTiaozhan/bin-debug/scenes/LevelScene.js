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
     * 关卡界面
     */
    var LevelScene = (function (_super) {
        __extends(LevelScene, _super);
        function LevelScene() {
            var _this = _super.call(this) || this;
            _this.levelIcons = [];
            _this.sel_level = 0; // 记录选择的关卡
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
            _this.skinName = "skins.LevelSceneSkin";
            return _this;
        }
        LevelScene.prototype.onComplete = function () {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
            this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_back, this);
            this.init();
        };
        /**
         * 初始化关卡界面
         */
        LevelScene.prototype.init = function () {
            var stageW = 720;
            var stageH = 1136;
            // 创建地图选项，20行 * 10列
            var row = 20;
            var col = 10;
            var spanX = stageW / col; // 计算x间隔
            var spanY = stageH / row; // 计算y间隔
            // 地图背景
            var group = new eui.Group();
            group.width = stageW;
            group.height = (spanY * 20); // 400个关卡所需要的地图高度
            // 背景个数
            var groupCount = Math.ceil(group.height / stageH); // group.height / 1138
            // 填充背景
            for (var i = 0; i < groupCount; i++) {
                var img = new eui.Image();
                img.source = RES.getRes("GameBG2_jpg");
                img.y = i * stageH;
                this.group_levels.addChildAt(img, 0);
            }
            // 以正弦曲线绘制关卡图标的路径
            var milestone = game.LevelDataManager.getInstance().Milestone; // 获取当前关卡进度
            for (var i = 0; i < row; i++) {
                var icon = new game.LevelIcon();
                icon.Level = i + 1;
                icon.y = spanY * i / 2;
                icon.x = Math.sin(icon.y / 180 * Math.PI) * 200 + group.width / 2;
                icon.y += spanY * i / 2;
                icon.y = group.height - icon.y - spanY;
                group.addChild(icon);
                icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_level, this);
                // 依据进度设置关卡显示
                icon.enabled = i < milestone;
                //保存到一个列表中
                this.levelIcons.push(icon);
            }
            //开启位图缓存模式
            group.cacheAsBitmap = true;
            this.group_levels.addChild(group);
            //卷动到最底层
            this.group_levels.scrollV = group.height - 1100;
            // 跟踪箭头
            this.img_arrow = new eui.Image();
            this.img_arrow.source = RES.getRes("PageDownBtn_png");
            this.img_arrow.anchorOffsetX = 124 / 2 - group.getChildAt(0).width / 2;
            this.img_arrow.anchorOffsetY = 76;
            this.img_arrow.touchEnabled = false;
            this.img_arrow.x = group.getChildAt(0).x;
            this.img_arrow.y = group.getChildAt(0).y;
            group.addChild(this.img_arrow);
        };
        LevelScene.prototype.onclick_back = function () {
            console.log("返回开始游戏界面");
            game.SceneManager.getInstance().dispath(game.SceneType.GAME_START, this);
        };
        LevelScene.prototype.onclick_level = function (e) {
            var icon = e.currentTarget;
            console.log("选择第" + icon.Level + "关");
            if (this.sel_level != icon.Level) {
                this.img_arrow.x = icon.x;
                this.img_arrow.y = icon.y;
                this.sel_level = icon.Level;
            }
            else {
                console.log("进入并开始游戏");
                game.GameScene.getInstance().initLevel(icon.Level);
                game.SceneManager.getInstance().dispath(game.SceneType.GAME_PLAY, this);
            }
        };
        // 打开指定的关卡
        LevelScene.prototype.openLevel = function (level) {
            var icon = this.levelIcons[level - 1];
            icon.enabled = true;
            // 调整关卡进度
            if (level > game.LevelDataManager.getInstance().Milestone) {
                game.LevelDataManager.getInstance().Milestone = level;
                // 同时将选定标记置于其上
                this.img_arrow.x = icon.x;
                this.img_arrow.y = icon.y;
                this.sel_level = icon.Level;
            }
        };
        LevelScene.prototype.start = function () {
            this.btn_back.touchEnabled = true;
            this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_back, this);
        };
        LevelScene.prototype.end = function () {
            this.btn_back.touchEnabled = false;
            if (this.btn_back.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_back, this);
            }
        };
        return LevelScene;
    }(game.BaseScene));
    game.LevelScene = LevelScene;
    __reflect(LevelScene.prototype, "game.LevelScene");
})(game || (game = {}));
//# sourceMappingURL=LevelScene.js.map