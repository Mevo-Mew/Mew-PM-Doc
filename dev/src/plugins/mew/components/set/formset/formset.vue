<template>
    <div class="formset">
        <div class="formset-wrapper">
            <funcbar @click:toggle="toggle" :toggled="list.toggled"
                     @click:create="create"
                     @click:refresh="refresh({active:true})"
                     :nocreate="nocreate"
            />
            <tabular ref="tabular"
                     :cols="headers"
                     :data="data"
                     :size="size"
                     :api="api"
                     :width="width"
                     :pending="pending"
                     @inited="setRows"
                     @opened="setForm"
                     @click:cell="cell"
                     @click:mark="mark"
            />
        </div>
        <div class="formset-footer">
            <pagination dense v-model="page" :total="list.totalRows" :rowset="pagi.rowset" :pending="pending"
                        @reset="reset" @change="changePage"
            />
        </div>

        <!-- 表单的容器-BEGIN -->
        <div class="formset-modal" v-if="form.valid">
            <i class="ico-ui-close" @click="close"/>
            <div class="scrollBox classicScrollbar">
                <slot v-if="!component" :form="{ valid:form.valid, value:form.value, row:form.row, api }"/>
                <component v-else :is="component" :form="{ valid:form.valid, value:form.value, row:form.row, api }"/>
            </div>
        </div>
        <!-- 表单的容器-END -->
    </div>
</template>

<script>
    import funcbar from './funcbar'
    import tabular from './tabular'

    import api from './mixins/api'
    import size from './mixins/size'
    import hotkey from './mixins/hotkey'

    export default {
        name: "mew-formset",
        components:{
            funcbar,tabular
        },
        mixins:[ api,size,hotkey ],
        created(){
            this.getTableData()
            this.getTotalRows()
            this.form.valid = this.valid
        },
        data(){
            return {
                // 刚拿到列表数据先存放到 raws 里，待处理后才能传给 data
                raws:null,
                // 数据的载入状态，任何操作都会进入 pending 状态，完成前不能进行其他操作
                pending:true,
                // 真实的列表数据
                data:[],
                // 当前页码
                page:1,
                // 列表相关选项
                list:{
                    toggled:false,
                    totalRows:0,
                    // 不考虑极端情况的话，可适当减少首次请求时的 rowsPerPage
                    // 列表第一次请求数据时，建议直接取 38 条，如果少于38条，在容器高度大于 1300px ，行高为 xs 时，底部会出现缝隙
                    // 首次请求列表数据时，使用以下 rowsPerPage 的值
                    // 当组件加载完成后，组件会根据容器高度，生成一个新的 rowsPerPage 值
                    rowsPerPage:38,
                },
                pagi:{ rowset:null },
                // 用以给表单插槽传值
                form:{
                    valid:false,
                    value:'',
                    row:null
                }
            }
        },
        props:{
            headers:{
                type:Array,
                default(){
                    return [
                        {label:'主列',value:'main'},
                        {label:'字段',value:'item'},
                    ]
                }
            },
            component:{
                type:Object,
                default(){
                    return null
                }
            },
            valid:{
                type:Boolean,
                default:false
            },
            nocreate:{
                type:Boolean,
                default:false
            },
            dev:{
                type:Boolean,
                default:false
            },
            width:{
                type:String,
                default:''
            }
        },
        computed:{
            fulfilled(){ // 拿到了后端数据，DOM初始化完成，同时满足这两个条件，才算 fulfilled 状态
                return this.raws && this.pagi.rowset
            }
        },
        watch:{
            fulfilled(val){
                if(val){
                    this.data = this.raws.slice(0,this.list.rowsPerPage)
                    this.raws = null
                }
            },
            'form.valid':function(val){
                if(val) this.$emit('form:open')
                else this.$emit('form:close')
            }
        },
        methods:{
            // tabular 始化后，会根据容器高度计算出行数，并将 rowset 每页行数的数组传递过来
            setRows(rowset){
                this.pagi.rowset = rowset
                this.list.rowsPerPage = rowset[0]
            },
            setForm(row,key){
                this.form.row = row
                this.form.value = key
                this.form.valid = true
            },
            changePage(num){
                if(!this.pending){
                    this.pending = true
                    this.page = num
                    this.getTableData()
                }
            },
            // 在页码器上选择不同的“每页条数”，则根据选择的条数，重新获取数据
            reset(rowsPerPage){
                this.list.rowsPerPage = rowsPerPage
                this.refresh({active:true})
            },
            refresh(cfg){
                if(!this.pending){
                    this.pending = true
                    if(cfg && cfg.page)
                        this.page = cfg.page
                    else
                        this.page = 1
                    if(cfg && cfg.active)
                        this.list.toggled = false
                    this.getTableData().then( result =>{
                        this.$emit('refresh')
                        if(cfg && cfg.active){
                            if(result) this.$hint('列表已刷新')
                            this.$emit('click:refresh')
                        }
                    })
                    this.getTotalRows()
                }
            },
            getTableData(){
                if(!this.dev){
                    const url = this.list.toggled ? this.api.getMarkedSubjectList : this.api.getSubjectList
                    const arg = {
                        currentPage:this.page,
                        rowsPerPage:this.list.rowsPerPage
                    }
                    return new Promise(resolve =>{
                        this.$http.get(url,arg).then((response)=>{
                            this.raws = response.data
                            this.pending = false
                            this.$refs.tabular.unselect()
                            resolve(true)
                        })
                    })
                }
            },
            getTotalRows(){
                if(!this.dev){
                    const url = this.list.toggled ? this.api.getMarkedSubjectRows : this.api.getSubjectRows
                    this.$http.get(url).then((response)=>{
                        this.list.totalRows = response.data.totalRows
                    })
                }
            },
            toggle(){
                if(!this.pending){
                    this.pending = true
                    this.list.toggled = !this.list.toggled
                    this.page = 1
                    this.getTableData()
                    this.getTotalRows()
                }
            },
            create(){
                this.form.row = null
                this.form.valid = true
            },
            mark(row,index){
                if(!this.dev){
                    row.marked = !row.marked
                    this.$http.post(this.api.updateSubject,row).then((response)=>{
                        if(!response.data){
                            this.$message('收藏失败')
                            row.marked = !row.marked
                        }
                        if(this.list.toggled && !row.marked){
                            setTimeout(()=>{
                                this.refresh({page:this.page})
                            },150)
                        }

                    }).catch(err=>{
                        row.marked = !row.marked
                        console.log(err)
                    })
                }
            },
            cell(row,key){
                this.$emit('click:cell',row,key)
            },
            close(){
                this.form.valid = false
                // this.$emit('updateModel',false)
                this.$emit('close')
            }
        },

    }
</script>

<style scoped lang="scss">
@import 'formset.scss';
</style>