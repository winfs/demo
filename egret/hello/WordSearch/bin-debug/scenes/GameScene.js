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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene(m, n, mode, words) {
        var _this = _super.call(this) || this;
        _this.wordList = [];
        _this.foundList = [];
        _this.isTouch = false;
        _this.init(m, n, mode, words);
        return _this;
    }
    GameScene.prototype.init = function (m, n, mode, words) {
        var gameBoard = new game.Board(m, n);
        var board = gameBoard.create(words);
        this.board = board;
        this.m = m;
        this.n = n;
        this.mode = mode;
        this.words = gameBoard.getFillWords();
        this.wordList = gameBoard.getWordList();
        console.log('baord:', this.board);
        console.log("words:", this.wordList);
    };
    GameScene.prototype.createView = function () {
        this.stageW = AppUtil.stageWidth;
        this.stageH = AppUtil.stageHeight;
        this.createHeadBar();
        this.spanX = Math.ceil(this.stageW / this.m);
        this.spanY = this.spanX;
        this.panel = new egret.Sprite();
        this.panel.x = 0;
        this.panel.y = 120;
        this.panel.graphics.beginFill(0xFFFFFF);
        this.panel.graphics.drawRect(0, 0, this.stageW, this.spanY * this.n);
        this.panel.graphics.endFill();
        this.addChild(this.panel);
        for (var i = 0; i < this.n; i++) {
            for (var j = 0; j < this.m; j++) {
                var tx = new egret.TextField();
                tx.x = this.spanX * j;
                tx.y = this.spanY * i;
                tx.width = this.spanX;
                tx.height = this.spanY;
                //tx.border = true;
                //tx.borderColor = 0Xffff;
                tx.size = 32;
                tx.textColor = 0x0000;
                tx.textAlign = egret.HorizontalAlign.CENTER;
                tx.verticalAlign = egret.VerticalAlign.MIDDLE;
                tx.text = this.board[i][j];
                this.panel.addChild(tx);
            }
        }
        this.panel.cacheAsBitmap = true;
        this.panel.touchEnabled = true;
        this.panel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.panel.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.panel.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.createFootBar();
    };
    GameScene.prototype.createHeadBar = function () {
        this.headBar = new egret.Sprite();
        this.headBar.graphics.beginFill(0xcc00ff);
        this.headBar.graphics.drawRect(0, 0, this.stageW, 120);
        this.headBar.graphics.endFill();
        this.addChild(this.headBar);
        this.headBar.cacheAsBitmap = true;
        this.headBar.touchEnabled = true;
        this.headBar.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchOut, this);
        this.lblTime = new eui.Label();
        this.lblTime.x = 50;
        this.lblTime.y = 50;
        this.lblTime.size = 36;
        if (this.mode == game.Mode.CLASSIC) {
            this.lblTime.text = "03:00";
        }
        this.headBar.addChild(this.lblTime);
        this.timer = new egret.Timer(1000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.start();
        this.lblCount = new eui.Label();
        this.lblCount.size = 48;
        this.lblCount.text = '0 / ' + this.words.length;
        this.lblCount.x = (this.stageW - this.lblCount.width) / 2;
        this.lblCount.y = 40;
        this.headBar.addChild(this.lblCount);
        this.lblTip = new eui.Label();
        this.lblTip.size = 36;
        this.lblTip.text = "3";
        this.lblTip.x = this.stageW - 150;
        this.lblTip.y = 50;
        this.headBar.addChild(this.lblTip);
        this.lblTip.touchEnabled = true;
        this.lblTip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTip, this);
        /*
        this.btnStop = new eui.Button();
        this.btnStop.label = "||";
        this.btnStop.x = this.stageW - 50;
        this.btnStop.y = 50;
        this.headBar.addChild(this.btnStop);

        this.btnStop.touchEnabled = true;
        this.btnStop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchStop, this);
        */
        var stopBtn = new egret.TextField();
        stopBtn.text = "||";
        stopBtn.size = 36;
        stopBtn.x = this.stageW - stopBtn.width - 50;
        stopBtn.y = 50;
        this.addChild(stopBtn);
        stopBtn.touchEnabled = true;
        stopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchStop, this);
    };
    GameScene.prototype.createFootBar = function () {
        this.footBar = new egret.Sprite();
        this.footBar.x = 0;
        this.footBar.y = this.headBar.height + this.panel.height;
        this.footBar.graphics.beginFill(0x6A5ACD);
        this.footBar.graphics.drawRect(0, 0, this.stageW, 220);
        this.footBar.graphics.endFill();
        this.addChild(this.footBar);
        this.footBar.touchEnabled = true;
        this.footBar.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchOut, this);
        var padding = 50;
        var labelTW = 0;
        var labelBW = 0;
        var labelH = 0;
        for (var i = 0; i < this.words.length; i++) {
            var label = new egret.TextField();
            var offsetX = (Math.floor(i / 2) + 1) * padding;
            label.x = i < 2 ? padding : (i % 2 == 0 ? offsetX + labelTW : offsetX + labelBW);
            label.y = i % 2 == 0 ? padding : padding * 2 + labelH;
            label.size = 32;
            label.text = this.words[i];
            this.footBar.addChild(label);
            if (i % 2 == 0) {
                labelTW += label.width;
            }
            else {
                labelBW += label.width;
            }
            labelH = label.height;
        }
        this.footBar.cacheAsBitmap = true;
    };
    GameScene.prototype.onTimer = function () {
        var parts = this.lblTime.text.split(":");
        var minute = parseInt(parts[0]);
        var second = parseInt(parts[1]);
        second--;
        if (second == -1 || second == 0 && minute != 0) {
            minute--;
            second = 59;
        }
        if (minute == 0 && second == 0) {
            console.log("game over");
            this.timer.stop();
        }
        this.lblTime.text = '0' + minute + ':' + (second < 10 ? '0' + second : second);
    };
    GameScene.prototype.onTouchTip = function () {
        var word;
        var count = parseInt(this.lblTip.text);
        if (count == 0) {
            this.touchEnabled = false;
            return;
        }
        var tip = false;
        for (var i = 0; i < this.wordList.length; i++) {
            if (ArrayUtil.contains(this.foundList, this.wordList[i].text)) {
                continue;
            }
            word = this.wordList[i];
            count--;
            tip = true;
            break;
        }
        if (tip) {
            this.lblTip.text = count.toString();
            var cFirst = word.chars[0];
            var cLast = word.chars[word.text.length - 1];
            var startX = cFirst.y * this.spanX + this.spanX / 2;
            var startY = cFirst.x * this.spanY + this.spanY / 2;
            var endX = cLast.y * this.spanX + this.spanX / 2;
            var endY = cLast.x * this.spanY + this.spanY / 2;
            var colorName = ArrayUtil.getRandomValue(game.Color);
            var line = game.Line.generate(colorName);
            this.panel.addChild(line);
            line.StartPoint = new egret.Point(startX, startY);
            line.EndPoint = new egret.Point(endX, endY);
            var distance = MathUtil.getDistance(startX, startY, endX, endY);
            var obj = {
                x: startX,
                y: startY,
                color: line.colorName,
            };
            var durCount = Math.ceil(distance / this.spanX);
            line.tween(obj, durCount, true);
            this.foundList.push(word.text);
            this.updateCountText();
            this.updateLabelState(word.text);
        }
    };
    GameScene.prototype.onTouchStop = function () {
        this.isTouch = !this.isTouch;
        if (this.isTouch) {
            this.timer.stop();
            this.panel.touchEnabled = false;
        }
        else {
            this.timer.start();
            this.panel.touchEnabled = true;
        }
    };
    GameScene.prototype.updateCountText = function () {
        var parts = this.lblCount.text.split("/");
        var left = parseInt(parts[0]);
        var right = parseInt(parts[1]);
        left++;
        this.lblCount.text = left + ' / ' + right;
        if (left == right) {
            console.log("game win");
            this.timer.stop();
        }
    };
    GameScene.prototype.updateLabelState = function (text) {
        for (var i = 0; i < this.footBar.numChildren; i++) {
            var tx = this.footBar.getChildAt(i);
            if (tx.text == text) {
                tx.textColor = game.PaintColor.RED;
                break;
            }
        }
    };
    GameScene.prototype.onTouchBegin = function (e) {
        console.log('touch begin');
        this.panel = e.target;
        var curTx = this.getTouchText(e);
        // 移动到屏幕外处理
        if (this.line) {
            this.startPoint = this.cacheStartPoint;
            this.onTouchOut(e);
            return;
        }
        var colorName = ArrayUtil.getRandomValue(game.Color);
        this.line = game.Line.generate(colorName);
        this.line.StartPoint = new egret.Point(curTx.x + this.spanX / 2, curTx.y + this.spanY / 2);
        this.panel.addChild(this.line);
        this.startPoint = new egret.Point(curTx.x, curTx.y);
        this.wordStr = "";
        this.found = false;
        this.painted = false;
        this.cacheStartPoint = this.startPoint;
        console.log(this.startPoint);
    };
    GameScene.prototype.onTouchMove = function (e) {
        console.log('touch move');
        if (this.line) {
            this.panel = e.target;
            var curTx = this.getTouchText(e);
            if (this.lastObj) {
                var lastLine = game.Line.get(this.lastObj.color);
                if (lastLine) {
                    lastLine.remove(this.lastObj);
                }
            }
            // 计算角度
            var angle = MathUtil.getAngle(this.startPoint.x, this.startPoint.y, curTx.x, curTx.y);
            // 根据旋转角度获取point
            var nextPoint = this.getRotatePoint(angle, curTx);
            this.line.graphics.clear();
            this.line.EndPoint = new egret.Point(nextPoint.x + this.spanX / 2, nextPoint.y + this.spanY / 2);
            this.line.draw();
            this.endPoint = nextPoint;
            this.painted = true;
        }
    };
    GameScene.prototype.onTouchEnd = function (e) {
        console.log('touch end');
        console.log(this.line, this.painted, '====22==');
        if (this.line) {
            this.panel = e.target;
            var curTx = this.getTouchText(e);
            this.line.graphics.endFill();
            var distance = void 0;
            if (this.painted) {
                distance = MathUtil.getDistance(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
                if (distance != 0) {
                    this.wordStr = this.getLineText(this.startPoint, this.endPoint);
                }
                else {
                    this.wordStr = curTx.text;
                }
            }
            else {
                if (this.line.parent) {
                    this.line.parent.removeChild(this.line);
                }
                return;
            }
            console.log("select word:", this.wordStr);
            if (this.wordStr != "" &&
                !ArrayUtil.contains(this.foundList, this.wordStr) &&
                this.checkWord(this.wordStr)) {
                this.foundList.push(this.wordStr);
                this.found = true;
                this.updateCountText();
            }
            if (this.found) {
                this.updateLabelState(this.wordStr);
            }
            else {
                var obj = {
                    x: this.endPoint.x + this.spanX / 2,
                    y: this.endPoint.y + this.spanY / 2,
                    color: this.line.colorName,
                };
                var durCount = Math.ceil(distance / this.spanX);
                this.line.tween(obj, durCount, false, this.panel);
                this.lastObj = obj;
            }
            game.Line.reclaim(this.line);
            this.line = null;
        }
    };
    GameScene.prototype.onTouchOut = function (e) {
        if (this.line != null && this.line.parent != null && this.wordStr == "") {
            var obj = {
                x: this.endPoint.x + this.spanX / 2,
                y: this.endPoint.y + this.spanY / 2,
                color: this.line.colorName,
            };
            var distance = MathUtil.getDistance(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
            var durCount = Math.ceil(distance / this.spanX);
            this.line.tween(obj, durCount, false, this.panel);
            this.lastObj = obj;
            game.Line.reclaim(this.line);
            this.line = null;
        }
    };
    GameScene.prototype.getRotatePoint = function (angle, tx) {
        var span = 45 / 2;
        var x;
        var y;
        var disX = Math.round(Math.abs(tx.x - this.startPoint.x) / this.spanX);
        var disY = Math.round(Math.abs(tx.y - this.startPoint.y) / this.spanY);
        if (angle >= span && angle < 45 + span) {
            x = this.startPoint.x + disY * this.spanX;
            y = this.startPoint.y - disY * this.spanY;
            if (x >= (this.m - 1) * this.spanX) {
                x = (this.m - 1) * this.spanX;
                y = this.startPoint.y - (x - this.startPoint.x) / this.spanX * this.spanY;
            }
            if (y < 0) {
                y = 0;
            }
        }
        else if (angle >= 45 + span && angle < 90 + span) {
            x = this.startPoint.x;
            y = this.startPoint.y - disY * this.spanY;
            if (y < 0) {
                y = 0;
            }
        }
        else if (angle >= 90 + span && angle < 135 + span) {
            x = this.startPoint.x - disY * this.spanX;
            y = this.startPoint.y - disY * this.spanY;
            if (x < 0) {
                x = 0;
                y = this.startPoint.y - this.startPoint.x / this.spanX * this.spanY;
            }
            if (y < 0) {
                y = 0;
            }
        }
        else if (angle >= 135 + span && angle < 180 + span) {
            x = this.startPoint.x - disX * this.spanX;
            y = this.startPoint.y;
            if (x < 0) {
                x = 0;
            }
        }
        else if (angle >= 180 + span && angle < 225 + span) {
            x = this.startPoint.x - disY * this.spanX;
            y = this.startPoint.y + disY * this.spanY;
            if (x < 0) {
                x = 0;
                y = this.startPoint.y + this.startPoint.x / this.spanX * this.spanY;
            }
        }
        else if (angle >= 225 + span && angle < 270 + span) {
            x = this.startPoint.x;
            y = this.startPoint.y + disY * this.spanY;
        }
        else if (angle >= 270 + span && angle < 315 + span) {
            x = this.startPoint.x + disY * this.spanX;
            y = this.startPoint.y + disY * this.spanY;
            if (x >= (this.m - 1) * this.spanX) {
                x = (this.m - 1) * this.spanX;
                y = this.startPoint.y + (x - this.startPoint.x) / this.spanX * this.spanY;
            }
            if (y >= (this.n - 1) * this.spanY) {
                y = (this.n - 1) * this.spanY;
                x = this.startPoint.x + (y - this.startPoint.y) / this.spanY * this.spanX;
            }
        }
        else {
            x = this.startPoint.x + disX * this.spanX;
            y = this.startPoint.y;
        }
        return new egret.Point(x, y);
    };
    GameScene.prototype.checkWord = function (str) {
        var found = false;
        for (var i = 0; i < this.wordList.length; i++) {
            if (this.wordList[i].text.indexOf(str) == 0 &&
                this.wordList[i].text == str) {
                found = true;
                break;
            }
        }
        return found;
    };
    GameScene.prototype.getLineText = function (start, end) {
        var str = "";
        var xdis = end.x - start.x;
        var ydis = end.y - start.y;
        var x;
        var y;
        var count;
        var points = [];
        var direction = -1;
        // UP or DOWN
        if (xdis == 0) {
            count = Math.abs(ydis) / this.spanY;
            for (var i = 0; i <= count; i++) {
                // UP
                if (ydis < 0) {
                    x = start.x;
                    y = start.y - this.spanY * i;
                    direction = -1;
                }
                // DOWN
                if (ydis > 0) {
                    x = start.x;
                    y = start.y + this.spanY * i;
                    direction = 1;
                }
                var point = new egret.Point(x, y);
                points.push(point);
            }
        }
        else if (ydis == 0) {
            // LEFT or RIGHT
            count = Math.abs(xdis) / this.spanX;
            for (var i = 0; i <= count; i++) {
                // LEFT
                if (xdis < 0) {
                    x = start.x - this.spanX * i;
                    y = start.y;
                    direction = -1;
                }
                // RIGHT
                if (xdis > 0) {
                    x = start.x + this.spanX * i;
                    y = start.y;
                    direction = 1;
                }
                var point = new egret.Point(x, y);
                points.push(point);
            }
        }
        else if (xdis < 0 && ydis < 0) {
            // UPLEFT
            count = Math.abs(xdis) / this.spanX;
            for (var i = 0; i <= count; i++) {
                x = start.x - this.spanX * i;
                y = start.y - this.spanY * i;
                direction = -1;
                var point = new egret.Point(x, y);
                points.push(point);
            }
        }
        else if (xdis > 0 && ydis < 0) {
            // UPRIGHT
            count = Math.abs(xdis) / this.spanX;
            for (var i = 0; i <= count; i++) {
                x = start.x + this.spanX * i;
                y = start.y - this.spanY * i;
                direction = -1;
                var point = new egret.Point(x, y);
                points.push(point);
            }
        }
        else if (xdis < 0 && ydis > 0) {
            // DOWNLEFT
            count = Math.abs(xdis) / this.spanX;
            for (var i = 0; i <= count; i++) {
                x = start.x - this.spanX * i;
                y = start.y + this.spanY * i;
                direction = 1;
                var point = new egret.Point(x, y);
                points.push(point);
            }
        }
        else if (xdis > 0 && ydis > 0) {
            // DOWNRIGHT
            count = Math.abs(xdis) / this.spanX;
            for (var i = 0; i <= count; i++) {
                x = start.x + this.spanX * i;
                y = start.y + this.spanY * i;
                direction = 1;
                var point = new egret.Point(x, y);
                points.push(point);
            }
        }
        for (var i = 0; i < this.panel.numChildren; i++) {
            var tx = void 0;
            if (direction == -1) {
                tx = this.panel.getChildAt(this.panel.numChildren - i - 1);
            }
            else {
                tx = this.panel.getChildAt(i);
            }
            for (var j = 0; j < points.length; j++) {
                if (points[j].x == tx.x && points[j].y == tx.y) {
                    if (tx.text != null) {
                        str += tx.text;
                    }
                    break;
                }
            }
        }
        return str;
    };
    GameScene.prototype.getTouchText = function (e) {
        var curTx;
        for (var i = 0; i < this.panel.numChildren; i++) {
            var tx = this.panel.getChildAt(i);
            var startX = Math.floor(i % this.m);
            var startY = Math.floor(i / this.m);
            if (e.localX >= this.spanX * startX && e.localX < this.spanX * (startX + 1)
                && e.localY >= this.spanY * startY && e.localY < this.spanY * (startY + 1)) {
                curTx = tx;
                break;
            }
        }
        return curTx;
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map