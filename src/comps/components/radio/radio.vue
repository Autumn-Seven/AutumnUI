/**
* Created by Seven on 2019/3/29.
 * project: AutumnUI
 * email: fighting20xx@126.com
 */

// v-model 其实只是一个语法糖，  实现原理正向：重新渲染组件，  反向：就是监听change事件， 然后修改值，


<template>
        <span v-if="horizontal" :class="[preFixCla]">
             <input
                     type="radio"
                     @click="onClick"
                     @change="onChange"
                     :disabled="disabled"
                     :name="groupName"
                     :checked="currentValue">
            <span><slot>{{label}}</slot></span>
        </span>
        <span v-else="horizontal" :class="[preFixCla, horizontal]">
             <input
                     type="radio"
                     @click="onClick"
                     @change="onChange"
                     :disabled="disabled"
                     :name="groupName"
                     :checked="currentValue">
            <span><slot>{{label}}</slot></span>
        </span>
</template>
<script>
	import { preFixCla, preFixComp } from '@/comps/config';
	import {findComponentUpward} from '@/comps/util/assist'

	export default {
		name: preFixComp+'radio',
        props:{
            value: {
            	type:[Boolean, String, Number],
                default:false,
            },
            trueValue: {
            	type:[Boolean, String, Number],
                default:true,
            },
            falseValue: {
            	type:[Boolean, String, Number],
                default:false,
            },
            name:{
            	type:String,
            },
            label: [String, Number],
            disabled:Boolean,
        },
        data(){
		    return {
				preFixCla:preFixCla+'radio',
				currentValue:this.value,

                parent:findComponentUpward(this, preFixComp+'radio-group'),
				group:false,
				groupName:this.name,
            }
        },
        computed:{
			horizontal(){
                return (this.parent && this.parent.horizontal === true);
            }
        },
        watch:{
        	value(val){
        		if(val === this.trueValue || val ===this.falseValue){
        			this.updateValue();
                }else {
        			throw 'Value must be trueValue or falseValue';
                }
            }
        },
        mounted() {
            if(this.parent){
                this.group = true;
                if(this.name && this.name !== this.parent.name){
                    console.warn('[autumnUI] radio name does not match redio group name.');
                }else {
                	this.groupName = this.parent.name;
                }
            }

            if(this.group){
            	this.parent.updateValue();
            }else {
				this.updateValue();
            }
        },
        methods:{
            onChange(event){
            	this.$parent.change && this.$parent.change({value:this.label, checked:this.currentValue});
            },
            onClick(event){
            	if(this.disabled) return;

            	if(!this.group){
					this.currentValue = !this.currentValue;
                }
            },
			updateValue(){
                this.currentValue = this.value === this.trueValue;
            }

        }
	}

</script>
<style>


</style>

