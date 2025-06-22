package br.com.benchmark.benchmarks.O_n;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Param;
import org.openjdk.jmh.infra.Blackhole;

import br.com.benchmark.algoritmos.AlgoritmosLineares;
import br.com.benchmark.benchmarks.BaseBenchmark;

public class VerificarPalindromo extends BaseBenchmark {
    @Param({ "adamaadmirouorimdaamada", "adiasadatadasaida", "agramaeamarga" })
    private String palavra;

    @Benchmark
    public void verificarPalindromo(Blackhole bh) {
        bh.consume(AlgoritmosLineares.isPalindromo(palavra));
    }
}
