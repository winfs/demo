var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MathUtil = (function () {
    function MathUtil() {
    }
    /**
     * 获取两点间角度
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    MathUtil.getAngle = function (p1X, p1Y, p2X, p2Y) {
        var xdis = p2X - p1X;
        var ydis = -(p2Y - p1Y);
        var atan2 = Math.atan2(ydis, xdis);
        if (atan2 < 0) {
            return 360 + 180 * atan2 / Math.PI;
        }
        else {
            return 180 * atan2 / (Math.PI);
        }
    };
    /**
     * 获取两点间距离
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    MathUtil.getDistance = function (p1X, p1Y, p2X, p2Y) {
        var disX = p2X - p1X;
        var disY = p2Y - p1Y;
        var disQ = disX * disX + disY * disY;
        return Math.sqrt(disQ);
    };
    MathUtil.parsePoint = function (x, y, spanX, spanY) {
        var disX = x * spanX;
        var disY = y * spanY;
        return new egret.Point(disX, disY);
    };
    return MathUtil;
}());
__reflect(MathUtil.prototype, "MathUtil");
//# sourceMappingURL=MathUtil.js.map