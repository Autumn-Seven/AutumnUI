/**
 * Created by fight on 2019/3/4.
 */

import emitter from './mixins/emitter'
import './styles/index.scss'
import button from './components/button/button.vue'
import buttonGroup from './components/button/button-group'
import Tag from './components/tag/tag.vue'
import Radio from './components/radio/radio.vue'
import RadioGroup from './components/radio/radio-group.vue'
import Input from './components/input/input.vue'
import Grid from './components/grid/grid.vue'
import Grids from './components/grid/grids.vue'





const components = [
    button,
	buttonGroup,
	Tag,
	Radio,
	RadioGroup,
	Input,
	Grid,
	Grids,
];


const install = function (Vue) {
    if(install.installed) return;
    // components.map(component => Vue.component(component.name, component))
												// 为什么不用这种方式而用下一种方式？  因为要混合一个全局方法， 而又不影响 使用Autumn的全局Vue属性
												// 这里只是对所有的AutumnUI 的组件混入了


    components.map(component => Vue.component(component.name, Vue.extend({mixins:[emitter]}).extend(component)))
}

if(typeof window !=='undefined' && window.Vue){
    install(window.Vue)
}


export default {
    install,
    ...components
}
