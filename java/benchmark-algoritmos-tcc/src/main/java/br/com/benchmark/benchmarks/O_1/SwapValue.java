package br.com.benchmark.benchmarks.O_1;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Level;
import org.openjdk.jmh.annotations.Setup;
import org.openjdk.jmh.infra.Blackhole;

import br.com.benchmark.algoritmos.AlgoritmosConstantes;
import br.com.benchmark.benchmarks.BaseBenchmark;

public class SwapValue extends BaseBenchmark {

    private int[] dataForSwap;

    /**
     * Adicionado @Setup(Level.Invocation) para os testes que modificam o estado
     */
    @Setup(Level.Invocation)
    public void setupInvocationState() {
        // Prepara um array novo antes de cada chamada de swap
        dataForSwap = new int[] { 10, 20, 30, 40, 50 };
    }

    @Benchmark
    public void swapInValue_O_1(Blackhole bh) {
        AlgoritmosConstantes.swapInArray(dataForSwap, 0, 1);
        bh.consume(dataForSwap);
    }
}
