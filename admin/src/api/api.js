const parser = (json, url) => {
    return json.data
}

const api_pull = (url, callback) => {
        fetch(url)
        .then(response => response.json())
        .then(json => callback(parser(json, url)))
        .catch(e => console.log(e))
}

const api_push = (url, data) => {
    let body = {
        'data':data
    }
    console.log(body)
    fetch(url, {
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    })
}
export {
    api_pull,
    api_push
}
