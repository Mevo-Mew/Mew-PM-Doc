<script>
    export default {
        props:{
            xs:{
                type:Boolean,
                default:false
            },
            sm:{
                type:Boolean,
                default:false
            },
            lg:{
                type:Boolean,
                default:false
            },
            xl:{
                type:Boolean,
                default:false
            },
            md:{
                type:Boolean,
                default:true
            },
            width:{
                type:String,
                default:""
            },
            height:{
                type:String,
                default:""
            },
        },
        computed:{
            size(){
                const props = {
                    xs:this.xs,
                    sm:this.sm,
                    lg:this.lg,
                    xl:this.xl,
                    md:this.md
                }
                for(let size in props)
                    if(props[size])
                        return size
            }
        },
        watch:{
            size:{
                handler(){
                    this.$nextTick(()=>{
                        // 让文字垂直居中
                        this.$refs.mask.style.lineHeight = this.$refs.mask.offsetHeight - 1 + 'px'
                        if(this.rect){
                            this.$refs.mask.style.width = this.$refs.mask.offsetHeight + 'px'
                        }
                    })
                },
                immediate:true
            }
        }
    }
</script>
