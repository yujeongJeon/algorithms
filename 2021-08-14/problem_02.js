const fetchExperts = () => new Promise((resolve) => setTimeout(() => resolve(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']), 100))
const fetchIsExportOnline = (name) => new Promise((resolve) => setTimeout(() => {
    const onlineExperts = ['A', 'C', 'E', 'J']
    if (onlineExperts.includes(name)) {
        return resolve(true)
    }
    return resolve(false)
}, 70))


async function solution (fetchExperts, fetchIsExportOnline) {
    console.time("test");
    const experts = await fetchExperts()
    const onlinedExperts = await Promise.all(experts.map((e) => fetchIsExportOnline(e)))
    const results = experts.filter((e, i) => onlinedExperts[i])
    console.timeEnd('test'); 
    console.log(results)
    return results
}

solution(fetchExperts, fetchIsExportOnline)