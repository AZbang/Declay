export const $ = {};

export const add = (el, selector) => {
    $[selector] = el;
}

export const remove = (selector) => {
    delete $[selector];
}
