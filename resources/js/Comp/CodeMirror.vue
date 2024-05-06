<template>
<codemirror
    v-model="snippit.code"
    placeholder="Code goes here..."
    :style="{ height: '400px' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @ready="handleReady"
    @change="console.log('change', $event)"
    @focus="console.log('focus', $event)"
    @blur="console.log('blur', $event)"
/>
</template>
<script setup>
import { computed, shallowRef, ref } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { php } from '@codemirror/lang-php';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { python } from '@codemirror/lang-python';
//import { oneDark } from '@codemirror/theme-one-dark';
import { EditorState } from '@codemirror/state';

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

const extensions = computed(() =>{
    let arr = []

    if(props.readonly){
        arr.push(EditorState.readOnly.of(true))
    }
    /* if(store.state.theme === 'dark'){
        arr.push(oneDark())
    } */

    switch(props.snippit.language){
        case 'javascript':
            arr.push(javascript())
        case 'php':
            arr.push(php())
        case 'css':
            arr.push(css())
        case 'html':
            arr.push(html())
        case 'python':
            arr.push(python())
        default:
            arr.push(javascript())
    }

    return arr
})

const view = shallowRef()
function handleReady(payLoad){
    view.value = payLoad.view
}

const getCodemirrorStates = () => {
        const state = view.value.state
        const ranges = state.selection.ranges
        const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
        const cursor = ranges[0].anchor
        const length = state.doc.length
        const lines = state.doc.lines
        // more state info ...
        // return ...
      }


</script>