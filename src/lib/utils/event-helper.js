import Map from 'core-js/es6/map';
class EventHelper {
  constructor() {
    this._listener = new Map();
  }
  addListener(instance, eventName, handler, context) {
    if (!AMap.event) throw new Error('please wait for Map API load');

    let listener = AMap.event.addListener(instance, eventName, handler, context);
    if (!this._listener.get(instance)) this._listener.set(instance, {});
    let listenerMap = this._listener.get(instance);
    if (!listenerMap[eventName]) listenerMap[eventName] = [];
    listenerMap[eventName].push(listener);

  }
  removeListener(instance, eventName, handler) {
    if (!AMap.event) throw new Error('please wait for Map API load');
    if (!this._listener.get(instance) || !this._listener.get(instance)[eventName]) return;
    let listenerArr = this._listener.get(instance)[eventName];
    if (handler) {
      let l_index = listenerArr.indexOf(handler);
      AMap.event.removeListener(listenerArr[l_index]);
      listenerArr.splice(l_index, 1);
    } else {
      listenerArr.forEach(listener => {
        AMap.event.removeListener(listener);
      });
      this._listener.get(instance)[eventName] = [];
    }
  }
  addListenerOnce(instance, eventName, handler, context) {
    return AMap.event.addListenerOnce(instance, eventName, handler, context);
  }
  trigger(instance, eventName, args) {
    return AMap.event.trigger(instance, eventName, args);
  }

  clearListeners() {

  }
};

let eventHelper = new EventHelper();

export default eventHelper;
