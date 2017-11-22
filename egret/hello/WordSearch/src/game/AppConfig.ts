module game {
    export var M: number = 10;
    export var N: number = 14;

    export enum Mode {
        CLASSIC,
        NORMAL,
    }

    export enum Direction {
        UP,
        DOWN,
        LEFT,
        RIGHT,
        DOWNLEFT,
        DOWNRIGHT,
        UPLEFT,
        UPRIGHT,
    }

    export enum PaintColor {
        RED = 0xFF6699,
        BLUE = 0x1E90FF,
        GREEN = 0x33CCCC,
    }

    export var Color: string[] = [
        "RED", "BLUE", "GREEN"
    ];
}