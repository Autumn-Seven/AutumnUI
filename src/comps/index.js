/**
 * Created by fight on 2019/3/4.
 */

import './styles/index.scss'
import button from './components/button/button.vue'
import buttonGroup from './components/button/button-group'
import Tag from './components/tag/tag.vue'





const components = [
    button,
	buttonGroup,
	Tag,
];


const install = function (Vue) {
    if(install.installed) return;
    components.map(component => Vue.component(component.name, component))
}

if(typeof window !=='undefined' && window.Vue){
    install(window.Vue)
}


export default {
    install,
    ...components
}
