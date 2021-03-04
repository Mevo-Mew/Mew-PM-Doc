<template>
    <div class="mew-pagination flex" :class="{ 'justify-space-between':justify,dense:dense }">
        <div class="stat">共 {{ pages }} 页，合计 {{ total }} 条</div>
        <div class="pageBox">
            <a class="home btn" :class="{vain:value === 1}" @click="home">首 页</a>
            <a class="prev btn" :class="{vain:value === 1}" @click="prev">上一页</a>
            <a class="page num" :class="{current:n === value}" v-for="n in numbers" @click="goTo(n)" >{{ n }}</a>
            <a class="next btn" :class="{vain:value === pages}" @click="next">下一页</a>
            <a class="last btn" :class="{vain:value === pages}" @click="last">尾 页</a>
        </div>
        <div class="selectBox" ref="selectBox" @click.stop="toggle">
            {{ length }}
            <div class="option" :class="{ inverse:set.inverse }" v-show="set.valid" ref="option">
                <i v-for="(item,index) in rowset" :value="item" @click="reset(index)">每页 {{ item }} 条</i>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mew-pagination",
        data(){
            return {
                set:{
                    valid:false,
                    index:0,
                    inverse:false,
                }
            }
        },
        mounted(){
            if(this.color){
                this.$el.style.setProperty('--CLR-Current',this.color)
                this.$el.style.setProperty('--CLR-Light',this.$color(this.color).lighten(12))
            }
            this.$globalClick(()=>{
                if(this.set.valid) this.set.valid = false
            })
        },
        props:{
            total:{ // 总条数
                type:Number,
                default:0
            },
            value:{ // 当前页码
                type:Number,
                default:1
            },
            steps:{ // 页码按钮长度
                type:Number,
                default:9
            },
            dense:{
                type:Boolean,
                default:false
            },
            justify:{
                type:Boolean,
                default:true
            },
            rowset:{ // 每页条数
                type:Array,
                default(){
                    return [10,15,20]
                }
            },
            upward:{ // 强制 行数的下拉菜单 朝上开启
                type:Boolean,
                default:false
            },
            color:{ // 当前页码的颜色
                type:String,
                default:''
            },
            adaptive:{ // 响应移动端
                type:Boolean,
                default:false
            },
            pending:{ // 挂起状态
                type:Boolean,
                default:false
            },

        },
        model:{
            prop :'value',
            event:'changeModel'
        },
        computed:{
            pages(){
                if( this.rowset && this.rowset.length > 0 && this.total > 0 )
                    return Math.ceil(this.total / this.rowset[this.set.index])
                else
                    return 1


            },
            length(){
                return this.rowset && this.rowset.length > 0 ? ( this.set.valid ? '请选择 ... ' : '每页 ' + this.rowset[this.set.index] + ' 条' ) : ''
            },
            isMobile(){
                return false
            },
            numbers(){
                let pages = this.pages | 0,
                    steps = this.steps % 2 === 1 ? this.steps | 0 : (this.steps | 0) + 1,
                    page  = this.value,
                    // max = this.isMobile ? 7 : 9,
                    max = this.isMobile ? steps - 2 : steps,
                    len = pages >= max ? max : pages,
                    arr = [],
                    dis = (max - 1) / 2,
                    gap = pages <= dis*2 || page <= dis ?
                        page - 1 :
                        pages - page <= dis ?
                            dis*2 - (pages - page) : dis

                for(let i=0;i<len;i++)
                    arr[i] = page - gap + i //穷举而出的算法
                return arr
            },

        },
        watch:{
            'set.inverse':function(val){
                if(val)
                    this.$refs.option.style.setProperty('--TansY','-' + (this.rowset.length * 22.5 + 22) + 'px')

                this.rowset = this.rowset.reverse()
                this.set.index = this.rowset.length - this.set.index - 1
            }
        },
        methods:{
            toggle(){
                // 当屏幕底部空间不足以盛放下拉列表时
                if(!this.set.valid){
                    let dis = document.body.clientHeight - parseInt(this.$refs.selectBox.getBoundingClientRect().bottom)
                    this.set.inverse = (this.upward || dis < 110)
                }
                this.set.valid = !this.set.valid
            },
            reset(index){
                if(!this.pending && this.set.index !== index){
                    this.set.index = index
                    this.$emit('reset',this.rowset[index])
                }
            },
            next(){
                this.value < this.pages && this.goTo(this.value + 1)
            },
            prev(){
                this.value > 1 && this.goTo(this.value - 1)
            },
            home(){
                if(this.value > 1) this.goTo(1)
            },
            last(){
                if(this.value < this.pages)
                    this.goTo(Number(this.pages))
            },
            goTo(num){
                if(!this.pending && num !== this.value){
                    this.$emit('changeModel',num)
                    this.$emit('change',num)
                }
            },
        },
    }
</script>
<style scoped lang="scss">
    @import "pagination";
</style>