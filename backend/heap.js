// heap.js - MaxHeap for patients
class MaxHeap {
  constructor() {
    this.data = [];
  }

  // comparator: returns true if a has higher priority than b
  higherPriority(a, b) {
    if (a.severity !== b.severity) return a.severity > b.severity;
    return a.arrivalTime < b.arrivalTime;
  }

  swap(i, j) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }

  push(item) {
    this.data.push(item);
    this._siftUp(this.data.length - 1);
  }

  pop() {
    if (this.data.length === 0) return null;
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this._siftDown(0);
    }
    return top;
  }

  peek() {
    return this.data.length ? this.data[0] : null;
  }

  size() { return this.data.length; }

  // for frontend display, return sorted array copy (without destroying heap)
  toSortedArray() {
    // copy and sort by priority descending
    return [...this.data].sort((a, b) => {
      if (a.severity !== b.severity) return b.severity - a.severity;
      return a.arrivalTime - b.arrivalTime;
    });
  }

  _siftUp(idx) {
    while (idx > 0) {
      const parent = Math.floor((idx - 1)/2);
      if (this.higherPriority(this.data[idx], this.data[parent])) {
        this.swap(idx, parent);
        idx = parent;
      } else break;
    }
  }

  _siftDown(idx) {
    const n = this.data.length;
    while (true) {
      let largest = idx;
      const l = 2*idx + 1, r = 2*idx + 2;
      if (l < n && this.higherPriority(this.data[l], this.data[largest])) largest = l;
      if (r < n && this.higherPriority(this.data[r], this.data[largest])) largest = r;
      if (largest === idx) break;
      this.swap(idx, largest);
      idx = largest;
    }
  }
}

module.exports = MaxHeap;
