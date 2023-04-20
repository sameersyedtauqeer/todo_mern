export const fetch2 = async (api, body) => {
    const res = await fetch(api, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify(body)
    })
    return await res.json()
}

export const fetch3 = async (api, type) => {
    const res = await fetch('http://localhost:5000' + api, {
        method: type,
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
            // mode: "no-cors"
        },
    })
    return await res.json()
}