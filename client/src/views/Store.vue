<template>
  <div class="bg">
    <main id="main-study">
      <div id="home-container">
        <main id="main-container">
          <header class="main-header-container">
            <div class="one"></div>
            <div class="two"></div>
          </header>
          <!-- <div class="gap-container"></div> -->
          <section id="hot-active-container"></section>
          <section id="discuss-list"></section>
        </main>

        <aside id="aside-right"></aside>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
export default {
  name: 'StudyPage',
};
</script>

<style scoped>
.bg {
  background-color: rgb(247, 248, 250);
  overflow: hidden;
}

#main-study {
  max-width: 1000px;
  margin: 12px auto 0;
  min-height: 500px;
}

#home-container {
  display: flex;
}

#main-container {
  flex: 1;
  height: 300px;
}

.gap-container {
}

.main-header-container {
  display: flex;
  justify-content: space-between;
}

.one {
  width: 362px;
  height: 152px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
}

.two {
  width: 362px;
  height: 152px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
}

#aside-right {
  width: 256px;
  height: 800px;
  margin-left: 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

#hot-active-container {
  margin-top: 10px;
  width: 100%;
  height: 200px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

#discuss-list {
  margin-top: 10px;
  width: 100%;
  min-height: 600px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
</style>
