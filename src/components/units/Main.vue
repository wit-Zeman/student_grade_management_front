<template>
  <div class="main">
    <h1>main</h1>
    <Article/>
    <Article/>
    <Article/>
    <Article/>
    <Article/>
  </div>
</template>

<script>
import Article from "@/components/units/Article.vue";
export default {
  components: {Article},
}
</script>

<style>
.main {
  /* Add your styles here */
  border: 4px solid #ccc; /* 添加1像素宽度的灰色实线边框 */
  padding: 10px; /* 添加内边距，使内容与边框之间有一些空间 */
  float: right;
  width: 86%;
  height: 600px;
}
</style>
