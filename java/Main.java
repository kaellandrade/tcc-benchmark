import java.util.PriorityQueue;

public class Main {

    public static void main(String[] args) {
        SimpleBenchmark benchmark = new SimpleBenchmark();

        // 1. Benchmark para inserção e remoção em uma Heap (PriorityQueue)
        benchmark.run("Heapify Insertion & Poll", () -> {
            PriorityQueue<Integer> heap = new PriorityQueue<>();
            int lengthInsertHeapify = 100000;
            for (int i = 0; i < lengthInsertHeapify; i++) {
                heap.add(i);
            }
            System.out.println("Elemento removido da heap: " + heap.poll());
        });

        // 2. Benchmark para Busca Binária em um array grande
        benchmark.run("Busca Binária", () -> {
            int arrayLength = 50_000_000; // Reduzido para evitar OutOfMemoryError em algumas máquinas
            int[] arrayOrdenado = new int[arrayLength];
            for (int i = 0; i < arrayLength; i++) {
                arrayOrdenado[i] = 2 + 2 * i;
            }
            int valorProcurado = 20000;
            int indexResult = LogNAlgorithms.buscaBinaria(arrayOrdenado, valorProcurado);
            System.out.println("Busca Binária encontrou o valor? " + (indexResult != -1));
        });

        // 3. Benchmark para Contagem de Bits
        benchmark.run("Count Set Bits", () -> {
            int bitwiseNumber = 342343;
            int totalBits = LogNAlgorithms.countSetBits(bitwiseNumber);
            System.out.println("Total de bits '1' em " + bitwiseNumber + ": " + totalBits);
        });

        // 4. Benchmark para Exponenciação por Quadratura
        benchmark.run("Exponenciação por Quadratura", () -> {
            long resultado = LogNAlgorithms.exponentiatingBySquaring(3, 20); // Expoente maior para gastar mais tempo
            System.out.println("Resultado de 3^20: " + resultado);
        });
    }
}