<template>
  <div class="wrapper-spinner-loader">
    <div class="spinner">
      <svg viewBox="25 25 50 50" class="circular">
        <circle stroke-miterlimit="10" stroke-width="3" fill="none" r="20" cy="50" cx="50" class="path"></circle>
      </svg>
    </div>
  </div>

</template>

<script setup>

</script>

<style scoped lang="scss">

.wrapper-spinner-loader {
  display: flex;
  justify-content: center;
  width: 100%;

  .spinner {
    position: relative;
    width: 40px;

    &:before {
      content: "";
      display: block;
      padding-top: 100%;
    }

    .circular {
      animation: rotate73451 2s linear infinite;
      height: 100%;
      transform-origin: center center;
      width: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;

      .path {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        animation: dash0175 1.5s ease-in-out infinite, color7123 6s ease-in-out infinite;
        stroke-linecap: round;
        stroke: var(--dark-pink);
      }
    }
  }
}

@keyframes rotate73451 {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash0175 {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}

</style>
