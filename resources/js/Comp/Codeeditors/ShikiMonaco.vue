<template>
    <div id="editor" class="h-96"></div>
</template>
<script setup>
import { ref, onMounted, defineEmits, onBeforeUnmount } from 'vue';
import { getHighlighter } from 'shiki';
import { shikiToMonaco } from '@shikijs/monaco';
import * as monaco from 'monaco-editor-core';
import { useStore } from 'vuex';

const emit = defineEmits(['update:snippit']);

const store = useStore();

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

self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
        return URL.createObjectURL(new Blob([`
            self.MonacoEnvironment = {
                baseUrl: 'https://unpkg.com/monaco-editor@0.20.0/min/'
            };
            importScripts('https://unpkg.com/monaco-editor@0.20.0/min/vs/base/worker/workerMain.js');
        `], { type: 'text/javascript' }));
    }
};

onMounted(async () => {
    const highlighter = await getHighlighter({
        themes: ['github-dark', 'github-light'],
        langs: [props.snippit.language],
    });

    monaco.languages.register({ id: props.snippit.language });

    shikiToMonaco(highlighter, monaco);

    editor = monaco.editor.create(document.querySelector('#editor'), {
        value: props.snippit.code,
        language: props.snippit.language,
        theme: store.state.theme === 'dark' ? 'github-dark' : 'github-light',
        readOnly: props.readonly
    });

    editor.onDidChangeModelContent(() => {
        emit('update:snippit', { code: editor.getValue(), language: props.snippit.language });
    });
});

onBeforeUnmount(() => {
    console.log('tschüss')
    if (editor) {
        editor = null;
    }
});

</script>

