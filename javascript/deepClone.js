/**
 * 深拷贝
 */
// 递归版，存在爆栈问题
function deepClone(target) {
  const cache = new WeakMap()

  function deepCloneInner(target) {
    if (typeof target !== 'object' || !target) {
      return target
    }

    if (cache.has(target)) {
      return cache.get(target)
    }

    const cloneResult = Array.isArray(target) ? [] : {}
    for (const [k, v] of Object.entries(target)) {
      const cloneVal = deepCloneInner(v)
      if (typeof v === 'object' && !!v) {
        cache.set(v, cloneVal)
      }
      cloneResult[k] = cloneVal
    }

    return cloneResult
  }
  return deepCloneInner(target)
}

// 循环版
function deepCloneLoop(target) {
  if (typeof target !== 'object' || !target) {
    return target
  }

  const cache = new WeakMap()
  const result = Array.isArray(target) ? [] : {}
  let cloneObj = result

  const stack = [[cloneObj, target]]

  while (stack.length) {
    let [cloneObj, target] = stack.shift()
    for (const [key, val] of Object.entries(target)) {
      if (typeof val !== 'object' || !val) {
        cloneObj[key] = val
        continue
      }
      if (cache.has(val)) {
        cloneObj[key] = cache.get(val)
        continue
      }
      cloneObj[key] = Array.isArray(val) ? [] : {}
      cache.set(val, cloneObj[key])
      stack.push([cloneObj[key], val])
    }
  }

  return result
}
