<script>
    import hotkey from '@/plugins/mew/preferences/hotkey'

    export default {
        name: "formset-mixin-hotkey",
        mixins:[ hotkey ],
        methods:{
            hotkey_Escape(){
                if(this.form.valid)
                    this.form.valid = false
            }
        }
    }
</script>
