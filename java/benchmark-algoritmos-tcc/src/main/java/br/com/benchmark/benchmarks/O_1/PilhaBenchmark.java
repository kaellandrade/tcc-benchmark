package br.com.benchmark.benchmarks.O_1;

import java.util.Stack;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Level;
import org.openjdk.jmh.annotations.Param;
import org.openjdk.jmh.annotations.Setup;
import org.openjdk.jmh.infra.Blackhole;

import br.com.benchmark.algoritmos.AlgoritmosConstantes;
import br.com.benchmark.benchmarks.BaseBenchmark;

public class PilhaBenchmark extends BaseBenchmark {

    private Stack<String> originalPilha;
    private Stack<String> pilhaParaTeste; // Pilha usada em cada invocação para evitar contaminação
    private static final String ELEMENTO_PARA_INSERIR = "Novo Elemento";

    @Param({ "100", "1000" })
    private int initialSize;

    @Setup(Level.Trial)
    public void setupTrialState() {

        // Setup para a pilha original
        originalPilha = new Stack<>();
        for (int i = 0; i < initialSize; i++) {
            originalPilha.push("Elemento " + i);
        }

    }

    @Benchmark
    public void push_O_1(Blackhole bh) {
        // Opera na cópia da pilha (pilhaParaTeste) para não contaminar o estado.
        AlgoritmosConstantes.inserirNaPilha(ELEMENTO_PARA_INSERIR, pilhaParaTeste);
        // Consumir a pilha garante que a operação não seja eliminada.
        bh.consume(pilhaParaTeste);
    }

    @Benchmark
    public void pop_O_1(Blackhole bh) {
        bh.consume(AlgoritmosConstantes.removerNaPilha(pilhaParaTeste));
    }

}
