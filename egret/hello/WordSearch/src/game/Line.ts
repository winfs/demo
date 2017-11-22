module game {
    export class Line extends egret.Shape {
        private startPoint: egret.Point;
        private endPoint: egret.Point;
        public colorName: string;

        private static cacheObject: Object = {};

        public constructor(colorName: string) {
            super();
            this.colorName = colorName;
        }

        public set StartPoint(value: egret.Point) {
            this.startPoint = value;
        }

        public get StartPoint() {
            return this.startPoint;
        }

        public set EndPoint(value: egret.Point) {
            this.endPoint = value;
        }

        public get EndPoint() {
            return this.endPoint;
        }

        public draw() {
            let paintColor = AppUtil.getPaintColor(this.colorName);
            this.graphics.lineStyle(50, paintColor, 0.6);
            this.graphics.moveTo(this.startPoint.x, this.startPoint.y);
            this.graphics.lineTo(this.endPoint.x, this.endPoint.y);
        }

        public tween(obj: LineObject, count: number, isScale: boolean, parent?: egret.DisplayObjectContainer) {
            let thisObj: game.Line = this;
            let paintColor = AppUtil.getPaintColor(this.colorName);
            let tw = egret.Tween.get(obj, {
                onChange: () => {
                    this.graphics.clear();
                    this.graphics.lineStyle(50, paintColor, 0.6);
                    this.graphics.moveTo(this.startPoint.x, this.startPoint.y);
                    this.graphics.lineTo(obj.x, obj.y);
                }, onChangeObj: obj
            });

            let thePoint: egret.Point;
            if (isScale) {
                thePoint = this.endPoint;
            } else {
                thePoint = this.startPoint;
            }

            tw.to({ x: thePoint.x, y: thePoint.y }, count * 80).call(function () {
                if (parent) {
                    parent.removeChild(thisObj);
                }
            })
        }

        public remove(obj: LineObject) {
            egret.Tween.removeTweens(obj);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }

        public static generate(colorName: string): game.Line {
            let lineObj: game.Line = game.Line.cacheObject[colorName];
            if (lineObj == null) {
                lineObj = new game.Line(colorName);
            }

            console.log(game.Line.cacheObject);

            return lineObj;
        }

        public static reclaim(lineObj: game.Line) {
            let colorName: string = lineObj.colorName;
            if (game.Line.cacheObject[colorName] == null) {
                game.Line.cacheObject[colorName] = lineObj;
            }
        }

        public static get(colorName: string) {
            return game.Line.cacheObject[colorName];
        }
    }

    export interface LineObject {
        x: number;
        y: number;
        color: string;
    }
}