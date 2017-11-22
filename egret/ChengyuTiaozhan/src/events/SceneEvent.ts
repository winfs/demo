module game {
	export class SceneEvent extends egret.Event {
		public static TOGGLE_SCENE: string = "toggle_scene";
		public eventType: any; // 事件类型
		public obj: any; //对象
		
		public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
			super(type, bubbles, cancelable);
		}
	}
}