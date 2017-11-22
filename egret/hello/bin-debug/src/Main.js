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
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var words = [
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
    };
    Main.prototype.createBoard = function (n, words) {
        this.board = this.initBoard(n);
        for (var i = 0; i < words.length; i++) {
            var result = false;
            while (!result) {
                var word = this.randomWord(n, words[i]);
                console.log(word);
                result = this.placeWords(n, word);
                console.log(result);
                if (result) {
                    break;
                }
            }
        }
        console.log(this.board);
    };
    /**
     * 随机word位置和方向
     */
    Main.prototype.randomWord = function (n, name) {
        var word = new Word();
        word.x = Math.floor(Math.random() * n);
        word.y = Math.floor(Math.random() * n);
        word.direction = Math.round(Math.random() * 7);
        word.name = name;
        return word;
    };
    /**
     * 初始化board
     */
    Main.prototype.initBoard = function (n) {
        var board = [];
        for (var i = 0; i < n; i++) {
            board[i] = [];
            for (var j = 0; j < n; j++) {
                board[i][j] = "";
            }
        }
        return board;
    };
    /**
     * 插入word
     */
    Main.prototype.placeWords = function (n, word) {
        var index;
        var xIndex;
        var yIndex;
        var isPlace = true;
        var x;
        var y;
        switch (word.direction) {
            case game.Direction.UP:
                index = word.x - word.name.length;
                if (index < 0) {
                    return false;
                }
                for (var i = 0; i < word.name.length; i++) {
                    x = word.x - i;
                    y = word.y;
                    if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.name[i]) {
                        isPlace = false;
                        return false;
                    }
                }
                if (isPlace) {
                    for (var i = 0; i < word.name.length; i++) {
                        this.board[word.x - i][word.y] = word.name[i];
                    }
                }
                break;
            case game.Direction.DOWN:
                index = word.x + word.name.length;
                if (index >= n) {
                    return false;
                }
                for (var i = 0; i < word.name.length; i++) {
                    x = word.x + i;
                    y = word.y;
                    if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.name[i]) {
                        isPlace = false;
                        return false;
                    }
                }
                if (isPlace) {
                    for (var i = 0; i < word.name.length; i++) {
                        this.board[word.x + i][word.y] = word.name[i];
                    }
                }
                break;
            case game.Direction.LEFT:
                index = word.y - word.name.length;
                if (index < 0) {
                    return false;
                }
                for (var i = 0; i < word.name.length; i++) {
                    x = word.x;
                    y = word.y - i;
                    if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.name[i]) {
                        isPlace = false;
                        return false;
                    }
                }
                if (isPlace) {
                    for (var i = 0; i < word.name.length; i++) {
                        this.board[word.x][word.y - i] = word.name[i];
                    }
                }
                break;
            case game.Direction.RIGHT:
                index = word.y + word.name.length;
                if (index < 0) {
                    return false;
                }
                for (var i = 0; i < word.name.length; i++) {
                    x = word.x;
                    y = word.y + i;
                    if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.name[i]) {
                        isPlace = false;
                        return false;
                    }
                }
                if (isPlace) {
                    for (var i = 0; i < word.name.length; i++) {
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
                for (var i = 0; i < word.name.length; i++) {
                    x = word.x + i;
                    y = word.y - i;
                    if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.name[i]) {
                        isPlace = false;
                        return false;
                    }
                }
                if (isPlace) {
                    for (var i = 0; i < word.name.length; i++) {
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
                for (var i = 0; i < word.name.length; i++) {
                    x = word.x + i;
                    y = word.y + i;
                    if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.name[i]) {
                        isPlace = false;
                        return false;
                    }
                }
                if (isPlace) {
                    for (var i = 0; i < word.name.length; i++) {
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
                for (var i = 0; i < word.name.length; i++) {
                    x = word.x - i;
                    y = word.y - i;
                    if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.name[i]) {
                        isPlace = false;
                        return false;
                    }
                }
                if (isPlace) {
                    for (var i = 0; i < word.name.length; i++) {
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
                for (var i = 0; i < word.name.length; i++) {
                    x = word.x - i;
                    y = word.y + i;
                    if (this.board[x][y] != "" || this.board[x][y] != "" && this.board[x][y] != word.name[i]) {
                        isPlace = false;
                        return false;
                    }
                }
                if (isPlace) {
                    for (var i = 0; i < word.name.length; i++) {
                        this.board[word.x - i][word.y + i] = word.name[i];
                    }
                }
                break;
        }
        return true;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map