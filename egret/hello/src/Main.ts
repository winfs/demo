//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {
            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }


        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private board: any;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {        
        
        let words: string[] = [
            "oath",
            "pea",
            "eat",
            "rain",
            "apple",
            "orange"
        ];

        this.createBoard(game.N, words);

        /*
        let board: string[][] = [
            ['o','a','a','n'],
            ['e','t','a','e'],
            ['i','h','k','r'],
            ['i','f','l','v']
        ];
        */

        /*
        let so = new Solution;
        let res: string[] = so.findWords(board, words);
        console.log(res);
        */
    }


    private createBoard(n: number, words: string[]) {
        this.board = this.initBoard(n);
        for(let i: number = 0; i < words.length; i++) {
            let result: boolean = false;
            while (!result) {
                let word = this.randomWord(n, words[i]);
                console.log(word);
                result = this.placeWords(n, word);
                console.log(result);
                if (result) {
                    break;
                }
            }
        }
        console.log(this.board);

    }

    /**
     * 随机word位置和方向
     */
    private randomWord(n: number, name: string): Word {                
            let word = new Word();
            word.x = Math.floor(Math.random() * n);
            word.y = Math.floor(Math.random() * n);
            word.direction = Math.round(Math.random() * 7);
            word.name = name;

        return word;
    }

    /**
     * 初始化board
     */
    private initBoard(n: number): string[][] {
        let board = [];
        for (let i: number = 0; i < n; i++) {
            board[i] = [];
            for (let j: number = 0; j < n; j++) {
                board[i][j] = "";
            }
        }

        return board;
    }

    /**
     * 插入word
     */
    private placeWords(n: number, word: Word): boolean {
        let index: number;
        let xIndex: number;
        let yIndex: number;
        let isPlace: boolean = true;
        let x: number;
        let y: number;
        switch (word.direction) {
            case game.Direction.UP:
                index = word.x - word.name.length;
                if (index < 0) {
                    return false;
                }

                for(let i: number = 0; i < word.name.length; i++) {                          
                    x = word.x - i;
                    y = word.y;
                    if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.name[i]) {                        
                        isPlace = false;
                        return false;
                    }
                }

                if (isPlace) {
                    for(let i: number = 0; i < word.name.length; i++) {
                        this.board[word.x - i][word.y] = word.name[i];
                    }
                }
            break;
            case game.Direction.DOWN:
                index = word.x + word.name.length;
                if (index >= n) {
                    return false;
                }

                for(let i: number = 0; i < word.name.length; i++) {
                    x = word.x + i;
                    y = word.y;                          
                    if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.name[i]) {                        
                        isPlace = false;
                        return false;
                    }
                }                

                if (isPlace) {
                    for(let i: number = 0; i < word.name.length; i++) {
                        this.board[word.x + i][word.y] = word.name[i];
                    }
                }
            break;
            case game.Direction.LEFT:
                index = word.y - word.name.length;
                if (index < 0) {
                    return false;
                }

                for(let i: number = 0; i < word.name.length; i++) {                          
                    x = word.x;
                    y = word.y - i;
                    if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.name[i]) {                        
                        isPlace = false;
                        return false;
                    }
                }

                if (isPlace) {
                    for(let i: number = 0; i < word.name.length; i++) {
                        this.board[word.x][word.y - i] = word.name[i];
                    }
                }
            break;
            case game.Direction.RIGHT:
                index = word.y + word.name.length;
                if (index < 0) {
                    return false;
                }

                for(let i: number = 0; i < word.name.length; i++) {                          
                    x = word.x;
                    y = word.y + i;
                    if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.name[i]) {                        
                        isPlace = false;
                        return false;
                    }
                }

                if (isPlace) {
                    for(let i: number = 0; i < word.name.length; i++) {
                        this.board[word.x][word.y + i] = word.name[i];
                    }
                }
            break;
            case game.Direction.DOWNLEFT:
                xIndex = word.x + word.name.length;
                yIndex = word.y - word.name.length;
                if (xIndex >= n || yIndex < 0) {
                    return false;
                }

                for(let i: number = 0; i < word.name.length; i++) {                          
                    x = word.x + i;
                    y = word.y - i;
                    if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.name[i]) {                        
                        isPlace = false;
                        return false;
                    }
                }

                if (isPlace) {
                    for(let i: number = 0; i < word.name.length; i++) {
                        this.board[word.x + i][word.y - i] = word.name[i];
                    }
                }
            break;
            case game.Direction.DOWNRIGHT:
                xIndex = word.x + word.name.length;
                yIndex = word.y + word.name.length;
                if (xIndex >= n || yIndex >= n) {
                    return false;
                }

                for(let i: number = 0; i < word.name.length; i++) {                          
                    x = word.x + i;
                    y = word.y + i;
                    if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.name[i]) {                        
                        isPlace = false;
                        return false;
                    }
                }

                if (isPlace) {
                    for(let i: number = 0; i < word.name.length; i++) {
                        this.board[word.x + i][word.y + i] = word.name[i];
                    }
                }
            break;
            case game.Direction.UPLEFT:
                xIndex = word.x - word.name.length;
                yIndex = word.y - word.name.length;
                if (xIndex < 0 || yIndex < 0) {
                    return false;
                }

                for(let i: number = 0; i < word.name.length; i++) {                          
                    x = word.x - i;
                    y = word.y - i;
                    if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.name[i]) {                        
                        isPlace = false;
                        return false;
                    }
                }

                if (isPlace) {
                    for(let i: number = 0; i < word.name.length; i++) {
                        this.board[word.x - i][word.y - i] = word.name[i];
                    }
                }
            break;
            case game.Direction.UPRIGHT:
                xIndex = word.x - word.name.length;
                yIndex = word.y + word.name.length;
                if (xIndex < 0 || yIndex >= n) {
                    return false;
                }

                for(let i: number = 0; i < word.name.length; i++) {                          
                    x = word.x - i;
                    y = word.y + i;
                    if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.name[i]) {                        
                        isPlace = false;
                        return false;
                    }
                }

                if (isPlace) {
                    for(let i: number = 0; i < word.name.length; i++) {
                        this.board[word.x - i][word.y + i] = word.name[i];
                    }
                }
            break;
        }

        return true;
    }
}


