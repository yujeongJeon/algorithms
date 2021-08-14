const codeOwnerMap = {
    "scripts": ['배수진'],
    "services": {
        "business-leader": ['고찬균', '배수진'],
        "card": ['채주민', '유재섭'],
        "payments": ['유재섭']
    }
}

function solution (codeOwnerMap, directory) {
    const deps = directory.split("/")

    let result = []

    deps.reduce((target, path) => {
        if (!target) {
            return target
        }
        if (Array.isArray(target[path])) {
            result = target[path]
            return false
        }
        return target[path]
    }, codeOwnerMap)
    return result
}

console.log(solution(codeOwnerMap, "scripts"))
console.log(solution(codeOwnerMap, "services/business-leader"))
console.log(solution(codeOwnerMap, "services/payments"))