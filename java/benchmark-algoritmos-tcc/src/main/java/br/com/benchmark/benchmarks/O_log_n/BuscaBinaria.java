package br.com.benchmark.benchmarks.O_log_n;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.infra.Blackhole;

import br.com.benchmark.algoritmos.AlgoritmosLogN;
import br.com.benchmark.benchmarks.BaseBuscaAbstract;

public class BuscaBinaria extends BaseBuscaAbstract {
    @Benchmark
    public void casoMedio(Blackhole bh) {
        bh.consume(AlgoritmosLogN.buscaBinaria(array, elementoCasoMedio));
    }
}