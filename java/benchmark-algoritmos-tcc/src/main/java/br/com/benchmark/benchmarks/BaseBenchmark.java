package br.com.benchmark.benchmarks;

import org.openjdk.jmh.annotations.*;
import java.util.concurrent.TimeUnit;

/**
 * Esta classe abstrata contém todas as configurações comuns do JMH
 * que serão compartilhadas por outras classes de benchmark.
 * As anotações do JMH são herdadas pelas subclasses.
 */
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@State(Scope.Benchmark)
@Fork(value = 3)
@Warmup(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS)
@Measurement(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS)
public abstract class BaseBenchmark {
}