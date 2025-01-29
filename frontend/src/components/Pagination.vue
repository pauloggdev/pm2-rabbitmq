<template>
    <div class="pagination">
      <!-- Botão de página anterior, desativado se estiver na primeira página -->
      <button 
        :disabled="currentPage === 1" 
        @click="changePage(currentPage - 1)">
        Anterior
      </button>
  
      <!-- Exibir números de páginas -->
      <button 
        v-for="page in totalPages" 
        :key="page" 
        :class="{ active: page === currentPage }"
        @click="changePage(page)">
        {{ page }}
      </button>
  
      <!-- Botão de próxima página, desativado se estiver na última página -->
      <button 
        :disabled="currentPage === totalPages" 
        @click="changePage(currentPage + 1)">
        Próxima
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: {
        type: Number,
        default: 1,
      },
      totalPages: {
        type: Number,
        required: true,
      },
    },
    methods: {
      changePage(page) {
        // Emitir o evento para o componente pai
        this.$emit('page-changed', page);
      },
    },
  };
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  button {
    padding: 5px 10px;
  }
  button.active {
    font-weight: bold;
    border: 2px solid blue;
  }
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  </style>
  