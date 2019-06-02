export const init = (ctor, value) => {
  try {
    return new ctor(...value);
  } catch (e) {
    return ctor(...value);
  }
}

export const get = (entity, key) => {

}

export const add = (entity, child) => {
  
}

export const set = (entity, key, value) => {

}



export const call = (entity, key, value) => {

}

export const mix = (entity, mixin) => {

}
