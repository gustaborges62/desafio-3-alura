/**
 * ==============================================================================
 * GERENCIADOR DE TAREFAS - GUIA DIDÁTICO DE CÓDIGO
 * ==============================================================================
 * Este arquivo contém a inteligência e as regras de negócio da nossa aplicação.
 * Ele está dividido em seções para que você possa entender o passo a passo de como
 * o JavaScript se conecta com a página web e manipula os dados.
 */

// ==============================================================================
// 1. SELEÇÃO DE ELEMENTOS DO HTML (DOM - Document Object Model)
// ==============================================================================
// Aqui "pegamos" as tags do HTML pelos seus IDs ou classes para podermos manipulá-las.
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');

// Elementos dos contadores numéricos
const totalCountEl = document.getElementById('totalCount');
const pendingCountEl = document.getElementById('pendingCount');
const completedCountEl = document.getElementById('completedCount');

// Botões de filtro e botão de alternar tema
const filterTabs = document.querySelectorAll('.filter-tab');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const currentDateEl = document.getElementById('currentDate');

// ==============================================================================
// 2. ESTADO DA APLICAÇÃO (STATE)
// ==============================================================================
// As variáveis de "estado" guardam as informações dinâmicas da nossa aplicação.
// Buscamos as tarefas salvas no localStorage (memória do navegador) ou começamos vazios [].
let tasks = JSON.parse(localStorage.getItem('minhas_tarefas')) || [];
let currentFilter = 'all'; // 'all', 'pending' ou 'completed'

// ==============================================================================
// 3. INICIALIZAÇÃO DA APLICAÇÃO
// ==============================================================================
// Executado assim que a página é carregada.
document.addEventListener('DOMContentLoaded', () => {
  exibirDataAtual();
  carregarTemaSalvo();
  renderizar();
});

/**
 * Mostra a data de hoje formatada em português (ex: "Quinta-feira, 29 de out.")
 */
function exibirDataAtual() {
  const agora = new Date();
  const opcoes = { weekday: 'long', day: 'numeric', month: 'short' };
  currentDateEl.textContent = agora.toLocaleDateString('pt-BR', opcoes);
}

// ==============================================================================
// 4. FUNCIONALIDADES PRINCIPAIS (ADICIONAR, CONCLUIR, REMOVER)
// ==============================================================================

/**
 * 4.1 ADICIONAR TAREFA
 * Recebe o texto digitado pelo usuário e cria um novo objeto de tarefa.
 */
function adicionarTarefa(texto) {
  const textoLimpo = texto.trim();

  // Validação: não adiciona se o campo estiver vazio
  if (!textoLimpo) return;

  // Criamos um objeto que representa a tarefa
  const novaTarefa = {
    id: Date.now(),          // Usamos o timestamp atual como identificador único
    text: textoLimpo,        // O que o usuário escreveu
    completed: false         // Toda nova tarefa começa como pendente (false)
  };

  // Adicionamos a nova tarefa no início da lista (unshift)
  tasks.unshift(novaTarefa);

  salvarERenderizar();
}

/**
 * 4.2 MARCAR COMO CONCLUÍDA / PENDENTE (ALTERNAR STATUS)
 * Inverte o valor de `completed` (de false para true, ou vice-versa).
 */
function alternarStatusTarefa(id) {
  tasks = tasks.map(tarefa => {
    if (tarefa.id === id) {
      // Inverte o estado atual: se era false vira true, se era true vira false
      return { ...tarefa, completed: !tarefa.completed };
    }
    return tarefa;
  });

  salvarERenderizar();
}

/**
 * 4.3 REMOVER TAREFA
 * Filtra a lista mantendo apenas as tarefas cujo id seja diferente do informado.
 */
function removerTarefa(id) {
  tasks = tasks.filter(tarefa => tarefa.id !== id);
  salvarERenderizar();
}

// ==============================================================================
// 5. ATUALIZAÇÃO DA TELA (RENDERIZAÇÃO)
// ==============================================================================

/**
 * Atualiza o localStorage e refaz o desenho das tarefas e contadores na tela.
 */
function salvarERenderizar() {
  // Salva no navegador como texto JSON para não perder ao recarregar a página
  localStorage.setItem('minhas_tarefas', JSON.stringify(tasks));
  renderizar();
}

/**
 * Desenha na tela a lista de tarefas e os contadores atualizados.
 */
