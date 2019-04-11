<template>
    <div class="hello">

        <h4>按钮</h4>
        <autumn-button>默认</autumn-button>
        <autumn-button type="primary">primary</autumn-button>
        <autumn-button type="info">info</autumn-button>
        <autumn-button type="success">success</autumn-button>
        <autumn-button type="warning">warning</autumn-button>
        <autumn-button type="error">error</autumn-button>
        <autumn-button type="text">text</autumn-button>

        <br><br>
        <autumn-button type="primary" disabled>禁用</autumn-button>
        <autumn-button color="red" bgColor="green" borderColor="yellow" >自定义颜色</autumn-button>
        <autumn-button type="primary" icon="iconadd">添加图标</autumn-button>
        <autumn-button color="#56f521" bgColor="#854253" icon="iconclose">自定义</autumn-button>
        <autumn-button  icon="camera" round>添加图标222</autumn-button>

        <br><br>
        <autumn-button  icon="camera" long  round>100%宽度</autumn-button>

        <br><br>
        <antumn-button-group>
            <autumn-button type="primary" icon="iconadd"  >item1</autumn-button>
            <autumn-button type="warning" icon="iconadd"  >item2</autumn-button>
            <autumn-button type="success" icon="iconadd"  >item332132132</autumn-button>
        </antumn-button-group>

        <h4>标签</h4>
        <autumn-tag>默认</autumn-tag>
        <autumn-tag type="primary">primary</autumn-tag>
        <autumn-tag type="info">info</autumn-tag>
        <autumn-tag type="success" >success</autumn-tag>
        <autumn-tag type="warning" >warning</autumn-tag>
        <autumn-tag type="error" >error</autumn-tag>

        <br><br>
        <autumn-tag borderColor="#132441" color="green" >默认</autumn-tag>
        <autumn-tag type="primary" bgColor="#662530">primary</autumn-tag>
        <autumn-tag type="info">info</autumn-tag>
        <autumn-tag type="success" noRadius>success</autumn-tag>
        <autumn-tag type="warning" round>warning</autumn-tag>
        <autumn-tag type="error" closeable>error</autumn-tag>

        <h4>表单</h4>

        <autumn-radio v-model="radio">{{radio}}</autumn-radio>
        <autumn-radio v-model="radio">{{radio}}</autumn-radio>
        <autumn-radio v-model="radio" disabled>{{radio}}</autumn-radio>


        <autumn-radio-group v-model="radio2" >
            <autumn-radio label="炸鸡" disabled>炸鸡</autumn-radio>
            <autumn-radio label="汉堡">汉堡</autumn-radio>
            <autumn-radio label="啤酒">啤酒</autumn-radio>
            <autumn-radio label="烧烤">烧烤</autumn-radio>
        </autumn-radio-group>

        <autumn-radio-group v-model="radio2" horizontal>
            <autumn-radio label="炸鸡" disabled>炸鸡</autumn-radio>
            <autumn-radio label="汉堡">汉堡</autumn-radio>
            <autumn-radio label="啤酒">啤酒</autumn-radio>
            <autumn-radio label="烧烤">烧烤</autumn-radio>
        </autumn-radio-group>



        <h4>图标</h4>
        <autumn-grids :row="6">
            <autumn-grid v-for="icon in iconList" :key="icon">
                <span slot="icon" :class="['iconfont' , icon]"></span>
                <span slot="text" >{{'.'+icon}}</span>
            </autumn-grid>
        </autumn-grids>

        <br><br>
        <br><br>
        <br><br>
        <br><br>
        <br><br>
        <br><br>
        <br><br>
        <br><br>
        <br><br>
        <br><br>
        <br><br>
        <br><br>
        <br><br>
        <br><br>
        <br><br>
        <br><br>
        <br><br>
        <br><br>
        <br><br>
        <br><br>

    </div>
</template>

<script>


	import { iconList } from "@/comps/config/optionList";

	export default {
		name: 'home',
		data () {
			return {
				msg: 'Welcome',
                iconList:iconList,
                radio:false,
                radio2:'炸鸡',
			}
		},
        computed:{

        },
        mounted (){


        }
	}
</script>

<style scoped>
    .hello{
        width: 100%;
    }
    h4{
        background-color: azure;
        text-align: left;
        font-size: 15px;
        padding: 5px 15px;
    }
</style>
