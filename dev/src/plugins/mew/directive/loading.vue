<template>
    <div class="mew-loading">
         <div class="rotateBox">
             <svg viewBox="25 25 50 50">
                 <circle cx="50" cy="50" r="20" fill="none"/>
             </svg>
         </div>
    </div>
</template>

<script>
    export default {
        name: "loading"
    }
</script>

<style scoped lang="scss">
div.mew-loading{
    display: inline-block;
    div.rotateBox{
        display: inline-block;
        width: 30px;
        height: 30px;
        vertical-align: middle;
        animation: full-rotate 2s linear infinite;
        @keyframes full-rotate {
            0% {transform: rotate(0deg)}
            100% {transform: rotate(360deg)}
        }
        svg{
            display: block;
            width: 100%;
            height: 100%;
            transform: rotate(120deg);
            circle{
                animation: circular 1.5s ease-in-out infinite;
                stroke: rgb(25, 137, 250);
                stroke-width: 3;
                stroke-linecap: round;
                @keyframes circular {
                    0% {
                        stroke-dasharray: 1, 200;
                        stroke-dashoffset: 0;
                    }
                    50% {
                        stroke-dasharray: 90, 150;
                        stroke-dashoffset: -40;
                    }
                    100% {
                        stroke-dasharray: 90, 150;
                        stroke-dashoffset: -120;
                    }
                }
            }
        }
    }
    }
</style>