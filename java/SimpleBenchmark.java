/**
 * Uma classe simples para encapsular a lógica de medição de performance
 * (tempo de execução e memória consumida) de uma tarefa.
 */
public class SimpleBenchmark {

    /**
     * Executa uma tarefa e mede seu desempenho.
     * @param benchmarkName O nome do benchmark para identificação no console.
     * @param task A tarefa a ser executada, encapsulada em um Runnable.
     */
    public void run(String benchmarkName, Runnable task) {
        System.out.println("--- Executando Benchmark: " + benchmarkName + " ---");

        // Tenta limpar a memória para uma medição mais consistente
        System.gc();

        Runtime runtime = Runtime.getRuntime();
        long memoriaAntes = runtime.totalMemory() - runtime.freeMemory();
        long tempoAntes = System.nanoTime();

        // Executa a tarefa (o algoritmo)
        task.run();

        long tempoDepois = System.nanoTime();
        long memoriaDepois = runtime.totalMemory() - runtime.freeMemory();

        long duracaoNs = tempoDepois - tempoAntes;
        long memoriaConsumidaBytes = memoriaDepois - memoriaAntes;

        System.out.printf("Tempo de execução: %.3f ms%n", duracaoNs / 1_000_000.0);
        System.out.printf("Memória consumida: %.3f MB%n", memoriaConsumidaBytes / (1024.0 * 1024.0));
        System.out.println("--- Fim do Benchmark: " + benchmarkName + " ---\n");
    }
}