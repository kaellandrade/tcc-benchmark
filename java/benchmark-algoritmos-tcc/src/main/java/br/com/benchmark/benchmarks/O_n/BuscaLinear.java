package br.com.benchmark.benchmarks.O_n;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.infra.Blackhole;

import br.com.benchmark.algoritmos.AlgoritmosLineares;
import br.com.benchmark.benchmarks.BaseBuscaAbstract;
import br.com.benchmark.benchmarks.CasosInterfaces;

public class BuscaLinear extends BaseBuscaAbstract implements CasosInterfaces {

    @Benchmark
    public void melhorCaso(Blackhole bh) {
        bh.consume(AlgoritmosLineares.buscaLinear(array, elementoMelhorCaso));
    }

    @Benchmark
    public void casoMedio(Blackhole bh) {
        bh.consume(AlgoritmosLineares.buscaLinear(array, elementoCasoMedio));
    }

    @Benchmark
    public void piorCasoEncontrado(Blackhole bh) {
        bh.consume(AlgoritmosLineares.buscaLinear(array, elementoPiorCaso));
    }
}