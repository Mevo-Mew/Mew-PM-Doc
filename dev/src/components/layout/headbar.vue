<template>
    <div id="headbar" class="flex justify-center">
        <div class="alignBox">
            <h3 class="mainTitle">项目文档</h3>
            <h3 class="docTitle">{{ $route.name }}</h3>
<!--            <div class="logo"/>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "headbar"
    }
</script>

<style scoped lang="scss">
    #headbar{
        position: relative;
        background-color: rgba(55,61,68,.8);
        overflow: hidden;
        height: var(--headbarHeight);
        &::before{
            position: absolute;top: 0;
            z-index: -1;
            display: block;content: '';
            width: 100%;
            height: 100%;
            background: linear-gradient(0deg,rgba(55,61,68,0) 20%,rgba(55,61,68,.95) 82%,rgba(55,61,68,1) 100%);
        }
        div.alignBox{
            display: flex;align-items: center;
            height: 100%;
            box-sizing: border-box;
            font-weight: bold;
            width: var(--wrapperWidth);
            h3{
                &.mainTitle{
                    box-sizing: border-box;
                    color:#969696;
                    padding-left: 14px;
                    width: var(--sidebarWidth);
                }
                &.docTitle{
                    color: white;
                    padding-left: 20px;
                }
            }
            div.logo{
                /*width: 63px;height: 30px;*/
                width: 63px;height: 30px;
                background: url("../../assets/img/logo-mew.png");
                background-size: 100% 100%;
            }
        }
    }
</style>