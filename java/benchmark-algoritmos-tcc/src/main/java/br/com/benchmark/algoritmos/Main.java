import java.util.*;

public class Main {

    private static final int TAMANHO_ARRAY_BUSCA = 1_000_000;
    private static final int ITERACOES_BUSCA = 200_000;

    private static final int TAMANHO_ARRAY_SORT = 50_000;

    private static final int ITERACOES_O1 = 50_000_000;
    private static final int ITERACOES_ON = 5;

    public static void main(String[] args) {
        System.out.println("=== INICIANDO BENCHMARK DCOMPLAB (JAVA) ===");
        System.out.println("Ambiente: " + System.getProperty("os.name") + " - " + System.getProperty("java.version"));
        System.out.println("--------------------------------------------------");

        System.out.println(">> Gerando dados aleatórios...");
        int[] arrayGrande = gerarArrayAleatorio(TAMANHO_ARRAY_BUSCA);
        int[] arrayParaOrdenar = gerarArrayAleatorio(TAMANHO_ARRAY_SORT);

        int[] arrayOrdenado = Arrays.copyOf(arrayGrande, arrayGrande.length);
        Arrays.sort(arrayOrdenado);

        System.out.println(">> Dados gerados. Iniciando testes com precisão ajustada...");
        System.out.println("--------------------------------------------------");

        // --- Teste O(1): Constante ---
        long nsO1 = medirTempo(() -> {
            for (int i = 0; i < ITERACOES_O1; i++) {
                AlgoritmosConstantes.isEven(i);
            }
        });
        imprimirResultado("O(1) - isEven (" + ITERACOES_O1 + " ops)", nsO1);

        // --- Teste O(n): Linear ---
        long nsOn = medirTempo(() -> {
            // Repete algumas vezes para garantir que capture tempo mensurável
            for (int k = 0; k < ITERACOES_ON; k++) {
                AlgoritmosLineares.somarElementosArray(arrayGrande);
            }
        });

        imprimirResultado("O(n) - Soma Array (" + TAMANHO_ARRAY_BUSCA + " els)", nsOn / ITERACOES_ON);

        // --- Teste O(log n): Logarítmico ---
        long nsLogN = medirTempo(() -> {
            for (int i = 0; i < ITERACOES_BUSCA; i++) {
                // Busca valor -1 (pior caso, percorre todo log n)
                AlgoritmosLogN.buscaBinaria(arrayOrdenado, -1);
            }
        });
        imprimirResultado("O(log n) - Busca Binária (" + ITERACOES_BUSCA + " buscas)", nsLogN);

        int[] cloneParaSort = Arrays.copyOf(arrayParaOrdenar, arrayParaOrdenar.length);
        long nsNLogN = medirTempo(() -> {
            AlgoritmosNLogN.mergeSort(cloneParaSort);
        });
        imprimirResultado("O(n log n) - Merge Sort (" + TAMANHO_ARRAY_SORT + " elements)", nsNLogN);

        System.out.println("--------------------------------------------------");
        System.out.println("=== FIM DO BENCHMARK ===");
    }

    /**
     * Mede o tempo e retorna em NANOSSEGUNDOS
     */
    public static long medirTempo(Runnable tarefa) {
        // Warm-up simples
        try {
            tarefa.run();
        } catch (Exception e) {
        }

        long inicio = System.nanoTime();
        tarefa.run();
        long fim = System.nanoTime();

        return (fim - inicio);
    }

    /**
     * Imprime o resultado formatando nanossegundos para milissegundos com casas
     * decimais.
     */
    public static void imprimirResultado(String nomeTeste, long tempoNs) {
        // Converte ns para ms com ponto flutuante
        double tempoMs = tempoNs / 1_000_000.0;

        // Formata para 4 casas decimais para pegar tempos como 0.0050 ms
        System.out.println(String.format("%-45s : %.4f ms", nomeTeste, tempoMs));
    }

    public static int[] gerarArrayAleatorio(int tamanho) {
        Random random = new Random();
        int[] array = new int[tamanho];
        for (int i = 0; i < tamanho; i++) {
            array[i] = random.nextInt(100000);
        }
        return array;
    }

    static class AlgoritmosConstantes {
        public static boolean isEven(int n) {
            return n % 2 == 0;
        }
    }

    static class AlgoritmosLineares {
        public static int somarElementosArray(int[] array) {
            int resultado = 0;
            for (int i : array)
                resultado += i;
            return resultado;
        }
    }

    static class AlgoritmosLogN {
        public static int buscaBinaria(int[] array, int n) {
            int inicio = 0;
            int fim = array.length - 1;
            while (inicio <= fim) {
                int meio = inicio + (fim - inicio) / 2;
                if (array[meio] == n)
                    return meio;
                else if (array[meio] < n)
                    inicio = meio + 1;
                else
                    fim = meio - 1;
            }
            return -1;
        }
    }

    static class AlgoritmosNLogN {
        public static int[] mergeSort(int[] data) {
            int[] helper = new int[data.length];
            sortArray(data, helper, 0, data.length - 1);
            return data;
        }

        private static void sortArray(int[] data, int[] helper, int low, int high) {
            if (low < high) {
                int middle = (low + high) / 2;
                sortArray(data, helper, low, middle);
                sortArray(data, helper, middle + 1, high);
                merge(data, helper, low, middle, high);
            }
        }

        private static void merge(int[] data, int[] helper, int low, int middle, int high) {
            for (int i = low; i <= high; i++)
                helper[i] = data[i];
            int helperLeft = low;
            int helperRight = middle + 1;
            int current = low;
            while (helperLeft <= middle && helperRight <= high) {
                if (helper[helperLeft] <= helper[helperRight]) {
                    data[current] = helper[helperLeft];
                    helperLeft++;
                } else {
                    data[current] = helper[helperRight];
                    helperRight++;
                }
                current++;
            }
            int remaining = middle - helperLeft;
            for (int i = 0; i <= remaining; i++) {
                data[current + i] = helper[helperLeft + i];
            }
        }
    }
}
