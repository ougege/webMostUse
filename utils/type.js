/**
 * 对js中基本类型和引用类型判断
 * yanglu
 */
class Type {
  constructor (value) {
    this.typeList = ['Null', 'Undefined', 'Object', 'Array', 'String', 'Number', 'Boolean', 'Function', 'RegExp', 'Date']
    this.init()
  }
  type (value) {
    let s = Object.prototype.toString.call(value)
    return s.match(/\[object (.*?)\]/)[1].toLowerCase()
  }
  // 增加判断类型数据方法
  init () {
    this.typeList.forEach((t) => {
      this['is' + t] = (o) => {
        return this.type(o) === t.toLowerCase()
      }
    })
  }
}

let type = new Type()
// 使用 type["isNull"](null)等
export {type}
