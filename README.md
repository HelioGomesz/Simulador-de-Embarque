<h1 align="center"> Projeto LumIdeias - Simulador de Embarque </h1>

# Descrição do Projeto

Este é um projeto voltado para o programa LumIdeias, programa de melhoria contínua da Lumicenter da Amazônia do <a href="https://www.lumicenteriluminacao.com.br">Grupo Lumicenter Lighting</a>.

Esse projeto visa automatizar os processo de simulação de embarques que auxiliam na tarefa de planejamento tanto da área de PCP quanto na área da logística.

## Badges

![Simulador de Embarque](https://img.shields.io/badge/Simulador%20de%20Embarque-blue)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![HTML](https://img.shields.io/badge/HTML-orange)
![CSS](https://img.shields.io/badge/CSS-pink)
![JavaScript](https://img.shields.io/badge/JavaScript-gold)

## Status do Projeto

Em fase correção de bugs e pré-test.

## To do List

- Nanny

  - [x] Ajuste dos elementos na tela de simulador ![](https://img.shields.io/badge/-%20Concluído-green)
  - [x] Criação de botões interativos e flutuantes ![](https://img.shields.io/badge/-%20Concluído-green)
  - [x] Ajuste na opção de exportar pdf no click ![](https://img.shields.io/badge/-%20Concluído-green)
  - [x] Design dos botões/pallets para ficar mais visual ao preencher ![](https://img.shields.io/badge/-%20Concluído-green)
  - [x] Cupom de embarque formato tabela ![](https://img.shields.io/badge/-%20Concluído-green)
  - [x] Seleção de multiplos pallets ![](https://img.shields.io/badge/-%20Concluído-green)
  - [x] Desmembrar estrutura dos códigos(html/₢ss/js) ![](https://img.shields.io/badge/-%20Concluído-green)
  - [x] Endereçamento sequencial da simulação(html/₢ss/js) ![](https://img.shields.io/badge/-%20Concluído-green)
  - [x] Avaliar necessidade de Bot para pré simulação conforme demanda de embarque![](https://img.shields.io/badge/-%20Concluído-green)
  - [x] Visualização do PDF ![](https://img.shields.io/badge/-%20Concluído-green)
  - [x] Ajuste da página de configurações ![](https://img.shields.io/badge/-%20Concluído-green)
  - [x] Volume do container completo ![](https://img.shields.io/badge/-%20Concluído-green)
  - [x] Resumo Geral da simulação (Produtos e quantidade) ![](https://img.shields.io/badge/-Em%20Desenvolvimento-yellow)

- Hélio

  - [x] Cálculo de ocupação de container ![](https://img.shields.io/badge/-%20Concluído-green)
  - [x] Criação do ícone WEb/App ![](https://img.shields.io/badge/-%20Concluído-green)
  - [x] Criação de rotas GET, POST, PUT e DELETE ![](https://img.shields.io/badge/-%20Concluído-green)
  - [x] Conexão com banco de dados MongoDB ![](https://img.shields.io/badge/-%20Concluído-green)
  - [x] Teste Build ![](https://img.shields.io/badge/-Em%20Desenvolvimento-yellow)

## Simulador de Embarque


## 🚀 Funcionalidades Principais

### 1. **Multiseleção de Pallets**

- Selecione múltiplos pallets clicando em cada um
- Visual de seleção com bordas azuis e sombras
- Botão flutuante para adicionar produtos em múltiplos pallets simultaneamente

### 2. **Valores Padrões Cadastrados previamente na página de configurações**

- **Pallets PP (Pequenos)**: Recebem automaticamente valores padrões PP do produto
- **Pallets PG (Grandes)**: Recebem automaticamente valores padrões PG do produto
- **Multiseleção mista**: Cada tipo de pallet recebe seus próprios valores padrões

### 3. **Unificação de Pallets Especiais**

- **Unificação Única**: Para um par PP+PG (ex: P1+G2)
- **Unificação Múltipla**: Para múltiplos pares PP+PG simultaneamente


### Produtos Elegíveis para Unificação:

- **LM0008-20000840**
- **LM0008-20000850**
- **LM0012-24000840**
- **LM0012-24000850**

### 4. **Cadastro de Novos Produtos**

- No botão de incluir você pode adicionar um produto baseado nos campos estabelecidos
- A lista de produtos cadastrados que aparecem na página podem ser editados ou excluídos
- É possível realizar a busca de produto específico (Digite os primeiros 5 dígitos do produto) e clique na lupa para realizar a busca
- No botão de limpar, será desfeito a busca e retorna a lista completa de produtos cadastrados
- Caso necessite da lista de produtos já cadastrados, há disponível um botão de exportar para o excel.

## 📋 Instruções de Uso

### Multiseleção para Produtos:

1. Clique em múltiplos pallets para selecioná-los
2. Use o botão flutuante azul (+) para abrir o modal
3. Selecione o produto desejado
4. Os campos são preenchidos automaticamente com valores padrões
5. Ajuste quantidade/peso conforme necessário
6. Clique em "Incluir" para adicionar em todos os pallets selecionados

### Multiseleção para Unificação:

1. Selecione pares de pallets PP+PG consecutivos
2. Use o botão flutuante laranja (🔗🔗) para unificação múltipla
3. Selecione um produto especial
4. Confirme a operação
5. Todos os pares são unificados simultaneamente

## 🔧 Arquivos Principais

- **`simuladorDeEmbarque_7.0.2.js`**: Lógica principal do simulador
- **`unificacao.js`**: Funções de unificação (única e múltipla)
- **`simuladorDeEmbarque_7.0.2.css`**: Estilos e animações
- **`simuladorDeEmbarque_7.0.2.html`**: Interface principal

## 🚨 Limitações e Regras

### Para Unificação:

- Apenas produtos especiais (LM0008, LM0012)
- Pares devem ser consecutivos (P1+G2, P3+G4, etc.)
- Ambos os pallets devem estar vazios
- Não é possível unificar pallets já ocupados

### Para Multiseleção:

- Máximo de 3 produtos por pallet
- Produtos da mesma família no mesmo pallet
- Valores padrões específicos por tipo de pallet

# Tecnologias utilizadas

- VsCode
- Node.Js
- JavaScript
- HTML
- CSS
- ELECTRON.JS
- Mongo DB
- Axios
- Express.js

# Equipe

- Hélio Gomes
- Nanny Alves
- Rivelino Farias

# Conclusão

- Previsão Outubro/2025



