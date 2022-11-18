<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div
        v-show="modalActive"
        @keydown.esc="$emit('close-modal')"
        @touchmove.prevent
        class="absolute w-full min-h-screen top-0 left-0 flex justify-center px-8"
        tabindex="0"
      >
      <div
        v-show="modalActive"
        @touchmove.prevent
        class="fixed w-full bg-black bg-opacity-30 min-h-screen top-0 left-0 flex justify-center px-8"
        tabindex="0"
      ></div>
        <Transition name="modal-inner">
          <div
            v-if="modalActive"
            class="p-4 w-full bg-white self-start mt-32 max-w-screen-md flex items-center justify-center print:border-none flex-col border-2 border-black rounded-xl z-50"
          >
            <slot />
            <button
              aria-label="Fermer"
              class="text-white print:hidden h-16 sm:h-14 md:h-16 w-1/3 mt-8 p-2 bg-space-cadet rounded-lg cursor-pointer border-2 border-space-cadet hover:bg-black-coral"
              @click="$emit('close-modal')" @keypress.enter="$emit('close-modal')"
            >
              Fermer
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
export default {
  name: "CartModal",
  emits: ["close-modal"],
  props: {
    modalActive: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
  setup(_, { emit }) {
    const close = () => {
      emit("close-modal")
    }

    return { close }
  },
}
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}
.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
