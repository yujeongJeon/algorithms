async function *requestInOrder (callAPI) {
    const {result, token} = await callAPI()
    yield {
        request: `call ${result}`,
        data: {result, token}
    }

    let prevToken = token

    while(true) {
        const {result: afterFirstResult, token: afterFirstToken} = await callAPI(prevToken)
        prevToken = afterFirstToken
        yield {
            request: `call ${afterFirstResult}`,
            data: {
                result: afterFirstResult,
                token: afterFirstToken,
            }
        }
    }
}

let generator

async function solution (callAPI) {
    if (!generator) {
        generator = requestInOrder(callAPI)
    }

    const {value} = await generator.next()

    const {request, data} = value

    console.log(request, data)

    return data
}

let resultCount = 1
const callAPI = (token) => new Promise(
    (resolve) => 
        resolve({
            result: resultCount++, 
            token: Math.random().toString().slice(2),
        })
)

solution(callAPI)
solution(callAPI)
solution(callAPI)
solution(callAPI)
solution(callAPI)
solution(callAPI)
solution(callAPI)
solution(callAPI)