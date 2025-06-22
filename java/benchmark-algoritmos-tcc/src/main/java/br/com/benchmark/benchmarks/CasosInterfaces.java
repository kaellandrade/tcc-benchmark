package br.com.benchmark.benchmarks;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.infra.Blackhole;

public interface CasosInterfaces {

    @Benchmark
    public void melhorCaso(Blackhole bh);

    @Benchmark
    public void casoMedio(Blackhole bh);

    @Benchmark
    public void piorCasoEncontrado(Blackhole bh);

}
