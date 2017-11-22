module game {
	/**
	 * 游戏界面
	 */
	export class GameScene extends game.BaseScene {
		public group_answer:eui.Group;
		public group_words: eui.Group;
		public img_question: eui.Image;
		public btn_back: eui.Button;
		private levelIndex: number;

		/**
		 *  胜利界面
		 */
		private group_win: eui.Group; 
		private btn_next: eui.Button;
		private lb_from: eui.Label;
		private lb_explain: eui.Label;

		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
			this.skinName = "skins.GameSceneSkin";			
		}

		// 对象变量
		public initLevel(level: number) {
			this.levelIndex = level;
			let levelData = game.LevelDataManager.getInstance().getLevelData(level); // 获取关卡数据
			// 将字段接起来
			let words = levelData.answer + levelData.word;
			// 随机一个其它题目的字段混合进本题目
			while(words.length == 10) {
				let i = Math.floor(Math.random() * 400); 
				if (i != level) {
					let temp = game.LevelDataManager.getInstance().getLevelData(i);
					words += temp.word + temp.answer;
				}
			}
		
			// 对字段重排
			let wordList: string[] = [];
			for (let i: number = 0; i < words.length; i++) {
				wordList.push(words.charAt(i));
			} 
			wordList = this.randomList(wordList);		
			
			// 对问题字赋值
			for (let i: number = 0; i < this.group_words.numChildren; i++) {
				let wordrect = <Word>this.group_words.getChildAt(i);
				wordrect.setWordText(wordList[i]);
				wordrect.visible = true;
			}

			// 重置一些状态
			for (let i: number = 0; i < this.group_answer.numChildren; i++) {
				let answerrect = <AnswerWord>this.group_answer.getChildAt(i);
				answerrect.SetSelectWord(null);
				answerrect.visible = true;
				answerrect.SelectWord = null;
			}	

			// 显示图像
			this.img_question.source = "resource/assets/"+ levelData.img;
		}

		// 将一个数列随机
		private randomList(arr: any[]): any[] {
			let array = [];
			while(arr.length > 0) {
				let i = Math.floor(Math.random() * arr.length);
				array.push(arr[i]);
				arr.splice(i, 1);
			}

			return array;
		}

		// 当字点击的时候，由word类抛出
		public onclick_word(word: Word) {
			// 找到一个合适的位置添加进答案内容
			let sel: AnswerWord = null;
			for (let i = 0; i < this.group_words.numChildren; i++) {
				let answer = <AnswerWord>this.group_answer.getChildAt(i);
				if (answer.SelectWord == null) {
					sel = answer;
					break;
				}
			}

			// 当有一个合适的位置的时候就会将字填充，并判断是否胜利
			if (sel != null) {
				sel.SetSelectWord(word);			
				// 判断是否胜利
				let check_str: string = "";
				for(let i = 0; i < this.group_answer.numChildren; i++) {
					var answer = <AnswerWord>this.group_answer.getChildAt(i);
					check_str += answer.getWordText();
				}

				if (check_str == game.LevelDataManager.getInstance().getLevelData(this.levelIndex).answer) {
					//胜利
					this.showWin();
				}
			}
		}
		
		private onComplete() {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
			this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_back, this);
			this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_next, this);
		}

		private onclick_back() {
			game.SceneManager.getInstance().dispath(game.SceneType.GAME_LEVEL, this);
		}

		/**
		 * 点击进入下一题
		 */
		private onclick_next() {
			this.group_win.visible = false;
			game.LevelScene.getInstance().openLevel(this.levelIndex + 1);
			this.initLevel(this.levelIndex + 1);
		}

		/**
		 * 显示胜利界面
		 */
		private showWin() {
			this.group_win.visible = true;
			let levelData = game.LevelDataManager.getInstance().getLevelData(this.levelIndex);
			this.lb_from.text = levelData.tip;
			this.lb_explain.text = levelData.content;
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
