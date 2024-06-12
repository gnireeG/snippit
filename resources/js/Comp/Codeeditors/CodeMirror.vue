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
    @change="onUpdate"
/>
</template>
<script setup>
import { computed, shallowRef, ref } from 'vue';
import { useStore } from 'vuex';
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript'
import { php } from '@codemirror/lang-php'
import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { python } from '@codemirror/lang-python'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { go } from '@codemirror/lang-go'
import { yaml } from '@codemirror/lang-yaml'
import { sql } from '@codemirror/lang-sql'
import { markdown } from '@codemirror/lang-markdown'
import { xml } from '@codemirror/lang-xml'
import { liquid } from '@codemirror/lang-liquid'
import { less } from '@codemirror/lang-less'
import { vue } from '@codemirror/lang-vue'
import { sass } from '@codemirror/lang-sass'
import { rust } from '@codemirror/lang-rust'
import { json } from '@codemirror/lang-json'
import { angular } from '@codemirror/lang-angular'
import { lezer } from '@codemirror/lang-lezer'
import { wast } from '@codemirror/lang-wast'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorState } from '@codemirror/state'

const store = useStore()

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


// TODO: Dynamically import languages!

const extensions = computed(() =>{
    let arr = []

    if(props.readonly){
        arr.push(EditorState.readOnly.of(true))
    }
    if(store.state.theme === 'dark'){
        arr.push(oneDark)
    }

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
        case 'java':
            arr.push(java())
        case 'cpp':
            arr.push(cpp())
        case 'go':
            arr.push(go())
        case 'yaml':
            arr.push(yaml())
        case 'sql':
            arr.push(sql())
        case 'markdown':
            arr.push(markdown())
        case 'xml':
            arr.push(xml())
        case 'liquid':
            arr.push(liquid())
        case 'less':
            arr.push(less())
        case 'vue':
            arr.push(vue())
        case 'sass':
            arr.push(sass())
        case 'rust':
            arr.push(rust())
        case 'json':
            arr.push(json())
        case 'angular':
            arr.push(angular())
        case 'lezer':
            arr.push(lezer())
        case 'wast':
            arr.push(wast())
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

const emit = defineEmits(['updateCode'])
function onUpdate(e){
    emit('updateCode', e)
}


</script>