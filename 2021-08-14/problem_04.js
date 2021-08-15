async function *requestCount (callAPI) {
    const {result, token} = await callAPI()
    yield {
        request: 'first call',
        data: {result, token}
    }

    let prevToken = token

    while(true) {
        const {result: afterFirstResult, token: afterFirstToken, previous} = await callAPI(prevToken)
        prevToken = afterFirstToken
        yield {
            request: 'after first call',
            data: {
                result: afterFirstResult,
                token: afterFirstToken,
                previous
            }
        }
    }
}

let generator

async function solution (callAPI) {
    if (!generator) {
        generator = requestCount(callAPI)
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