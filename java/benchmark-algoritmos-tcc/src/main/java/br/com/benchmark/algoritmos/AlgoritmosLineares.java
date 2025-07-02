package br.com.benchmark.algoritmos;

import java.util.*;

public class AlgoritmosLineares {

    public static int buscaLinear(int[] array, int n) {
        for (int i = 0; i < array.length; i++)
            if (i == n)
                return i;

        return -1;
    }

    public static int somarElementosArray(int[] array) {
        int resultado = 0;
        for (int i : array) {
            resultado += i;
        }
        return resultado;
    }

    /**
     * O(n/2) -> O(n)
     * 
     * @param palavra1
     * @return
     */
    public static boolean isPalindromo(String palavra1) {
        int lengthPalavra1 = palavra1.length();

        int i = 0;
        int j = lengthPalavra1 - 1;

        while (i < j) {
            if (palavra1.charAt(i) != palavra1.charAt(j))
                return false;
            i++;
            j--;
        }
        return true;
    }

    public static Map<String, Integer> contarFrequencia(String[] elementos) {
        Map<String, Integer> mapContador = new HashMap<>();
        for (String valor : elementos) {
            Integer contador = mapContador.get(valor);
            if (contador == null) {
                mapContador.put(valor, 1);
                continue;
            }
            mapContador.put(valor, ++contador);

        }
        return mapContador;
    }

    public static Set<String> removerDuplicadasComSet(Collection<String> values) {
        return new HashSet<>(values);
    }

}
