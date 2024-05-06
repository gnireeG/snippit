<template>
    <vue-monaco-editor
      v-model:value="snippit.code"
      theme="vs-dark"
      :options="MONACO_EDITOR_OPTIONS"
      @mount="handleMount"
    />
  </template>
  
  <script setup>
  import { ref, shallowRef } from 'vue'

  const props = defineProps({
    snippit: {
      type: Object,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  })
  
  const MONACO_EDITOR_OPTIONS = {
    automaticLayout: true,
    formatOnType: true,
    formatOnPaste: true,
  }
  
  const editorRef = shallowRef()
  const handleMount = editor => (editorRef.value = editor)
  
  // your action
  function formatCode() {
    editorRef.value?.getAction('editor.action.formatDocument').run()
  }
  </script>