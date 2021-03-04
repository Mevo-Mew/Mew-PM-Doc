"use strict";
let __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (let s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (let p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

let draggable = {
    bind: function (el, binding, vnode, oldVnode) {
        draggable.update(el, binding)
    },
    update: function (el, binding, vnode, oldVnode) {
         el.removeEventListener("mousedown", el["listener"]);
         el.addEventListener("mousedown", moveStart);
         
         el.removeEventListener("touchstart", el["listener"]);
         el.addEventListener("touchstart", moveStart, { passive: false });
         
         el["listener"] = moveStart;
         initializeState()
        
        function move(event) {
            event.preventDefault();
            let state = getState();
            if (!state.startDragPosition || !state.initialMousePos) {
                initializeState(event);
                state = getState();
            }
            let pos = getInitialMousePosition(event);
            let dx = pos.left - state.initialMousePos.left;
            let dy = pos.top - state.initialMousePos.top;
            let currentDragPosition = {
                left: state.startDragPosition.left + dx,
                top: state.startDragPosition.top + dy
            };
           
            setState({ currentDragPosition: currentDragPosition });
            updateElementStyle();
            
            
        }
        function updateElementStyle() {
            let state = getState();
            if (!state.currentDragPosition) {
                return;
            }
            el.style.touchAction = "none";
            el.style.position = "fixed";
            el.style.left = state.currentDragPosition.left + "px";
            el.style.top = state.currentDragPosition.top + "px";
        }
        function moveEnd(event) {
            event.preventDefault();
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", moveEnd);
            document.removeEventListener("touchmove", move);
            document.removeEventListener("touchend", moveEnd);
            let currentRectPosition = getRectPosition();
            setState({
                initialMousePos: undefined,
                startDragPosition: currentRectPosition,
                currentDragPosition: currentRectPosition
            });
        }
        function moveStart(event) {
             if(binding.value){
                 setState({ initialMousePos: getInitialMousePosition(event) });
                 document.addEventListener("mousemove", move);
                 document.addEventListener("mouseup", moveEnd);
                 document.addEventListener("touchmove", move);
                 document.addEventListener("touchend", moveEnd);
             }
             
           
        }
        function getInitialMousePosition(event) {
            if (event instanceof MouseEvent) {
                return {
                    left: event.clientX,
                    top: event.clientY
                };
            }
            if (event instanceof TouchEvent) {
                let touch = event.changedTouches[event.changedTouches.length - 1];
                return {
                    left: touch.clientX,
                    top: touch.clientY
                };
            }
        }
        function getRectPosition() {
            let clientRect = el.getBoundingClientRect();
            if (!clientRect.height || !clientRect.width) {
                return;
            }
            return { left: clientRect.left, top: clientRect.top };
        }
        function initializeState(event) {
            let state = getState();
            let initialRectPositionFromBinding = binding && binding.value;
            let initialRectPositionFromState = state.initialPosition;
            let startingDragPosition = getRectPosition();
            let initialPosition = initialRectPositionFromBinding || initialRectPositionFromState || startingDragPosition;
            
            setState({
                initialPosition: initialPosition,
                startDragPosition: startingDragPosition,
                currentDragPosition: initialPosition,
                initialMousePos: getInitialMousePosition(event)
            });
            updateElementStyle();
        }
        function setState(partialState) {
            let prevState = getState();
            let state = __assign(__assign({}, prevState), partialState);
            el.setAttribute("draggable-state", JSON.stringify(state));
        }
        function getState() {
            return JSON.parse(el.getAttribute("draggable-state")) || {};
        }
        
    }
}

export default draggable
