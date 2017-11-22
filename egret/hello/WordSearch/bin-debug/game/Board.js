var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var Board = (function () {
        function Board(m, n) {
            this.words = [];
            this.wordList = [];
            this.res = [];
            var board = [];
            for (var i = 0; i < n; i++) {
                board[i] = [];
                for (var j = 0; j < m; j++) {
                    board[i][j] = "";
                }
            }
            this.board = board;
            this.m = m;
            this.n = n;
        }
        Board.prototype.create = function (words) {
            var fillWords = [];
            for (var i = 0; i < words.length; i++) {
                if (this.placeWord(words[i])) {
                    fillWords.push(words[i]);
                }
            }
            var curBoard;
            var res;
            var index = 0;
            do {
                if (index > 10) {
                    break;
                }
                res = [];
                curBoard = this.initCurBoard();
                this.fillInWord(fillWords, curBoard);
                res = this.findWords(curBoard, fillWords);
                index++;
                console.log("word search " + index + ":", res);
            } while (res.length != fillWords.length);
            this.board = curBoard;
            this.words = fillWords;
            return this.board;
        };
        Board.prototype.initCurBoard = function () {
            var curBoard = [];
            for (var i = 0; i < this.n; i++) {
                curBoard[i] = [];
                for (var j = 0; j < this.m; j++) {
                    curBoard[i][j] = this.board[i][j];
                }
            }
            return curBoard;
        };
        Board.prototype.getFillWords = function () {
            return this.words;
        };
        Board.prototype.getWordList = function () {
            return this.wordList;
        };
        Board.prototype.getDirections = function () {
            return [
                game.Direction.UP,
                game.Direction.DOWN,
                game.Direction.LEFT,
                game.Direction.RIGHT,
                game.Direction.UPLEFT,
                game.Direction.UPRIGHT,
                game.Direction.DOWNLEFT,
                game.Direction.DOWNRIGHT
            ];
        };
        Board.prototype.placeWord = function (word) {
            var points = [];
            for (var i = 0; i < this.n; i++) {
                for (var j = 0; j < this.m; j++) {
                    points.push(new egret.Point(i, j));
                }
            }
            var directions = this.getDirections();
            points = ArrayUtil.shuffle(points);
            directions = ArrayUtil.shuffle(directions);
            var xIndex;
            var yIndex;
            var x;
            var y;
            var point;
            var isPlace;
            var count = this.m * this.n;
            for (var pi = 0; pi < count; pi++) {
                point = points[pi];
                isPlace = true;
                for (var di = 0; di < directions.length; di++) {
                    switch (directions[di]) {
                        case game.Direction.UP:
                            xIndex = point.x - word.length;
                            if (xIndex < 0) {
                                break;
                            }
                            for (var i = 0; i < word.length; i++) {
                                x = point.x - i;
                                y = point.y;
                                if (!this.validPoint(x, y, word[i])) {
                                    isPlace = false;
                                    break;
                                }
                            }
                            if (isPlace) {
                                var gameWord = new game.Word();
                                gameWord.text = word;
                                gameWord.direction = directions[di];
                                for (var i = 0; i < word.length; i++) {
                                    x = point.x - i;
                                    y = point.y;
                                    this.board[x][y] = word[i];
                                    var char = this.fillInChar(x, y, word[i]);
                                    gameWord.chars.push(char);
                                }
                                this.wordList.push(gameWord);
                                return true;
                            }
                            break;
                        case game.Direction.DOWN:
                            xIndex = point.x + word.length;
                            if (xIndex >= this.n) {
                                break;
                            }
                            for (var i = 0; i < word.length; i++) {
                                x = point.x + i;
                                y = point.y;
                                if (!this.validPoint(x, y, word[i])) {
                                    isPlace = false;
                                    break;
                                }
                            }
                            if (isPlace) {
                                var gameWord = new game.Word();
                                gameWord.text = word;
                                gameWord.direction = directions[di];
                                for (var i = 0; i < word.length; i++) {
                                    x = point.x + i;
                                    y = point.y;
                                    this.board[x][y] = word[i];
                                    var char = this.fillInChar(x, y, word[i]);
                                    gameWord.chars.push(char);
                                }
                                this.wordList.push(gameWord);
                                return true;
                            }
                            break;
                        case game.Direction.LEFT:
                            yIndex = point.y - word.length;
                            if (yIndex < 0) {
                                break;
                            }
                            for (var i = 0; i < word.length; i++) {
                                x = point.x;
                                y = point.y - i;
                                if (!this.validPoint(x, y, word[i])) {
                                    isPlace = false;
                                    break;
                                }
                            }
                            if (isPlace) {
                                var gameWord = new game.Word();
                                gameWord.text = word;
                                gameWord.direction = directions[di];
                                for (var i = 0; i < word.length; i++) {
                                    x = point.x;
                                    y = point.y - i;
                                    this.board[x][y] = word[i];
                                    var char = this.fillInChar(x, y, word[i]);
                                    gameWord.chars.push(char);
                                }
                                this.wordList.push(gameWord);
                                return true;
                            }
                            break;
                        case game.Direction.RIGHT:
                            yIndex = point.y + word.length;
                            if (yIndex >= this.m) {
                                break;
                            }
                            for (var i = 0; i < word.length; i++) {
                                x = point.x;
                                y = point.y + i;
                                if (!this.validPoint(x, y, word[i])) {
                                    isPlace = false;
                                    break;
                                }
                            }
                            if (isPlace) {
                                var gameWord = new game.Word();
                                gameWord.text = word;
                                gameWord.direction = directions[di];
                                for (var i = 0; i < word.length; i++) {
                                    x = point.x;
                                    y = point.y + i;
                                    this.board[x][y] = word[i];
                                    var char = this.fillInChar(x, y, word[i]);
                                    gameWord.chars.push(char);
                                }
                                this.wordList.push(gameWord);
                                return true;
                            }
                            break;
                        case game.Direction.UPLEFT:
                            xIndex = point.x - word.length;
                            yIndex = point.y - word.length;
                            if (xIndex < 0 || yIndex < 0) {
                                break;
                            }
                            for (var i = 0; i < word.length; i++) {
                                x = point.x - i;
                                y = point.y - i;
                                if (!this.validPoint(x, y, word[i])) {
                                    isPlace = false;
                                    break;
                                }
                            }
                            if (isPlace) {
                                var gameWord = new game.Word();
                                gameWord.text = word;
                                gameWord.direction = directions[di];
                                for (var i = 0; i < word.length; i++) {
                                    x = point.x - i;
                                    y = point.y - i;
                                    this.board[x][y] = word[i];
                                    var char = this.fillInChar(x, y, word[i]);
                                    gameWord.chars.push(char);
                                }
                                this.wordList.push(gameWord);
                                return true;
                            }
                            break;
                        case game.Direction.UPRIGHT:
                            xIndex = point.x - word.length;
                            yIndex = point.y + word.length;
                            if (xIndex < 0 || yIndex >= this.m) {
                                break;
                            }
                            for (var i = 0; i < word.length; i++) {
                                x = point.x - i;
                                y = point.y + i;
                                if (!this.validPoint(x, y, word[i])) {
                                    isPlace = false;
                                    break;
                                }
                            }
                            if (isPlace) {
                                var gameWord = new game.Word();
                                gameWord.text = word;
                                gameWord.direction = directions[di];
                                for (var i = 0; i < word.length; i++) {
                                    x = point.x - i;
                                    y = point.y + i;
                                    this.board[x][y] = word[i];
                                    var char = this.fillInChar(x, y, word[i]);
                                    gameWord.chars.push(char);
                                }
                                this.wordList.push(gameWord);
                                return true;
                            }
                            break;
                        case game.Direction.DOWNLEFT:
                            xIndex = point.x + word.length;
                            yIndex = point.y - word.length;
                            if (xIndex >= this.n || yIndex < 0) {
                                break;
                            }
                            for (var i = 0; i < word.length; i++) {
                                x = point.x + i;
                                y = point.y - i;
                                if (!this.validPoint(x, y, word[i])) {
                                    isPlace = false;
                                    break;
                                }
                            }
                            if (isPlace) {
                                var gameWord = new game.Word();
                                gameWord.text = word;
                                gameWord.direction = directions[di];
                                for (var i = 0; i < word.length; i++) {
                                    x = point.x + i;
                                    y = point.y - i;
                                    this.board[x][y] = word[i];
                                    var char = this.fillInChar(x, y, word[i]);
                                    gameWord.chars.push(char);
                                }
                                this.wordList.push(gameWord);
                                return true;
                            }
                            break;
                        case game.Direction.DOWNRIGHT:
                            xIndex = point.x + word.length;
                            yIndex = point.y + word.length;
                            if (xIndex >= this.n || yIndex >= this.m) {
                                break;
                            }
                            for (var i = 0; i < word.length; i++) {
                                x = point.x + i;
                                y = point.y + i;
                                if (!this.validPoint(x, y, word[i])) {
                                    isPlace = false;
                                    break;
                                }
                            }
                            if (isPlace) {
                                var gameWord = new game.Word();
                                gameWord.text = word;
                                gameWord.direction = directions[di];
                                for (var i = 0; i < word.length; i++) {
                                    x = point.x + i;
                                    y = point.y + i;
                                    this.board[x][y] = word[i];
                                    var char = this.fillInChar(x, y, word[i]);
                                    gameWord.chars.push(char);
                                }
                                this.wordList.push(gameWord);
                                return true;
                            }
                            break;
                    }
                }
            }
            return false;
        };
        Board.prototype.validPoint = function (x, y, text) {
            if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != text) {
                return false;
            }
            return true;
        };
        Board.prototype.fillInWord = function (words, curBoard) {
            var list = [];
            for (var i = 0; i < words.length; i++) {
                for (var j = 0; j < words[i].length; j++) {
                    if (!ArrayUtil.contains(list, words[i][j])) {
                        list.push(words[i][j]);
                    }
                }
            }
            for (var i = 0; i < curBoard.length; i++) {
                for (var j = 0; j < curBoard[i].length; j++) {
                    if (curBoard[i][j] != "") {
                        continue;
                    }
                    curBoard[i][j] = ArrayUtil.getRandomValue(list);
                }
            }
        };
        Board.prototype.fillInChar = function (x, y, text) {
            var char = new game.Char();
            char.x = x;
            char.y = y;
            char.text = text;
            return char;
        };
        Board.prototype.findWords = function (board, words) {
            var trie = new Trie();
            for (var i = 0; i < words.length; i++) {
                trie.insert(words[i]);
            }
            var m = board.length;
            var n = board[0].length;
            var directions = this.getDirections();
            var visited = [];
            var res = [];
            for (var i = 0; i < m; i++) {
                visited[i] = [];
                for (var j = 0; j < n; j++) {
                    visited[i][j] = false;
                }
            }
            for (var i = 0; i < m; i++) {
                for (var j = 0; j < n; j++) {
                    for (var di = 0; di < directions.length; di++) {
                        this.dfs(board, visited, "", i, j, directions[di], trie, res);
                    }
                }
            }
            return res;
        };
        Board.prototype.dfs = function (board, visited, str, x, y, di, trie, res) {
            if (x < 0 || x >= board.length || y < 0 || y >= board[0].length) {
                return;
            }
            str += board[x][y];
            if (!trie.startsWith(str)) {
                return;
            }
            if (trie.search(str)) {
                res.push(str);
            }
            visited[x][y] = true;
            switch (di) {
                case game.Direction.UP:
                    this.dfs(board, visited, str, x - 1, y, di, trie, res);
                    break;
                case game.Direction.DOWN:
                    this.dfs(board, visited, str, x + 1, y, di, trie, res);
                    break;
                case game.Direction.LEFT:
                    this.dfs(board, visited, str, x, y - 1, di, trie, res);
                    break;
                case game.Direction.RIGHT:
                    this.dfs(board, visited, str, x, y + 1, di, trie, res);
                    break;
                case game.Direction.UPLEFT:
                    this.dfs(board, visited, str, x - 1, y - 1, di, trie, res);
                    break;
                case game.Direction.UPRIGHT:
                    this.dfs(board, visited, str, x - 1, y + 1, di, trie, res);
                    break;
                case game.Direction.DOWNLEFT:
                    this.dfs(board, visited, str, x + 1, y - 1, di, trie, res);
                    break;
                case game.Direction.DOWNRIGHT:
                    this.dfs(board, visited, str, x + 1, y + 1, di, trie, res);
                    break;
            }
            visited[x][y] = false;
        };
        return Board;
    }());
    game.Board = Board;
    __reflect(Board.prototype, "game.Board");
})(game || (game = {}));
//# sourceMappingURL=Board.js.map