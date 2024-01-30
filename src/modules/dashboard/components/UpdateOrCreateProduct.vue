<template>
  <div class="createProductModal">
    <form class="createProductContainer" @submit.prevent="createOrUpdateProduct">
      <span class="titleModal">{{ isEdit ? 'Update Product' : 'Create Product' }}</span>
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
      <div class="inputContainer" v-if="isEdit">
        <span>Status</span>
        <div class="statusesContainer">
          <div
            class="stautsBadge"
            @click="setCurrentStatus('in_stock')"
            :class="currentStatusSelect === 'in_stock' ? 'in_stock' : ''">
            En existencia
          </div>
          <div
            class="stautsBadge w-90"
            @click="setCurrentStatus('low_stock')"
            :class="currentStatusSelect === 'low_stock' ? 'low_stock' : ''">
            Pocas Existencias
          </div>
          <div
            class="stautsBadge"
            @click="setCurrentStatus('out_of_stock')"
            :class="currentStatusSelect === 'out_of_stock' ? 'out_of_stock' : ''">
            Sin Existencia
          </div>
        </div>
      </div>
      <div class="inputContainer">
        <span>Has wholesale</span>
        <label class="switch">
          <input type="checkbox" v-model="product.hasWholesale">
          <span class="slider round"></span>
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
            {{ isEdit ? 'save' : 'create'}}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { CreateProductPayload, Product} from '../interfaces/index.ts'
const emit = defineEmits(['closeUpdateOrCreateModal', 'successToast', 'errorToast', 'getProducts']);
const props = defineProps<{
  isEdit: boolean,
  productToEdit: Product
}>()
import { onMounted, ref } from 'vue';
import type {Ref} from 'vue'
import { createProductHelper, updateProductHelper } from '../helpers/productsHelper';

const product: Ref< Product > = ref({
  id: 0,
  name: '',
  description: '',
  quantity: 0,
  amount: 0,
  hasWholesale: false,
  amountWholesale: undefined,
  status: '',
  imageUrl: '',
  statusId: 0

})
const isCompleteForm: Ref<boolean> = ref(false)
const currentStatusSelect: Ref<string|undefined> = ref('')

onMounted(() => {
  if (props.isEdit) {
    isCompleteForm.value = true
    product.value = {...props.productToEdit}
    currentStatusSelect.value = props.productToEdit.statusCode
  }
})

function setCurrentStatus(status:string):void {
  currentStatusSelect.value = status
}

function validateForm () {
  isCompleteForm.value = false
  if (product.value.name && product.value.description) {
    isCompleteForm.value = true
  }
}

function createOrUpdateProduct(event: Event):void {
  if (!isCompleteForm.value) return
  event.preventDefault()
  if (props.isEdit) {
    updateProduct()
    return
  }
  createProduct()
}
function createProduct():void {
  const productToCreate: Ref< CreateProductPayload > = ref({
  name: product.value.name,
  description: product.value.description,
  quantity: product.value.quantity,
  amount: product.value.amount,
  hasWholesale: product.value.hasWholesale,
  amountWholesale: product.value.amountWholesale,

})
  createProductHelper(productToCreate.value).then((success)=> {
    if (success) {
      emit('successToast')
      emit('getProducts')
      emit('closeUpdateOrCreateModal')
    } else {
      emit('errorToast')
    }
  }).catch(()=> {
    emit('errorToast')
  })
}
function updateProduct():void {
  product.value.statusCode = currentStatusSelect.value
  updateProductHelper(product.value).then((success)=> {
    if (success) {
      emit('successToast')
      emit('getProducts')
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

</script>

<style scoped>
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
.stautsBadge {
  display: flex;
  justify-content: center;
  border-radius: 12px;
  font-weight: bold;
  font-size: 10px;
  background-color: #CBD5E0;
  width: 75px;
  cursor: pointer;
}
.w-90 {
  width: 90px;
}
.in_stock {
  color: #3BA939;
  background-color: #EAF8EA;
}
.low_stock {
  color: #CE8623;
  background-color: #FFF5E8;
}
.out_of_stock {
  color: #E41E12;
  background-color: #FFE5E4;
}
.statusesContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>