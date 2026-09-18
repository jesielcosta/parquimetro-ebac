class Parquimetro {
    // Campos privados: só acessíveis de dentro da própria classe.
    // Ninguém fora do Parquimetro pode ler ou alterar isso diretamente.
    #valor;
    #faixas;

    constructor(valor) {
        this.#valor = valor;

        // Tabela de faixas, da maior pra menor (importante pro passo 3,
        // quando formos procurar a primeira faixa que o valor cobre)
        this.#faixas = [
            { valor: 3.00, tempo: 120 },
            { valor: 1.75, tempo: 60 },
            { valor: 1.00, tempo: 30 },
        ];
    }

    #encontrarFaixa() {
        for (const faixa of this.#faixas) {

            if (this.#valor >= faixa.valor) {
                return faixa;
            }
        }
        return null;
    }

    calcularResultado() {
        const faixa = this.#encontrarFaixa();

        if (faixa === null) {
            return {
                sucesso: false,
                mensagem: "Valor insuficiente ou inválido!",
            }
        }

        const troco = this.#valor - faixa.valor;

        return {
            sucesso: true,
            tempo: faixa.tempo,
            troco: troco,
        };
    }
}


function calcularEstadia() {
    // 1. Pegue o valor digitado no input e converta pra número
    const valorInserido = parseFloat(document.getElementById("valorInserido").value);

    // 2. Crie uma instância do Parquimetro com esse valor
    const parquimetro = new Parquimetro(valorInserido);

    // 3. Chame o método público e guarde o resultado
    const resultado = parquimetro.calcularResultado();

    // 4. Verifique resultado.sucesso
    if (resultado.sucesso == false) {
        document.getElementById("valorInserido").value = "";
        document.getElementById("resultado").textContent = resultado.mensagem;
        document.getElementById("troco").textContent = "";
        return;
    }

    // 5. Se chegou aqui, deu certo — escreva tempo e troco na tela
    document.getElementById("resultado").textContent = "Estacionamento liberado! Você tem: " +  resultado.tempo + " minutos";
    document.getElementById("troco").textContent = "Troco: " + resultado.troco.toFixed(2);
}
