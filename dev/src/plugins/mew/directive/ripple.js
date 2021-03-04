let ripple = {
    install: function install(Vue, options) {
        Vue.mixin({
            mounted: function mounted() {
                let length, bounce, ripple, rippleContainer;
                
                function debounce(func, delay) {
                    return function () {
                        let context = this,
                            args = arguments;
                        clearTimeout(bounce);
                        
                        return (bounce = setTimeout(function () {
                            return func.apply(context, args);
                        }, delay));
                    };
                }
                
                function makeRipple(e) {
                    ripple = this;
                    let setRipple = document.createElement("span");
                    setRipple.className = "ripple--body";
                    
                    let size = ripple.offsetWidth,
                        pos = ripple.getBoundingClientRect(),
                        x = e.clientX - pos.left - size / 2,
                        y = e.clientY - pos.top - size / 2,
                        style =
                            "will-change: top, left, height, width, auto; zoom: 1; top: " +
                            y +
                            "px; left: " +
                            x +
                            "px; height: " +
                            size +
                            "px; width: " +
                            size +
                            "px;";
                    
                    ripple.rippleContainer.appendChild(setRipple);
                    
                    return setRipple.setAttribute("style", style);
                }
                
                function removeRipple() {
                    while (this.rippleContainer.firstChild)
                        this.rippleContainer.removeChild(this.rippleContainer.firstChild);
                }
                
                // 选择含有 ripple 属性的元素
                let ripples = document.querySelectorAll("[ripple]");
                
                for (let i = 0, length = ripples.length; i < length; i++) {
                    ripple = ripples[i];
                    ripple.style.overflow = "hidden";
                    ripple.style.position = "relative";
                    
                    rippleContainer = document.createElement("div");
                    rippleContainer.className = "ripple--container";
                    
                    ripple.addEventListener("click", makeRipple);
                    ripple.addEventListener("mouseup", debounce(removeRipple, 2000));
                    ripple.rippleContainer = rippleContainer;
                    ripple.appendChild(rippleContainer);
                }
                
            },
        });
    },
};

if (typeof window !== "undefined" && window.Vue) window.VueRippler = ripple;

export default ripple;
