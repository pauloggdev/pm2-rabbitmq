<template>
<div class="candidatura">
    <h1>Candidatura</h1>
    <logout />
    <ModalAlert @close="closeModal" :visible="isModalVisible" />
    <div class="form-candidatura">
        <form>
            <input type="text" v-model="candidatura.nome" />
            <span v-if="errors.nome" style="color:red">{{ errors.nome }}</span>
            <br><br>
            <input type="email" v-model="candidatura.email" />
            <span v-if="errors.email" style="color:red">{{ errors.email }}</span>
            <br><br>
            <input type="file" @change="onFileChange" />
            <span v-if="errors.file" style="color:red">{{ errors.file }}</span> 

            <br><br>
            <button @click.prevent="enviarCandidatura" :disabled="isLoading">
                <span v-if="isLoading" class="spinner"></span>
                <span v-if="isLoading"> Carregando...</span>
                <span v-else>Enviar Candidatura</span></button>
        </form>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import Logout from "@/components/Logout.vue";
import ModalAlert from "@/components/ModalAlert.vue"
import {mapError}  from '@/utils/MapError.ts'
export default {
    components: {
        Logout,
        ModalAlert

    },
    name: 'Candidatura',
    data() {
        return {
            candidatura: {
                nome: 'teste',
                email: 'teste@gmail.com',
                docBI: null,
            },
            isLoading: false,
            isModalVisible: false,
            errors:{}

        }
    },
    methods: {
        async enviarCandidatura() {
            this.isLoading = true;
            const formData = new FormData();
            formData.append("nome", this.candidatura.nome);
            formData.append("email", this.candidatura.email);
            formData.append("docBI", this.candidatura.docBI);
            try {
                const responseData = await axios.post(`http://89.116.73.64:4000/registerStudent`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if (responseData.status == 200) {
                    this.isLoading = false;
                    this.isModalVisible = true;
                    this.candidatura = {}
                    this.$router.push({
                        name: "Home"
                    })
                }
            } catch (error) {
                this.isLoading = false;
                this.isModalVisible = false;
                this.errors = mapError(error.response.data.errors);
            }
        },
        onFileChange() {
            this.candidatura.docBI = event.target.files[0]; // Armazena o arquivo selecionado
        },
        closeModal() {
            this.isModalVisible = false;
        }
    }
}
</script>

<style scoped>
button {
    position: relative;
    padding-left: 30px;
    padding-right: 30px;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Estilos para o spinner */
.spinner {
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-top: 2px solid #000;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    display: inline-block;
    animation: spin 0.6s linear infinite;
    margin-right: 5px;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
