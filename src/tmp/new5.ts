import { isString } from "@typegoose/typegoose/lib/internal/utils"

const a = [2, 34, 45, 2, 2, 4, 5]

type b = typeof a

const isStringArray = (test: any[]): boolean => {
    return Array.isArray(test) && test.every((value) => value instanceof Number)
   }

export type Equals<X, Y> =
   (<T>() => T extends X ? 1 : 2) extends
   (<T>() => T extends Y ? 1 : 2) ? true : false;

let a : Equals<

if (isStringArray(a)) {
console.log('sdf')
} else {
    console.log('dfasfd')
}