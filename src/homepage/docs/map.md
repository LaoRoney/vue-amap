# 地图

---

## 示例

```html
<template>
  <div class="amap-page-container">
    <el-amap :vid="'amap-vue'" :center="center" :zoom="zoom" :map-manager="amapManager" :plugin="plugin" :events="events">
       <el-amap-marker v-for="marker in markers" :position="marker"></el-amap-marker>
    </el-amap>
    <button v-on:click="getMap">get map</button>
    <button type="button" name="button" v-on:click="addZoom">zoom++</button>
    <button type="button" name="button" v-on:click="subZoom">zoom--</button>
    <button type="button" name="button" v-on:click="changeCenter">change center</button>
  </div>
</template>
<script>
import { AMapManager } from 'vue-amap';
let amapManager = new AMapManager();
export default {
  name: 'amap-page',
  data: function() {
    return {
      vid: 'amap-vue-1',
      zoom: 12,
      center: [121.59996, 31.197646],
      events: {
        'moveend': () => {
          let mapCenter = this.amapManager.getMap().getCenter();
          this.center = [mapCenter.getLng(), mapCenter.getLat()];
        },
        'zoomchange': () => {
          this.zoom = this.amapManager.getMap().getZoom();
        },
        'click': (e) => {
          alert('map clicked');
        }
      },
      plugin: ['ToolBar', {
        pName: 'MapType',
        defaultType: 0,
        events: {
          init(o) {
            console.log(o);
          }
        }
      }],
      amapManager: amapManager,
      markers: [
               [121.59996, 31.197646],
               [121.40018, 31.197622],
               [121.69991, 31.207649]]
    };
  },
  methods: {
    getMap: function() {
      console.log(this.amapManager.getMap());
      console.log(this.center);
    },
    addMarker: function() {
      let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
      let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
      this.markers.push([lng, lat]);
    },
    addZoom() {
      this.zoom++;
    },
    subZoom() {
      this.zoom--;
    },
    changeCenter() {
      this.center = [this.center[0] + 0.1, this.center[1] + 0.1];
      console.log(this.center);
    }
  }
};
</script>
```

<demo></demo>
<script>
import Demo from 'demos/amap.vue';
export default {
  components: {
    Demo
  }
}
</script>

## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
vid | String | 地图容器节点的ID。
amapManager| AMapManager | 地图管理对象。
cursor | String | 地图默认鼠标样式。参数cursor应符合CSS的cursor属性规范。
animateEnable | Boolean | 地图平移过程中是否使用动画，默认为true，即使用动画。
isHotspot | Boolean | 是否开启地图热点，默认false 不打开。
rotateEnable | Boolean  | 地图是否可旋转，默认false。
resizeEnable | Boolean  | 是否监控地图容器尺寸变化，默认值为false。
showIndoorMap | Boolean  | 	是否在有矢量底图的时候自动展示室内地图，PC端默认是true，移动端默认是false。
expandZoomRange | Boolean | 	是否支持可以扩展最大缩放级别.设置为true的时候，zooms的最大级别在PC上可以扩大到20级，移动端还是高清19/非高清20。
dragEnable | Boolean  | 	地图是否可通过鼠标拖拽平移，默认为true。
zoomEnable | Boolean  | 	地图是否可缩放，默认值为true。
doubleClickZoom | Boolean  | 	地图是否可通过双击鼠标放大地图，默认为true。
keyboardEnable | Boolean  | 	地图是否可通过键盘控制，方向键控制地图平移，"+"和"-"可以控制地图的缩放，Ctrl+“→”顺时针旋转，Ctrl+“←”逆时针旋转，默认为true。
jogEnable | Boolean  | 	地图是否使用缓动效果，默认值为true。
scrollWheel | Boolean  | 	地图是否可通过鼠标滚轮缩放浏览，默认为true。
touchZoom | Boolean  | 	地图在移动终端上是否可通过多点触控缩放浏览地图，默认为true。

## 动态属性
支持响应式。
名称 | 类型 | 说明
---|---|---|
zooms | Array | 地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3-19]，取值范围[3-19]
center | Array | 地图中心点坐标值
labelzIndex | Number | 地图标注显示顺序
lang | String | 地图语言类型 默认：zh_cn，可选值：zh_cn：中文简体，en：英文，zh_en：中英文对照
mapStyle	| String |	设置地图显示样式，目前支持normal（默认样式）、dark（深色样式）、light（浅色样式）、fresh(osm清新风格样式)四种

## AmapManager
用于获取地图实例，以及获得地图内组件的实例。
名称 | 参数 | 返回类型 | 说明
---|--- | --- |---|
getMap | | AMap.Map | 返回地图实例，注入该管理实例的组件的地图实例
getChildInstance| vid | instance | 返回 vid 对应的组件实例


## 事件

事件 | 参数 | 说明
---|---|---|
complete | |地图图块加载完成后触发事件
click |[MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) |鼠标左键单击事件 相关示例
dblclick |[MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) |鼠标左键双击事件
mapmove | |地图平移时触发事件
hotspotclick |{type,lnglat,name,id} |鼠标点击热点时触发（自v1.3 新增）
hotspotover |{type,lnglat,name,id} |鼠标滑过热点时触发（自v1.3 新增）
hotspotout |{type,lnglat,name,id} |鼠标移出热点时触发（自v1.3 新增）
movestart | |地图平移开始时触发
moveend | |地图平移结束后触发。如地图有拖拽缓动效果，则在缓动结束后触发
zoomchange | |地图缩放级别更改后触发
zoomstart | |缩放开始时触发
zoomend | |缩放停止时触发
mousemove |[MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) |鼠标在地图上移动时触发
mousewheel |[MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) |鼠标滚轮开始缩放地图时触发
mouseover |[MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) |鼠标移入地图容器内时触发
mouseout |[MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) |鼠标移出地图容器时触发
mouseup |[MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) |鼠标在地图上单击抬起时触发
mousedown |[MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) |鼠标在地图上单击按下时触发
rightclick |[MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) |鼠标右键单击事件
dragstart | |开始拖拽地图时触发
dragging | |拖拽地图过程中触发
dragend | |停止拖拽地图时触发。如地图有拖拽缓动效果，则在拽停止，缓动开始前触发
resize | |地图容器大小改变事件
touchstart |[MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) |触摸开始时触发事件，仅适用移动设备
touchmove	|[MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent)	|触摸移动进行中时触发事件，仅适用移动设备
touchend | |
