/**
* Created by Seven on 2019/3/29.
 * project: AutumnUI
 * email: fighting20xx@126.com
 */ 

<template>
   <div :class="classes">
       <slot></slot>
   </div>
</template>
<script>
	import { preFixCla, preFixComp } from '@/comps/config';
	import  util   from '@/comps/util/util';
	import { findComponentsDownward } from '@/comps/util/assist'


	export default {
		name: preFixComp+'radio-group',
        props:{
            value: {
            	type: [String, Number],
                default:'',
            },
            name: {
            	type: [String, Number],
                default:util.gsid,
            },
			horizontal:Boolean,
        },
        data(){
		    return {
				preFixCla:preFixCla+'radio',
				currentValue: this.value,
                childrens:[],
            }
        },
        computed:{
            classes(){
            	return [
					this.preFixCla+'-group',
				]
            }
        },
        watch:{
			value:function (val) {
                this.currentValue = val;
			},
			currentValue:function () {
                this.updateValue();
			},
        },
        methods:{
			updateValue(){
                this.childrens =findComponentsDownward(this, preFixComp+'radio');
                if(this.childrens){
                	this.childrens.forEach((child)=>{
                		child.currentValue = this.currentValue === child.label;
                    })
                }
            },
            change(data){
                this.currentValue = data.value;
                this.updateValue();
                this.$emit('input',data.value);
                this.$emit('change',data.value);
                this.dispatch(preFixComp+'form-item', 'on-form-change',data.value)
            }
        }
	}

</script>
<style>


</style>

