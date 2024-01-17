<template>
  <div class="mainContainer">
    <p v-if="isTextActive">
      Bienvenido de Nuevo
    </p>
    <Transition>
      <div class="loginCard" v-if="!isTextActive">
        <div 
          class="credentialInputcontainer"
          :class="isUsernameAlready ? 'usernameInputBorders' : ''"
          >
          <input
            type="text"
            v-model="credentials.username"
            @keyup.enter="showPasswordText"
            placeholder="Username"
          >
          <span @click="showPasswordText" v-if="!isUsernameAlready">→</span>
        </div>
        <Transition>
          <div
            class="credentialInputcontainer passwordInputBorders"
            v-if="isUsernameAlready"
            >
            <input
              type="password"
              v-model="credentials.password"
              placeholder="Password"
              ref="passwordInput"
              @keyup.enter="sendLogin"
            >
            <span>→</span>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ref } from 'vue'
  import type {Credentials} from '@/interfaces/index'
  import {useAuth} from '@/composables/useAuth'
  const isTextActive: Ref< boolean > = ref(true)
  const isUsernameAlready: Ref< boolean > = ref(false)
  const credentials: Ref< Credentials > = ref({ username: '', password: ''})
  const passwordInput = ref()
  const { loginData } = useAuth()

  function showPasswordText():void {
    isUsernameAlready.value = true
    setTimeout(() => {
      passwordInput.value.focus();
    }, 300);
  }

  function sendLogin() {
    loginData(credentials.value)
  }

  setTimeout(() => {
    isTextActive.value = false
  }, 3400);

</script>

<style scoped>
.mainContainer {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.credentialInputcontainer {
  width: 310px;
  border-radius: 12px;
  border: 1px solid #8d8d8d;
  padding: 5px;
}
.credentialInputcontainer:focus-within {
  border: 2px solid #0071e3;
}
.credentialInputcontainer > input {
  width: 270px;
  height: 45px;
  border: none;
  padding: 5px;
  font-size: 16px;
}
.credentialInputcontainer > input:focus {
  outline: none;
}

.loginCard {
  width: 430px;
  height: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: #fff;
}

.usernameInputBorders {
  border-radius: 12px 12px 0 0;
}
.passwordInputBorders {
  border-radius: 0 0 12px 12px;
}

p {
  position: relative;
  font-family: sans-serif;
  text-transform: uppercase;
  font-size: 2em;
  letter-spacing: 4px;
  overflow: hidden;
  background: linear-gradient(90deg, #000, #fff, #000);
  background-repeat: no-repeat;
  background-size: 80%;
  animation: animate 3.5s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(255, 255, 255, 0);
}

@keyframes animate {
  0% {
    background-position: -200%;
  }
  100% {
    background-position: 500%;
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>