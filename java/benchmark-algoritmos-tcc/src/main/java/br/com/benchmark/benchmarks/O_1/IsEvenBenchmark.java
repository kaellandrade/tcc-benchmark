package br.com.benchmark.benchmarks.O_1;

import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.infra.Blackhole;
import br.com.benchmark.algoritmos.AlgoritmosConstantes;
import br.com.benchmark.benchmarks.BaseBenchmark;

public class IsEvenBenchmark extends BaseBenchmark {

    @Param({"1", "500", "1000000"})
    private int valorParaIsEven;

    @Benchmark
    public void isEven_O_1(Blackhole bh) {
        bh.consume(AlgoritmosConstantes.isEven(valorParaIsEven));
    }
}