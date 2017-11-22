module fighter {
	/**
	 * 子弹，利用对象池
	 */
	export class Bullet extends egret.Bitmap {
		public textureName: string;  // 可视为子弹类型名

		private static cacheDict: Object = {};

		public constructor(textureName: string) {
			super(RES.getRes(textureName));
			this.textureName = textureName;
		}

		/**
		 * 生产
		 */
		public static produce(textureName: string): fighter.Bullet {
			if (fighter.Bullet.cacheDict[textureName] == null) {
				fighter.Bullet.cacheDict[textureName] = [];
			}

			let dict: fighter.Bullet[] = fighter.Bullet.cacheDict[textureName];
			let bullet: fighter.Bullet;
			if (dict.length > 0) {
				bullet = dict.pop();
			} else {
				bullet = new fighter.Bullet(textureName);
			}

			return bullet;
		}

		/**
		 * 回收
		 */
		public static reclaim(bullet: fighter.Bullet): void {
			let textureName = bullet.textureName;
			if (fighter.Bullet.cacheDict[textureName] == null) {
				fighter.Bullet.cacheDict[textureName] = [];
			}

			let dict: fighter.Bullet[] = fighter.Bullet.cacheDict[textureName];
			if (dict.indexOf(bullet) == -1) {
				dict.push(bullet);
			}
		}
	}
}