<script lang="ts" setup></script>

<template>
  <div class="container">
    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  padding: 32px 16px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  main {
    height: 100%;
  }
}
footer {
  margin-top: 16px;
}
</style>
