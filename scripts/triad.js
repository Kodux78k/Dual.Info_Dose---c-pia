const centros = ["⭕️", "🜁", "🔮", "🪐", "🜂"];
const lados = ["⚡️", "✨", "🔥", "🌑", "💫"];

let centroAtual = "⭕️";
let lado1Atual = "⚡️";
let lado2Atual = "⚡️";

// Atualizar a caixa de exibição da tríade
function updateTriadDisplay() {
  const display = document.getElementById('triadDisplay');
  display.innerText = `${lado1Atual} ${centroAtual} ${lado2Atual}`;
}

// Gerar um novo centro
function generateCentro() {
  centroAtual = centros[Math.floor(Math.random() * centros.length)];
  updateTriadDisplay();
}

// Gerar novos lados
function generateLados() {
  lado1Atual = lados[Math.floor(Math.random() * lados.length)];
  lado2Atual = lados[Math.floor(Math.random() * lados.length)];
  updateTriadDisplay();
}

// Gerar tríade completa
function generateTriad() {
  generateCentro();
  generateLados();
}

// Ativar a tríade: salvar no sessionStorage e ir para o chat
function activateTriad() {
  const triade = { a: lado1Atual, b: centroAtual, c: lado2Atual };
  sessionStorage.setItem('currentTriad', JSON.stringify(triade));
  window.location.href = "assistant.html";
}