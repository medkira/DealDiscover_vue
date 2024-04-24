<!-- <template>
  <div>
    <div ref="container" class="container">
      <div ref="scrollAnimation" class="scroll-animation">
        <img src="../resources/images/photoElJam.jpg" alt="" />
        <p class="text font-bold">Thinking About Exploring El Jam</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'


const container = ref(null)
const scrollAnimation = ref(null)

const handleScroll = () => {
  const triggerOffset = window.innerHeight * 0.8 // Adjust this value for trigger point

  if (window.scrollY > triggerOffset && scrollAnimation.value) {
    scrollAnimation.value.classList.add('active')
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})


</script>

<style scoped lang="scss">
.container {
  position: relative;
  width: 90%;
  margin: 0 auto;
  text-align: center;
}

.scroll-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transform: translateY(40%);
  transition:
    opacity 0.8s ease-in,
    transform 1.5s ease-out;
}

.scroll-animation.active {
  opacity: 1;
  transform: translateY(0);
}

/* Other styles */
img {
  display: block;
  // width: 100%;
  border-radius: 20px;
}

.text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  color: black;
}
</style> -->
