<template>
    <i class="mew-ico" :class="name" ref="mewIco">
    </i>
</template>

<script>
    export default {
        name: "mew-ico",
        data(){
            return {
                name:'',
            }
        },
        props:{
            'xs':{
                type:Boolean,
                default:false
            },
            'sm':{
                type:Boolean,
                default:false
            },
            'lg':{
                type:Boolean,
                default:false
            },
            'xl':{
                type:Boolean,
                default:false
            },
            'md':{
                type:Boolean,
                default:true
            },
            'size':{
                type:String,
                default:''
            },
            'color':{
                type:String,
                default:''
            }

        },
        computed:{
            scale(){
                if(this.size) return this.size + 'px'
                const value = {
                    xs:'12px',
                    sm:'14px',
                    lg:'18px',
                    xl:'20px',
                    md:'16px'
                }
                for(let size in value)
                    if(this[size])
                        return value[size]
            }
        },
        created(){
            this.name = 'ico-' + this.$slots.default[0].text.trim()
            this.$slots.default[0].text = ''
            this.$nextTick(()=>{
                this.$refs.mewIco.style.setProperty('--DIM-Size',this.scale)
                if(this.color)
                    this.$refs.mewIco.style.setProperty('--CLR-Text',this.color)
            })
        },
        beforeUpdate() {
            this.name = 'ico-' + this.$slots.default[0].text.trim()
            this.$slots.default[0].text = ''
            this.$nextTick(()=>{
                this.$refs.mewIco.style.setProperty('--DIM-Size',this.scale)
                if(this.color)
                    this.$refs.mewIco.style.setProperty('--CLR-Text',this.color)
            })
        }
    }
</script>

<style scoped lang="scss">
i.mew-ico{
    position: relative;
    --CLR-Text:inherit;
    --DIM-Size:16px;
    pointer-events: none;
    display: inline-block;
    width: var(--DIM-Size);
    height: var(--DIM-Size);
    &::before{
        text-indent: 0;
        position: absolute;left: 0;top: 0;
        display: inline-block;
        color: var(--CLR-Text);
        font-size: var(--DIM-Size);
        line-height: calc(var(--DIM-Size) + 1px);
        text-align: center;
        width: 100%;height: 100%;
    }
}
</style>