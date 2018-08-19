/*
 * Kontra.js v4.0.1 (Custom Build on 2018-08-19) | MIT
 * Build: https://straker.github.io/kontra/download?files=gameLoop+sprite+pointer
 */
kontra={init(t){var n=this.canvas=document.getElementById(t)||t||document.querySelector("canvas");this.context=n.getContext("2d")},_noop:new Function,_tick:new Function};
kontra.gameLoop=function(e){let t,n,a,r,o=(e=e||{}).fps||60,i=0,p=1e3/o,c=1/o,s=!1===e.clearCanvas?kontra._noop:function(){kontra.context.clearRect(0,0,kontra.canvas.width,kontra.canvas.height)};function d(){if(n=requestAnimationFrame(d),a=performance.now(),r=a-t,t=a,!(r>1e3)){for(kontra._tick(),i+=r;i>=p;)m.update(c),i-=p;s(),m.render()}}let m={update:e.update,render:e.render,isStopped:!0,start(){t=performance.now(),this.isStopped=!1,requestAnimationFrame(d)},stop(){this.isStopped=!0,cancelAnimationFrame(n)}};return m};
!function(){class t{constructor(t,i){this._x=t||0,this._y=i||0}add(t,i){this.x+=(t.x||0)*(i||1),this.y+=(t.y||0)*(i||1)}clamp(t,i,h,s){this._c=!0,this._a=t,this._b=i,this._d=h,this._e=s}get x(){return this._x}get y(){return this._y}set x(t){this._x=this._c?Math.min(Math.max(this._a,t),this._d):t}set y(t){this._y=this._c?Math.min(Math.max(this._b,t),this._e):t}}kontra.vector=((i,h)=>new t(i,h)),kontra.vector.prototype=t.prototype;class i{init(t,i,h,s){for(i in t=t||{},this.position=kontra.vector(t.x,t.y),this.velocity=kontra.vector(t.dx,t.dy),this.acceleration=kontra.vector(t.ddx,t.ddy),this.width=this.height=0,this.context=kontra.context,t)this[i]=t[i];if(h=t.image)this.image=h,this.width=h.width,this.height=h.height;else if(h=t.animations){for(i in h)this.animations[i]=h[i].clone(),s=s||h[i];this._ca=s,this.width=s.width,this.height=s.height}return this}get x(){return this.position.x}get y(){return this.position.y}get dx(){return this.velocity.x}get dy(){return this.velocity.y}get ddx(){return this.acceleration.x}get ddy(){return this.acceleration.y}set x(t){this.position.x=t}set y(t){this.position.y=t}set dx(t){this.velocity.x=t}set dy(t){this.velocity.y=t}set ddx(t){this.acceleration.x=t}set ddy(t){this.acceleration.y=t}isAlive(){return this.ttl>0}collidesWith(t){return this.x<t.x+t.width&&this.x+this.width>t.x&&this.y<t.y+t.height&&this.y+this.height>t.y}update(t){this.advance(t)}render(){this.draw()}playAnimation(t){this._ca=this.animations[t],this._ca.loop||this._ca.reset()}advance(t){this.velocity.add(this.acceleration,t),this.position.add(this.velocity,t),this.ttl--,this._ca&&this._ca.update(t)}draw(){this.image?this.context.drawImage(this.image,this.x,this.y):this._ca?this._ca.render(this):(this.context.fillStyle=this.color,this.context.fillRect(this.x,this.y,this.width,this.height))}}kontra.sprite=(t=>(new i).init(t)),kontra.sprite.prototype=i.prototype}();
!function(){let n,t=[],e=[],o={},i=[],r={},a={0:"left",1:"middle",2:"right"};function c(t){let e=n.x-Math.max(t.x,Math.min(n.x,t.x+t.width)),o=n.y-Math.max(t.y,Math.min(n.y,t.y+t.height));return e*e+o*o<n.radius*n.radius}function u(){let o,i,r=e.length?e:t;for(let t=r.length-1;t>=0;t--)if(i=(o=r[t]).collidesWithPointer?o.collidesWithPointer(n):c(o))return o}function s(n){r[a[n.button]]=!0,h(n,"onDown")}function d(n){r[a[n.button]]=!1,h(n,"onUp")}function h(t,e){if(!kontra.canvas)return;let i,r,a;-1!==t.type.indexOf("mouse")?(i=t.clientX,r=t.clientY):(i=(t.touches[0]||t.changedTouches[0]).clientX,r=(t.touches[0]||t.changedTouches[0]).clientY),n.x=i-kontra.canvas.offsetLeft,n.y=r-kontra.canvas.offsetTop,t.target===kontra.canvas&&(a=u())&&a[e]&&a[e](),o[e]&&o[e](t,a)}addEventListener("mousedown",s),addEventListener("touchstart",s),addEventListener("mouseup",d),addEventListener("touchend",d),addEventListener("blur",function(n){r={}}),addEventListener("mousemove",function(n){h(n,"onOver")}),n=kontra.pointer={x:0,y:0,radius:5,track(n){[].concat(n).map(function(n){n._r||(n._r=n.render,n.render=function(){t.push(this),this._r()},i.push(n))})},untrack(n,t){[].concat(n).map(function(n){n.render=n._r,n._r=t;let e=i.indexOf(n);-1!==e&&i.splice(e,1)})},over:n=>-1!==i.indexOf(n)&&u()===n,onDown(n){o.onDown=n},onUp(n){o.onUp=n},pressed:n=>!!r[n]},kontra._tick=function(){e.length=0,t.map(function(n){e.push(n)}),t.length=0}}();