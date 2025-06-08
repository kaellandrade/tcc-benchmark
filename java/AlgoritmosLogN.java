public class AlgoritmosLogN {
    static final int ARRAY_LENGTH = 100000;
    static final int[] ARRAY_ORDENADO = new int[ARRAY_LENGTH];

    public static void main(String[] args) {
        AlgoritmosLogN.iniciarArrayOrdenado();
        int valorProcurado = 20000;
        int indexResult = AlgoritmosLogN.buscaBinaria(ARRAY_ORDENADO, valorProcurado);
        if (indexResult != -1) 
            System.out.println(ARRAY_ORDENADO[indexResult] == valorProcurado);
        else System.out.println("Não existe no array!");
    }

    static private void iniciarArrayOrdenado() {
        for (int i = 0; i < ARRAY_ORDENADO.length; i++)
            ARRAY_ORDENADO[i] = 2 + 2 * i; // 2, 4, 6, 8 ...
    }

    /**
     * Retorna o index do valor caso exista no aray, -1 caso contrário.
     * 
     * @param n
     * @return
     */
    static private int buscaBinaria(int[] array, int n) {
        int inicio = 0;
        int fim = array.length - 1;
        while (inicio <= fim) {
            int meio = inicio + (fim - inicio) / 2;
            if (array[meio] == n) {
                return meio;
            }

            else if (array[meio] < n)
                inicio = meio + 1;
            else
                fim = meio - 1;
        }

        return -1;

    }

}
