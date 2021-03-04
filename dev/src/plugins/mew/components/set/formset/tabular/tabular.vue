<template>
    <div class="formset-tabular miniScrollbar">
        <table @mouseleave="highLighted = ''">
            <thead ref="thead">
                <tr>
                    <th class="hash" ><i class="ico-mark-sharp"/></th>
                    <th v-for="(header,index) in cols" :class="{ main:index === 0 }"
                        @mouseenter="highLighted = index">
                        {{ header.label }}
                    </th>
                </tr>
            </thead>
            <tbody :class="{ pending:pending }">
                <tr v-for="(row,num) in data">
                    <td class="hash" :class="{ marked:row.marked }" @click="mark(row,num)">
                        <i class="ico ico-mark-road-flag"/>
                        <i class="num">{{ num + 1 }}</i>
                    </td>
                    <td v-for="idx in indexes"
                        class="grid" :class="{ highLighted:highLighted === idx, selected:selected === num + '-' + idx, editing:editing }"
                        @mousedown="select(num,idx);cell(row,cols[idx].value)"
                        @mouseenter="highLighted = idx"
                    >
                        <div v-if="row[cols[idx].value]" class="cell">
                            <i v-if="!cols[idx].component" v-html="row[cols[idx].value]"/>
                            <component v-else :is="cols[idx].component" :form="{ row,value:cols[idx].value,api }" @open="open(row,cols[idx].value)"/>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    export default {
        name: "formset-tabular",
        mounted(){
            if(this.width) this.$el.style.setProperty('--TBL-width',this.width + 'px')

            const n = Math.floor((this.$el.offsetHeight - this.$refs.thead.offsetHeight) / this.rowHeight)
            this.totalRows = n
            this.$emit('inited',[ n,n + 5,n + 10,n + 15,n + 20 ])
        },
        data(){
            return {
                selected:'',  // 当前单元格的 row + col
                highLighted:'',  // 当前高亮的列
                editing:false,
                totalRows:false,
            }
        },
        props:{
            pending:{
                type:Boolean,
                default:false
            },
            width:{
                type:String,
                default:''
            },
            cols:{
                type:Array,
                default() {
                    return []
                }
            },
            data:{
                type:Array,
                default() {
                    return []
                }
            },
            size:{
                type:String,
                default:'md'
            },
            api:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        computed:{
            rowHeight(){
                return { xs:30,sm:35,md:42,lg:51,xl:59 }[this.size]
            },
            fulfilled(){ // 当行数初始化完成，同时数据也到位的情况下，才进入可用状态
                return this.data && this.data.length > 0 && this.totalRows
            },
            indexes(){
                let arr = []
                this.cols.forEach( (v,idx)=>{ arr.push(idx) } )
                return arr
            }
        },

        watch:{
            fulfilled(val){
                if(val){ // 当行数初始化完成，同时数据也到位的情况下，再处理行高
                    this.$el.style.setProperty('--ROW-height',this.rowHeight + 'px')
                    if( this.data.length >= this.totalRows )
                        this.$el.style.setProperty('--TBL-height','calc(100% - 2px)')
                }
            },
            data(val){ // 切换页数时，数据会改变，如果是尾页，则修改相关样式
                if(val.length < this.totalRows)
                    this.$el.style.setProperty('--TBL-height','')
                else
                    this.$el.style.setProperty('--TBL-height','calc(100% - 2px)')
                this.$el.scrollTop = 0
            }
        },
        methods:{
            select(num,idx){
                this.selected = num + '-' + idx
            },
            unselect(){
                this.selected = ''
            },
            cell(rowData,property){
                this.$emit('click:cell',rowData,property)
            },
            mark(rowData,rowIndex){
                if(rowData.marked === undefined)
                    this.$set(rowData,"marked",false)
                this.$emit('click:mark',rowData,rowIndex)
            },
            open(rowData,property){
                this.$emit('opened',rowData,property)
            },
        }
    }
</script>

<style scoped lang="scss">
@import 'tabular.scss';
</style>