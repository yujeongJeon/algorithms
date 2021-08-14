function parseSearch(search) {
    if (search[0] !== "?") return {}

    const removeFirstChar = (str) => {
        const s = str.split("")
        s.shift()
        return s.join('')
    }

    const targetSearch = removeFirstChar(search)
    const queries = targetSearch.split("&")

    const map = new Map()

    for (const query of queries) {
        const splited = query.split("=")
        const key = splited[0]
        const value = splited[1]

        if (map.has(key)) {
            const existedValues = map.get(key)
            map.set(key, [...existedValues, value])
        } else {
            map.set(key, [value])
        }
    }

    const result = {}
    map.forEach((value, key) => {
        result[key] = value.length > 1 ? value : value[0]
    })

    return result
}


function solution(search) {
    var query = parseSearch(search)
    return query
}

console.log(solution(""))
console.log(solution("?from=twitter"))
console.log(solution("?from=twitter&from=ad"))
console.log(solution("?range=1&range=8"))