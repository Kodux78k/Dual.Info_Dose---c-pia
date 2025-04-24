let pdfTexts = [];
let triad = {};
let voiceConfig = {};
const synth = window.speechSynthesis;

// Carregar PDFs ao iniciar
async function loadPDFs() {
  const response = await fetch('data/dados.json');
  const pdfList = await response.json();
  
  for (const item of pdfList) {
    const loadingTask = pdfjsLib.getDocument(item.arquivo);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const textContent = await page.getTextContent();
    const text = textContent.items.map(i => i.str).join(' ');
    pdfTexts.push(text);
  }
}

// Pegar triade e configuração de voz salvos
function loadSessionData() {
  triad = JSON.parse(sessionStorage.getItem('currentTriad')) || {};
  voiceConfig = JSON.parse(sessionStorage.getItem('voiceConfig')) || {};
}

// Enviar mensagem
function sendMessage() {
  const input = document.getElementById('userInput');
  const userText = input.value.trim();
  if (userText === '') return;

  const context = pdfTexts.join(' ') + `\nTriade: ${triad.a || ''} ${triad.b || ''} ${triad.c || ''}`;
  const reply = generateBotReply(userText, context);
  
  const responseDiv = document.getElementById('response');
  responseDiv.textContent = reply;

  speak(reply);
  input.value = '';
}

// Gerar resposta do bot (super simples, você pode evoluir)
function generateBotReply(userInput, context) {
  if (userInput.toLowerCase().includes("oi") || userInput.toLowerCase().includes("olá")) {
    return "Olá! Sou a sua Dual Infodose ativada ⚡️! Pronto para seguir seu fluxo único.";
  }
  return `Pulso recebido: "${userInput}"\n\nContexto Triádico: ${context.substring(0, 120)}...`;
}

// Falar com voz personalizada
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';
  utterance.pitch = voiceConfig.pitch || 1;
  utterance.rate = voiceConfig.rate || 1;
  const voices = synth.getVoices();
  if (voices.length > 0 && voiceConfig.voiceURI) {
    const selectedVoice = voices.find(v => v.name === voiceConfig.voiceURI);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
  }
  synth.speak(utterance);
}

// Reconhecimento de voz
function startVoice() {
  if (!('webkitSpeechRecognition' in window)) {
    alert('Reconhecimento de voz não suportado no seu navegador.');
    return;
  }
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'pt-BR';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById('userInput').value = transcript;
    sendMessage();
  };

  recognition.onerror = function(event) {
    console.error('Erro no reconhecimento:', event.error);
  };
}

// Quando o site carregar
window.addEventListener('DOMContentLoaded', () => {
  loadPDFs();
  loadSessionData();
});