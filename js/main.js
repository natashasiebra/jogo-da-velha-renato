window.onload = () =>{
    "use strinct";
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("./sw.js");
    }
};
const resetButton = document.getElementById('reset-button');

// Adiciona um evento de clique ao botão de reiniciar
resetButton.addEventListener('click', resetBoard);

let playerXWins = 0;
let playerOWins = 0;

const playerXWinsElement = document.getElementById('player-x-wins');
const playerOWinsElement = document.getElementById('player-o-wins');

// Obtém todos os elementos das células do tabuleiro
const cells = document.querySelectorAll('.cell');

// Variável para controlar o jogador atual (X ou O)
let currentPlayer = 'X';

// Adiciona um evento de clique a cada célula
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Função para lidar com o clique em uma célula
function handleCellClick(event) {
    const cell = event.target;
    
    // Verifica se a célula já foi preenchida
    if (cell.textContent !== '') {
        return;
    }
    
    // Preenche a célula com o símbolo do jogador atual
    cell.textContent = currentPlayer;
    
    // Verifica se houve um vencedor
    if (checkWinner()) {
        alert(`Jogador ${currentPlayer} venceu!`);
        resetBoard();
        return;
    }
    
    // Alterna o jogador atual
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
}

// Função para verificar se há um vencedor
function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6] // Diagonais
    ];
    
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            // Incrementa a contagem de vitórias do jogador correspondente
            if (currentPlayer === 'X') {
                playerXWins++;
                playerXWinsElement.textContent = playerXWins;
            } else if (currentPlayer === 'O') {
                playerOWins++;
                playerOWinsElement.textContent = playerOWins;
            }
            
            return true;
        }
    }

    return false;
}

// Função para reiniciar o tabuleiro
function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
}
