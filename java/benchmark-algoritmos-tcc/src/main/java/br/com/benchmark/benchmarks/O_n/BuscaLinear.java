package br.com.benchmark.benchmarks.O_n;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.infra.Blackhole;

import br.com.benchmark.algoritmos.AlgoritmosLineares;
import br.com.benchmark.benchmarks.BaseBuscaAbstract;

public class BuscaLinear extends BaseBuscaAbstract {

    @Benchmark
    public void buscaLinear(Blackhole bh) {
        bh.consume(AlgoritmosLineares.buscaLinear(array, elementoCasoMedio));
    }

}