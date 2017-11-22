module fighter {
	/**
	 * 可滚动背景图
	 */
	export class BgMap extends egret.DisplayObjectContainer {
		private stageW: number;
		private stageH: number;
		private textureHeight: number; // 纹理本身的高度
		private rowCount: number; // 图片数量
		private bmpArr: egret.Bitmap[]; // 图片集合
		private speed: number = 2; // 控制滚动速度

		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		/**
		 * 初始化
		 */
		private onAddToStage(event: egret.Event): void {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.initBgMap();
		}

		/**
		 * 初始化背景图
		 */
		private initBgMap(): void {
			this.stageW = this.stage.stageWidth;
			this.stageH = this.stage.stageHeight;

			let texture: egret.Texture = RES.getRes("bg_jpg");
			this.textureHeight = texture.textureHeight; // 保留原始纹理的高度，用于后续的计算
			this.rowCount = Math.ceil(this.stageH / this.textureHeight) + 1; // 计算在当前屏幕中，需要的图片数量
			this.bmpArr = [];
			//创建这些图片，并设置y坐标，让它们连接起来
			for(let i: number = 0; i < this.rowCount; i++) {
					let bgMap = fighter.createBitmapByName("bg_jpg");
					// 确定每张图片的起始位置
					bgMap.y =  - (this.textureHeight * this.rowCount - this. stageH) + this.textureHeight * i;					
					this.bmpArr.push(bgMap);
					this.addChild(bgMap);
			}
		}

		/**
		 * 开始滚动
		 */
		public start(): void {
			this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
		}

		/**
		 * 暂停滚动
		 */
		public pause(): void {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
		}

		/**
		 * 逐帧运动
		 */
		private enterFrameHandler(event: egret.Event): void {
			for (let i: number = 0; i < this.rowCount; i++) {
				let bgMap: egret.Bitmap = this.bmpArr[i];
				bgMap.y += this.speed;

				// 判断超出屏幕后，回到队首，这样来实现循环反复
				if (bgMap.y > this.stageH) {
					bgMap.y = this.bmpArr[0].y - this.textureHeight; // 设置在第一张图片之前
					this.bmpArr.pop();
					this.bmpArr.unshift(bgMap);
				}
			}
		}
	}
}