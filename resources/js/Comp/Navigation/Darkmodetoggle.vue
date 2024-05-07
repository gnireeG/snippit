import { useStore } from "vuex/types/index.js";

<template>
<div :class="[theme == 'light' ? '' : 'dark' ]" class="dark-mode-toggle flex gap-2">
    <button title="Toggle Theme" @click="changeMode()" class="px-1.5">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Moon -->
        <path pathLength="1" class="moon-icon" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        <!-- Sun -->
        <circle pathLength="1" class="sun-icon" cx="12" cy="12" r="5"></circle>
        <line pathLength="1" class="sun-icon" x1="12" y1="1" x2="12" y2="3"></line>
        <line pathLength="1" class="sun-icon" x1="12" y1="21" x2="12" y2="23"></line>
        <line pathLength="1" class="sun-icon" x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line pathLength="1" class="sun-icon" x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line pathLength="1" class="sun-icon" x1="1" y1="12" x2="3" y2="12"></line>
        <line pathLength="1" class="sun-icon" x1="21" y1="12" x2="23" y2="12"></line>
        <line pathLength="1" class="sun-icon" x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line pathLength="1" class="sun-icon" x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    </button>
    <!-- <p :class="expand ? 'opacity-100' : 'opacity-0'" class="transition-opacity whitespace-nowrap duration-500">{{ theme == 'light' ? 'Light mode' : 'Dark mode' }}</p> -->
  </div>
</template>
<script setup>

import { onMounted, ref } from "vue";
import { useStore } from 'vuex'

const props = defineProps({
    expand: {
        type: Boolean,
        required: false,
        default: false
    }
})

const store = useStore()
const storageKey = 'theme-preference'

function changeMode() {
  // flip current value
  theme.value = theme.value === 'light'
    ? 'dark'
    : 'light'

  setPreference()
}

function getColorPreference() {
  if (localStorage.getItem(storageKey)){
    if(localStorage.getItem(storageKey) === 'light'){
        return 'light';
    }
    else {
      return 'dark';
    }
        
    }
  else{
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'

  }
}

function setPreference() {
  localStorage.setItem(storageKey, theme.value)
  reflectPreference()
}

function reflectPreference() {
  if (theme.value === 'dark') {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }

  store.commit('setTheme', theme.value)

  document
    .querySelector('#theme-toggle')
    ?.setAttribute('aria-label', theme.value)
}

const theme = ref('light')

// set early so no page flashes / CSS is made aware
reflectPreference()

onMounted(() => {
  theme.value = getColorPreference()
  reflectPreference()
})


</script>

<style scoped>
.dark-mode-toggle button {
  border: none;
  background-color: inherit;
  cursor: pointer;
  border-radius: 9px;
}

.dark-mode-toggle {
  --transition-duration: 400ms;
  --bg: white;
  --text: #333;
}

.dark-mode-toggle.dark {
  --bg: #333;
  --text: white;
}

.dark-mode-toggle {
  color: var(--text);
  transition: color, background-color var(--transition-duration);
}

.dark-mode-toggle svg {
  transition: stroke var(--transition-duration);
  stroke: var(--text);
}

.dark-mode-toggle .moon-icon {
  stroke-dasharray: 0px 1px;
  opacity: 0;
  transition: stroke-dasharray 0.5s ease-in, opacity 300ms ease-in;
}

.dark-mode-toggle .sun-icon {
  stroke-dasharray: 1px 1px;
  opacity: 1;
  transition: stroke-dasharray 0.5s ease-in, opacity 300ms ease-in;
}

.dark-mode-toggle.dark .moon-icon {
  stroke-dasharray: 1px 1px;
  opacity: 1;
}

.dark-mode-toggle.dark .sun-icon {
  stroke-dasharray: 0px 1px;
  opacity: 0;
}

</style>