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
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            var _this = _super.call(this) || this;
            _this.angleList = [
                0, -90, 90, 180
            ];
            _this.wordStr = "";
            return _this;
        }
        GameScene.prototype.createView = function (m, n, words) {
            var margin = 100;
            var padding = 30;
            var panel = new egret.Sprite();
            var panelW = 1080 - margin * 2;
            var panelH = 1920 - 400;
            panel.x = margin;
            panel.y = margin;
            panel.graphics.beginFill(0xFFFFFF);
            panel.graphics.drawRect(0, 0, panelW, panelH);
            panel.graphics.endFill();
            this.addChild(panel);
            this.spanX = Math.ceil(panelW / n);
            this.spanY = Math.ceil(panelH / m);
            for (var i = 0; i < m; i++) {
                for (var j = 0; j < n; j++) {
                    var tx = new egret.TextField();
                    tx.x = this.spanX * j;
                    tx.y = this.spanY * i;
                    tx.width = this.spanX;
                    tx.height = this.spanY;
                    tx.border = true;
                    tx.borderColor = 0Xffff;
                    tx.size = 32;
                    tx.textColor = 0x0000;
                    tx.textAlign = egret.HorizontalAlign.CENTER;
                    tx.verticalAlign = egret.VerticalAlign.MIDDLE;
                    tx.text = this.board[i][j];
                    panel.addChild(tx);
                }
            }
            var point = panel.getChildAt(0);
            var angle1 = MathUtil.getAngle(0, point.height, point.width, 0);
            var angle2 = MathUtil.getAngle(point.width, point.height, 0, 0);
            var angle3 = MathUtil.getAngle(point.width, 0, 0, point.height);
            var angle4 = MathUtil.getAngle(0, 0, point.width, point.height);
            this.angleList.push(angle1);
            this.angleList.push(angle2);
            this.angleList.push(angle3);
            this.angleList.push(angle4);
            panel.touchEnabled = true;
            panel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            panel.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            panel.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            var spr2 = new egret.Sprite();
            spr2.x = margin;
            spr2.y = panelH + padding * 3;
            spr2.graphics.beginFill(0x6A5ACD);
            spr2.graphics.drawRect(0, 0, panelW, 200);
            spr2.graphics.endFill();
            this.addChild(spr2);
            var labelW = Math.ceil(spr2.width / 3);
            var labelH = 50;
            for (var i = 0; i < words.length; i++) {
                var label = new egret.TextField();
                label.size = 32;
                label.x = padding + labelW * Math.ceil(i % 3);
                label.y = padding + labelH * Math.floor(i / 3);
                label.width = labelW;
                label.height = labelH;
                label.text = words[i];
                spr2.addChild(label);
            }
        };
        GameScene.prototype.onTouchBegin = function (e) {
            var sprite = e.target;
            var curTx = this.getCurText(sprite, e);
            this.startPoint = new egret.Point(curTx.x, curTx.y);
            console.log("touch begin:", curTx.text);
            this.line = new egret.Shape();
            sprite.addChild(this.line);
            this.line.graphics.lineStyle(50, 0x1E90FF, 0.6);
            this.line.graphics.moveTo(curTx.x + this.spanX / 2, curTx.y + this.spanY / 2);
            this.nextPoint = this.startPoint;
        };
        GameScene.prototype.onTouchEnd = function (e) {
            var sprite = e.target;
            var curTx = this.getCurText(sprite, e);
            console.log("touch end:", curTx.text);
            this.line.graphics.endFill();
            this.angle = null;
            this.wordStr = "";
        };
        GameScene.prototype.onTouchMove = function (e) {
            var sprite = e.target;
            var curTx = this.getCurText(sprite, e);
            // 计算角度
            var angle = MathUtil.getAngle(this.startPoint.x, this.startPoint.y, curTx.x, curTx.y);
            var distance = MathUtil.getDistance(this.nextPoint.x, this.nextPoint.y, curTx.x, curTx.y);
            if (this.angle == null) {
                this.angle = angle;
            }
            if (distance != 0 && this.angle == angle && ArrayUtil.contains(this.angleList, angle)) {
                console.log("touch move:", curTx.text);
                this.line.graphics.lineTo(curTx.x + this.spanX / 2, curTx.y + this.spanY / 2);
                this.nextPoint = new egret.Point(curTx.x, curTx.y);
                this.wordStr = this.getLineText(this.startPoint, this.nextPoint, sprite);
            }
            console.log(this.wordStr);
            if (this.wordStr != null) {
                this.checkStr(this.wordStr);
            }
        };
        GameScene.prototype.getLineText = function (start, end, sprite) {
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
            for (var i = 0; i < sprite.numChildren; i++) {
                var tx = void 0;
                if (direction == -1) {
                    tx = sprite.getChildAt(sprite.numChildren - i - 1);
                }
                else {
                    tx = sprite.getChildAt(i);
                }
                for (var j = 0; j < points.length; j++) {
                    if (points[j].x == tx.x && points[j].y == tx.y) {
                        str += tx.text;
                        break;
                    }
                }
            }
            return str;
        };
        GameScene.prototype.checkStr = function (str) {
            if (ArrayUtil.startWith(this.words, str)) {
                return true;
            }
            return false;
        };
        GameScene.prototype.getCurText = function (sprite, e) {
            var curTx;
            for (var i = 0; i < sprite.numChildren; i++) {
                var tx = sprite.getChildAt(i);
                var startX = Math.floor(i % this.n);
                var startY = Math.floor(i / this.n);
                if (e.localX >= this.spanX * startX && e.localX < this.spanX * (startX + 1)
                    && e.localY >= this.spanY * startY && e.localY < this.spanY * (startY + 1)) {
                    curTx = tx;
                    break;
                }
            }
            return curTx;
        };
        GameScene.prototype.createBoard = function (m, n, words) {
            this.m = m;
            this.n = n;
            this.words = words;
            this.initBoard(m, n);
            var wordlist = [];
            for (var i = 0; i < words.length; i++) {
                wordlist[words[i]] = [];
            }
            this.wordList = wordlist;
            for (var i = 0; i < words.length; i++) {
                var ok = false;
                while (!ok) {
                    var word = this.shuffle(m, n, words[i]);
                    console.log(word);
                    ok = this.placeWord(m, n, word);
                    console.log(ok);
                    if (ok) {
                        break;
                    }
                }
            }
            this.fillInBoard(words, this.board);
            this.createView(m, n, words);
            console.log(this.wordList);
            console.log(this.board);
        };
        GameScene.prototype.initBoard = function (m, n) {
            var board = [];
            for (var i = 0; i < m; i++) {
                board[i] = [];
                for (var j = 0; j < n; j++) {
                    board[i][j] = "";
                }
            }
            this.board = board;
        };
        GameScene.prototype.shuffle = function (m, n, text) {
            var word = new game.Word();
            word.x = Math.floor(Math.random() * (m - 1));
            word.y = Math.floor(Math.random() * (n - 1));
            word.direction = Math.round(Math.random() * 7);
            word.text = text;
            return word;
        };
        GameScene.prototype.fillInBoard = function (words, board) {
            var list = [];
            for (var i = 0; i < words.length; i++) {
                for (var j = 0; j < words[i].length; j++) {
                    list.push(words[i][j]);
                }
            }
            for (var i = 0; i < board.length; i++) {
                for (var j = 0; j < board[i].length; j++) {
                    if (board[i][j] != "") {
                        continue;
                    }
                    board[i][j] = list[Math.floor(Math.random() * list.length)];
                }
            }
        };
        GameScene.prototype.placeWord = function (m, n, word) {
            var index;
            var xIndex;
            var yIndex;
            var isPlace = true;
            var x;
            var y;
            switch (word.direction) {
                case game.Direction.UP:
                    index = word.x - word.text.length;
                    if (index < 0) {
                        return false;
                    }
                    for (var i = 0; i < word.text.length; i++) {
                        x = word.x - i;
                        y = word.y;
                        if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.text[i]) {
                            isPlace = false;
                            return false;
                        }
                    }
                    if (isPlace) {
                        for (var i = 0; i < word.text.length; i++) {
                            this.board[word.x - i][word.y] = word.text[i];
                            var obj = { "text": word.text[i], "x": word.x - i, "y": word.y, "direction": game.Direction.UP };
                            this.wordList[word.text].push(obj);
                        }
                    }
                    break;
                case game.Direction.DOWN:
                    index = word.x + word.text.length;
                    if (index >= n) {
                        return false;
                    }
                    console.log('index:', index);
                    for (var i = 0; i < word.text.length; i++) {
                        x = word.x + i;
                        y = word.y;
                        if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.text[i]) {
                            isPlace = false;
                            return false;
                        }
                    }
                    if (isPlace) {
                        for (var i = 0; i < word.text.length; i++) {
                            this.board[word.x + i][word.y] = word.text[i];
                            var obj = { "text": word.text[i], "x": word.x + i, "y": word.y, "direction": game.Direction.DOWN };
                            this.wordList[word.text].push(obj);
                        }
                    }
                    break;
                case game.Direction.LEFT:
                    index = word.y - word.text.length;
                    if (index < 0) {
                        return false;
                    }
                    for (var i = 0; i < word.text.length; i++) {
                        x = word.x;
                        y = word.y - i;
                        if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.text[i]) {
                            isPlace = false;
                            return false;
                        }
                    }
                    if (isPlace) {
                        for (var i = 0; i < word.text.length; i++) {
                            this.board[word.x][word.y - i] = word.text[i];
                            var obj = { "text": word.text[i], "x": word.x, "y": word.y - i, "direction": game.Direction.LEFT };
                            this.wordList[word.text].push(obj);
                        }
                    }
                    break;
                case game.Direction.RIGHT:
                    index = word.y + word.text.length;
                    if (index >= m) {
                        return false;
                    }
                    for (var i = 0; i < word.text.length; i++) {
                        x = word.x;
                        y = word.y + i;
                        if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.text[i]) {
                            isPlace = false;
                            return false;
                        }
                    }
                    if (isPlace) {
                        for (var i = 0; i < word.text.length; i++) {
                            this.board[word.x][word.y + i] = word.text[i];
                            var obj = { "text": word.text[i], "x": word.x, "y": word.y + i, "direction": game.Direction.RIGHT };
                            this.wordList[word.text].push(obj);
                        }
                    }
                    break;
                case game.Direction.DOWNLEFT:
                    xIndex = word.x + word.text.length;
                    yIndex = word.y - word.text.length;
                    if (xIndex >= n || yIndex < 0) {
                        return false;
                    }
                    for (var i = 0; i < word.text.length; i++) {
                        x = word.x + i;
                        y = word.y - i;
                        if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.text[i]) {
                            isPlace = false;
                            return false;
                        }
                    }
                    if (isPlace) {
                        for (var i = 0; i < word.text.length; i++) {
                            this.board[word.x + i][word.y - i] = word.text[i];
                            var obj = { "text": word.text[i], "x": word.x + i, "y": word.y - i, "direction": game.Direction.DOWNLEFT };
                            this.wordList[word.text].push(obj);
                        }
                    }
                    break;
                case game.Direction.DOWNRIGHT:
                    xIndex = word.x + word.text.length;
                    yIndex = word.y + word.text.length;
                    if (xIndex >= n || yIndex >= m) {
                        return false;
                    }
                    for (var i = 0; i < word.text.length; i++) {
                        x = word.x + i;
                        y = word.y + i;
                        if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.text[i]) {
                            isPlace = false;
                            return false;
                        }
                    }
                    if (isPlace) {
                        for (var i = 0; i < word.text.length; i++) {
                            this.board[word.x + i][word.y + i] = word.text[i];
                            var obj = { "text": word.text[i], "x": word.x + i, "y": word.y + i, "direction": game.Direction.DOWNRIGHT };
                            this.wordList[word.text].push(obj);
                        }
                    }
                    break;
                case game.Direction.UPLEFT:
                    xIndex = word.x - word.text.length;
                    yIndex = word.y - word.text.length;
                    if (xIndex < 0 || yIndex < 0) {
                        return false;
                    }
                    for (var i = 0; i < word.text.length; i++) {
                        x = word.x - i;
                        y = word.y - i;
                        if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.text[i]) {
                            isPlace = false;
                            return false;
                        }
                    }
                    if (isPlace) {
                        for (var i = 0; i < word.text.length; i++) {
                            this.board[word.x - i][word.y - i] = word.text[i];
                            var obj = { "text": word.text[i], "x": word.x - i, "y": word.y - i, "direction": game.Direction.UPLEFT };
                            this.wordList[word.text].push(obj);
                        }
                    }
                    break;
                case game.Direction.UPRIGHT:
                    xIndex = word.x - word.text.length;
                    yIndex = word.y + word.text.length;
                    if (xIndex < 0 || yIndex >= m) {
                        return false;
                    }
                    for (var i = 0; i < word.text.length; i++) {
                        x = word.x - i;
                        y = word.y + i;
                        if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.text[i]) {
                            isPlace = false;
                            return false;
                        }
                    }
                    if (isPlace) {
                        for (var i = 0; i < word.text.length; i++) {
                            this.board[word.x - i][word.y + i] = word.text[i];
                            var obj = { "text": word.text[i], "x": word.x - i, "y": word.y + i, "direction": game.Direction.UPRIGHT };
                            this.wordList[word.text].push(obj);
                        }
                    }
                    break;
            }
            return true;
        };
        return GameScene;
    }(egret.DisplayObjectContainer));
    game.GameScene = GameScene;
    __reflect(GameScene.prototype, "game.GameScene");
})(game || (game = {}));
//# sourceMappingURL=GameScene.js.map