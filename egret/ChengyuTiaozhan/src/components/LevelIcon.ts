module game {
	export class LevelIcon extends eui.Button {
		private lb_level: eui.Label;
		// private _lb_label:string = "";

		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
			this.skinName = "skins.LevelIconSkin";					
		}

		public get Level(): number {
			// return parseInt(this._lb_label);
			return parseInt(this.lb_level.text);
		}

		public set Level(value: number) {
			/*
			this._lb_label = value.toString();
			if (this.lb_level) {
				this.lb_level.text = this._lb_label;
			}
			*/
			this.lb_level.text = value.toString();
		}

		private onComplete() {
			this.removeEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
			/*
			if (this.lb_level) {
				this.lb_level.text = this._lb_label;
			}
			*/		
		}	
	}
}
