class GameScene extends egret.DisplayObjectContainer {
	private board: any;
	private m: number;
	private n: number;
	private mode: number;
	private words: string[];
	private wordList: game.Word[] = [];

	public constructor(m: number, n: number, mode: number, words: string[]) {
		super();
		this.init(m, n, mode, words);
	}

	public init(m: number, n: number, mode: number, words: string[]) {
		let gameBoard = new game.Board(m, n);
		let board: string[][] = gameBoard.create(words);
		this.board = board;
		this.m = m;
		this.n = n;
		this.mode = mode;
		this.words = gameBoard.getFillWords();
		this.wordList = gameBoard.getWordList();

		console.log('baord:', this.board);
		console.log("words:", this.wordList);
	}

	private stageW: number;
	private stageH: number;
	private panel: egret.Sprite;
	private spanX: number;
	private spanY: number;

	

	private wordStr: string;
	private painted: boolean;
	private found: boolean;
	private foundList: string[] = [];
	private paintColor: number;

	private lastObj: game.LineObject;

	public createView() {
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

		for (let i: number = 0; i < this.n; i++) {
			for (let j: number = 0; j < this.m; j++) {
				let tx = new egret.TextField();
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
	}

	private headBar: egret.Sprite;
	private lblTime: eui.Label;
	private timer: egret.Timer;
	private lblCount: eui.Label;
	private lblTip: eui.Label;
	private btnStop: eui.Button;
	private isTouch: boolean = false;

	private createHeadBar() {
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

		let stopBtn = new egret.TextField();
		stopBtn.text = "||";
		stopBtn.size = 36;
		stopBtn.x = this.stageW - stopBtn.width - 50;
		stopBtn.y = 50;
		this.addChild(stopBtn);

		stopBtn.touchEnabled = true;
		stopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchStop, this);
	}

	private footBar: egret.Sprite;

	private createFootBar() {
		this.footBar = new egret.Sprite();
		this.footBar.x = 0;
		this.footBar.y = this.headBar.height + this.panel.height;
		this.footBar.graphics.beginFill(0x6A5ACD);
		this.footBar.graphics.drawRect(0, 0, this.stageW, 220);
		this.footBar.graphics.endFill();
		this.addChild(this.footBar);

		this.footBar.touchEnabled = true;
		this.footBar.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchOut, this);

		let padding: number = 50;
		let labelTW: number = 0;
		let labelBW: number = 0;
		let labelH: number = 0;
		for (let i: number = 0; i < this.words.length; i++) {
			let label = new egret.TextField();
			let offsetX: number = (Math.floor(i / 2) + 1) * padding;
			label.x = i < 2 ? padding : (i % 2 == 0 ? offsetX + labelTW : offsetX + labelBW);
			label.y = i % 2 == 0 ? padding : padding * 2 + labelH;
			label.size = 32;
			label.text = this.words[i];
			this.footBar.addChild(label);
			if (i % 2 == 0) {
				labelTW += label.width;
			} else {
				labelBW += label.width;
			}
			labelH = label.height;
		}
		this.footBar.cacheAsBitmap = true;
	}

	private onTimer() {
		let parts: string[] = this.lblTime.text.split(":");
		let minute: number = parseInt(parts[0]);
		let second: number = parseInt(parts[1]);
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
	}

	private onTouchTip() {
		let word: game.Word;
		let count = parseInt(this.lblTip.text);
		if (count == 0) {
			this.touchEnabled = false;
			return;
		}

		let tip: boolean = false;
		for (let i: number = 0; i < this.wordList.length; i++) {
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
			let cFirst = word.chars[0];
			let cLast = word.chars[word.text.length - 1];
			let startX = cFirst.y * this.spanX + this.spanX / 2;
			let startY = cFirst.x * this.spanY + this.spanY / 2;
			let endX = cLast.y * this.spanX + this.spanX / 2;
			let endY = cLast.x * this.spanY + this.spanY / 2;

			let colorName = ArrayUtil.getRandomValue(game.Color);
			let line = game.Line.generate(colorName);
			this.panel.addChild(line);
			line.StartPoint = new egret.Point(startX, startY);
			line.EndPoint = new egret.Point(endX, endY);

			let distance = MathUtil.getDistance(startX, startY, endX, endY);
			let obj: game.LineObject = {
				x: startX,
				y: startY,
				color: line.colorName,
			};
			let durCount = Math.ceil(distance / this.spanX);
			line.tween(obj, durCount, true);

			this.foundList.push(word.text);
			this.updateCountText();
			this.updateLabelState(word.text);
		}
	}

	private onTouchStop() {
		this.isTouch = !this.isTouch;
		if (this.isTouch) {
			this.timer.stop();
			this.panel.touchEnabled = false;
		} else {
			this.timer.start();
			this.panel.touchEnabled = true;
		}
	}

