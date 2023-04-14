<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-inner {
    background: rgba(255, 87, 162, 0.9);
    padding: 32px;
}
</style>
