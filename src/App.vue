<template>
    <div id="app">
        <div class="logo-wrap">
            <a href="https://github.com/kisstheair/AutumnUI">
                <img src="./assets/autumn_ui.png">
            </a>
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
        width: 100%;
        overflow-x: hidden;
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
            cursor: pointer;
        }

        .content-page{
            position: relative;
            margin: 0 50px;
        }
    }
</style>
