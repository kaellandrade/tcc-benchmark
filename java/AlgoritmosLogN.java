import java.util.PriorityQueue;

public class AlgoritmosLogN {
    static final int LENGTH_INSERT_HEAPIFY = 10;
    static final int ARRAY_LENGTH = 100000;
    static final int[] ARRAY_ORDENADO = new int[ARRAY_LENGTH];
    static final int BITWISE_NUMBER = 342343; // em binário é 1010011100101000111

    public static void main(String[] args) {
        // AlgoritmosLogN.testBuscaBinaria();
        // AlgoritmosLogN.testHeapify();
        // int totalBits = AlgoritmosLogN.countSetBits(BITWISE_NUMBER);
        // System.out.println(totalBits);

        long resultadoBaseExp = AlgoritmosLogN.exponentiatingBysquaring(3,10);
        System.out.println(resultadoBaseExp);;
    }

    private static void testHeapify() {
        PriorityQueue<Integer> heap = new PriorityQueue<>();

        // preenchendo a Heapify
        for (int i = 0; i < LENGTH_INSERT_HEAPIFY; i++)
            heap.add(i);

        System.out.println(heap.poll());
    }

    private static void testBuscaBinaria() {
        AlgoritmosLogN.iniciarArrayOrdenado();
        int valorProcurado = 20000;
        int indexResult = AlgoritmosLogN.buscaBinaria(ARRAY_ORDENADO, valorProcurado);
        if (indexResult != -1)
            System.out.println(ARRAY_ORDENADO[indexResult] == valorProcurado);
        else
            System.out.println("Não existe no array!");
    }

    static private void iniciarArrayOrdenado() {
        for (int i = 0; i < ARRAY_ORDENADO.length; i++)
            ARRAY_ORDENADO[i] = 2 + 2 * i; // 2, 4, 6, 8 ...
    }

    /**
     * Retorna o index do valor caso exista no aray, -1 caso contrário.
     * 
     * @param n
     * @return
     */
    static private int buscaBinaria(int[] array, int n) {
        int inicio = 0;
        int fim = array.length - 1;
        while (inicio <= fim) {
            int meio = inicio + (fim - inicio) / 2;
            if (array[meio] == n) {
                return meio;
            }

            else if (array[meio] < n)
                inicio = meio + 1;
            else
                fim = meio - 1;
        }

        return -1;

    }

    /**
     * Pega um número inteiro e retorna todos os bits ativos em sua representação
     * binária.
     * 
     * Time Complexity: O(log n)
     * Auxiliary Space: O(1)
     * 
     * Referências: https://www.geeksforgeeks.org/dsa/count-set-bits-in-an-integer/
     * 
     * @param n
     * @return
     */
    static private int countSetBits(int n) {
        int totalBits1 = 0;
        while (n > 0) {
            totalBits1 += n & 1;
            n >>= 1;
        }

        return totalBits1;
    }

   public static long exponentiatingBysquaring(long base, long expoente) {
        if (expoente < 0) {
            throw new IllegalArgumentException("Expoente não pode ser negativo.");
        }
        
        long resultado = 1L; // Inicializa o resultado como 1 (L indica que é um long)

        while (expoente > 0) {
            // Se o expoente for ímpar (o último bit é 1)
            if (expoente % 2 == 1) {
                resultado *= base;
            }

            // Eleva a base ao quadrado para a próxima iteração
            base *= base;

            // Divide o expoente por 2 (deslocamento de bits para a direita)
            expoente /= 2;
        }

        return resultado;
    }

}
