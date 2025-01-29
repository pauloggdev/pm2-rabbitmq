<template>
    <div>
        <p>
            <a @click.prevent="logout" href="#">Sair</a>
        </p>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            localStorage.removeItem('token');
            this.$router.push('/login');
        }
    }
}

</script>