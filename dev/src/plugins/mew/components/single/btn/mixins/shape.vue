<script>
    export default {
        props:{
            rounded:{
                type:Boolean,
                default: false
            },
            block:{
                type:Boolean,
                default: false
            },
            tile:{
                type:Boolean,
                default: false
            },
            rect:{
                type:Boolean,
                default: false
            },
            compact:{
                type:Boolean,
                default: false
            },
            left:{
                type:Boolean,
                default: false
            },
            middle:{
                type:Boolean,
                default: false
            },
            right:{
                type:Boolean,
                default: false
            },
        },
        computed:{
            shape(){
                return (this.rounded ? " rounded" : "") +
                    (this.block ? " block" : "") +
                    (this.tile ? " tile" : "") +
                    (this.rect ? " rect" : "") +
                    (this.compact ? " compact" : "") +
                    (this.left ? " left" : "") +
                    (this.middle ? " middle" : "") +
                    (this.right ? " right" : "")
            }
        },
        mounted(){
            if(this.compact){
                this.$refs.mewBtn.style.setProperty('--LTR-spacing','.4px')
                this.$refs.mewBtn.style.setProperty('--LTR-Indent','1px')
            }
        }

    }
</script>