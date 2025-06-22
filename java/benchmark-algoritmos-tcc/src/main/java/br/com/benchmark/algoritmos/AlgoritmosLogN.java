package br.com.benchmark.algoritmos;
public final class AlgoritmosLogN {

   
    private AlgoritmosLogN() {}

    /**
     * Encontra o índice de um valor em um array ordenado.
     * @param array O array ordenado para a busca.
     * @param n O valor a ser procurado.
     * @return O índice do valor, ou -1 se não for encontrado.
     */
    public static int buscaBinaria(int[] array, int n) {
        int inicio = 0;
        int fim = array.length - 1;
        while (inicio <= fim) {
            int meio = inicio + (fim - inicio) / 2; // Evita overflow para arrays gigantes
            if (array[meio] == n) {
                return meio;
            } else if (array[meio] < n) {
                inicio = meio + 1;
            } else {
                fim = meio - 1;
            }
        }
        return -1;
    }

    /**
     * Conta a quantidade de bits "1" na representação binária de um inteiro.
     * @param n O número a ser analisado.
     * @return A contagem de bits ativos.
     */
    public static int countSetBits(int n) {
        int totalBits1 = 0;
        while (n > 0) {
            totalBits1 += n & 1; // Adiciona 1 se o último bit for 1
            n >>= 1; // Desloca os bits para a direita
        }
        return totalBits1;
    }

    /**
     * Calcula a potência de um número usando o método de exponenciação por quadratura.
     * @param base A base da operação.
     * @param expoente O expoente (deve ser não-negativo).
     * @return O resultado de base elevado ao expoente.
     */
    public static long exponentiatingBySquaring(long base, long expoente) {
        if (expoente < 0) {
            throw new IllegalArgumentException("Expoente não pode ser negativo.");
        }
        long resultado = 1L;
        while (expoente > 0) {
            if (expoente % 2 == 1) {
                resultado *= base;
            }
            base *= base;
            expoente /= 2;
        }
        return resultado;
    }
}