package br.com.benchmark.benchmarks.O_log_n;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.infra.Blackhole;

import br.com.benchmark.algoritmos.AlgoritmosLogN;
import br.com.benchmark.benchmarks.BaseBuscaAbstract;
import br.com.benchmark.benchmarks.CasosInterfaces;

public class BuscaBinaria extends BaseBuscaAbstract implements CasosInterfaces {

    @Benchmark
    public void melhorCaso(Blackhole bh) {
        bh.consume(AlgoritmosLogN.buscaBinaria(array, elementoMelhorCaso));
    }

    @Benchmark
    public void casoMedio(Blackhole bh) {
        bh.consume(AlgoritmosLogN.buscaBinaria(array, elementoCasoMedio));
    }

    @Benchmark
    public void piorCasoEncontrado(Blackhole bh) {
        bh.consume(AlgoritmosLogN.buscaBinaria(array, elementoPiorCaso));
    }

}