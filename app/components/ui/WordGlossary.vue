<template>
  <span class="inline-expander group relative">
    <button
      v-if="!isExpanded"
      class="inline-flex items-center border border-gray-200 rounded px-1 py-0 hover:border-gray-300 transition-colors align-baseline cursor-help"
      aria-expanded="false"
      :aria-controls="`definition-${uniqueId}`"
      @click.stop="toggleExpand"
    >
      <span class="text-slate-600">{{ word }}</span>
      <svg
        class="ml-1 w-3.5 h-3.5 text-blue-400"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M8 2v4" />
        <path d="M12 2v4" />
        <path d="M16 2v4" />
        <rect width="16" height="18" x="4" y="4" rx="2" />
        <path d="M8 10h6" />
        <path d="M8 14h8" />
        <path d="M8 18h5" />
      </svg>
      <span class="sr-only">Show definition</span>
    </button>
    <span v-if="isExpanded">
      <button
        class="inline-flex items-center bg-green-500 text-white rounded-l px-1 py-0 transition-colors align-baseline h-full border border-green-500"
        aria-expanded="true"
        :aria-controls="`definition-${uniqueId}`"
        @click.stop="toggleExpand"
      >
        <span class="text-base text-inherit">{{ word }}</span>
        <svg
          class="ml-1 w-3.5 h-3.5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M8 2v4" />
          <path d="M12 2v4" />
          <path d="M16 2v4" />
          <rect width="16" height="18" x="4" y="4" rx="2" />
          <path d="M8 10h6" />
          <path d="M8 14h8" />
          <path d="M8 18h5" />
        </svg>
        <span class="sr-only">Hide definition</span>
      </button>
      <span
        ref="definitionText"
        class="definition-text text-base bg-gray-100 px-1 py-0.5 rounded-tr rounded-br rounded-bl-none rounded-tl-none border border-gray-100"
      ></span>
    </span>
  </span>
</template>

<script setup>
const props = defineProps({
  word: {
    type: String,
    required: true,
  },
  definition: {
    type: String,
    required: true,
  },
});

const uniqueId = Math.random().toString(36).substring(2, 10);
const isExpanded = ref(false);
const definitionText = ref(null);
let typewriterInterval = null;

const toggleExpand = async () => {
  isExpanded.value = !isExpanded.value;
  if (isExpanded.value) {
    await nextTick();
    typeText();
  }
};

const typeText = () => {
  if (!definitionText.value) return;
  if (typewriterInterval) clearInterval(typewriterInterval);

  definitionText.value.innerHTML = "";
  let i = 0;
  const text = props.definition;
  typewriterInterval = setInterval(() => {
    if (i < text.length) {
      definitionText.value.innerHTML += text[i];
      i++;
    } else {
      clearInterval(typewriterInterval);
      typewriterInterval = null;
    }
  }, 15);
};

const handleClickOutside = (event) => {
  if (isExpanded.value && !event.target.closest(".inline-expander")) {
    isExpanded.value = false;
  }
};

const handleKeyDown = (event) => {
  if (isExpanded.value && event.key === "Escape") {
    isExpanded.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleKeyDown);
  if (typewriterInterval) clearInterval(typewriterInterval);
});
</script>
