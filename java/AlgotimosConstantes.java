import java.util.Stack;

public class AlgotimosConstantes {
    static final int N_VEZES = 100;

    public static void main(String[] args) {

        AlgotimosConstantes.testarParNVezes(N_VEZES);
        AlgotimosConstantes.trocarValorNVezes(N_VEZES);
        AlgotimosConstantes.acessarElementoArrayNvezes(N_VEZES);
        AlgotimosConstantes.inserirRemovePilha(N_VEZES);


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

    private static void acessarElementoArray(int index, int[] arr) {
        System.out.println("Index acessado: " + arr[index]);
    }

    private static void acessarElementoArrayNvezes(int N) {
        int[] arr = new int[N];
        for (int i = 0; i < N; i++) {
            int index = i % N;
            acessarElementoArray(index, arr); // módulo para acessar posições diferentes do array
        }
    }

    private static void inserirRemovePilha(int N) {
        Stack<String> minhaPilha = new Stack<>();
        for (int i = 0; i < N; i++) {
            minhaPilha.push("Item: " + i);
            System.out.print(i + " adicionado");
            System.out.println("Item removido:" + minhaPilha.pop());
        }

    }

}
