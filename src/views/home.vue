<template>
    <div class="hello">
        <autumn-button>默认</autumn-button>
        <autumn-button type="primary">primary</autumn-button>
        <autumn-button type="info">info</autumn-button>
        <autumn-button type="success">success</autumn-button>
        <autumn-button type="warning">warning</autumn-button>
        <autumn-button type="error">error</autumn-button>
        <autumn-button type="text">text</autumn-button>

    </div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data () {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
