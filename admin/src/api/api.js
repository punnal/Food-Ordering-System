const parser = (data, url) => {
    return data
}

const api_pull = (url, callback) => {
        fetch(url)
            .then(response => response.json())
            .then(json => {
                callback(parser(json.data, url))
            })
}

const api_push = (url, data) => {
    fetch(url, {
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
}
export {
    api_pull,
    api_push
}
