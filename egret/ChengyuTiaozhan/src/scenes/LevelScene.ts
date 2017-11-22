module game {
	/**
	 * 关卡界面
	 */
	export class LevelScene extends game.BaseScene {
		private btn_back: eui.Button;
		private group_levels: eui.Group;
		
		private levelIcons: game.LevelIcon[] = [];	
		private img_arrow: eui.Image;
		private sel_level: number = 0;  // 记录选择的关卡

		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
			this.skinName = "skins.LevelSceneSkin";			
		}

		private onComplete(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);		
			this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_back, this);			
			this.init();
		}

		/**
		 * 初始化关卡界面
		 */
		private init() {
			let stageW = 720;
			let stageH = 1136;

			// 创建地图选项，20行 * 10列
			let row = 20;
			let col = 10;
			let spanX = stageW / col; // 计算x间隔
			let spanY = stageH / row; // 计算y间隔
			// 地图背景
			let group = new eui.Group(); 
			group.width = stageW;
			group.height = (spanY * 20); // 400个关卡所需要的地图高度
			// 背景个数
			let groupCount = Math.ceil(group.height / stageH); // group.height / 1138
			
			// 填充背景
			for (let i = 0; i < groupCount; i++) {
				let img = new eui.Image();
				img.source = RES.getRes("GameBG2_jpg");
				img.y = i * stageH;
				this.group_levels.addChildAt(img, 0);
			}

			// 以正弦曲线绘制关卡图标的路径
			let milestone: number = game.LevelDataManager.getInstance().Milestone; // 获取当前关卡进度
			for (let i = 0; i < row; i++) {
				let icon = new game.LevelIcon();
				icon.Level = i + 1;			
				icon.y = spanY * i / 2;
				icon.x = Math.sin(icon.y / 180 * Math.PI) * 200 + group.width / 2;
				icon.y += spanY * i /2;
				icon.y = group.height - icon.y - spanY;
				group.addChild(icon);
				icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_level,this);

				// 依据进度设置关卡显示
				icon.enabled = i < milestone;
				//保存到一个列表中
				this.levelIcons.push(icon);
			}

			//开启位图缓存模式
			group.cacheAsBitmap = true;
			this.group_levels.addChild(group);

			//卷动到最底层
			this.group_levels.scrollV = group.height - 1100;	

			// 跟踪箭头
			this.img_arrow = new eui.Image();
			this.img_arrow.source = RES.getRes("PageDownBtn_png");
			this.img_arrow.anchorOffsetX = 124 / 2 - group.getChildAt(0).width / 2;
			this.img_arrow.anchorOffsetY = 76;
			this.img_arrow.touchEnabled = false;
			this.img_arrow.x = group.getChildAt(0).x;
			this.img_arrow.y = group.getChildAt(0).y;	
			group.addChild(this.img_arrow);
		}

		private onclick_back() {
			console.log("返回开始游戏界面");
			game.SceneManager.getInstance().dispath(game.SceneType.GAME_START, this);
		}

		private onclick_level(e: egret.TouchEvent){
			let icon = <LevelIcon>e.currentTarget;
			console.log("选择第" + icon.Level + "关");
			if (this.sel_level != icon.Level) {
				this.img_arrow.x = icon.x;
				this.img_arrow.y = icon.y;
				this.sel_level = icon.Level;
			} else {
				console.log("进入并开始游戏");
				game.GameScene.getInstance().initLevel(icon.Level);
				game.SceneManager.getInstance().dispath(game.SceneType.GAME_PLAY, this);
			}		
		}

		// 打开指定的关卡
		public openLevel(level: number) {
			let icon = this.levelIcons[level - 1];
			icon.enabled = true;
			// 调整关卡进度
			if (level > game.LevelDataManager.getInstance().Milestone) {
				game.LevelDataManager.getInstance().Milestone = level;
				// 同时将选定标记置于其上
				this.img_arrow.x = icon.x;
				this.img_arrow.y = icon.y;
				this.sel_level = icon.Level;
			}
		}

		public start() {
			this.btn_back.touchEnabled = true;
			this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_back, this);
		}

		public end() {
			this.btn_back.touchEnabled = false;
			if (this.btn_back.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
				this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_back, this);
			}
		}
	}
}
