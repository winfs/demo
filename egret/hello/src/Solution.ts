class Solution {
    public res: string[] = [];

    public findWords(board: string[][], words: string[]): string[] {
        let trie: Trie = new Trie();
        for (let i: number = 0; i < words.length; i++) {
            trie.insert(words[i]);
        }

        let m: number = board.length;
        let n: number = board[0].length;
        let visited = [];
        for (let i: number = 0; i < m; i++) {
            visited[i] = [];
            for (let j: number = 0; j < n; j++) {
                visited[i][j] = false;
            }
        }

        for (let i: number = 0; i < m; i++) {
            for (let j: number = 0; j < n; j++) {
                this.dfs(board, visited, "", i, j, trie);
            }
        }

        return this.res;
    }

    private dfs(board: string[][], visited: boolean[][], str: string, x: number, y: number, trie: Trie) {
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
    }
}