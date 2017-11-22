module game {
	/**
	 * 开始界面
	 */
	export class StartScene extends game.BaseScene {
		private btn_start: eui.Button;

		public constructor() {
			super();		
			this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);	
			this.skinName = "skins.StartSceneSkin";				
		}

		private onComplete() {
			this.removeEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
			this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
		}

		private onTouchTap() {
			egret.log("====进入选择关卡界面====");							
			game.SceneManager.getInstance().dispath(game.SceneType.GAME_LEVEL, this);
		}

		public start() {
			this.btn_start.touchEnabled = true;
			this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		}

		public end() {
			this.btn_start.touchEnabled = false;
			if (this.btn_start.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
				this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
			}
		}
	}
}
