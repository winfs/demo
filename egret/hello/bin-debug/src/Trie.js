var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Trie = (function () {
    function Trie() {
        this.root = new TrieNode();
    }
    // Inserts a word into the trie
    Trie.prototype.insert = function (word) {
        var node = this.root;
        for (var i = 0; i < word.length; i++) {
            var ch = word.charAt(i);
            if (!node.containsKey(ch)) {
                node.put(ch, new TrieNode());
            }
            node = node.getNode(ch);
        }
        node.IsEnd = true;
    };
    // search a prefix or whole key in trie and
    // returns the node where search ends
    Trie.prototype.searchPrefix = function (word) {
        var node = this.root;
        for (var i = 0; i < word.length; i++) {
            var ch = word.charAt(i);
            if (node.containsKey(ch)) {
                node = node.getNode(ch);
            }
            else {
                return null;
            }
        }
        return node;
    };
    Trie.prototype.search = function (word) {
        var node = this.searchPrefix(word);
        return node != null && node.IsEnd;
    };
    Trie.prototype.startsWith = function (prefix) {
        var node = this.searchPrefix(prefix);
        return node != null;
    };
    return Trie;
}());
__reflect(Trie.prototype, "Trie");
//# sourceMappingURL=Trie.js.map