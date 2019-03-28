<template>
    <div id="app">
        <div class="logo-wrap">
            <img src="./assets/autumn_ui.png">
        </div>
        <div class="content-page">
            <router-view/>
        </div>
    </div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style lang="scss">
    body{
        margin: 0;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        img{
            width: 30%;
            min-width: 300px;
        }

        .content-page{
            position: relative;
            margin: 0 50px;
        }
    }
</style>
