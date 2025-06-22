package br.com.benchmark.benchmarks.O_log_n;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Param;
import org.openjdk.jmh.infra.Blackhole;

import br.com.benchmark.algoritmos.AlgoritmosLogN;
import br.com.benchmark.benchmarks.BaseBenchmark;

public class CountSetBits extends BaseBenchmark {

    @Param({ "10", "10000" })
    private int number;

    @Benchmark
    public void countSetBits(Blackhole bh) {
        bh.consume(AlgoritmosLogN.countSetBits(number));
    }
}
