var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AppUtil = (function () {
    function AppUtil() {
    }
    AppUtil.getPaintColor = function (color) {
        switch (color.toLowerCase()) {
            case "red":
                return game.PaintColor.RED;
            case "blue":
                return game.PaintColor.BLUE;
            case "green":
                return game.PaintColor.GREEN;
        }
    };
    return AppUtil;
}());
__reflect(AppUtil.prototype, "AppUtil");
//# sourceMappingURL=AppUtil.js.map