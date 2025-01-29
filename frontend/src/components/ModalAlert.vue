<template>
    <div v-if="visible" class="modal-overlay">
        <div class="modal" :class="type">
          <h2>{{ type }}</h2>
          <p>{{ message }}</p>
          <button @click.prevent="closeModal">Fechar</button>
        </div>
      </div>
</template>
<script>
export default{
    props: {
        type:{
            type: String,
            default: "success"
        },
        message:{
            type: String,
            default: "Operação realizada com sucesso"
        },
        visible:{
            type: Boolean,
            default: true
        }

    },
    methods:{
        closeModal(){
            this.$emit("close");
        }
    }
}
</script>


<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Adicionado para garantir que fique sobre outros elementos */
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.modal.success {
  border-left: 5px solid green;
}

.modal.error {
  border-left: 5px solid red;
}

.modal.info {
  border-left: 5px solid blue;
}

.close-button {
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff; /* Estilo do botão */
  color: white;
}

.close-button:hover {
  background-color: #0056b3; /* Cor ao passar o mouse */
}

/* Animação */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>