import assert from 'assert'

class stuff {
    v: number
    constructor(val: number) {
        this.v = val
    }
}

let a = [new stuff(1), new stuff(2), new stuff(3)]

assert(a[0] instanceof stuff)