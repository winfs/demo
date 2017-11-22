module game {
    export class Word {
        public text: string;
        public direction: game.Direction;
        public chars: game.Char[] = [];
    }
}