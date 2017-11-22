class Trie {
    private root: TrieNode;

    public constructor() {
        this.root = new TrieNode();
    }

    // Inserts a word into the trie
    public insert(word: string) {
        let node: TrieNode = this.root;
        for (let i: number = 0; i < word.length; i++) {
            let ch: string = word.charAt(i);
            if (!node.containsKey(ch)) {
                node.put(ch, new TrieNode());
            }
            node = node.getNode(ch);
        }
        node.IsEnd = true;
    }

    // search a prefix or whole key in trie and
    // returns the node where search ends
    private searchPrefix(word: string): TrieNode {
        let node: TrieNode = this.root;
        for (let i: number = 0; i < word.length; i++) {
            let ch: string = word.charAt(i);
            if (node.containsKey(ch)) {
                node = node.getNode(ch);
            } else {
                return null;
            }
        }

        return node;
    }

    public search(word: string) {
        let node: TrieNode = this.searchPrefix(word);
        return node != null && node.IsEnd;
    }

    public startsWith(prefix: string): boolean {
        let node: TrieNode = this.searchPrefix(prefix);
        return node != null;
    }
}