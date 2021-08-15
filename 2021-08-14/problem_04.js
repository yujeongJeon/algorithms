async function *requestCount (callAPI) {
    const {result, token} = await callAPI()
    yield {
        request: 'first call',
        data: {result, token}
    }

    const {result: secondResult, token: secondToken} = await callAPI(token)

    yield {
        request: 'second call',
        data: {result: secondResult, token: secondToken}
    }

    while(true) {
        const {result: overThreeTimesResult, token: overThreeTimesToken} = await callAPI(token)
        yield {
            request: 'over three times call',
            data: {
                result: overThreeTimesResult,
                token: overThreeTimesToken
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
    (resolve) => resolve({
        result: resultCount++, 
        token: token || Math.random().toString().slice(2)
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