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
    var Line = (function (_super) {
        __extends(Line, _super);
        function Line(colorName) {
            var _this = _super.call(this) || this;
            _this.colorName = colorName;
            return _this;
        }
        Object.defineProperty(Line.prototype, "StartPoint", {
            get: function () {
                return this.startPoint;
            },
            set: function (value) {
                this.startPoint = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Line.prototype, "EndPoint", {
            get: function () {
                return this.endPoint;
            },
            set: function (value) {
                this.endPoint = value;
            },
            enumerable: true,
            configurable: true
        });
        Line.prototype.draw = function () {
            var paintColor = AppUtil.getPaintColor(this.colorName);
            this.graphics.lineStyle(50, paintColor, 0.6);
            this.graphics.moveTo(this.startPoint.x, this.startPoint.y);
            this.graphics.lineTo(this.endPoint.x, this.endPoint.y);
        };
        Line.prototype.tween = function (obj, count, isScale, parent) {
            var _this = this;
            var thisObj = this;
            var paintColor = AppUtil.getPaintColor(this.colorName);
            var tw = egret.Tween.get(obj, {
                onChange: function () {
                    _this.graphics.clear();
                    _this.graphics.lineStyle(50, paintColor, 0.6);
                    _this.graphics.moveTo(_this.startPoint.x, _this.startPoint.y);
                    _this.graphics.lineTo(obj.x, obj.y);
                }, onChangeObj: obj
            });
            var thePoint;
            if (isScale) {
                thePoint = this.endPoint;
            }
            else {
                thePoint = this.startPoint;
            }
            tw.to({ x: thePoint.x, y: thePoint.y }, count * 80).call(function () {
                if (parent) {
                    parent.removeChild(thisObj);
                }
            });
        };
        Line.prototype.remove = function (obj) {
            egret.Tween.removeTweens(obj);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        Line.generate = function (colorName) {
            var lineObj = game.Line.cacheObject[colorName];
            if (lineObj == null) {
                lineObj = new game.Line(colorName);
            }
            console.log(game.Line.cacheObject);
            return lineObj;
        };
        Line.reclaim = function (lineObj) {
            var colorName = lineObj.colorName;
            if (game.Line.cacheObject[colorName] == null) {
                game.Line.cacheObject[colorName] = lineObj;
            }
        };
        Line.get = function (colorName) {
            return game.Line.cacheObject[colorName];
        };
        Line.cacheObject = {};
        return Line;
    }(egret.Shape));
    game.Line = Line;
    __reflect(Line.prototype, "game.Line");
})(game || (game = {}));
//# sourceMappingURL=Line.js.map