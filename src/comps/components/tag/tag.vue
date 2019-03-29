<template>
    <div
            :style="{'backgroundColor': bgColor, 'color': color, 'borderColor': borderColor}"
            :class="showClass"
            :disabled="disabled"
    >

        <slot></slot>
        <span class="iconfont " :class="'icon-'+icon" v-if="closeable" @click="closeAction"></span>
    </div>
</template>
<script>
    const preFixClass = 'autumn__tag';

	export default {
		name: 'autumn-tag',
		props: {
			type: {
				type: String,
				default: 'default'
			},

			noRadius: {
				type: Boolean,
				default: false
			},

			icon: {
				type: String,
				default: 'close'
			},
			color: {
				type: String,
				default: ''
			},
			bgColor: {
				type: String,
				default: ''
			},
            borderColor: {
				type: String,
				default: ''
			},
			block: Boolean,
			disabled: Boolean,
			round: Boolean,
			long: Boolean,
			closeable: Boolean,
		},
		computed:{
			showClass () {
				return [
					`${preFixClass}`,
					`${preFixClass}--${this.type}`,
                    {
						[`${preFixClass}--block`]: this.block,
						[`${preFixClass}--closeable`]: this.closeable,
                        'is-round': this.round,
                        'is-long': this.long,
                        'no-radius': this.noRadius
                    }
                ]
            }
        },
		methods: {
			closeAction: function (event) {
				this.$emit('close', event)
			},
		}
	}

</script>