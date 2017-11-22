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
     *  每个问题的数据结构
     */
    var LevelDataItem = (function () {
        function LevelDataItem() {
        }
        return LevelDataItem;
    }());
    game.LevelDataItem = LevelDataItem;
    __reflect(LevelDataItem.prototype, "game.LevelDataItem");
    // 关卡数据管理类
    var LevelDataManager = (function (_super) {
        __extends(LevelDataManager, _super);
        function LevelDataManager() {
            var _this = _super.call(this) || this;
            _this.items = []; // 关卡数据列表
            // 使用RES读取和构建JSON数据，JSON数据可以直接解析到目标结构
            _this.items = RES.getRes("questions_json");
            return _this;
        }
        // 通过level获取关卡数据
        LevelDataManager.prototype.getLevelData = function (level) {
            if (level < 0) {
                level = 0;
            }
            if (level >= this.items.length) {
                level = this.items.length - 1;
            }
            return this.items[level];
        };
        Object.defineProperty(LevelDataManager.prototype, "Milestone", {
            // 获得游戏当前的关卡进度
            get: function () {
                var milestone = egret.localStorage.getItem("CYDTZ_Milestone");
                //如果没有数据，那么默认值就是第一关
                if (milestone == "" || milestone == null) {
                    milestone = "1";
                }
                return parseInt(milestone);
            },
            // 设置游戏当前的关卡进度
            set: function (value) {
                egret.localStorage.setItem("CYDTZ_Milestone", value.toString());
            },
            enumerable: true,
            configurable: true
        });
        return LevelDataManager;
    }(BaseClass));
    game.LevelDataManager = LevelDataManager;
    __reflect(LevelDataManager.prototype, "game.LevelDataManager");
})(game || (game = {}));
//# sourceMappingURL=LevelDataManager.js.map