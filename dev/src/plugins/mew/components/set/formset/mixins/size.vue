<script>
    export default {
        name: "formset-mixin-size",
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
            }
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
    }
</script>