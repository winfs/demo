var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ArrayUtil = (function () {
    function ArrayUtil() {
    }
    /**
     * 是否包含元素
     */
    ArrayUtil.contains = function (arr, value) {
        var res = false;
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] == value) {
                res = true;
                break;
            }
        }
        return res;
    };
    /**
     *  以...开头
     */
    ArrayUtil.startWith = function (arr, value) {
        var res = false;
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i].indexOf(value) == 0) {
                res = true;
                break;
            }
        }
        return res;
    };
    ArrayUtil.getRandomValue = function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    };
    /**
     * 随机打乱数组
     */
    ArrayUtil.shuffle = function (arr) {
        var length = arr.length;
        var i = length;
        var rand;
        var temp;
        while (i--) {
            rand = Math.floor(Math.random() * length);
            if (i !== rand) {
                temp = arr[i];
                arr[i] = arr[rand];
                arr[rand] = temp;
            }
        }
        return arr;
    };
    /**
     * 数组求差集
     */
    ArrayUtil.intersect = function (arr1, arr2) {
        var result = [];
        if (arr2.length == 0) {
            return arr1;
        }
        for (var i = 0; i < arr1.length; i++) {
            if (!ArrayUtil.contains(arr2, arr1[i])) {
                result.push(arr1[i]);
            }
        }
        return result;
    };
    return ArrayUtil;
}());
__reflect(ArrayUtil.prototype, "ArrayUtil");
//# sourceMappingURL=ArrayUtil.js.map