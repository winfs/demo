module game {
	/**
	 * Scene基类
	 */
	export class BaseScene extends eui.Component {
        public constructor() {
            super();
        }

        private static instance: any;

        public static getInstance(): any {
            if (this.instance == null) {
                this.instance = new this();
            }

            return this.instance;
        }

        /**
         * 进入场景时，注册场景内的事件侦听器
         */
        public start() {

        }

        /**
         * 离开场景时，移除场景内的事件侦听器
         */
        public end() {

        }
    }
}