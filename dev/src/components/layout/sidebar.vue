<template>
    <div id="sidebar">
        <div class="scrollBox">
            <div class="content">

                <div class="group" v-for="group in itemList">
                    <div class="title">{{ group.title }}</div>
                    <ul>
                        <li v-for="item in group.items" >
                            <a :class="{ activated:current === item.name }" draggable="false"
                               :href="'#/' + item.path"
                               @click="activate(item.name)"
                            >
                                {{ item.name }}
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "sidebar",
        data(){
            return {
                current:''
            }
        },
        computed:{
            itemList(){
                return this.$store.state.sidebar.itemList
            }
        },
        methods:{
            activate(name){
                this.current = name
                localStorage.setItem('sidebar-current',name)
            }
        },
        created() {
            const current = localStorage.getItem('sidebar-current')

            if(current)
                this.current = localStorage.getItem('sidebar-current')

            this.$router.push(current ? { name:current } : { name:'介绍 Intro' })
        }
    }
</script>

<style scoped lang="scss">
    #sidebar{
        width: var(--sidebarWidth);
        height: calc(100% - var(--headbarHeight));
        position: absolute;z-index: 2;
        top:var(--headbarHeight);
        left:calc((100% - var(--wrapperWidth))/2);
    }

    /*滚动条-BEGIN*/
    ::-webkit-scrollbar {
        width: 2px;  /*滚动条宽度*/

    }
    ::-webkit-scrollbar-thumb {
        border-top: 2px solid #F5F5F5;
        border-bottom: 2px solid #F5F5F5;
        background-color: rgba(0,0,0,.08);
        &:hover{
            background-color: rgba(0,0,0,.3);
        }
        &:active{
            background-color: rgba(0,0,0,.5);
        }
    }
    /*滚动条-END*/
    #sidebar{
        div.scrollBox{
            font-family:’黑体’;
            height: 100%;
            overflow-x: hidden;
            overflow-y: scroll;
            direction: rtl;
            scrollbar-color: transparent transparent;
            scrollbar-track-color: transparent;
            -ms-scrollbar-track-color: transparent;
            div.content{
                direction: ltr;
                height: 100%;
                div.group{
                    padding: 24px 9px 0 0;
                    div.title{
                        letter-spacing: 1px;
                        padding: 0 14px;
                        font-size: 13px;
                        color: rgba(0,0,0,.4);
                        margin-bottom: 2px;
                    }
                    ul{
                        li{
                            a{
                                letter-spacing: .2px;
                                color: rgba(0,0,0,.5);
                                display: block;
                                font-size: 14px;
                                font-weight: bold;
                                height: 30px;
                                line-height: 30px;
                                padding: 0 14px;
                                position: relative;
                                &:hover{
                                    /*background-color: rgba(0,0,0,.02);*/
                                    background-color: #edeef2;
                                    color: black;
                                    text-decoration: none;
                                    /*color: black;*/
                                }
                                &:visited{
                                    color: rgba(0,0,0,.5);
                                }
                                &.activated{
                                    color: #c30000;
                                    font-weight: 900;
                                    &::after{
                                        position: absolute;
                                        display: inline-block;
                                        right: 12px;top: 5px;
                                        content: '';
                                        width: 2px;
                                        height: 20px;
                                        background-color: #c30000;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>