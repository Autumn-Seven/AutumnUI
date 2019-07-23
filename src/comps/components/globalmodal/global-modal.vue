/**
* Created by Seven on 2019/4/10.
 * project: AutumnUI
 * email: fighting20xx@126.com
 */ 

<template>
    <div></div>
</template>
<script>

	import { preFixCla, preFixComp } from '@/comps/config';
	export default {
		name: preFixComp+'modal',
		props:{
			type: {
                validator (value) {
                    return  ['alert', 'confirm', 'prompt'].indexOf(value) > -1;
                },
                default: 'default',
			},
            value: {
				type:  String ,
				default:'',
			},
			title:{
			    type:String,
                default:'',
            },
			name:{
				type:String,
			},
			label: [String, Number],
			disabled:Boolean,
		},
		data(){
			return {
				preFixCla:preFixCla+'modal',
				currentValue:this.value,
				parent:findComponentUpward(this, preFixComp+'radio-group'),
				group:false,
				groupName:this.name,
			}
		},
	}

</script>
<style>


</style>

