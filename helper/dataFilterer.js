
export const useFilterer = (body, type) => {
    return body.filter(list => list._type == type)[0]
}