	private updateCountText() {
		let parts: string[] = this.lblCount.text.split("/");
		let left: number = parseInt(parts[0]);
		let right: number = parseInt(parts[1]);
		left++;
		this.lblCount.text = left + ' / ' + right;
		if (left == right) {
			console.log("game win");
			this.timer.stop();
		}
	}

	private updateLabelState(text: string) {
		for (let i: number = 0; i < this.footBar.numChildren; i++) {
			let tx = <egret.TextField>this.footBar.getChildAt(i);
			if (tx.text == text) {
				tx.textColor = game.PaintColor.RED;
				break;
			}
		}
	}

	private line: game.Line;
	private startPoint: egret.Point;
	private endPoint: egret.Point;
	private cacheStartPoint: egret.Point;

	private onTouchBegin(e: egret.TouchEvent) {
		console.log('touch begin');
		this.panel = <egret.Sprite>e.target;
		let curTx = this.getTouchText(e);

		// 移动到屏幕外处理
		if (this.line) {
			this.startPoint = this.cacheStartPoint;
			this.onTouchOut(e);
			return;
		}

		let colorName = ArrayUtil.getRandomValue(game.Color);
		this.line = game.Line.generate(colorName);
		this.line.StartPoint = new egret.Point(curTx.x + this.spanX / 2, curTx.y + this.spanY / 2);
		this.panel.addChild(this.line);

		this.startPoint = new egret.Point(curTx.x, curTx.y);
		this.wordStr = "";
		this.found = false;
		this.painted = false;
		this.cacheStartPoint = this.startPoint;
		console.log(this.startPoint);
	}

	private onTouchMove(e: egret.TouchEvent) {
		console.log('touch move');
		if (this.line) {
			this.panel = <egret.Sprite>e.target;
			let curTx = this.getTouchText(e);
			if (this.lastObj) {
				let lastLine = game.Line.get(this.lastObj.color);
				if (lastLine) {
					lastLine.remove(this.lastObj);
				}
			}

			// 计算角度
			let angle: number = MathUtil.getAngle(this.startPoint.x, this.startPoint.y, curTx.x, curTx.y);
			// 根据旋转角度获取point
			let nextPoint: egret.Point = this.getRotatePoint(angle, curTx);
			this.line.graphics.clear();
			this.line.EndPoint = new egret.Point(nextPoint.x + this.spanX / 2, nextPoint.y + this.spanY / 2);
			this.line.draw();
			this.endPoint = nextPoint;
			this.painted = true;
		}
	}

