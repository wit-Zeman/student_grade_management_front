<template>
  <aside class="aside">
    <!-- Aside content goes here -->
    <h1>aside</h1>
    <item/>
    <item/>
    <item/>
  </aside>
</template>

<script>
import item from "@/components/units/Item.vue";
export default {
  components:
  {
    Item: item
  }
  // Aside component logic
}
</script>

<style scoped>
.aside {
  /* Add your styles here */
  border: 4px solid #ccc; /* 添加1像素宽度的灰色实线边框 */
  padding: 10px; /* 添加内边距，使内容与边框之间有一些空间 */
  float: left;
  width: 10%;
  height: 600px;
}
</style>
