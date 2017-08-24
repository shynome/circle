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
            this.duration = 700;
            this.sync = function (angle, item) {
                var _a = _this.getPositionByAngle(angle), x = _a.x, y = _a.y;
                item.css({ left: x, top: y });
            };
            this.easing = 'linear';
            this.state = { lastAngle: 0 };
            this.rotateTo = function (angle, nolimit) {
                if (nolimit === void 0) { nolimit = false; }
                var _a = _this, items = _a.items, duration = _a.duration, sync = _a.sync, state = _a.state;
                angle = nolimit ? angle : angle % 360;
                var map2dom = function () {
                    var map2dom = nolimit
                        ? function () { sync(this.angle, this.item); }
                        : function () { sync(this.angle, this.item); };
                    return map2dom;
                }();
                return items.stop(true).animate({ angle: "+=" + angle }, {
                    duration: duration,
                    easing: _this.easing,
                    step: map2dom,
                    complete: map2dom
                }).promise();
            };
            bar = this.bar = $(bar);
            items = this.items = $(items);
            var w1 = bar.width(), w2 = items.width();
            this.r = (w1 - w2) / 2;
            this.offset = { x: w1 / 2, y: w1 / 2 };
            var chunkAngle = this.chunkAngle = 360 / items.length;
            items.prop({
                angle: function (index) { return index * _this.chunkAngle; },
                item: function (index) { return items.eq(index); }
            });
            //init
            var sync = this.sync;
            bar.css({ position: 'relative' });
            items.css({ position: 'absolute', margin: w2 / -2 }).each(function () { sync(this.angle, this.item); });
            var rotateTo = this.rotateTo;
            this.items.on('click.circle.toggle', function () {
                rotateTo(this.angle * -1);
                bar.trigger('circle.toggle', items.index(this));
            });
        }
        return Circle;
    }());
    exports.Circle = Circle;
});
//# sourceMappingURL=main.js.map