# 📋 Gerenciador de Tarefas (To-Do List)

> Uma aplicação web simples, intuitiva e moderna para gerenciamento de tarefas diárias, desenvolvida com foco didático para quem está dando os primeiros passos no aprendizado de programação.

---

## 🎯 Intenção do Projeto

Este projeto nasceu para transformar a teoria do desenvolvimento web em algo prático e visual. 

Ao invés de usar ferramentas complexas que exigem instalações demoradas (como Node.js, compiladores ou frameworks pesados), este projeto foi construído usando **a base fundamental da web**:
- **HTML5**: a estrutura e o esqueleto da página;
- **CSS3**: a beleza, as cores, os temas e o design responsivo;
- **JavaScript (Vanilla)**: a inteligência, as regras e a interatividade com o usuário.

Tudo roda diretamente no seu próprio navegador de internet com apenas dois cliques!

---

## ✨ Funcionalidades Principais

1. ➕ **Adicionar Tarefas**:
   - Digite sua atividade no campo e pressione `Enter` ou clique em **Adicionar**.
   - Validação automática: não permite tarefas em branco.
   - O campo limpa sozinho e mantém o cursor pronto para a próxima digitação.

2. ✅ **Diferenciação Visual Intuitiva entre Tarefas**:
   - **Tarefas Pendentes**: Apresentam uma faixa lateral azul/índigo no card e uma etiqueta destacando o status `⏳ PENDENTE`.
   - **Tarefas Concluídas**: Ao clicar para concluir, a faixa lateral muda instantaneamente para verde, o checkbox ganha um símbolo de verificação, o texto fica riscado e surge a etiqueta `✓ CONCLUÍDA`.
   - Desta forma, em uma olhada rápida você sabe exatamente o que ainda precisa fazer e o que já finalizou.

3. 🗑️ **Remover Tarefas**:
   - Clique no ícone de lixeira vermelha para excluir uma tarefa da sua lista quando não for mais necessária.

4. 📊 **Painel de Contadores em Tempo Real**:
   - Três cartões informativos no topo mostram o **Total de Tarefas**, quantas estão **Pendentes** e quantas já foram **Concluídas**.
   - Os números se atualizam automaticamente sempre que você adiciona, conclui ou remove um item.

5. 🔍 **Abas de Filtro**:
   - **Todas**: Exibe a lista completa.
   - **Pendentes**: Mostra somente as atividades que faltam realizar.
   - **Concluídas**: Mostra apenas as atividades que você já terminou.

6. 🌗 **Alternador de Tema (Modo Claro & Escuro)**:
   - Botão no cabeçalho com ícones de Sol e Lua para alternar a interface entre o modo claro e o modo escuro a qualquer momento.

7. 💾 **Salvamento Automático (LocalStorage)**:
   - Suas tarefas e sua preferência de tema ficam salvas na memória interna do seu navegador. Você pode recarregar a página (`F5`) ou fechar o navegador e voltar amanhã: suas tarefas continuarão lá!

---

## 📁 Estrutura de Arquivos

```
gerenciador de tarefas/
│
├── index.html       # Estrutura visual (cabeçalho, contadores, formulário e lista)
├── style.css        # Folha de estilos (cores, temas claro/escuro, animações e badges)
├── app.js           # Lógica do aplicativo (adicionar, concluir, remover e salvar)
└── README.md        # Documentação completa do projeto
```

---

## 🚀 Como Executar o Projeto

Você não precisa instalar nenhum programa adicional. Basta seguir estes passos:

1. Abra a pasta do projeto no seu computador:
   ```
   D:\projeto alura\gerenciador de tarefas
   ```
2. Dê **dois cliques** sobre o arquivo **`index.html`**.
3. O projeto abrirá automaticamente no seu navegador padrão (Google Chrome, Edge, Firefox, Brave, etc.).

---

## 🧠 Entendendo o Código (Guia para Iniciantes)

Se você nunca programou antes, veja como as três tecnologias trabalham juntas:

### 1. Como o JavaScript sabe o que você clicou? (Eventos)
No arquivo `app.js`, usamos comandos chamados `addEventListener` ("ouvintes de eventos"). Eles ficam atentos ao que o usuário faz:
- Quando você clica no botão "Adicionar", o JavaScript captura o texto do campo de digitação;
- Quando você clica em uma tarefa, o JavaScript localiza qual tarefa foi clicada pelo seu número de identificação (`id`) e inverte o estado `completed` (de falso para verdadeiro).

### 2. Como a tela muda de aparência? (Classes e CSS)
O JavaScript não pinta as cores diretamente; ele adiciona ou remove "etiquetas" (chamadas de **classes HTML**):
- Quando a tarefa está pendente, o HTML fica assim:
  ```html
  <li class="task-item"> ... </li>
  ```
- Quando você a conclui, o JavaScript altera o HTML para:
  ```html
  <li class="task-item completed"> ... </li>
  ```
- No arquivo `style.css`, existe uma regra que diz: *"Quando um elemento tiver a classe `completed`, pinte a borda de verde e risque o texto"*. É essa sinergia entre JavaScript e CSS que faz a mágica acontecer!

### 3. Como as tarefas não somem ao fechar a página? (LocalStorage)
O navegador possui uma gaveta interna chamada `localStorage`. Toda vez que você adiciona, conclui ou apaga uma tarefa, chamamos a função:
```javascript
localStorage.setItem('minhas_tarefas', JSON.stringify(tasks));
```
Isso converte sua lista de tarefas em um texto e guarda nessa gaveta. Quando você reabre o site, o JavaScript abre a gaveta e reconstrói as tarefas exatamente de onde parou.

---

## 🧪 Como Validar que Tudo Está Funcionando

Faça este passo a passo no seu navegador:

1. **Teste de Adição**: Digite `"Aprender programação"` e aperte Enter. A tarefa deve surgir com uma faixa azul à esquerda e a etiqueta `⏳ PENDENTE`.
2. **Teste de Conclusão**: Dê um clique sobre ela. Ela deve mudar para a faixa verde, o texto deve ser riscado e a etiqueta deve passar para `✓ CONCLUÍDA`. Veja se o contador de "Concluídas" subiu para 1.
3. **Teste de Filtros**: Clique na aba "Pendentes" (a tarefa concluída deve sumir temporariamente). Clique na aba "Concluídas" (ela volta a aparecer). Clique em "Todas" (todas voltam a aparecer).
4. **Teste de Tema**: Clique no ícone de sol/lua no topo para testar o modo escuro e o modo claro.
5. **Teste de Persistência**: Aperte `F5` para recarregar a página e veja que suas tarefas permanecem salvas.
6. **Teste de Remoção**: Clique no botão de lixeira da tarefa para removê-la da lista.

---

Desenvolvido com carinho para inspirar e impulsionar seus primeiros passos no universo do desenvolvimento web! ✨
