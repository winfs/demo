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
var fighter;
(function (fighter) {
    /**
     * 可滚动背景图
     */
    var BgMap = (function (_super) {
        __extends(BgMap, _super);
        function BgMap() {
            var _this = _super.call(this) || this;
            _this.speed = 2; // 控制滚动速度
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        /**
         * 初始化
         */
        BgMap.prototype.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.initBgMap();
        };
        /**
         * 初始化背景图
         */
        BgMap.prototype.initBgMap = function () {
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            var texture = RES.getRes("bg_jpg");
            this.textureHeight = texture.textureHeight; // 保留原始纹理的高度，用于后续的计算
            this.rowCount = Math.ceil(this.stageH / this.textureHeight) + 1; // 计算在当前屏幕中，需要的图片数量
            this.bmpArr = [];
            //创建这些图片，并设置y坐标，让它们连接起来
            for (var i = 0; i < this.rowCount; i++) {
                var bgMap = fighter.createBitmapByName("bg_jpg");
                // 确定每张图片的起始位置
                bgMap.y = -(this.textureHeight * this.rowCount - this.stageH) + this.textureHeight * i;
                this.bmpArr.push(bgMap);
                this.addChild(bgMap);
            }
        };
        /**
         * 开始滚动
         */
        BgMap.prototype.start = function () {
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        };
        /**
         * 暂停滚动
         */
        BgMap.prototype.pause = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        };
        /**
         * 逐帧运动
         */
        BgMap.prototype.enterFrameHandler = function (event) {
            for (var i = 0; i < this.rowCount; i++) {
                var bgMap = this.bmpArr[i];
                bgMap.y += this.speed;
                // 判断超出屏幕后，回到队首，这样来实现循环反复
                if (bgMap.y > this.stageH) {
                    bgMap.y = this.bmpArr[0].y - this.textureHeight; // 设置在第一张图片之前
                    this.bmpArr.pop();
                    this.bmpArr.unshift(bgMap);
                }
            }
        };
        return BgMap;
    }(egret.DisplayObjectContainer));
    fighter.BgMap = BgMap;
    __reflect(BgMap.prototype, "fighter.BgMap");
})(fighter || (fighter = {}));
//# sourceMappingURL=BgMap.js.map