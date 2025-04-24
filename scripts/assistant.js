async function loadAssistente() {
  const triade = JSON.parse(sessionStorage.getItem('currentTriad')) || {};

  if (!triade.a || !triade.b || !triade.c) {
    document.getElementById('assistant-display').innerText = "Nenhuma tríade ativa.";
    return;
  }

  const response = await fetch('data/triads.json');
  const assistentes = await response.json();

  const selecionado = assistentes.find(assistente => 
    assistente.simbolos.includes(triade.a) &&
    assistente.simbolos.includes(triade.b) &&
    assistente.simbolos.includes(triade.c)
  );

  if (selecionado) {
    document.getElementById('assistant-display').innerText = `Assistente: ${selecionado.nome}`;
    sessionStorage.setItem('voiceConfig', JSON.stringify({
      pitch: selecionado.pitch,
      rate: selecionado.rate,
      voiceURI: selecionado.voice
    }));
  } else {
    document.getElementById('assistant-display').innerText = "Assistente padrão ativado.";
    sessionStorage.setItem('voiceConfig', JSON.stringify({
      pitch: 1,
      rate: 1,
      voiceURI: "Google português do Brasil"
    }));
  }
}

document.getElementById('activate-assistant').addEventListener('click', () => {
  window.location.href = 'index.html';
});

// Quando carregar a página
window.addEventListener('DOMContentLoaded', () => {
  loadAssistente();
});