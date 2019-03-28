<template>
    <div class="hello">
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
	export default {
		name: 'home',
		data () {
			return {
				msg: 'Welcome'
			}
		}
	}
</script>

<style scoped>

</style>
