<template>
    <div class="mew-cellset">
        <div class="banner">{{ banner }}</div>
        <table>
            <thead>
                <tr>
                    <th v-for="header in headers"
                        :style="`width:${header.width}px;text-align:${header.align}`"
                    >
                        {{ header.name }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows">
                    <td v-for="header in headers" :style="`text-align:${header.align}`" v-html="row[header.prop]">

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "mew-cellset",
        props:{
            banner:{
                type:String,
                default:'Attributes',
            },
            headers:{
                type:Array,
                default(){
                    return [
                        {
                            name:'属性',prop:'prop',width:'225',align:'left', sort:false
                        },
                        {
                            name:'类型',prop:'type',width:'75',align:'center',sort:false
                        },
                        {
                            name:'默认',prop:'deft',width:'75',align:'center',sort:false
                        },
                        {
                            name:'说明',prop:'info',align:'left', sort:false
                        }
                    ]
                }
            },
            rows:{
                type:Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style scoped lang="scss">
@import 'cellset.scss';
</style>