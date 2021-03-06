module game {
	/**
	 *  普通的一个字，用来做问题的字块使用
	 */
	export class Word extends eui.Component {
		public lb_text: eui.Label;

		public constructor() {
			super();		
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_tap, this);
		}

		protected onclick_tap() {
			console.log(this.lb_text.text);
			game.GameScene.getInstance().onclick_word(this);
		}

		// 这里没有做成属性的原因是因为当应用到eui的时候，Skin还未指定，运行时候会出现报错，
		// 如果指定了SkinName，那么就会产生两次eui的构建浪费内存
		public setWordText(value: string) {
			this.lb_text.text = value;
		}

		public getWordText() {
			return this.lb_text.text;
		}
	}
}
