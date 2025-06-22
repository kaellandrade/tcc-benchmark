package br.com.benchmark.benchmarks.O_log_n;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Param;
import org.openjdk.jmh.infra.Blackhole;

import br.com.benchmark.algoritmos.AlgoritmosLogN;
import br.com.benchmark.benchmarks.BaseBenchmark;

public class ExponentiatingBySquaring extends BaseBenchmark {

    @Param({ "2", "10", "20" })
    private int EXP;

    @Benchmark
    public void exponentiatingBySquaring(Blackhole bh) {
        bh.consume(AlgoritmosLogN.exponentiatingBySquaring(10, EXP));

    }

}
