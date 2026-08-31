// Seleção dos elementos do HTML
const btnModoEscuro = document.getElementById('btnModoEscuro');
const btnAumentarFonte = document.getElementById('btnAumentarFonte');
const btnDiminuirFonte = document.getElementById('btnDiminuirFonte');
const btnLeituraVoz = document.getElementById('btnLeituraVoz');

const body = document.body;
const textoConteudo = document.getElementById('textoConteudo');

// --- 1. CONFIGURAÇÃO DO MODO ESCURO  ---
btnModoEscuro.addEventListener('click', () => {
    body.classList.toggle('modo-escuro');
    
    if(body.classList.contains('modo-escuro')) {
        btnModoEscuro.textContent = 'Modo Comum 🕯️';
    } else {
        btnModoEscuro.textContent = 'Modo escuro';
    }
});

// --- 2. GERENCIADOR DE TAMANHO DE FONTE ---
let tamanhoFonteAtual = 18;

btnAumentarFonte.addEventListener('click', () => {
    if (tamanhoFonteAtual < 28) { 
        tamanhoFonteAtual += 2;   
        atualizarTamanhoFonte();
    }
});

btnDiminuirFonte.addEventListener('click', () => {
    if (tamanhoFonteAtual > 14) { 
        tamanhoFonteAtual -= 2;   
        atualizarTamanhoFonte();
    }
});

function atualizarTamanhoFonte() {
    textoConteudo.style.fontSize = `${tamanhoFonteAtual}px`;
    
    const elementosInternos = textoConteudo.querySelectorAll('p, h2, h3, strong, span');
    elementosInternos.forEach(elemento => {
        if (elemento.tagName === 'H2') {
            elemento.style.fontSize = `${tamanhoFonteAtual + 6}px`;
        } else if (elemento.tagName === 'H3') {
            elemento.style.fontSize = `${tamanhoFonteAtual + 3}px`;
        } else {
            elemento.style.fontSize = `${tamanhoFonteAtual}px`;
        }
    });
}

// --- 3. SÍNTESE DE VOZ ---
let executandoLeitura = false;
let sinteseVoz;

btnLeituraVoz.addEventListener('click', () => {
    if (executandoLeitura) {
        window.speechSynthesis.cancel();
        btnLeituraVoz.textContent = 'Ouvir Texto 🔊';
        executandoLeitura = false;
        return;
    }

    const textoParaLer = textoConteudo.innerText;

    if (textoParaLer.trim() !== "") {
        sinteseVoz = new SpeechSynthesisUtterance(textoParaLer);
        sinteseVoz.lang = 'pt-BR';
        sinteseVoz.rate = 0.9; // Ritmo mais calmo e focado no mistério

        sinteseVoz.onend = () => {
            btnLeituraVoz.textContent = 'Ouvir Texto 🔊';
            executandoLeitura = false;
        };

        window.speechSynthesis.speak(sinteseVoz);
        btnLeituraVoz.textContent = 'Parar Leitura ⏹️';
        executandoLeitura = true;
    }
});