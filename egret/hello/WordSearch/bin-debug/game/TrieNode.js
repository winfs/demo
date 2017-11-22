var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TrieNode = (function () {
    function TrieNode() {
        this.links = [];
        this.links.length = 26;
    }
    TrieNode.prototype.containsKey = function (ch) {
        var index = this.getIndex(ch);
        return this.links[index] != null;
    };
    TrieNode.prototype.put = function (ch, node) {
        var index = this.getIndex(ch);
        this.links[index] = node;
    };
    TrieNode.prototype.getNode = function (ch) {
        var index = this.getIndex(ch);
        return this.links[index];
    };
    Object.defineProperty(TrieNode.prototype, "IsEnd", {
        get: function () {
            return this.isEnd;
        },
        set: function (value) {
            this.isEnd = value;
        },
        enumerable: true,
        configurable: true
    });
    TrieNode.prototype.getIndex = function (ch) {
        return ch.toLowerCase().charCodeAt(0) - ("a").charCodeAt(0);
    };
    return TrieNode;
}());
__reflect(TrieNode.prototype, "TrieNode");
//# sourceMappingURL=TrieNode.js.map