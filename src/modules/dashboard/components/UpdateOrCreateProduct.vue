<template>
  <div class="createProductModal">
    <form class="createProductContainer" @submit.prevent="createOrUpdateProduct">
      <span class="titleModal">{{ isEdit ? 'Edit Product' : 'Add Product' }}</span>
      <div class="inputContainer">
        <span>Name</span>
        <input
          type="text"
          placeholder="Product name..."
          v-model="product.name"
          @input="validateForm"
        >
      </div>
      <div class="inputContainer">
        <span>Description</span>
        <input
          type="text"
          placeholder="Product description..."
          v-model="product.description"
          @input="validateForm"
        >
      </div>
      <div class="inputContainer">
        <span>Quantity</span>
        <input type="number" placeholder="Product quantity..." v-model="product.quantity">
      </div>
      <div class="inputContainer">
        <span>Amount</span>
        <input type="number" placeholder="Product amount..." v-model="product.amount">
      </div>
      <div class="inputContainer">
        <span>Has wholesale</span>
        <label class="switch">
          <input type="checkbox">
          <span class="slider round" @click="toggleHasWholesale"></span>
        </label>
      </div>
      <div class="inputContainer">
        <span>Amount wholesale</span>
        <input
          type="number"
          placeholder="Product amount wholesale..."
          v-model="product.amountWholesale"
          :disabled="!product.hasWholesale"
        >
      </div>
      <div class="btnContainer">
        <button class="btnCancel" type="reset" @click="closeModal">cancel</button>
        <button
          class="btnSave"
          :class="!isCompleteForm ? 'buttonDisabled' : ''">
            {{ isEdit ? 'edit' : 'save'}}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Product} from '../interfaces/index.ts'
const emit = defineEmits(['closeUpdateOrCreateModal', 'successToast', 'errorToast']);
defineProps<{
  isEdit: boolean
}>()
import { ref } from 'vue';
import type {Ref} from 'vue'
import { createProductHelper } from '../helpers/productsHelper';
const product: Ref< Product > = ref({
  name: '',
  description: '',
  quantity: 0,
  amount: 0,
  hasWholesale: false,
  amountWholesale: undefined,
  status: '',
  imageUrl: ''

})
const isCompleteForm: Ref<boolean> = ref(false)

function validateForm () {
  isCompleteForm.value = false
  if (product.value.name && product.value.description) {
    isCompleteForm.value = true
  }
}

function createOrUpdateProduct(event: Event):void {
  event.preventDefault()
  createProductHelper(product.value).then((success)=> {
    if (success) {
      emit('successToast')
      emit('closeUpdateOrCreateModal')
    } else {
      emit('errorToast')
    }
  }).catch(()=> {
    emit('errorToast')
  })
}
function closeModal(event: Event) {
  event.preventDefault()
  emit('closeUpdateOrCreateModal')
}
function toggleHasWholesale():void {
  product.value.hasWholesale = !product.value.hasWholesale
  product.value.amountWholesale = undefined
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
  padding: 10px;
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
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
input:checked + .slider {
  background-color: #4FD1C5;
}
input:focus + .slider {
  box-shadow: 0 0 1px #4FD1C5;
}
input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}
.buttonDisabled {
  color: #fff;
  background-color: #CBD5E0;
  cursor: not-allowed;
}
</style>