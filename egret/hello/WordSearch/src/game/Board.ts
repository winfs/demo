module game {
    export class Board {
        private m: number;
        private n: number;
        private board: any;
        private words: string[] = [];
        private wordList: game.Word[] = [];
        public res: string[] = [];

        public constructor(m: number, n: number) {
            let board = [];
            for (let i: number = 0; i < n; i++) {
                board[i] = [];
                for (let j: number = 0; j < m; j++) {
                    board[i][j] = "";
                }
            }

            this.board = board;
            this.m = m;
            this.n = n;
        }

        public create(words: string[]): string[][] {
            let fillWords: string[] = [];
            for (let i: number = 0; i < words.length; i++) {
                if(this.placeWord(words[i])) {
                    fillWords.push(words[i]);
                }
            }

            let curBoard: any;
            let res: string[];
            let index: number = 0;
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
        }

        public initCurBoard(): string[][] {
            let curBoard = [];
            for (let i: number = 0; i < this.n; i++) {
                curBoard[i] = [];
                for (let j: number = 0; j < this.m; j++) {
                    curBoard[i][j] = this.board[i][j];
                }
            }

            return curBoard;
        }

        public getFillWords(): string[] {
            return this.words;
        }

        public getWordList(): game.Word[] {
            return this.wordList;
        }

        public getDirections(): number[] {
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
        }

        private placeWord(word: string): boolean {
            let points: egret.Point[] = [];
            for (let i: number = 0; i < this.n; i++) {
                for (let j: number = 0; j < this.m; j++) {
                    points.push(new egret.Point(i, j));
                }
            }

            let directions = this.getDirections();

            points = ArrayUtil.shuffle(points);
            directions = ArrayUtil.shuffle(directions);

            let xIndex: number;
            let yIndex: number;
            let x: number;
            let y: number;
            let point: egret.Point;
            let isPlace: boolean;
            let count = this.m * this.n;
            for (let pi: number = 0; pi < count; pi++) {
                point = points[pi];
                isPlace = true;
                for (let di: number = 0; di < directions.length; di++) {
                    switch (directions[di]) {
                        case game.Direction.UP:
                            xIndex = point.x - word.length;
                            if (xIndex < 0) {
                                break;
                            }

                            for (let i: number = 0; i < word.length; i++) {
                                x = point.x - i;
                                y = point.y;
                                if (!this.validPoint(x, y, word[i])) {
                                    isPlace = false;
                                    break;
                                }
                            }

                            if (isPlace) {
                                let gameWord = new game.Word();
                                gameWord.text = word;
                                gameWord.direction = directions[di];
                                for (let i: number = 0; i < word.length; i++) {
                                    x = point.x - i;
                                    y = point.y;
                                    this.board[x][y] = word[i];
                                    let char = this.fillInChar(x, y, word[i]);
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

                            for (let i: number = 0; i < word.length; i++) {
                                x = point.x + i;
                                y = point.y;
                                if (!this.validPoint(x, y, word[i])) {
                                    isPlace = false;
                                    break;
                                }
                            }

                            if (isPlace) {
                                let gameWord = new game.Word();
                                gameWord.text = word;
                                gameWord.direction = directions[di];
                                for (let i: number = 0; i < word.length; i++) {
                                    x = point.x + i;
                                    y = point.y;
                                    this.board[x][y] = word[i];
                                    let char = this.fillInChar(x, y, word[i]);
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

                            for (let i: number = 0; i < word.length; i++) {
                                x = point.x;
                                y = point.y - i;
                                if (!this.validPoint(x, y, word[i])) {
                                    isPlace = false;
                                    break;
                                }
                            }

                            if (isPlace) {
                                let gameWord = new game.Word();
                                gameWord.text = word;
                                gameWord.direction = directions[di];
                                for (let i: number = 0; i < word.length; i++) {
                                    x = point.x;
                                    y = point.y - i;
                                    this.board[x][y] = word[i];
                                    let char = this.fillInChar(x, y, word[i]);
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

                            for (let i: number = 0; i < word.length; i++) {
                                x = point.x;
                                y = point.y + i;
                                if (!this.validPoint(x, y, word[i])) {
                                    isPlace = false;
                                    break;
                                }
                            }

                            if (isPlace) {
                                let gameWord = new game.Word();
                                gameWord.text = word;
                                gameWord.direction = directions[di];
                                for (let i: number = 0; i < word.length; i++) {
                                    x = point.x;
                                    y = point.y + i;
                                    this.board[x][y] = word[i];
                                    let char = this.fillInChar(x, y, word[i]);
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

                            for (let i: number = 0; i < word.length; i++) {
                                x = point.x - i;
                                y = point.y - i;
                                if (!this.validPoint(x, y, word[i])) {
                                    isPlace = false;
                                    break;
                                }
                            }

                            if (isPlace) {
                                let gameWord = new game.Word();
                                gameWord.text = word;
                                gameWord.direction = directions[di];
                                for (let i: number = 0; i < word.length; i++) {
                                    x = point.x - i;
                                    y = point.y - i;
                                    this.board[x][y] = word[i];
                                    let char = this.fillInChar(x, y, word[i]);
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

                            for (let i: number = 0; i < word.length; i++) {
                                x = point.x - i;
                                y = point.y + i;
                                if (!this.validPoint(x, y, word[i])) {
                                    isPlace = false;
                                    break;
                                }
                            }

                            if (isPlace) {
                                let gameWord = new game.Word();
                                gameWord.text = word;
                                gameWord.direction = directions[di];
                                for (let i: number = 0; i < word.length; i++) {
                                    x = point.x - i;
                                    y = point.y + i;
                                    this.board[x][y] = word[i];
                                    let char = this.fillInChar(x, y, word[i]);
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

                            for (let i: number = 0; i < word.length; i++) {
                                x = point.x + i;
                                y = point.y - i;
                                if (!this.validPoint(x, y, word[i])) {
                                    isPlace = false;
                                    break;
                                }
                            }

                            if (isPlace) {
                                let gameWord = new game.Word();
                                gameWord.text = word;
                                gameWord.direction = directions[di];
                                for (let i: number = 0; i < word.length; i++) {
                                    x = point.x + i;
                                    y = point.y - i;
                                    this.board[x][y] = word[i];
                                    let char = this.fillInChar(x, y, word[i]);
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

                            for (let i: number = 0; i < word.length; i++) {
                                x = point.x + i;
                                y = point.y + i;
                                if (!this.validPoint(x, y, word[i])) {
                                    isPlace = false;
                                    break;
                                }
                            }

                            if (isPlace) {
                                let gameWord = new game.Word();
                                gameWord.text = word;
                                gameWord.direction = directions[di];
                                for (let i: number = 0; i < word.length; i++) {
                                    x = point.x + i;
                                    y = point.y + i;
                                    this.board[x][y] = word[i];
                                    let char = this.fillInChar(x, y, word[i]);
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
        }

        private validPoint(x, y, text): boolean {
            if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != text) {
                return false;
            }

            return true;
        }

        private fillInWord(words: string[], curBoard: string[][]) {
            let list = [];
            for (let i: number = 0; i < words.length; i++) {
                for (let j: number = 0; j < words[i].length; j++) {
                    if (!ArrayUtil.contains(list, words[i][j])) {
                        list.push(words[i][j]);
                    }
                }
            }

            for (let i: number = 0; i < curBoard.length; i++) {
                for (let j: number = 0; j < curBoard[i].length; j++) {
                    if (curBoard[i][j] != "") {
                        continue;
                    }
                    curBoard[i][j] = ArrayUtil.getRandomValue(list);
                }
            }
        }

        private fillInChar(x: number, y: number, text: string): game.Char {
            let char = new game.Char();
            char.x = x;
            char.y = y;
            char.text = text;

            return char;
        }

        public findWords(board: string[][], words: string[]): string[] {
            let trie: Trie = new Trie();
            for (let i: number = 0; i < words.length; i++) {
                trie.insert(words[i]);
            }

            let m: number = board.length;
            let n: number = board[0].length;
            let directions = this.getDirections();
            let visited = [];
            let res: string[] = [];
            for (let i: number = 0; i < m; i++) {
                visited[i] = [];
                for (let j: number = 0; j < n; j++) {
                    visited[i][j] = false;
                }
            }

            for (let i: number = 0; i < m; i++) {
                for (let j: number = 0; j < n; j++) {
                    for (let di: number = 0; di < directions.length; di++) {
                        this.dfs(board, visited, "", i, j, directions[di], trie, res);
                    }
                }
            }

            return res;
        }

        private dfs(board: string[][], visited: boolean[][], str: string, x: number, y: number, di: number, trie: Trie, res: string[]) {
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
        }
    }
}