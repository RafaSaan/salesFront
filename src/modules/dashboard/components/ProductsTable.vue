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
        <div class="circleIcon" @click="openUpdateOrCreateModal">
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
        <div class="itemTable">
          <div class="nameHeader itemInfo">
            <span class="nameItem">name</span>
            <div class="descriptionItem">description</div>
          </div>
          <span class="amountHeader defaltFontIem">Quantity</span>
          <span class="amountHeader defaltFontIem">Amount</span>
          <span class="amountHeader defaltFontIem">Amount wholesale</span>
          <span class="hasWholesaleHeader defaltFontIem">Has wholesale</span>
          <span class="statusHeader defaltFontIem">Status</span>
          <div class="optionsHeader defaltFontIem">
            <font-awesome-icon
              :icon="['fas', 'ellipsis-vertical']"
              :style="{ color: '#2D3748' }"
              size="lg"
              class="searchIcon"
            />
          </div>
        </div>
      </div>
    </div>
    <UpdateOrCreateProduct
      v-if="isModalUpdateOrCreateOpen"
      @closeUpdateOrCreateModal="closeUpdateOrCreateModal"
      @successToast="successToast"
      @errorToast="errorToast"
      :isEdit="isEditProduct"
    />

    <ToastNotification/>
  </div>
</template>

<script setup lang="ts">
import UpdateOrCreateProduct from '../components/UpdateOrCreateProduct.vue'
import { ref } from 'vue';
import type {Ref} from 'vue'
const search: Ref<string> = ref('')
const isEditProduct: Ref<boolean> = ref(false)
const isModalUpdateOrCreateOpen: Ref<boolean> = ref(false)
import ToastNotification from "@/components/ToastNotification.vue";
import useToasterStore from "@/stores/useToastStore";

const toasterStore = useToasterStore();

const successToast = () => toasterStore.success({ text: "Successfully created product" });
const errorToast = () => toasterStore.error({ text: "Something went wrong" });

function openUpdateOrCreateModal():void {
  isModalUpdateOrCreateOpen.value = true
}
function closeUpdateOrCreateModal():void {
  isModalUpdateOrCreateOpen.value = false
}
</script>

<style scoped>
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
</style>