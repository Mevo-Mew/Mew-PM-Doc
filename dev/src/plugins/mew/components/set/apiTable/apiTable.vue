<template>
    <div class="mew-apiTable">
        <div class="titleWrapper">
            <h3>{{ this.title }}</h3>
        </div>
        <div class="tableWrapper">
            <ul class="head">
                <li>
                    <i>属性</i><i>{{ paramType }}</i><i>默认</i><i>说明</i>
                </li>
            </ul>
            <ul class="rows">
                <li v-for="row in rows">
                    <i>{{ row.prop }}</i>
                    <i>{{ row.type }}</i>
                    <i>{{ row.deft }}</i>
                    <i>{{ row.info }}</i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mew-apiTable",
        props:{
            rows:{
                type:Array,
                default(){
                    return []
                }
            },
            title:{
                type:String,
                default:'Attributes'
            },
            paramType:{
                type:String,
                default:'类型'
            }
        }
    }
</script>

<style scoped lang="scss">
    div.mew-apiTable{
        --CLR-cell:rgba(0,0,0,.4);
        margin: 30px auto;
        border-radius: 1px;
        border: 2px solid #6f767c;
        div.titleWrapper{
            border: 1px solid black;
            background-color: #5f6469;
            color: white;
            h3{
                font-size: 18px;
                margin: 0;
                padding: 10px 12px;
                text-shadow: 0 0 2px #000;
            }
        }
        div.tableWrapper{
            border: 1px solid black;
            border-top: 0;
            ul{
                box-sizing: border-box;
                font-size: 14px;
                li{
                    box-sizing: border-box;
                    border-bottom: .5px solid var(--CLR-cell);
                    margin-bottom: -.5px;
                    &:last-child{
                        border-bottom: none;
                    }
                    i{
                        display: inline-block;
                        height: 42px;
                        line-height: 42px;
                        text-align: center;
                        border-right: .5px solid var(--CLR-cell);
                        &:first-child{
                            text-align: left;
                            padding-left: 14px;
                            width: 210px;
                        }
                        &:nth-child(2),&:nth-child(3){
                            width: 74px;
                        }
                        &:last-child{
                            text-align: left;
                            padding-left: 14px;
                            border-right: 0;
                            /*width: calc(100% - 390px);*/
                        }
                    }
                }
                &.head{
                    li{
                        font-weight: bold;
                        border-bottom: .5px solid var(--CLR-cell);
                        i{
                            letter-spacing: 2px;
                        }
                    }
                }
                &.rows{
                    li{
                        i{
                            &:nth-child(2),&:nth-child(3){
                                font-size: 13px;
                                color: rgba(0,0,0,.6);
                            }
                        }
                    }
                }

            }
        }
    }
</style>