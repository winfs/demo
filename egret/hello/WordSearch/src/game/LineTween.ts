class LineTween {
    private obj: Object;
    private startX: number;
    private startY: number;
    private endX: number;
    private endY: number;
    private tw: egret.Tween;

    public constructor(startX: number, startY: number, endX: number, endY: number) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
    }

    public tween(obj: LineObject, count: number, parent?: egret.DisplayObjectContainer) {
        let tw = egret.Tween.get(obj, {
            onChange: () => {
                obj.line.graphics.clear();
                obj.line.graphics.lineStyle(50, obj.color, 0.6);
                obj.line.graphics.moveTo(this.startX, this.startY);
                obj.line.graphics.lineTo(obj.x, obj.y);
            }, onChangeObj: obj
        });

        tw.to({ x: this.endX, y: this.endY }, count * 80).call(function () {
            if (parent) {
                if (obj.line.parent) {
                    obj.line.parent.removeChild(obj.line);
                }
            }
        })
    }

    public static remove(obj: LineObject) {
        egret.Tween.removeTweens(obj);
        if (obj.line.parent) {
            obj.line.parent.removeChild(obj.line);
        }
    }
}

interface LineObject {
    line: egret.Shape,
    color: number,
    x: number;
    y: number;
}