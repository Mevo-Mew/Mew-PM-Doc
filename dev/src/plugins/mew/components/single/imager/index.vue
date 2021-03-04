<template>
    <a ref="imager" class="mew-imager" :class="{void:href === 'JavaScript:;'}" :style="style" draggable="false">
        <div v-if="crypto"
             class="crypto" :class="{loaded:intersected}" @contextmenu="vain" draggable="false"/>
        <img v-else ref="img"
             class="source" :class="{loaded:loaded}" :src="url" @load="load"  draggable="false">
    </a>
</template>

<script>
    export default {
        name: "mew-imager",
        data(){
            return {
                observer: null, intersected: false, loaded: false,
            }
        },
        props: {
            href:{
                type: String,
                default:'JavaScript:;'
            },
            width:{
                type: String,
                default:''
            },
            height:{
                type: String,
                default:''
            },
            fill:{
                type: Boolean,
                default:false
            },
            src: {
                type: String,
                default:''
            },
            crypto:{
                type: Boolean,
                default:false
            },
            alt:{// 图片失效时的文字
                type: String,
                default:""
            },
            placeholder: {
                type: String,
                default:""
                // default: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3138463716,2331109968&fm=26&gp=0.jpg'
            },
            option:{
                type:Object,
                default(){
                    return {
                        rootMargin: '0px',// 控制(屏幕)探测边界，值越大，图片进入越深入才可触发，可为负值
                        threshold: 0.8    // 图片进入程度，0.8 是 80% 进入时就触发，最大值为 1
                    }
                }
            }
        },
        methods: {
            load() {
                if (this.$refs.img.getAttribute("src") !== this.placeholder) {
                    this.loaded = true
                    this.$emit("load")
                }
            },
            vain(){
                event.returnValue = !this.crypto
            }
        },
        watch:{
            intersected(val){
                if(this.crypto && val)
                    this.$refs.imager.style.setProperty('--URL-Img',`url("${this.url}")`)
            }
        },
        computed: {
            style(){
                let style = ''
                if(this.fill)
                    style += 'width:100%;height:100%;'
                if(this.width)
                    style += 'width:' + this.width + ';'
                if(this.height)
                    style += 'height:' + this.height + ';'
                return style

            },
            url() {
                return this.intersected && this.src ? this.src : this.placeholder;
            },
        },
        mounted() {
            if ("IntersectionObserver" in window) {
                this.observer = new IntersectionObserver(entries => {
                    const image = entries[0];
                    if (image.isIntersecting) {
                        this.intersected = true;
                        this.observer.disconnect();
                        this.$emit("intersect");
                    }
                },this.option);
                this.observer.observe(this.$el);
            }
        },
        destroyed() {
            if ("IntersectionObserver" in window) {
                this.observer.disconnect();
            }
        }
    }
</script>

<style scoped lang="scss">
    a.mew-imager{
        --Txt-Alt:"Soysia";
        --URL-Img:'';
        position: relative;
        display: flex;justify-content: center;align-items: center;
        width: 300px;
        height: 200px;
        text-align: center;
        border-radius: 2px;
        box-sizing: border-box;
        overflow: hidden;
        cursor: default;
        &.void{
            cursor: default;
        }
        &::before{
            position: absolute;left: 0;top: 0;height: 100%;width: 100%;
            display: flex;justify-content: center;align-items: center;
            content: var(--Txt-Alt);color: rgba(0,0,0,.15);
            font-size: 24px;font-weight: bold;line-height: 100%;
            box-sizing: border-box;
            border: 4px solid rgba(0,0,0,.01);
            background-color: rgba(0,0,0,.01);
        }
        div.crypto,img.source{
            position: relative;z-index: 1;
            object-fit: cover;
            width: 100%;height: 100%;
            opacity: 0;
            transition: all 1s;
            &.loaded{
                opacity: 1;
            }
        }
        div.crypto{
            background-image: var(--URL-Img);
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }
    }

</style>