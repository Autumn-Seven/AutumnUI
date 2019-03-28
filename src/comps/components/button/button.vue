<template>
    <button
            class="autumn__btn"
            @click="handleClick"
            :style="{'backgroundColor': bgColor, 'color': color, 'borderColor': borderColor}"
            :class="showClass"
            :disabled="disabled"
    >
        <span class="iconfont " :class="'icon-'+icon"></span>
        <slot></slot></button>
</template>
<script>
	export default {
		name: 'autumn-button',
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

			icon: {
				type: String,
				default: ''
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
			plain: Boolean,
			round: Boolean
		},
		computed:{
			showClass () {
				return [
					'autumn__btn--'+this.type,
                    {
						'autumn__btn--block': this.block,
						'autumn__btn--hasIcon': this.icon !== '',
                    	'is-plain': this.plain,
                        'is-round': this.round,
                        'is-long': this.long,
                        'no-radius': this.noRadius
                    }
                ]
            }
        },
		methods: {
			handleClick: function (event) {
				if (this.disabled) return;
				this.$emit('click', event)
			}
		}
	}

</script>