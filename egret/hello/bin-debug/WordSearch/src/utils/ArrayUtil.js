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
    return ArrayUtil;
}());
__reflect(ArrayUtil.prototype, "ArrayUtil");
//# sourceMappingURL=ArrayUtil.js.map