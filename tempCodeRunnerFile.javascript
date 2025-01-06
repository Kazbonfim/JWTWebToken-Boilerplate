function Pokemon(nome, tipo, nivel) {
    this.nome = nome;
    this.tipo = tipo;
    this.nivel = nivel;
    this.atacar = function () {
        console.log(`Meu Pokémon ${this.nome} atacou`);
    };
}

const charmander = new Pokemon("Charmander", "Fogo", 10);
const squirtle = new Pokemon("Squirtle", "Água", 10);
const bulbassauro = new Pokemon("Bulbassauro", "Fogo", 10);

charmander.atacar(); // Charmander usou um ataque do tipo Fogo!