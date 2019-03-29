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
        <autumn-button type="primary" icon="add">添加图标</autumn-button>
        <autumn-button color="#56f521" bgColor="#854253" icon="close">自定义</autumn-button>
        <autumn-button  icon="camera" round>添加图标</autumn-button>

        <br><br>
        <autumn-button  icon="camera" long  round>100%宽度</autumn-button>

        <br><br>
        <antumn-button-group>
            <autumn-button type="primary" icon="camera"  >item1</autumn-button>
            <autumn-button type="warning" icon="camera"  >item2</autumn-button>
            <autumn-button type="success" icon="camera"  >item332132132</autumn-button>
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
	import AutumnTag from "../comps/components/tag/tag";
	export default {
		components: {AutumnTag}, name: 'home',
		data () {
			return {
				msg: 'Welcome'
			}
		}
	}
</script>

<style scoped>
    h4{
        background-color: azure;
        text-align: left;
        font-size: 15px;
        padding: 5px 15px;
    }
</style>
