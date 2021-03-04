<template>
    <header class="formset-funcbar flex align-center">

        <div class="func">
            <div id="formset-mark" @click="toggle">
                <i class="ico-mark-road-flag"/>
                <i class="num">5</i>
            </div>
        </div>
        <div class="func" v-if="!nocreate">
            <div id="formset-add" class="btn flex" @click="create">
                <i class="ico ico-add-block-inner"/>
                <i class="text">新增</i>
            </div>
        </div>
        <div class="func">
            <div id="formset-search" class="btn flex">
                <i class="ico ico-search-content"/>
                <i class="text">查找</i>
            </div>
        </div>

        <div class="util flex">
            <div id="formset-export" class="aaa" @click="alert" tip-bottom="导出">
                <i class="ico ico-ui-copy"/>
            </div>
            <div id="formset-printer" @click="alert" tip-bottom="打印">
                <i class="ico ico-printer-machine"/>
            </div>
            <div id="formset-refresh" @click="refresh" tip-bottom="刷新">
                <i class="ico ico-refresh-circle"/>
            </div>
        </div>

        <tip el="formset-mark" class="tip-formset-mark">
            <div class="text">
                查看 <i :class="{crt:!toggled}">全部</i>/<i :class="{crt:toggled}">收藏</i>
            </div>
        </tip>
    </header>
</template>

<script>
    export default {
        name: "formset-funcbar",
        props:[
            'simple','toggled','nocreate'
        ],
        methods:{
            toggle(){
                this.$emit('click:toggle')
            },
            create(){
                this.$emit('click:create')
            },
            refresh(){
                this.$emit('click:refresh')
            },
            alert(){
                this.$hint({
                    innerHTML:'<div style="font-weight: bold">功能不可用</div>', // DOM 内容
                    color:'#e60012',             // 消息框的背景颜色，字体颜色自动调整，默认 '#4e545b'
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    header.formset-funcbar{
        position: relative;
        height: var(--funcbar-height);
        user-select: none;
        border-radius: 3px 3px 0 0 ;
        border-bottom: 1px solid #4f4f4f;
        box-shadow: 0 2px 2px rgba(250,250,250,.8) inset;
        background: linear-gradient(0deg,#d5d8df 0%,#e2e6eb 86%);
        div.func{ // 右边线样式
            height: 32px;line-height: 32px;
            border-right: .5px solid rgba(0,0,0,.14);
            box-shadow: 1px 0 0 rgba(250,250,250,.5);
            padding: 0 6px;
            div.btn{
                height: 28px;
                border-radius: 2px;
                text-align: center;
                width: 67.25px;
                cursor: pointer;
                i{
                    transform: translateY(-2px);
                    color: #7b7e84;
                    &.text{
                        font-size: 14px;
                        letter-spacing: 2px;
                        font-weight: bold;
                    }
                    &.ico{
                        margin-left: 4px;
                        font-size: 22px;
                    }
                }
                &:hover{
                    i{
                        color: #656672;
                    }
                }
                &:active{
                    i{
                        color: black;
                    }
                }
            }
        }
        div.util{
            color: #848484;
            height: 32px;line-height: 32px;
            position: absolute;
            right: 9px;
            i{
                font-size: 17px;
                border-radius: 2px;
                padding: 5px;
                border: 1px solid #babcbe;
                margin-left: 7px;
                cursor: pointer;
                &:hover{
                    color: #565760;
                }
                &:active{
                    font-size: 18px;
                    padding: 4.5px;
                    color: black;
                }
            }
        }
    }
    div.tip-formset-mark{
        padding: 3px;
        div.text{
            transform: scale(.8);
            i.crt{
                font-weight: bold;
            }
        }
    }
    div#formset-mark{
        color: rgba(0,0,0,.2);
        position: relative;
        width: 20px;
        height: 32px;
        border-radius: 2px;
        cursor: pointer;
        text-align: center;
        transition: box-shadow .2s,background-color .2s;
        &:active{
            filter: brightness(1.1);
            i.ico-mark-road-flag{
                color: rgba(0,0,0,.15);
            }
        }
        i.ico-mark-road-flag{
            position: absolute;left: -0.5px;top: 0;
            font-size: 22px;
        }
        i.num{
            position: absolute;left: 1.5px;top: 5px;
            display: inline-block;
            width: 16px;height: 16px;line-height: 16px;
            border-radius: 8px;
            font-size: 12px;
            color: white;
            background-color: #767785;
            transform: scale(.6);
            border: 1px solid white;
        }
    }
    div#formset-search{
        i.ico{
            font-size: 14px;margin: 0 4px 0 9px;
        }
    }

</style>