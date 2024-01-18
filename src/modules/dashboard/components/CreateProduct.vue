<template>
  <div class="createProductModal">
    <form class="createProductContainer">
      <span class="titleModal">Add Product</span>
      <div class="inputContainer">
        <span>Name</span>
        <input type="text">
      </div>
      <div class="inputContainer">
        <span>Description</span>
        <input type="text">
      </div>
      <div class="inputContainer">
        <span>Amount</span>
        <input type="text">
      </div>
      <div class="inputContainer">
        <span>Amount wholesale</span>
        <input type="text">
      </div>
      <div class="inputContainer">
        <span>Has wholesale</span>
        <input type="text">
      </div>
      <div class="btnContainer">
        <button class="btnCancel" @click="closeModal">cancelar</button>
        <button class="btnSave">guardar</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['closeUpdateOrCreateModal']);
function closeModal(event: Event) {
  event.preventDefault()
  emit('closeUpdateOrCreateModal')
}

</script>

<style>
.createProductModal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.createProductContainer {
  background-color: #fff;
  border-radius: 12px;
  padding: 29px;
}
.inputContainer {
  display: flex;
  flex-direction: column;
  margin: 7px 0;
}
.inputContainer > span {
  font-size: 14px;
}
.inputContainer > input {
  font-size: 14px;
  border-radius: 14px;
  border: 1px solid #E2E8F0;
  height: 50px;
  width: 250px;
}
.inputContainer > input:focus {
  border: 1px solid #0071e3;
  outline: none;
}
.titleModal {
  font-size: 18px;
  font-weight: bold;
}
.btnContainer {
  display: flex;
  justify-content: end;
  gap: 10px;
  margin-top: 15px;
}
.btnCancel {
  color: #fff;
  height: 45px;
  border: none;
  background-color: #CBD5E0;
  border-radius: 12px;
  cursor: pointer;
  padding: 15px;
}
.btnSave {
  color: #fff;
  height: 45px;
  border: none;
  background-color: #4FD1C5;
  border-radius: 12px;
  cursor: pointer;
  padding: 15px;
}
</style>