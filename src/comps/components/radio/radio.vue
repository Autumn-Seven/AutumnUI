/**
* Created by Seven on 2019/3/29.
 * project: AutumnUI
 * email: fighting20xx@126.com
 */

// v-model 其实只是一个语法糖，  实现原理正向：重新渲染组件，  反向：就是监听change事件， 然后修改值，


<template>
    <label :class="wrapClasses ">
        <template v-if="horizontal || !group">
            <input
                    type="radio"
                    @click="onClick"
                    @change="onChange"
                    :disabled="disabled"
                    :name="groupName"
                    :checked="currentValue">
            <span v-if="!currentValue" class="iconfont iconround" :class="[preFixCla+'-icon-init']" ></span>
            <span v-else="currentValue"  class="iconfont iconradiobox" :class="[preFixCla+'-icon-checked']" ></span>
            <span :class="[  preFixCla+'-text']"><slot>{{label}}</slot></span>
        </template>
        <template v-else>
            <span :class="[preFixCla+'-text']"><slot>{{label}}</slot></span>
            <input
                    type="radio"
                    @click="onClick"
                    @change="onChange"
                    :disabled="disabled"
                    :name="groupName"
                    :checked="currentValue">
            <span class="iconfont iconcheck" :class="[preFixCla+'-icon']" :style="[{'color': $parent.color}]"></span>
        </template>
    </label>
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
        	wrapClasses(){
        		return [
					this.preFixCla,
                    {
						[`${this.preFixCla}-checked`]: this.currentValue,
						[`${this.preFixCla}-disabled`]: this.disabled,
						[this.preFixCla+'-horizontal']: this.horizontal || !this.group,
                    }
                ]
            },
			horizontal(){
                return (this.parent && this.parent.horizontal === true);
            },
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
            	if(this.disabled) return false;

            	const checked = event.target.checked;
				const value = checked ? this.trueValue: falseValue;
				this.$emit('input',value);

            	if(this.group){        //当为组的时候， 只有 onChange 为true的时候 才触发父组件更新，   不能设为false的时候更新父组件，那样就没有一个选中了。
					this.$parent.change({value:this.label, checked:value});
                }
            },
            onClick(event){
            	if(this.disabled) return;

            	if(!this.group){      //当为单选框的时候，  单机就可以改变状态。
					this.currentValue = !this.currentValue;
					this.$emit('input',this.currentValue);
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

