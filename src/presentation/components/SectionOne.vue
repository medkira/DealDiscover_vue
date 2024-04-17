<template>
  <div class="card">
    <Splitter style="height: 400px" class="mb-5 mt-20">
      <SplitterPanel class="splitter-panel">
        <div class="content">
          <h2 class="title">TimeTo <span class="highlight">Discover</span></h2>
          <h3 class="subtitle">Let The Chat <span class="highlight">Choose</span> For You</h3>
          <div class="icon-container">
            <img src="/src/presentation/components/icons/SoundIcon.png" alt="chat" width="70" />
          </div>
          <div class="icon-container">
            <img src="/src/presentation/components/icons/ChatBot.png" alt="chat" width="100" />
          </div>
        </div>
      </SplitterPanel>
      <SplitterPanel class="splitter-panel">
        <div class="logo-container mt-64">
          <img src="/src/presentation/components/icons/LogoSection.png" alt="logo" width="400" />
        </div>
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script setup>
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
</script>

<style scoped>
.card {
  background-color: #f4f8fb;
  height: 515px;
  width: 100%;

}

.splitter-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.highlight {
  color: #007bff;
  font-size: 2rem;
  font-weight: bold;
}

.subtitle {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}

.icon-container {
  display: flex;
  justify-content: center;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d2f1f6;
  border-radius: 50%;
}
</style>
