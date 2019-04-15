/***
* Created by Seven on 2019/4/10.
* project: AutumnUI
* email: fighting20xx@126.com
*/



<template>
    <transition name="fade">
        <div :class="[{[preFixCla+'toast'] : this.isActive}]"  :style='directions'>{{content}}</div>
    </transition>
</template>
<script>
    import { preFixCla, preFixComp } from '@/comps/config';
    import insertDOM from '@/comps/mixins/insertDOM.js';

    export default {
        name: preFixComp+'toast',
        mixins:[insertDOM],
        props: {
            content: {
                type: String,
                required: true
            },
            autoClose: {
                type: Boolean,
                default: true
            },
            visible: {
                type: Boolean,
                default: false
            },
            time:{
                type:Number,
                default:2000,
            },
            callBack: {
                type: Function,
                default () {}
            },
            direction: {
                type: String,
                default: ''
            }
        },
        data(){
            return {
                isActive:this.visible,
                preFixCla:preFixCla,
            }
        },
        watch:{
            visible(val){
                if(!this.autoClose){
                    this.isActive = val
                }
            }
        },
        computed:{
            directions(){
                if(this.direction === 'top'){
                    return 'top:20%'
                }else if(this.direction === 'center'){
                    return 'top:50%'
                }else {
                    return 'top:80%'
                }
            }
        },
        methods:{
           close(){
               if (!this.autoClose){return}

               let self =this;
               this.timer = setTimeout(function() {
                   self.isActive = false;
                   self.callBack();

                   setTimeout(function() {
                       self.$destroy();
                   },200)
               },this.time)
           }
        },
        mounted(){
            this.isActive = true;
            this.close();
        }
    }

</script>
<style>

</style>
