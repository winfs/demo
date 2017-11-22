class MathUtil {
    /**
     * 获取两点间角度
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    public static getAngle(p1X: number,p1Y: number,p2X: number,p2Y: number): number {
        var xdis: number = p2X - p1X;
        var ydis: number = -(p2Y - p1Y);
        var atan2 = Math.atan2(ydis, xdis);
        if (atan2 < 0) {
           return 360 + 180 * atan2 / Math.PI;
        } else {
            return 180 * atan2 / (Math.PI);
        }
    }

    /**
     * 获取两点间距离
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    public static getDistance(p1X: number,p1Y: number,p2X: number,p2Y: number): number {
        var disX: number = p2X - p1X;
        var disY: number = p2Y - p1Y;
        var disQ: number = disX * disX + disY * disY;
        return Math.sqrt(disQ);
    }

    public static parsePoint(x: number, y: number, spanX: number, spanY: number) {
        let disX: number = x * spanX;
        let disY: number = y * spanY;

        return new egret.Point(disX, disY);
    }
}