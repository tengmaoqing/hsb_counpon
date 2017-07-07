/*
* @Author: tengmaoqing
* @Date:   2017-12-22 10:34:42
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2017-12-26 15:10:09
*/

// by zhangxinxu welcome to visit my personal website http://www.zhangxinxu.com/
// zxx.drag v1.0 2010-03-23 元素的拖拽实现

(function() {
  // var params = {
  //     left: 0,
  //     top: 0,
  //     currentX: 0,
  //     currentY: 0,
  //     flag: false,
  //     initLeft: 0,
  //     initTop: 0
  // };
  //获取相关CSS属性
  var getCss = function(o, key) {
      return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
  };

  // //拖拽的实现
  // var startDrag = function(bar, target, callback, final) {
  //     if (getCss(target, "left") !== "auto") {
  //         params.left = getCss(target, "left");
  //     }
  //     if (getCss(target, "top") !== "auto") {
  //         params.top = getCss(target, "top");
  //     }
  //     //o是移动对象
  //     bar.onmousedown = function(event) {
  //         params.flag = true;
  //         if (!event) {
  //             event = window.event;
  //             //防止IE文字选中
  //             bar.onselectstart = function() {
  //                 return false;
  //             }
  //         }
  //         var e = event;
  //         params.currentX = e.clientX;
  //         params.currentY = e.clientY;
  //         params.initLeft = params.left;
  //         params.initTop = params.top;
  //     };
  //     document.onmouseup = function() {
  //         params.flag = false;
  //         if (getCss(target, "left") !== "auto") {
  //             params.left = getCss(target, "left");
  //         }
  //         if (getCss(target, "top") !== "auto") {
  //             params.top = getCss(target, "top");
  //         }

  //         if (params.initLeft === params.left && params.initTop === params.top) {
  //           return;
  //         }
  //         final && final();
  //     };
  //     document.onmousemove = function(event) {
  //         var e = event ? event : window.event;
  //         if (!params.flag) {
  //           return;
  //         }

  //         var nowX = e.clientX,
  //             nowY = e.clientY;
  //         var disX = nowX - params.currentX,
  //             disY = nowY - params.currentY;
  //         target.style.left = parseInt(params.left) + disX + "px";
  //         target.style.top = parseInt(params.top) + disY + "px";
  //         if (event.preventDefault) {
  //             event.preventDefault();
  //         }

  //         if (typeof callback == "function") {
  //             callback(parseInt(params.left) + disX, parseInt(params.top) + disY);
  //         }
  //     }
  // };
  var oTarget = null;
  var oParams = null;
  var fCb = null;
  var fFinal = null;

  var StartDrag = function (params) {
    this.init(params);
  };

  StartDrag.prototype.init = function (params) {

    this.target = params.target;
    this.bar = params.bar;
    this.callback = params.callback;
    this.final = params.final;
    this.params = {
      left: 0,
      top: 0,
      currentX: 0,
      currentY: 0,
      flag: false,
      initLeft: 0,
      initTop: 0
    };

    if (getCss(this.target, "left") !== "auto") {
        this.params.left = getCss(this.target, "left");
    }
    if (getCss(this.target, "top") !== "auto") {
        this.params.top = getCss(this.target, "top");
    }

    this.bindEv();
  };

  StartDrag.prototype.bindEv = function () {
    var that = this;

    this.bar.onmousedown = function(event) {
        that.params.flag = true;
        oTarget = that.target;
        oParams = that.params;
        fFinal = that.final;
        fCb = that.callback;

        if (!event) {
            event = window.event;
            //防止IE文字选中
            that.bar.onselectstart = function() {
                return false;
            }
        }
        var e = event;
        that.params.currentX = e.clientX;
        that.params.currentY = e.clientY;
        that.params.initLeft = that.params.left;
        that.params.initTop = that.params.top;
    };

  };

  document.onmouseup = function(event) {
      if (!oTarget) {
        return;
      }

      oParams.flag = false;
      if (getCss(oTarget, "left") !== "auto") {
          oParams.left = getCss(oTarget, "left");
      }
      if (getCss(oTarget, "top") !== "auto") {
          oParams.top = getCss(oTarget, "top");
      }

      if (oParams.initLeft === oParams.left && oParams.initTop === oParams.top) {
        return;
      }
      fFinal && fFinal();
      oTarget = null;
      event.preventDefault();
  };
  document.onmousemove = function(event) {
      if (!oTarget) {
        return;
      }

      var e = event ? event : window.event;
      if (!oParams.flag) {
        return;
      }

      var nowX = e.clientX,
          nowY = e.clientY;
      var disX = nowX - oParams.currentX,
          disY = nowY - oParams.currentY;
      oTarget.style.left = parseInt(oParams.left) + disX + "px";
      oTarget.style.top = parseInt(oParams.top) + disY + "px";
      if (event.preventDefault) {
          event.preventDefault();
      }

      if (typeof fCb == "function") {
          fCb(parseInt(oParams.left) + disX, parseInt(oParams.top) + disY);
      }
  }

  window.startDrag = function (bar, target, cb, final) {
    return new StartDrag({
      bar: bar,
      target: target,
      callback: cb,
      final: final
    });
  };
})(window, document);