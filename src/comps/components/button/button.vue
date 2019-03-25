<template>
    <button
            class="kting-btn"
            @click="handleClick"
            :style="{backgroundColor: bgColor, color: color, 'border-color': borderColor}"
            :class="[]"
    ></button>
</template>
<script>
export default {
    name: 'kting-button',
    props: {
        type: {
            type: String,
            default: 'default'
        },
        long: Boolean,
        loading: {
            type: Boolean,
            default: false
        },
        noRadius: {
            type: Boolean,
            default: false
        },
        bgColor: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: ''
        },
        block: Boolean,
        disabled: Boolean,
        plain: Boolean,
        round: Boolean
    },
    methods: {
        handleClick: function () {
            if (this.disabled) return
            this.emit('click', event)
        }
    }
}

</script>