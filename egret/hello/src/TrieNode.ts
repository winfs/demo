class TrieNode {
    // R links to node children
    public links: TrieNode[] = [];
    private isEnd: boolean;

    public constructor() {
        this.links.length = 26;
    }

    public containsKey(ch: string): boolean {
        let index: number = this.getIndex(ch);
        return this.links[index] != null;
    }

    public put(ch: string, node: TrieNode) {
        let index: number = this.getIndex(ch);
        this.links[index] = node;
    }

    public getNode(ch: string): TrieNode {
        let index = this.getIndex(ch);
        return this.links[index];
    }

    public set IsEnd(value: boolean) {
        this.isEnd = value;
    }

    public get IsEnd(): boolean {
        return this.isEnd;
    }

    private getIndex(ch: string): number {
        return ch.charCodeAt(0) - ("a").charCodeAt(0);
    }
}