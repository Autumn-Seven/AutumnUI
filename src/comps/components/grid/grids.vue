/**
* Created by Seven on 2019/3/29.
 * project: AutumnUI
 * email: fighting20xx@126.com
 */ 

<template>
    <div   @click="clickAction" :class="[preFixCla + 'grids', preFixCla + 'grids--' + row]">
       <slot></slot>
    </div>
</template>
<script>
	import { preFixCla, preFixComp } from '@/comps/config';

	export default {
		name: preFixComp+'grids',
		props:{
			row:{
				type:Number,
                default:4,
                validator(value){
                	return value > 0  && value < 12;
                }
            },
		},
		data(){
			return {
				preFixCla:preFixCla
			}
		},

		methods:{
			clickAction(){
				this.$emit('click');
			}
		}
	}

</script>
<style>


</style>
