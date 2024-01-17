<template>
  <div>
    <nav>
      <ul class="listContainer">
        <li class="homeCta"  @click="goToRoute('dashboard')" v-if="route.path !== '/dashboard'">
          <font-awesome-icon
            :icon="['fas', 'grip']"
            :style="{ color: '#4FD1C5' }"
            size="xl"
          />
        </li>
        <li
          v-for="navItem, index in listBar"
          :key="index"
          class="itemNavContainer"
          @click="goToRoute(navItem.route)"
          >
          <div class="infoContainer">
            <span class="itemLabel">{{ navItem.label }}</span>
            <span class="itemName">{{ navItem.name }}</span>
          </div>
          <div class="iconContainer">
            <div class="circleIcon">
              <font-awesome-icon :icon="navItem.iconName" :style="{ color: 'white' }"/>
            </div>
          </div>
        </li>
      </ul>
    </nav>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';


interface BarItem {
  name: string
  label: string
  route: string
  iconName: string
}

const listBar: BarItem[] = [
  { name: 'Productos', label: 'Manejo de productos', route: 'dashboard.products', iconName: 'fa-solid fa-globe' },
]
const router = useRouter()
const route = useRoute()

function goToRoute(routeName: string):void {
  router.push({name: routeName})
}
</script>

<style scoped>
li {
  list-style: none;
}
.itemNavContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  width: 250px;
  height: 70px;
  padding: 15px;
  cursor: pointer;
  transition: box-shadow .2s cubic-bezier(.32,.08,.24,1),transform .2s cubic-bezier(.32,.08,.24,1),-webkit-box-shadow .2s cubic-bezier(.32,.08,.24,1),-webkit-transform .2s cubic-bezier(.32,.08,.24,1);
}
.itemNavContainer:hover {
  transform: scale(1.03);
}
.infoContainer {
  display: flex;
  flex-direction: column;
}
.itemLabel {
  font-size: 12px;
  color: #A0AEC0;
}
.itemName {
  font-size: 18px;
  color: #2D3748;
  font-weight: bold;
}
.circleIcon {
  width: 45px;
  height: 45px;
  background-color: #4FD1C5;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.listContainer {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 0;
}
.homeCta {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: box-shadow .2s cubic-bezier(.32,.08,.24,1),transform .2s cubic-bezier(.32,.08,.24,1),-webkit-box-shadow .2s cubic-bezier(.32,.08,.24,1),-webkit-transform .2s cubic-bezier(.32,.08,.24,1);
}
.homeCta:hover {
  transform: scale(1.03);
}
</style>