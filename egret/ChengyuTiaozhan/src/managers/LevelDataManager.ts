module game {
	/**
	 *  每个问题的数据结构
	 */
	export class LevelDataItem {
		public answer: string;
		public img: string;
		public word: string;
		public tip: string;
		public content: string;
	}

	// 关卡数据管理类
	export class LevelDataManager extends BaseClass {
		private items: game.LevelDataItem[] = []; // 关卡数据列表

		public constructor() {
			super();

			// 使用RES读取和构建JSON数据，JSON数据可以直接解析到目标结构
			this.items = RES.getRes("questions_json");
		}

		// 通过level获取关卡数据
		public getLevelData(level: number): game.LevelDataItem {
			if (level < 0) {
				level = 0;
			}
			if (level >= this.items.length) {
				level = this.items.length - 1;
			}

			return this.items[level];
		}

		// 获得游戏当前的关卡进度
		public get Milestone() {
			let milestone = egret.localStorage.getItem("CYDTZ_Milestone");
			//如果没有数据，那么默认值就是第一关
			if (milestone == "" || milestone == null) {
				milestone = "1";
			}

			return parseInt(milestone);
		}

		// 设置游戏当前的关卡进度
		public set Milestone(value: number) {
			egret.localStorage.setItem("CYDTZ_Milestone", value.toString());
		}
	}
}
