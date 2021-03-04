<template>
    <div class="mew-picker">
        <div class="inputBox d-flex align-center justify-center" ref="pickerBox" contenteditable="true">
            <input type="text" v-model="content" ref="input" @input="input" @blur="popover = false">
        </div>
        <div class="pickBtn" ref="pickBtn">
            <btn rect @click="showPopper">
                <v-icon>mdi-clipboard-plus-outline</v-icon>
            </btn>
            <el-popover v-model="popover" >
                <div class="optionBox">
                    <div class="option" v-for="(item,index) in options" @click="select(item,index)">
                        {{ item.templateName }}
                    </div>
                </div>
            </el-popover>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mew-picker",
        data(){
            return {
                content:'',
                popover:false
            }
        },
        props:{
            value:{
                type:String,
                default:''
            },
            options:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        model:{
            prop: 'value',
            event:'change'
        },
        watch:{
            content(val){
               this.$emit('change',val)
            },
            value:{
                handler(val){
                    this.content = val
                },
                immediate:true
            }
        },
        methods:{
            showPopper(){
                this.$refs.input.focus()
                this.popover = true
            },
            input(){
                this.$emit('input',this.content)
            },
            select(item,index){
                this.$emit('select',item,index)
            }
        },
        mounted() {
            const pickerBoxHeight = this.$refs.pickerBox.offsetHeight
            const pickBtnHeight =this.$refs.pickBtn.offsetHeight
            this.$refs.pickerBox.style.lineHeight = pickerBoxHeight + 'px'
            this.$refs.pickBtn.style.top = (pickerBoxHeight - pickBtnHeight)/2 + 'px'
        }
    }
</script>

<style scoped lang="scss">
div.mew-picker{
    position: relative;
    color: rgba(0,0,0,.2);
    width: 100%;
    height: 100%;
    div.inputBox{
        width: 100%;
        height: 100%;
        border-radius: 1px;
        color: #00a1ff;
        font-weight: bold;
        &:focus{
            outline: none;
            box-shadow:0 0 0 2px inset #00a1ff;
        }

    }
    div.pickBtn{
        position: absolute;
        top: 5px;right: 12px;
    }

    div.optionBox{
        width: 100%;
        div.option{
            font-size: 16px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            cursor: pointer;
            border-radius: 2px;
            &:hover{
                color: white;
                text-shadow: 0 0 2px black;
                font-weight: bold;
                background-color:#0097fc;
            }
        }
    }
}
</style>