package br.com.benchmark.benchmarks.O_n;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Level;
import org.openjdk.jmh.annotations.Param;
import org.openjdk.jmh.annotations.Setup;
import org.openjdk.jmh.infra.Blackhole;

import br.com.benchmark.algoritmos.AlgoritmosLineares;
import br.com.benchmark.benchmarks.BaseBenchmark;

public class SomaElementosArray extends BaseBenchmark {

    @Param({ "1000", "1000000", "10000000" })
    protected int lengthArray;

    protected int[] array;

    @Setup(Level.Trial)
    public void setup() {
        array = new int[lengthArray];
        for (int i = 0; i < lengthArray; i++) {
            array[i] = i * 2; 
        }

    }

    @Benchmark
    public void somarElementosArray(Blackhole bh) {
        bh.consume(AlgoritmosLineares.somarElementosArray(array));
    }
    
}
