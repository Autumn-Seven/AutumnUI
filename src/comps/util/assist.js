/**
 * Created by Seven on 2019/4/1.
 * project: AutumnUI
 * email: fighting20xx@126.com
 */

// 组件工具


export const findComponentUpward = function(vm, componentName){
	let parent = vm.$parent;

	while(parent){
		let name = parent.$options.name;
		if(componentName === name){
			return parent;
		}else {
			parent = parent.$parent;
		}
	}
	return null;
};
export const findComponentsUpward = function(vm, componentName){
	let parent = vm.$parent;
	let parents = [];
	while(parent){
		let name = parent.$options.name;
		if(componentName === name){
			parents.push(parent);
		}else {
			parent = parent.$parent;
		}
	}
	return parents;
};

export const findComponentDownward = function(vm, componentName){
	const childrens = vm.$children;

	if(childrens.length){
		for (const c of childrens){                      //广度优先原则
			if(componentName === c.$options.name){
				return c;
			}
		}
		for (const c of childrens){
			let r = findComponentDownward(c, componentName);
			if(r){
				return r;
			}
		}
	}
	return null;
};

export const findComponentsDownward = function(vm, componentName){
	const childrens = vm.$children;

	return childrens.reduce((comps, child) => {
		if(child.$options.name === componentName){
			comps.push(child);
		}

		const childs = findComponentsDownward(child , componentName);
		return comps.concat(childs);
	},[]);
};










export default {}