/**
 * Created by Seven on 2019/4/15.
 * project: AutumnUI
 * email: fighting20xx@126.com
 */

import Vue from 'vue';
import Toast from './toast.vue';

function open(propsData) {

    const ToastComponent = Vue.extend(Toast);
    return new ToastComponent({
        el:document.createElement('div'),
        propsData                                  //不是用props  用这个属性  后续研究一下；
    })
}



export default {
    text(opts){
        return open(opts);
    }
}