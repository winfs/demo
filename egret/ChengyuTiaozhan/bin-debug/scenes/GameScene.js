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
var game;
(function (game) {
    /**
     * 游戏界面
     */
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            var _this = _super.call(this) || this;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
            _this.skinName = "skins.GameSceneSkin";
            return _this;
        }
        // 对象变量
        GameScene.prototype.initLevel = function (level) {
            this.levelIndex = level;
            var levelData = game.LevelDataManager.getInstance().getLevelData(level); // 获取关卡数据
            // 将字段接起来
            var words = levelData.answer + levelData.word;
            // 随机一个其它题目的字段混合进本题目
            while (words.length == 10) {
                var i = Math.floor(Math.random() * 400);
                if (i != level) {
                    var temp = game.LevelDataManager.getInstance().getLevelData(i);
                    words += temp.word + temp.answer;
                }
            }
            // 对字段重排
            var wordList = [];
            for (var i = 0; i < words.length; i++) {
                wordList.push(words.charAt(i));
            }
            wordList = this.randomList(wordList);
            // 对问题字赋值
            for (var i = 0; i < this.group_words.numChildren; i++) {
                var wordrect = this.group_words.getChildAt(i);
                wordrect.setWordText(wordList[i]);
                wordrect.visible = true;
            }
            // 重置一些状态
            for (var i = 0; i < this.group_answer.numChildren; i++) {
                var answerrect = this.group_answer.getChildAt(i);
                answerrect.SetSelectWord(null);
                answerrect.visible = true;
                answerrect.SelectWord = null;
            }
            // 显示图像
            this.img_question.source = "resource/assets/" + levelData.img;
        };
        // 将一个数列随机
        GameScene.prototype.randomList = function (arr) {
            var array = [];
            while (arr.length > 0) {
                var i = Math.floor(Math.random() * arr.length);
                array.push(arr[i]);
                arr.splice(i, 1);
            }
            return array;
        };
        // 当字点击的时候，由word类抛出
        GameScene.prototype.onclick_word = function (word) {
            // 找到一个合适的位置添加进答案内容
            var sel = null;
            for (var i = 0; i < this.group_words.numChildren; i++) {
                var answer_1 = this.group_answer.getChildAt(i);
                if (answer_1.SelectWord == null) {
                    sel = answer_1;
                    break;
                }
            }
            // 当有一个合适的位置的时候就会将字填充，并判断是否胜利
            if (sel != null) {
                sel.SetSelectWord(word);
                // 判断是否胜利
                var check_str = "";
                for (var i = 0; i < this.group_answer.numChildren; i++) {
                    var answer = this.group_answer.getChildAt(i);
                    check_str += answer.getWordText();
                }
                if (check_str == game.LevelDataManager.getInstance().getLevelData(this.levelIndex).answer) {
                    //胜利
                    this.showWin();
                }
            }
        };
        GameScene.prototype.onComplete = function () {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
            this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_back, this);
            this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_next, this);
        };
        GameScene.prototype.onclick_back = function () {
            game.SceneManager.getInstance().dispath(game.SceneType.GAME_LEVEL, this);
        };
        /**
         * 点击进入下一题
         */
        GameScene.prototype.onclick_next = function () {
            this.group_win.visible = false;
            game.LevelScene.getInstance().openLevel(this.levelIndex + 1);
            this.initLevel(this.levelIndex + 1);
        };
        /**
         * 显示胜利界面
         */
        GameScene.prototype.showWin = function () {
            this.group_win.visible = true;
            var levelData = game.LevelDataManager.getInstance().getLevelData(this.levelIndex);
            this.lb_from.text = levelData.tip;
            this.lb_explain.text = levelData.content;
        };
        GameScene.prototype.start = function () {
            this.btn_back.touchEnabled = true;
            this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_back, this);
        };
        GameScene.prototype.end = function () {
            this.btn_back.touchEnabled = false;
            if (this.btn_back.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_back, this);
            }
        };
        return GameScene;
    }(game.BaseScene));
    game.GameScene = GameScene;
    __reflect(GameScene.prototype, "game.GameScene");
})(game || (game = {}));
//# sourceMappingURL=GameScene.js.map