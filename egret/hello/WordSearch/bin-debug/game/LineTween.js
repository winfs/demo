var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LineTween = (function () {
    function LineTween(startX, startY, endX, endY) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
    }
    LineTween.prototype.tween = function (obj, count, parent) {
        var _this = this;
        var tw = egret.Tween.get(obj, {
            onChange: function () {
                obj.line.graphics.clear();
                obj.line.graphics.lineStyle(50, obj.color, 0.6);
                obj.line.graphics.moveTo(_this.startX, _this.startY);
                obj.line.graphics.lineTo(obj.x, obj.y);
            }, onChangeObj: obj
        });
        tw.to({ x: this.endX, y: this.endY }, count * 80).call(function () {
            if (parent) {
                if (obj.line.parent) {
                    obj.line.parent.removeChild(obj.line);
                }
            }
        });
    };
    LineTween.remove = function (obj) {
        egret.Tween.removeTweens(obj);
        if (obj.line.parent) {
            obj.line.parent.removeChild(obj.line);
        }
    };
    return LineTween;
}());
__reflect(LineTween.prototype, "LineTween");
//# sourceMappingURL=LineTween.js.map