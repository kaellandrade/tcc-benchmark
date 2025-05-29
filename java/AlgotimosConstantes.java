public class AlgotimosConstantes {
    static final int N_VEZES = 10000;

    public static void main(String[] args) {

        AlgotimosConstantes.testarParNVezes(N_VEZES);
        AlgotimosConstantes.trocarValorNVezes(N_VEZES);

    }

    private static boolean isEven(int n) {
        return n % 2 == 0;
    }

    private static void testarParNVezes(int N) {
        for (int i = 0; i < N; i++) {
            if (isEven(N)) {
                System.out.println("Par");
            }
            System.out.println("Ímpar");
        }
    }

    private static void trocarValorXY(int x, int y) {
        System.out.println("Antes: " + "x = " + x + "," + "y=" + y);
        int z;
        z = x;
        x = y;
        y = z;
        System.out.println("Depois: " + "x = " + x + "," + "y=" + y);

    }

    private static void trocarValorNVezes(int N) {
        for (int i = 0; i < N; i++) {
            int j = i + 1;
            trocarValorXY(j, i);
            System.out.println("Trocou!");
        }
    }

}