function renderizar() {
  atualizarContadores();

  // Filtra as tarefas de acordo com a aba selecionada
  const tarefasFiltradas = tasks.filter(tarefa => {
    if (currentFilter === 'pending') return !tarefa.completed;
    if (currentFilter === 'completed') return tarefa.completed;
    return true; // 'all' retorna todas
  });

  // Limpa o conteúdo atual da lista
  taskList.innerHTML = '';

  // Se não houver tarefas para exibir, mostramos o aviso visual (empty state)
  if (tarefasFiltradas.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');

    // Cria os elementos visuais de cada tarefa
    tarefasFiltradas.forEach(tarefa => {
      const li = criarElementoTarefa(tarefa);
      taskList.appendChild(li);
    });
  }
}

/**
 * Constrói o elemento HTML <li> de uma tarefa específica.
 */
function criarElementoTarefa(tarefa) {
  const li = document.createElement('li');
  // Se a tarefa estiver concluída, adicionamos a classe 'completed' para aplicar o visual verde e tachado
  li.className = `task-item ${tarefa.completed ? 'completed' : ''}`;
  li.setAttribute('data-id', tarefa.id);

  // Definimos a etiqueta de status visual (Badge)
  const statusLabel = tarefa.completed ? '✓ Concluída' : '⏳ Pendente';
  const statusClass = tarefa.completed ? 'badge-completed' : 'badge-pending';

  // Estrutura interna da tarefa:
  // - Checkbox estético
  // - Detalhes (Texto digitado + Etiqueta visual de status)
  // - Botão de lixeira para exclusão
  li.innerHTML = `
    <div class="task-content">
      <div class="custom-checkbox" aria-label="Marcar como concluída">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div class="task-details">
        <span class="task-text">${escaparHTML(tarefa.text)}</span>
        <span class="task-badge ${statusClass}">${statusLabel}</span>
      </div>
    </div>
    <button class="btn-delete" title="Excluir tarefa" aria-label="Excluir tarefa">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 6h18"></path>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    </button>
  `;

  // Evento de clique para concluir/desconcluir (ao clicar no checkbox ou no texto)
  const taskContent = li.querySelector('.task-content');
  taskContent.addEventListener('click', () => {
    alternarStatusTarefa(tarefa.id);
  });

  // Evento de clique para remover a tarefa (ao clicar no botão da lixeira)
  const deleteBtn = li.querySelector('.btn-delete');
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita acionar o clique da linha
    removerTarefa(tarefa.id);
  });

  return li;
}

/**
 * Atualiza os números no topo (Total, Pendentes e Concluídas)
 */
function atualizarContadores() {
  const total = tasks.length;
  const concluidas = tasks.filter(t => t.completed).length;
  const pendentes = total - concluidas;

  totalCountEl.textContent = total;
  pendingCountEl.textContent = pendentes;
  completedCountEl.textContent = concluidas;
}

/**
 * Função utilitária de segurança: evita que códigos maliciosos inseridos no texto quebrem a página (XSS)
 */
function escaparHTML(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

// ==============================================================================
// 6. EVENTOS DO USUÁRIO (FORMULÁRIO, FILTROS E TEMA)
// ==============================================================================

// Envio do formulário ao clicar em Adicionar ou pressionar Enter
taskForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Impede que a página recarregue ao submeter o formulário
  adicionarTarefa(taskInput.value);
  taskInput.value = ''; // Limpa o campo de texto
  taskInput.focus();    // Mantém o cursor no campo para digitar a próxima
});

// Clique nas abas de filtro ("Todas", "Pendentes", "Concluídas")
filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Atualiza a classe ativa visualmente
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Atualiza a variável de filtro e re-renderiza
    currentFilter = tab.getAttribute('data-filter');
    renderizar();
  });
});

// ==============================================================================
// 7. MODO CLARO / ESCURO (DARK MODE)
// ==============================================================================

/**
 * Alterna entre os temas Claro e Escuro, salvando a escolha do usuário
 */
function alternarTema() {
  const root = document.documentElement;
  const temaAtual = root.getAttribute('data-theme');
  const novoTema = temaAtual === 'dark' ? 'light' : 'dark';

  root.setAttribute('data-theme', novoTema);
  localStorage.setItem('tema_preferido', novoTema);
}

/**
 * Carrega a preferência de tema do usuário ao abrir o site
 */
function carregarTemaSalvo() {
  const temaSalvo = localStorage.getItem('tema_preferido');
  if (temaSalvo) {
    document.documentElement.setAttribute('data-theme', temaSalvo);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Se o sistema operacional do usuário estiver em modo escuro por padrão
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

// Evento do botão de tema
themeToggleBtn.addEventListener('click', alternarTema);
