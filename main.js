(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var $ = require("jquery");
    var deg = Math.PI / 180;
    var Circle = (function () {
        function Circle(bar, items) {
            var _this = this;
            this.offset = { x: 0, y: 0 };
            this.getPositionByAngle = function (angle) {
                var radian = angle * deg;
                return {
                    x: Math.sin(radian) * _this.r + _this.offset.x,
                    y: Math.cos(radian) * _this.r + _this.offset.y
                };
            };
            this.speed = 60 / 3000;
            this.sync = function (angle, item) {
                var _a = _this.getPositionByAngle(angle), x = _a.x, y = _a.y;
                item.css({ left: x, top: y });
            };
            this.rotateTo = function (angle, withoutAnimation) {
                var _a = _this, items = _a.items, speed = _a.speed, sync = _a.sync;
                angle = angle % 360;
                items.prop('angle', function (index, angle) { return angle % 360; });
                var lastAngle = items.prop('angle');
                var gapAngle = angle - lastAngle;
                var duration = gapAngle / speed;
                items.stop(true);
                var nextState = { angle: "+=" + gapAngle };
                if (withoutAnimation) {
                    items.css(nextState);
                }
                else {
                    items.animate(nextState, {
                        duration: duration,
                        step: function () { sync(this.angle, this.item); }
                    });
                }
            };
            bar = this.bar = $(bar);
            items = this.items = $(items);
            this.chunkAngle = 360 / items.length;
            items.prop({
                angle: function (index) { return index * _this.chunkAngle; },
                item: function (index) { return items.eq(index); }
            });
            var sync = this.sync;
            items.each(function () { sync(this.angle, this.item); });
            debugger;
        }
        return Circle;
    }());
    exports.Circle = Circle;
});
//# sourceMappingURL=main.js.map