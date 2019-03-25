/**
 * Created by fight on 2019/3/4.
 */

// import './styles/index.scss'
import button from './components/button'




const components = [
    button,
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
