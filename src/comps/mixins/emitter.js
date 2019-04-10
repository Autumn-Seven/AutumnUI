/**
 * Created by Seven on 2019/4/2.
 * project: AutumnUI
 * email: fighting20xx@126.com
 */


export default {
	methods:{
		dispatch(componentName, eventName, params){                    //向上通知，  找到一个就停止了。
			let parent = this.$parent || this.$root;

			while(parent && (parent.$options.name !== componentName)){
				parent = parent.$parent;
			}

			if(parent){
				parent.$emit.apply(parent, [eventName].concat(params));
			}
		},
		broadcast(componentName, eventName, params){                    //向下广播，， 遍历到叶子节点，（不包含子组件的是叶子，自己也是叶子）。
			broadcast.call(this, componentName, eventName, params);
		},
	}
}


function broadcast(componentName, eventName, params) {
	this.$children.forEach(function (child) {
		const name = child.$options.name;

		if(name === componentName){
			child.$emit.apply(child, [eventName].concat(params));
		}else {
			broadcast.apply(child, [componentName, eventName].concat(params));
		}
	})
}