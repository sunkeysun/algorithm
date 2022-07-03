class MinHeap {
  _list = []
  _size

  constructor(size = -1) {
    this._size = size
  }

  peek() {
    return this._list[0]
  }

  pop() {
    const top = this.peek()
    const lastIndex = this._list.length - 1
    this._list.splice(0, 1, this._list[lastIndex])
    this._list.splice(lastIndex, 1)
    this._shiftDown()
    return top
  }

  push(value) {
    this._list.push(value)
    this._shiftUp()
    if (this._size > 0 && this._list.length > this._size) {
      this.pop()
    }
  }

  _shiftUp() {
    if (this._list.length < 2) {
      return ;
    }
    let index = this._list.length - 1
    let pIndex = this._getParentIndex(index)
    while (pIndex >= 0) {
      if (this._list[index] < this._list[pIndex]) {
        [this._list[index], this._list[pIndex]] = [this._list[pIndex], this._list[index]]
      }
      index = pIndex 
      pIndex = this._getParentIndex(pIndex)
    }
  }

  _shiftDown() {
    if (this._list.length < 2) {
      return ;
    }
    const lastIndex = this._list.length - 1
    let index = 0
    let lIndex = this._getLeftChildIndex(index)
    let rIndex = this._getRightChildIndex(index)

    while (index < lastIndex) {
      const childIndex = this._list[lIndex] < this._list[rIndex] ? lIndex : rIndex
      if (this._list[index] > this._list[childIndex]) {
        [this._list[index], this._list[childIndex]] = [this._list[childIndex], this._list[index]]
      }
      index = childIndex
      lIndex = this._getLeftChildIndex(index)
      rIndex = this._getRightChildIndex(index)
    }
  }

  _getLeftChildIndex(index) {
    return Math.min(2 * index + 1, this._list.length - 1)
  }

  _getRightChildIndex(index) {
    return Math.min(2 * index + 2, this._list.length - 1)
  }

  _getParentIndex(index) {
    const parentIndex = Math.floor((index - 1) / 2)
    return parentIndex
  }
}

const size = 6
const minHeap = new MinHeap(size)

const arr = [9, 11, 3, 4, 6, 99, 77, 56, 66, 12]

console.log(arr.sort((a, b) => a - b))

arr.forEach((v) => minHeap.push(v))

console.log(minHeap.peek(), `top ${size}`)