	private onTouchEnd(e: egret.TouchEvent) {
		console.log('touch end');
		console.log(this.line, this.painted, '====22==');
		if (this.line) {
			this.panel = <egret.Sprite>e.target;
			let curTx = this.getTouchText(e);
			this.line.graphics.endFill();
			let distance: number;
			if (this.painted) {
				distance = MathUtil.getDistance(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
				if (distance != 0) {
					this.wordStr = this.getLineText(this.startPoint, this.endPoint);
				} else {
					this.wordStr = curTx.text;
				}
			} else {
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
			} else {
				let obj: game.LineObject = {
					x: this.endPoint.x + this.spanX / 2,
					y: this.endPoint.y + this.spanY / 2,
					color: this.line.colorName,
				};
				let durCount = Math.ceil(distance / this.spanX);
				this.line.tween(obj, durCount, false, this.panel);
				this.lastObj = obj;
			}
			game.Line.reclaim(this.line);
			this.line = null;
		}
	}

	private onTouchOut(e: egret.TouchEvent) {
		if (this.line != null && this.line.parent != null && this.wordStr == "") {
			let obj: game.LineObject = {
				x: this.endPoint.x + this.spanX / 2,
				y: this.endPoint.y + this.spanY / 2,
				color: this.line.colorName,
			};
			let distance: number = MathUtil.getDistance(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
			let durCount = Math.ceil(distance / this.spanX);
			this.line.tween(obj, durCount, false, this.panel);
			this.lastObj = obj;
			game.Line.reclaim(this.line);
			this.line = null;
		}
	}

	private getRotatePoint(angle: number, tx: egret.TextField): egret.Point {
		let span: number = 45 / 2;
		let x: number;
		let y: number;
		let disX = Math.round(Math.abs(tx.x - this.startPoint.x) / this.spanX);
		let disY = Math.round(Math.abs(tx.y - this.startPoint.y) / this.spanY);
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
		} else if (angle >= 45 + span && angle < 90 + span) {
			x = this.startPoint.x;
			y = this.startPoint.y - disY * this.spanY;
			if (y < 0) {
				y = 0;
			}
		} else if (angle >= 90 + span && angle < 135 + span) {
			x = this.startPoint.x - disY * this.spanX;
			y = this.startPoint.y - disY * this.spanY;
			if (x < 0) {
				x = 0;
				y = this.startPoint.y - this.startPoint.x / this.spanX * this.spanY;
			}
			if (y < 0) {
				y = 0;
			}
		} else if (angle >= 135 + span && angle < 180 + span) {
			x = this.startPoint.x - disX * this.spanX;
			y = this.startPoint.y;
			if (x < 0) {
				x = 0;
			}
		} else if (angle >= 180 + span && angle < 225 + span) {
			x = this.startPoint.x - disY * this.spanX;
			y = this.startPoint.y + disY * this.spanY;
			if (x < 0) {
				x = 0;
				y = this.startPoint.y + this.startPoint.x / this.spanX * this.spanY;
			}
		} else if (angle >= 225 + span && angle < 270 + span) {
			x = this.startPoint.x;
			y = this.startPoint.y + disY * this.spanY;
		} else if (angle >= 270 + span && angle < 315 + span) {
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
		} else {
			x = this.startPoint.x + disX * this.spanX;
			y = this.startPoint.y;
		}

		return new egret.Point(x, y);
	}

	private checkWord(str: string): boolean {
		let found = false;

		for (let i: number = 0; i < this.wordList.length; i++) {
			if (this.wordList[i].text.indexOf(str) == 0 &&
				this.wordList[i].text == str) {
				found = true;
				break;
			}
		}

		return found;
	}

	private getLineText(start: egret.Point, end: egret.Point): string {
		let str: string = "";
		let xdis = end.x - start.x;
		let ydis = end.y - start.y;
		let x: number;
		let y: number;
		let count: number;
		let points: egret.Point[] = [];
		let direction: number = -1;

		// UP or DOWN
		if (xdis == 0) {
			count = Math.abs(ydis) / this.spanY;
			for (let i: number = 0; i <= count; i++) {
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

				let point = new egret.Point(x, y);
				points.push(point);
			}
		} else if (ydis == 0) {
			// LEFT or RIGHT
			count = Math.abs(xdis) / this.spanX;
			for (let i: number = 0; i <= count; i++) {
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

				let point = new egret.Point(x, y);
				points.push(point);
			}
		} else if (xdis < 0 && ydis < 0) {
			// UPLEFT
			count = Math.abs(xdis) / this.spanX;
			for (let i: number = 0; i <= count; i++) {
				x = start.x - this.spanX * i;
				y = start.y - this.spanY * i;
				direction = -1;

				let point = new egret.Point(x, y);
				points.push(point);
			}
		} else if (xdis > 0 && ydis < 0) {
			// UPRIGHT
			count = Math.abs(xdis) / this.spanX;
			for (let i: number = 0; i <= count; i++) {
				x = start.x + this.spanX * i;
				y = start.y - this.spanY * i;
				direction = -1;

				let point = new egret.Point(x, y);
				points.push(point);
			}
		} else if (xdis < 0 && ydis > 0) {
			// DOWNLEFT
			count = Math.abs(xdis) / this.spanX;
			for (let i: number = 0; i <= count; i++) {
				x = start.x - this.spanX * i;
				y = start.y + this.spanY * i;
				direction = 1;

				let point = new egret.Point(x, y);
				points.push(point);
			}
		} else if (xdis > 0 && ydis > 0) {
			// DOWNRIGHT
			count = Math.abs(xdis) / this.spanX;
			for (let i: number = 0; i <= count; i++) {
				x = start.x + this.spanX * i;
				y = start.y + this.spanY * i;
				direction = 1;

				let point = new egret.Point(x, y);
				points.push(point);
			}
		}

		for (let i: number = 0; i < this.panel.numChildren; i++) {
			let tx: egret.TextField;
			if (direction == -1) {
				tx = <egret.TextField>this.panel.getChildAt(this.panel.numChildren - i - 1);
			} else {
				tx = <egret.TextField>this.panel.getChildAt(i);
			}

			for (let j: number = 0; j < points.length; j++) {
				if (points[j].x == tx.x && points[j].y == tx.y) {
					if (tx.text != null) {
						str += tx.text;
					}
					break;
				}
			}
		}

		return str;
	}

	private getTouchText(e: egret.TouchEvent): egret.TextField {
		let curTx: egret.TextField;
		for (let i: number = 0; i < this.panel.numChildren; i++) {
			let tx = <egret.TextField>this.panel.getChildAt(i);
			let startX: number = Math.floor(i % this.m);
			let startY: number = Math.floor(i / this.m);
			if (e.localX >= this.spanX * startX && e.localX < this.spanX * (startX + 1)
				&& e.localY >= this.spanY * startY && e.localY < this.spanY * (startY + 1)) {
				curTx = tx;
				break;
			}
		}
		return curTx;
	}
}
