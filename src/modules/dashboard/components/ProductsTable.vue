<template>
  <div>
    <div class="">
      <span class="filterTitle">Filters</span>
      <div class="inputSearchContainer">
        <font-awesome-icon
          :icon="['fab', 'searchengin']"
          :style="{ color: '#2D3748' }"
          size="lg"
          class="searchIcon"
        />
        <input type="text" class="inputSearch" v-model="search" placeholder="search...">
      </div>
    </div>
    <div class="tableContainer">
      <div class="tableHeader">
        <span>Products Table</span>
        <div class="circleIcon" @click="openCreateProductModal">
          <font-awesome-icon
            :icon="['fab', 'searchengin']"
            :style="{ color: 'white' }"
          />
        </div>
      </div>
      <div class="headersColumns">
        <span class="nameHeader">Name/Description</span>
        <span class="amountHeader">Quantity</span>
        <span class="amountHeader">Amount</span>
        <span class="amountHeader">Amount wholesale</span>
        <span class="hasWholesaleHeader">Has wholesale</span>
        <span class="statusHeader">Status</span>
        <span class="optionsHeader"></span>
      </div>
      <div class="listTable">
        <div class="itemTable" v-for="product, index in products" :key="index">
          <div class="nameHeader itemInfo">
            <span class="nameItem">{{product.name}}</span>
            <div class="descriptionItem">{{product.description}}</div>
          </div>
          <span class="amountHeader defaltFontIem">{{ product.quantity }}</span>
          <span class="amountHeader defaltFontIem">{{ product.amount }}</span>
          <span class="amountHeader defaltFontIem">{{ product.amountWholesale }}</span>
          <span class="hasWholesaleHeader defaltFontIem">
            <label class="switch">
              <input type="checkbox" v-model="product.hasWholesale">
              <span class="slider round" ></span>
            </label>
          </span>
          <div class="statusHeader defaltFontIem">
            <div class="stautsBadge" :class="product.statusCode">
              {{ product.status }}
            </div>
          </div>
          <div class="optionsHeader defaltFontIem">
            <font-awesome-icon
              :icon="['fas', 'pen-fancy']"
              :style="{ color: '#2D3748' }"
              size="lg"
              class="optionsIcon"
              @click="openUpdateProductModal(product)"
            />
            <font-awesome-icon
              :icon="['fas', 'eraser']"
              :style="{ color: '#2D3748' }"
              size="lg"
              class="optionsIcon"
            />
          </div>
        </div>
      </div>
    </div>

    <Transition name="product">
      <UpdateOrCreateProduct
        v-if="isModalUpdateOrCreateOpen"
        :isEdit="isEditProduct"
        :productToEdit="productToEdit"
        @closeUpdateOrCreateModal="closeUpdateOrCreateModal"
        @successToast="successToast"
        @errorToast="errorToast"
        @getProducts="getProducts"
      />
    </Transition>

    <ToastNotification/>
  </div>
</template>

<script setup lang="ts">
import UpdateOrCreateProduct from '../components/UpdateOrCreateProduct.vue'
import { ref, onMounted  } from 'vue';
import type {Ref} from 'vue'
import ToastNotification from "@/components/ToastNotification.vue";
import useToasterStore from "@/stores/useToastStore";
import { getProductsHelper } from '../helpers/productsHelper';
import type { Product } from '../interfaces';

const search: Ref<string> = ref('')
const isEditProduct: Ref<boolean> = ref(false)
const isModalUpdateOrCreateOpen: Ref<boolean> = ref(false)
const products: Ref<Product[]> = ref([])
const productToEdit: Ref< Product > = ref({
  name: '',
  description: '',
  quantity: 0,
  amount: 0,
  hasWholesale: false,
  amountWholesale: undefined,
  status: '',
  imageUrl: ''

})

const toasterStore = useToasterStore();

const successToast = () => toasterStore.success({ text: "Successfully created product" });
const errorToast = () => toasterStore.error({ text: "Something went wrong" });

onMounted(() => {
  getProducts()
})

function openUpdateProductModal(product:Product):void {
  isModalUpdateOrCreateOpen.value = true
  isEditProduct.value = true
  productToEdit.value = product
}
function openCreateProductModal():void {
  isModalUpdateOrCreateOpen.value = true
}

function closeUpdateOrCreateModal():void {
  isModalUpdateOrCreateOpen.value = false
  isEditProduct.value = false
}

function getProducts() {
  getProductsHelper().then((data)=> {
    products.value = data
  })
}
</script>

<style scoped>
.product-enter-from,
.product-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.product-enter-active,
.product-leave-active {
  transition: 0.25s ease all;
}
.inputSearchContainer {
  display: flex;
  align-items: center;
  width: 260px;
  height: 40px;
  border-radius: 10px;
  background-color: #fff;
  padding: 10px;
  transition: box-shadow .2s cubic-bezier(.32,.08,.24,1),transform .2s cubic-bezier(.32,.08,.24,1),-webkit-box-shadow .2s cubic-bezier(.32,.08,.24,1),-webkit-transform .2s cubic-bezier(.32,.08,.24,1);
}
.inputSearchContainer:hover {
  transform: scale(1.03);
}
.inputSearch {
  width: 90%;
  background: none;
  border: none;
  color: #A0AEC0;
  
}
.inputSearch::placeholder  {
  color: #A0AEC0;
}
.inputSearch:focus {
  outline: none;
}
.searchIcon {
  margin: 0 5px;
}
.filterTitle {
  font-size: 16px;
  margin-bottom: 15px;
  color: #616263;
  font-weight: bold;
}
.tableContainer {
  background-color: #fff;
  border-radius: 15px;
  padding: 15px;
  margin-top: 20px;
}
.tableHeader {
  flex-direction: row;
  display: flex;
  margin: 20px 0;
}
.tableHeader > span {
  font-size: 18px;
  font-weight: bold;
  margin-right: 15px;
}
.headersColumns {
  display: flex;
  flex-direction: row;
}
.headersColumns > span {
  font-size: 10px;
  color: #A0AEC0;
}
.nameHeader {
  width: 40%;
}
.amountHeader {
  width: 15%;
}
.hasWholesaleHeader{
  width: 15%;
}
.statusHeader {
  width: 15%;
}
.optionsHeader {
  width: 15%;
}
.circleIcon {
  width: 25px;
  height: 25px;
  background-color: #4FD1C5;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.itemTable {
  display: flex;
  border-top: 1px solid #E2E8F0;
  margin-top: 11px;
  padding-top: 11px;
}
.itemInfo {
  display: flex;
  flex-direction: column;
}
.nameItem {
  font-size: 14px;
  font-weight: bold;
}
.descriptionItem {
  font-size: 14px;
  color: #718096;
}
.defaltFontIem {
  font-size: 14px;
  font-weight: bold;
}
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
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
  height: 16px;
  width: 16px;
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
.stautsBadge {
  width: 140px;
  display: flex;
  justify-content: center;
  border-radius: 12px;
  font-weight: bold;
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
.optionsIcon {
  cursor: pointer;
  margin: 0 8px;
}
</style>