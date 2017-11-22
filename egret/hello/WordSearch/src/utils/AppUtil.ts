class AppUtil {
    public static stageWidth;
    public static stageHeight;

    public static getPaintColor(color: string): number {
        switch(color.toLowerCase()) {
            case "red":
                return game.PaintColor.RED;
            case "blue":
                return game.PaintColor.BLUE;
            case "green":
                return game.PaintColor.GREEN;
        }
    }
}