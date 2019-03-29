/**
* Created by Seven on 2019/3/29.
 * project: AutumnUI
 * email: fighting20xx@126.com
 */ 

<template>
    <a :href="href" @click="clickAction" :class="[preFixCla +'grid']">
        <div :class="[preFixCla +'grid--icon']"><slot name="icon"></slot></div>
        <div :class="[preFixCla +'grid--text']"><slot name="text"></slot></div>
        <slot></slot>
    </a>
</template>
<script>
	import { preFixCla, preFixComp } from '@/comps/config';

	export default {
		name: preFixComp+'grid',
        props:{
			href:String,
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

