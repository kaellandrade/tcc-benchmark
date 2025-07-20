package br.com.benchmark.benchmarks;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.infra.Blackhole;

public interface CasosInterfaces {

    @Benchmark
    void melhorCaso(Blackhole bh);

    @Benchmark
    void casoMedio(Blackhole bh);

    @Benchmark
    void piorCaso(Blackhole bh);

}
