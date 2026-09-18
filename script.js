class Parquimetro {
    #valor;
    #faixas;

    constructor(valor) {
        this.#valor = valor;
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
    const valorInserido = parseFloat(document.getElementById("valorInserido").value);
    const parquimetro = new Parquimetro(valorInserido);
    const resultado = parquimetro.calcularResultado();

    if (resultado.sucesso == false) {
        document.getElementById("valorInserido").value = "";
        document.getElementById("resultado").textContent = resultado.mensagem;
        document.getElementById("troco").textContent = "";
        return;
    }

    document.getElementById("resultado").textContent = "Estacionamento liberado! Você tem: " +  resultado.tempo + " minutos";
    document.getElementById("troco").textContent = "Troco: R$ " + resultado.troco.toFixed(2);
}
