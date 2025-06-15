import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

/**
 * TODO: Refatorar também essa classe para utilizar o SimpleBenchmark
 */
public class AlgoritmosConstantes {
    static final int N_VEZES = 1000;
    static final Map<Integer, String> hashMap = new HashMap<>(N_VEZES);

    public static void main(String[] args) {

        AlgoritmosConstantes.testarParNVezes(N_VEZES);
        AlgoritmosConstantes.trocarValorNVezes(N_VEZES);
        AlgoritmosConstantes.acessarElementoArrayNvezes(N_VEZES);
        AlgoritmosConstantes.inserirRemovePilha(N_VEZES);
        AlgoritmosConstantes.acessoHashMap(N_VEZES);

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
        Stack<String> pilha = new Stack<>();
        for (int i = 0; i < N; i++) {
            pilha.push("Item: " + i);
            System.out.print(i + " adicionado");
            System.out.println("Item removido:" + pilha.pop());
        }

    }

    private static void acessoHashMap(int N) {

        for (Integer i = 0; i < N; i++) {
            String item = AlgoritmosConstantes.hashMap.get(i);
            System.out.println("Valor: " + item);
        }

    }

}
