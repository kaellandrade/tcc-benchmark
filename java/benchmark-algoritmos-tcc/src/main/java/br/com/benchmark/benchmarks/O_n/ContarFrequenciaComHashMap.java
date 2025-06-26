package br.com.benchmark.benchmarks.O_n;

import br.com.benchmark.algoritmos.AlgoritmosLineares;
import br.com.benchmark.benchmarks.BaseBenchmark;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Level;
import org.openjdk.jmh.annotations.Param;
import org.openjdk.jmh.annotations.Setup;
import org.openjdk.jmh.infra.Blackhole;

import java.util.Random;

public class ContarFrequenciaComHashMap extends BaseBenchmark {

    @Param({"100000"})
    protected int lengthArray;
    String[] array;

    @Setup(Level.Trial)
    public void setup() {
        array = new String[lengthArray];
        Random random = new Random();
        for (int i = 0; i < lengthArray; i++) {
            int valorAleatorio = random.nextInt(lengthArray);
            array[i] = String.valueOf(valorAleatorio);
        }

    }

    @Benchmark
    public void contadorFrequencia(Blackhole bh) {
        System.out.println(AlgoritmosLineares.contarFrequencia(array));
//        bh.consume(AlgoritmosLineares.contarFrequencia(array));
    }

}
