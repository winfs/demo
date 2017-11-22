module fighter {
	export class GameUtil {
		/**
		 * 基于矩形的碰撞检测
		 */
		public static hitTest(obj1: egret.DisplayObject, obj2: egret.DisplayObject) : boolean {
			let rect1: egret.Rectangle = obj1.getBounds(); 
			let rect2: egret.Rectangle = obj2.getBounds();
			rect1.x = obj1.x;
			rect1.y = obj1.y;
			rect2.x = obj2.x;
			rect2.y = obj2.y;

			return rect1.intersects(rect2); // 检查是否相交
		}
	}

	/**
	 * 根据name关键字创建一个Bitmap对象
	 */
	export function createBitmapByName(name: string): egret.Bitmap {
		let img: egret.Bitmap = new egret.Bitmap();
		img.texture = RES.getRes(name);

		return img;
	}
}