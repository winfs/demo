module fighter {
	/**
	 * 飞机，利用对象池
	 */
	export class Airplane extends egret.DisplayObjectContainer {
		private bmp: egret.Bitmap; // 飞机位图
		private fireDelay: number; // f发射子弹的时间间隔		
		private fireTimer: egret.Timer; // 发射子弹定时器
		public blood: number = 10; // 飞机生命值
		public textureName:string; // 可视飞机类型名

		private static cacheDict: Object = {}; // 敌机对象池
		
		public constructor(textureName: string, fireDelay: number) {
			super();

			// 创建飞机
			this.bmp = fighter.createBitmapByName(textureName);
			this.textureName = textureName;
			this.fireDelay = fireDelay;
			this.addChild(this.bmp);

			// 创建一个发射子弹定时器
			this.fireTimer = new egret.Timer(fireDelay); 
			this.fireTimer.addEventListener(egret.TimerEvent.TIMER, this.createBullet, this);
		}

		/**
		 * 生产敌机
		 */
		public static produce(textureName: string, fireDelay: number): fighter.Airplane {
			if (fighter.Airplane.cacheDict[textureName] == null) {
				fighter.Airplane.cacheDict[textureName] = [];
			}

			let dict: fighter.Airplane[] = fighter.Airplane.cacheDict[textureName]; // 敌机组
			let theFighter: fighter.Airplane;
			if (dict.length > 0) {
				theFighter = dict.pop();
			} else {
				theFighter = new fighter.Airplane(textureName, fireDelay);
			}

			theFighter.blood = 10;
			return theFighter;
		}

		/**
		 * 回收
		 */
		public static reclaim(theFighter: fighter.Airplane): void {
			let textureName: string = theFighter.textureName;
			if (fighter.Airplane.cacheDict[textureName] == null) {
				fighter.Airplane.cacheDict[textureName] = [];
			}

			let dict: fighter.Airplane[] = fighter.Airplane.cacheDict[textureName];
			if (dict.indexOf(theFighter) == -1) {
				dict.push(theFighter);
			}
		}

		/**
		 * 开火
		 */
		public fire(): void {
			this.fireTimer.start();
		}

		/**
		 * 停火
		 */
		public stopFire(): void {
			this.fireTimer.stop();
		}

		// 创建子弹
		private createBullet(event: egret.TimerEvent): void {
			this.dispatchEventWith("createBullet");
		}
	}
}