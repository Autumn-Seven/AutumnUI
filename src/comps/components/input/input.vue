/**
* Created by Seven on 2019/3/29.
 * project: AutumnUI
 * email: fighting20xx@126.com
 */ 


<template>
    <div :class="inputWrapClass" >
        <input ref="input"
               :type="type"
               v-model="currentValue"
               :name="name"
               @focus="onFocus"
               @blur="onBlur"
               :maxlength="max"
               :placeholder="placeholder"
               :autocomplete="autocomplete"
               :readonly="readonly"
               :disabled="disabled"
               :class="[{'is-right': right},preFixCla + 'input']"
        >
        <div :class="[preFixCla + 'input--close']"
             v-if="clearable&&(type == 'text'||type == 'search'||type == 'password'||type == 'email'||type == 'tel')&&!disabled&&!readonly"
             v-show="currentValue!=''"
             @click="emptyVal">
            <span class="xm__icon--close-outline"></span>
        </div>
    </div>
</template>
<script>
    import { preFixCla, preFixComp } from '@/comps/config';


	export default {
		name: preFixComp + 'input',
        data(){
			return {
				currentValue:this.value,
				preFixCla:preFixCla,
            }
        },
        props: {
			type:{
				validator(value){
					return value.indexOf(['text','password','url','email','date']);
                },
				default:'text',

            },
            value:{
				default:'',
            },
            name:{
				default:'',
                type:String,
            },
			icon:String,
			placeholder:{
				default:'',
                type:String,
            },
			max:{
                type:Number,
            },
			prefix: {
				type: String,
				default: ''
			},
			suffix: {
				type: String,
				default: ''
			},

			disabled:Boolean,
			readonly:Boolean,
			autocomplete:Boolean,
			right:Boolean,
			clearable:Boolean,
			search:Boolean,
        },
        watch:{
        	value(val){
        		this.currentValue = val;
            },
			currentValue(val){
        		this.$emit('on-change',val);
            },
        },
        computed:{
        	inputWrapClass(){
        		return [
        			`${preFixCla}--wrap`,
                    {

                    }
                ]
            }
        },
        methods:{
			onFocus(event){
				this.$emit('focus' ,event.target.value);
            },
			onBlur(event){
				this.$emit('blur',event.target.value);
            }
        }
	}

</script>
<style>


</style>

