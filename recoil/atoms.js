import { atom } from "recoil";

export const commonData = atom({
    key: 'commonData',
    default: {}
})


// Animations
export const scrollBehavior = atom({
    key: 'scrollBehavior',
    default: false
})