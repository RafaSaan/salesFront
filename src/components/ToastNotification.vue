<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="toastStore.toasts.length" class="toaster__wrapper">
        <TransitionGroup name="toast" tag="ul">
          <!-- //NOSONAR --><li
            v-for="toast in toastStore.toasts"
            :class="['toaster__inner', toastClassMap[toast.status]]"
            :key="toast.text"
            >
            <font-awesome-icon
              :icon="toastIconMap[toast.status]"
              :style="{ color: toastIconColorMap[toast.status] }"
              size="lg"
              class="toaster__inner-icon"
            />
            <span class="toaster__inner-text">
              {{ toast.text }}
            </span>
            <div class="circleIcon" @click="toastStore.removeToast(toast.id)">
              <font-awesome-icon
                :icon="['fas', 'xmark']"
                :style="{ color: toastIconColorMap[toast.status] }"
              />
            </div>
          </li>
        </TransitionGroup>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import useToasterStore from "@/stores/useToastStore";
import type { TToastStatus } from "@/stores/useToastStore";

const toastClassMap: Record<TToastStatus, string> = {
  warning: "warning",
  error: "error",
  success: "success",
};

const toastIconMap: Record<TToastStatus, string> = {
  error: "fa-solid fa-bolt",
  warning: "fa-solid fa-circle-info",
  success: "fa-solid fa-check",
};
const toastIconColorMap: Record<TToastStatus, string> = {
  error: "#F5413D",
  warning: "#ED9526",
  success: "#2AB930",
};
const toastStore = useToasterStore();
</script>

<style scoped>
.circleIcon {
  width: 25px;
  height: 25px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.toast-enter-from,
.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.toast-enter-active,
.toast-leave-active {
  transition: 0.25s ease all;
}
.toaster__wrapper {
  position: fixed;
  bottom: 3%;
  right: 5%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.toaster__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-radius: 12px;
  border: 1px solid transparent;
  background-color: var(--colorBack);
  padding: 10px;
  color: var(--color);
  box-shadow: 0px 3px 12px -6px var(--color);
  margin: 15px;
  svg {
    fill: var(--color);
    stroke: var(--color);
  }
}
.success {
  --color: #2AB930;
  --colorBack: #F5FEF4;
}
.warning {
  --color: #ED9526;
  --colorBack: #FFFCF7;

}
.error {
  --color: #F5413D;
  --colorBack: #FFFAFD;
}
.toaster__inner-text {
  font-size: 16px;
  font-weight: 600;
}
.toaster__inner-icon {
  width: 1.8rem;
}
</style>