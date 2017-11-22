class ArrayUtil {
    /**
     * 是否包含元素
     */
    public static contains(arr: Array<any>, value: any): boolean {
        let res: boolean = false;
        for (let i: number = 0, len: number = arr.length; i < len; i++) {
            if (arr[i] == value) {
                res = true;
                break;
            }
        }

        return res;
    }

    /**
     *  以...开头
     */
    public static startWith(arr: string[], value: string): boolean {
        let res: boolean = false;
        for (let i: number = 0, len: number = arr.length; i < len; i++) {
            if (arr[i].indexOf(value) == 0) {
                res = true;
                break;
            }
        }

        return res;
    }

    public static getRandomValue(arr: any[]): any {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    /**
     * 随机打乱数组
     */
    public static shuffle(arr: any[]): any[] {
        let length: number = arr.length;
        let i: number = length;
        let rand: number;
        let temp: any;
        while (i--) {
            rand = Math.floor(Math.random() * length);
            if (i !== rand) {
                temp = arr[i];
                arr[i] = arr[rand];
                arr[rand] = temp;
            }
        }

        return arr;
    }

    /**
     * 数组求差集
     */
    public static intersect(arr1: any[], arr2: any[]): any[] {
        let result: any[] = [];
        if (arr2.length == 0) {
            return arr1;
        }

        for (let i: number = 0; i < arr1.length; i++) {
            if (!ArrayUtil.contains(arr2, arr1[i])) {
                result.push(arr1[i]);
            }
        }

        return result;
    }
}