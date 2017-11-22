module fighter {
	/**
	 * 主游戏容器
	 */
	export class GameContainer extends egret.DisplayObjectContainer  {
		private stageW: number; // 舞台宽度
		private stageH: number; // 舞台高度
		private bg: fighter.BgMap; // 可滚动背景
		private btnStart: egret.Bitmap; // 开始按钮
		private myFighter: fighter.Airplane; // 我的飞机
		private enemyFighters: fighter.Airplane[] = []; // 敌方飞机
		private enemyFightersTimer: egret.Timer = new egret.Timer(1000); // 创建敌机的定时器
		private myBullets: fighter.Bullet[] = []; // 我的子弹
		private enemyBullets: fighter.Bullet[] = []; // 敌方子弹
		private scorePanel: fighter.ScorePanel; // 成绩显示
		private myScore: number = 0; // 我的成绩
		private _lastTime: number;

		public constructor() {
			super();
			this._lastTime = egret.getTimer();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		/**
		 * 初始化
		 */
		private onAddToStage(event: egret.Event): void {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.createGameScene();
		}

		/**
		 * 创建游戏场景
		 */
		private createGameScene(): void {
			this.stageW = this.stage.stageWidth;
			this.stageH = this.stage.stageHeight;

			// 可滚动背景
			this.bg = new fighter.BgMap();
			this.addChild(this.bg);

			// 开始按钮
			this.btnStart = fighter.createBitmapByName("btn_start_png");
			// 按钮居中定位
			this.btnStart.x = (this.stageW - this.btnStart.width) /2;
			this.btnStart.y = (this.stageH - this.btnStart.height) / 2;
			// 点击按钮开始游戏
			this.btnStart.touchEnabled = true;
			this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
			this.addChild(this.btnStart);

			// 我的飞机
			this.myFighter = new fighter.Airplane("f1_png", 100);			
			this.myFighter.y = this.stageH - this.myFighter.height - 50;
			this.addChild(this.myFighter);

			// 成绩显示
			this.scorePanel = new fighter.ScorePanel();

			// 预创建
			this.preCreatedInstance();
		}

		/**
		 * 预创建一些对象，减少游戏时的创建消耗
		 */
		private preCreatedInstance(): void {
			let i: number = 0;
			let objArr: any[] = [];
			// 我的子弹
			for (i = 0; i < 20; i++) {
				let bullet = fighter.Bullet.produce("b1_png");
				objArr.push(bullet);
			}
			for (i = 0; i < 20; i++) {
				let bullet = objArr.pop();
				fighter.Bullet.reclaim(bullet);
			}
			// 敌方子弹
			for (i = 0; i < 20; i++) {
				let bullet = fighter.Bullet.produce("b2_png");
				objArr.push(bullet);
			}
			for (i = 0; i < 20; i++) {
				let bullet = objArr.pop();
				fighter.Bullet.reclaim(bullet);
			}
			// 敌方飞机
			for (i = 0; i < 20; i++) {
				let enemyFighter: fighter.Airplane = fighter.Airplane.produce("f2_png", 1000);
				objArr.push(enemyFighter);
			}
			for (i = 0; i < 20; i++) {
				let enemyFighter = objArr.pop();
				fighter.Airplane.reclaim(enemyFighter);
			}
		}

		/**
		 * 游戏开始
		 */
		private gameStart(): void {
			this.myScore = 0;
			this.removeChild(this.btnStart);
			this.bg.start();		
			this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this); // 侦听游戏画面更新事件
			this.touchEnabled = true;
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this); // 侦听飞机移动事件

			// 我的飞机开火
			this.myFighter.x = (this.stageW - this.myFighter.width) / 2;
			this.myFighter.fire();
			this.myFighter.blood = 10;
			this.myFighter.addEventListener("createBullet", this.createBulletHandler, this); // 侦听创建子弹事件

			// 注册创建敌机监听器 
			this.enemyFightersTimer.addEventListener(egret.TimerEvent.TIMER, this.createEnemyFighter, this);
			this.enemyFightersTimer.start();

			if (this.scorePanel.parent == this) {
				this.removeChild(this.scorePanel);
			}
		}

		/**
		 * 响应Touch
		 */
		private touchHandler(event: egret.TouchEvent): void {
			if (event.type == egret.TouchEvent.TOUCH_MOVE) {
				let tx: number = event.localX;
				tx = Math.max(0, tx);
				tx = Math.min(this.stageW - this.myFighter.width, tx);
				this.myFighter.x = tx;
			}
		}

		/**
		 * 创建敌机
		 */
		private createEnemyFighter(event: egret.TimerEvent): void {
			let enemyFighter: fighter.Airplane = fighter.Airplane.produce("f2_png", 1000);
			enemyFighter.x = Math.random() * (this.stageW - enemyFighter.width);
			enemyFighter.y = -enemyFighter.height - Math.random() * 300;
			enemyFighter.addEventListener("createBullet", this.createBulletHandler, this); // 侦听创建子弹事件
			enemyFighter.fire();
			this.addChildAt(enemyFighter, this.numChildren - 1);			
			this.enemyFighters.push(enemyFighter);
		}

		/**
		 * 创建子弹(包括我的子弹和敌机的子弹)
		 */
		private createBulletHandler(event: egret.Event): void {
			let bullet: fighter.Bullet;
			if (event.target == this.myFighter) {
				for (let i: number = 0; i < 2; i++) {
					bullet = fighter.Bullet.produce("b1_png");
					bullet.x = i == 0 ? this.myFighter.x + 10 : this.myFighter.x + this.myFighter.width - 22;
					bullet.y = this.myFighter.y + 30;
					this.addChildAt(bullet, this.numChildren - 1 - this.enemyFighters.length);  
					this.myBullets.push(bullet);
				}
			} else {
				let theFighter: fighter.Airplane = event.target;
				bullet = fighter.Bullet.produce("b2_png");
				bullet.x = theFighter.x + 28;
				bullet.y = theFighter.y + 10;
				this.addChildAt(bullet, this.numChildren - 1 - this.enemyFighters.length);
				this.enemyBullets.push(bullet);
			}
		}

		/**
		 * 游戏画面更新
		 */
		private gameViewUpdate(event: egret.Event): void {
			// 为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
			let nowTime: number = egret.getTimer();
			let fps: number = 1000 / (nowTime - this._lastTime);
			this._lastTime = nowTime;
			let speedOffset: number = 60 / fps; // FPS下降的时候，运动速度加快

			// 我的子弹运动
			let i: number = 0;
			let bullet: fighter.Bullet;
			let myBulletsCount: number = this.myBullets.length;
			for (; i < myBulletsCount; i++) {
				bullet = this.myBullets[i];
				// 子弹飞出屏幕
				if (bullet.y < -bullet.height) {
					this.removeChild(bullet);
					fighter.Bullet.reclaim(bullet);
					this.myBullets.splice(i, 1);
					i--;
					myBulletsCount--;
				}

				bullet.y -= 12 * speedOffset;
			}

			// 敌方飞机运动
			let theFighter: fighter.Airplane;
			let enemyFighterCount: number = this.enemyFighters.length;
			for (i = 0; i < enemyFighterCount; i++) {
				theFighter = this.enemyFighters[i];
				// 飞机飞出屏幕
				if (theFighter.y > this.stageH) {
					this.removeChild(theFighter);
					fighter.Airplane.reclaim(theFighter);
					theFighter.removeEventListener("createBullet",this.createBulletHandler,this);
					theFighter.stopFire();
					this.enemyFighters.splice(i, 1);
					i--;
					enemyFighterCount--;
				}

				theFighter.y += 4 * speedOffset;
			}

			// 敌方子弹运动
			let enemyBulletsCount: number = this.enemyBullets.length;
			for (i = 0; i < enemyBulletsCount; i++) {
				bullet = this.enemyBullets[i];
				// 子弹飞出屏幕
				if (bullet.y > this.stageH) {
					this.removeChild(bullet);
					fighter.Bullet.reclaim(bullet);
					this.enemyBullets.splice(i, 1);
					i--;
					enemyBulletsCount--;
				}

				bullet.y += 8 * speedOffset;				
			}

			this.gameHitTest();
		}

		/**
		 * 游戏碰撞检测
		 */
		private gameHitTest(): void {
			let i:number, j: number;
			let bullet: fighter.Bullet;
			let theFighter: fighter.Airplane;
			let myBulletsCount: number = this.myBullets.length;
			let enemyFighterCount: number = this.enemyFighters.length;
			let enemyBulletsCount: number = this.enemyBullets.length;

			// 将需消失的子弹和飞机记录
			let delBullets: fighter.Bullet[] = [];
			let delFighters: fighter.Airplane[] = [];

			// 我的子弹可以消灭敌机
			for (i = 0; i < myBulletsCount; i++) {
				bullet = this.myBullets[i];
				for (j = 0; j < enemyFighterCount; j++) {
					theFighter = this.enemyFighters[j];
					if (fighter.GameUtil.hitTest(theFighter, bullet)) {						
						theFighter.blood -= 2;
						if (delBullets.indexOf(bullet) == -1) {
							delBullets.push(bullet);
						}
						if (theFighter.blood <= 0 && delFighters.indexOf(theFighter) == -1) {
							delFighters.push(theFighter);
						}
					}
				}
			}			

			// 敌人的子弹可以减我血
			for (i = 0; i < enemyBulletsCount; i++) {
				bullet = this.enemyBullets[i];
				if (fighter.GameUtil.hitTest(this.myFighter, bullet)) {
					this.myFighter.blood -= 1;
					if (delBullets.indexOf(bullet) == -1) {
						delBullets.push(bullet);
					}
				}
			}

			// 敌机的撞击可以消灭我
			for (i = 0; i < enemyFighterCount; i++) {
				theFighter = this.enemyFighters[i];
				if (fighter.GameUtil.hitTest(this.myFighter, theFighter)) {
					this.myFighter.blood -= 10;
				}
			}

			if (this.myFighter.blood <= 0) {				
				this.gameStop();
			} else {				
				while (delBullets.length > 0) {
					bullet = delBullets.pop();
					this.removeChild(bullet);
					if (bullet.textureName == "b1_png") {
						this.myBullets.splice(this.myBullets.indexOf(bullet), 1);
					} else {
						this.enemyBullets.splice(this.enemyBullets.indexOf(bullet), 1);
					}

					fighter.Bullet.reclaim(bullet);
				}

				this.myScore += delFighters.length;
				while(delFighters.length > 0) {
					theFighter = delFighters.pop();
					theFighter.stopFire();
					theFighter.removeEventListener("createBullet",this.createBulletHandler,this);
					this.removeChild(theFighter);
					this.enemyFighters.splice(this.enemyFighters.indexOf(theFighter), 1);
					fighter.Airplane.reclaim(theFighter);
				}
			}
		}

		/**
		 * 游戏结束
		 */
		private gameStop(): void {
			this.addChild(this.btnStart);
			this.bg.pause();
			this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
			this.myFighter.stopFire();
			this.myFighter.removeEventListener("createBullet", this.createBulletHandler, this);
			this.enemyFightersTimer.removeEventListener(egret.Event.ENTER_FRAME, this.createEnemyFighter, this);
			this.enemyFightersTimer.stop();

			// 清理子弹
			let i: number = 0;
			let bullet: fighter.Bullet;
			while (this.myBullets.length > 0) {
				bullet = this.myBullets.pop();
				this.removeChild(bullet);
				fighter.Bullet.reclaim(bullet);
			}
			while (this.enemyBullets.length > 0) {
				bullet = this.enemyBullets.pop();
				this.removeChild(bullet);
				fighter.Bullet.reclaim(bullet);
			}

			// 清理飞机
			let theFighter: fighter.Airplane;
			while (this.enemyFighters.length > 0) {
				theFighter = this.enemyFighters.pop();
				theFighter.stopFire();
				theFighter.removeEventListener("createBullet", this.createBulletHandler, this);
				this.removeChild(theFighter);
				fighter.Airplane.reclaim(theFighter);
			}

			// 显示成绩
			this.scorePanel.showScore(this.myScore);
			this.scorePanel.x = (this.stageW - this.scorePanel.width) / 2;
			this.scorePanel.y = 100;
			this.addChild(this.scorePanel);
		}
	}
}