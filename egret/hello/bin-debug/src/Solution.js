var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Solution = (function () {
    function Solution() {
        this.res = [];
    }
    Solution.prototype.findWords = function (board, words) {
        var trie = new Trie();
        for (var i = 0; i < words.length; i++) {
            trie.insert(words[i]);
        }
        var m = board.length;
        var n = board[0].length;
        var visited = [];
        for (var i = 0; i < m; i++) {
            visited[i] = [];
            for (var j = 0; j < n; j++) {
                visited[i][j] = false;
            }
        }
        for (var i = 0; i < m; i++) {
            for (var j = 0; j < n; j++) {
                this.dfs(board, visited, "", i, j, trie);
            }
        }
        return this.res;
    };
    Solution.prototype.dfs = function (board, visited, str, x, y, trie) {
        if (x < 0 || x >= board.length || y < 0 || y >= board[0].length) {
            return;
        }
        str += board[x][y];
        if (!trie.startsWith(str)) {
            return;
        }
        if (trie.search(str)) {
            this.res.push(str);
        }
        visited[x][y] = true;
        this.dfs(board, visited, str, x - 1, y, trie);
        this.dfs(board, visited, str, x + 1, y, trie);
        this.dfs(board, visited, str, x, y - 1, trie);
        this.dfs(board, visited, str, x, y + 1, trie);
        visited[x][y] = false;
    };
    return Solution;
}());
__reflect(Solution.prototype, "Solution");
//# sourceMappingURL=Solution.js.map