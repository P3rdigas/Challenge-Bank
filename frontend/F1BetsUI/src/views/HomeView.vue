<script setup lang="ts">
// Home page logic
    import { ref } from 'vue';

    const isLogin = ref(true);
</script>

<template>
    <div class="home">
        <div class="box">
            <div class="tab-switcher">
                <button class="tab-btn" :class="{ active: isLogin }" @click="isLogin = true">Login</button>
                <button class="tab-btn" :class="{ active: !isLogin }" @click="isLogin = false">Register</button>
            </div>

            <!-- Login Form (default) -->
            <form v-if="isLogin" class="auth-form">
                <input type="text" placeholder="Username" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>

            <!-- Register Form -->
            <form v-else class="auth-form">
                <input type="text" placeholder="Username" required />
                <input type="password" placeholder="Password" required />
                <input type="password" placeholder="Confirm Password" required />
                <input type="file" placeholder="Avatar" />
                <button type="submit">Register</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
    .home {
        background-image: url('/images/home-hero.png'); 
        background-size: cover;
        min-height: 100vh;
        text-align: center;
        display: flex;
        align-items: center;
    }

    .box {
        height: 60vh;
        width: 30vw;
        background: rgba(255, 255, 255, 0.95);
        margin-left: 7.5vw;
        border-radius: 5%;
        box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.25),
            0 15px 30px rgba(0, 0, 0, 0.15);
        padding: 2rem;
        display: flex;
        flex-direction: column;
    }

    .tab-switcher {
    display: flex;
    margin-bottom: 2rem;
    border-radius: 12px;
    overflow: hidden;
    background: rgba(0, 123, 255, 0.1);
    }

    .tab-btn {
    flex: 1;
    padding: 1rem 0;
    border: none;
    background: none;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #666;
    }

    .tab-btn.active {
    background: linear-gradient(135deg, #007bff, #0056b3);
    color: white;
    box-shadow: inset 0 -2px 0 rgba(255,255,255,0.2);
    }

    .auth-form {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    }

    .auth-form input {
    padding: 1rem;
    border: 2px solid #e1e5e9;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    }

    .auth-form input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
    }

    .auth-form button {
    padding: 1.2rem;
    background: linear-gradient(135deg, #007bff, #0056b3);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    }

    .auth-form button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,123,255,0.3);
    }
</style>