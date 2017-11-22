module game {
	/**
	 * 场景管理类
	 */
	export class SceneManager extends egret.DisplayObjectContainer {
		// 单例
		private static instance: SceneManager;

		public static getInstance(): SceneManager {
			if (this.instance == null) {
				this.instance = new SceneManager();
			}

			return this.instance;
		}

		private scenes: any;  // 场景列表

		public constructor() {
			super();	
			this.scenes = {};
		}

		/**
		 * 注册场景
		 */
		public register(type: game.SceneType, scene: game.BaseScene) {
			this.scenes[type] = scene;
		}

		/**
		 * 场景切换监听
		 */
		public start() {
			egret.log("====开启场景切换监听事件====");
			this.addEventListener(game.SceneEvent.TOGGLE_SCENE, this.onToggleScene, this);
		}

		/**
		 * 发起场景切换事件
		 */
		public dispath(eventType: game.SceneType, obj: game.BaseScene) {
			let sceneEvent: game.SceneEvent = new game.SceneEvent(game.SceneEvent.TOGGLE_SCENE);
			sceneEvent.eventType = eventType;
			sceneEvent.obj = obj;
			this.dispatchEvent(sceneEvent);
		}

		/**
		 * 场景切换处理
		 */
		private onToggleScene(evt: game.SceneEvent) {
			egret.log("当前进入场景：", evt.eventType);
			evt.obj.end();
			this.removeChildren();

			let scene = <game.BaseScene>this.scenes[evt.eventType];
			if (scene == null) {
				egret.error("场景" + evt.eventType + "不存在");
				return;
			}

			scene.start();
			this.addChild(scene);
		}
	}
}