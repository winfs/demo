var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fighter;
(function (fighter) {
    var GameUtil = (function () {
        function GameUtil() {
        }
        /**
         * 基于矩形的碰撞检测
         */
        GameUtil.hitTest = function (obj1, obj2) {
            var rect1 = obj1.getBounds();
            var rect2 = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2); // 检查是否相交
        };
        return GameUtil;
    }());
    fighter.GameUtil = GameUtil;
    __reflect(GameUtil.prototype, "fighter.GameUtil");
    /**
     * 根据name关键字创建一个Bitmap对象
     */
    function createBitmapByName(name) {
        var img = new egret.Bitmap();
        img.texture = RES.getRes(name);
        return img;
    }
    fighter.createBitmapByName = createBitmapByName;
})(fighter || (fighter = {}));
//# sourceMappingURL=GameUtil.js.map