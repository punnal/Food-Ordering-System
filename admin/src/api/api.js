const parser = (json, url) => {
    return json.data
}

const api_pull = (url, callback) => {
        fetch(url)
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(json => callback(parser(json, url)))
        .catch(e => console.log(e))
}

const api_push = (url, data, callback) => {
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
    }).then(resp => {
        console.log(resp)
        return (callback)? resp.json() : null
    }).then(json => callback(json)).catch(() => console.log('caught'))
}

const api_pull_dummy = (url, callback) => {
    console.log('pulling', url)
    if(url === '/api/gallery'){
    callback(
        [
            {
                'id':"32423254",
                'photo_url':'https://i.pinimg.com/originals/f6/75/b3/f675b37884d8a1a286ca391e60fb8f87.jpg'
            },
            {
                'id':"57655845",
                'photo_url':'https://i.pinimg.com/originals/f6/75/b3/f675b37884d8a1a286ca391e60fb8f87.jpg'
            },
            {
                'id':"45645634",
                'photo_url':'https://i.pinimg.com/originals/f6/75/b3/f675b37884d8a1a286ca391e60fb8f87.jpg'
            }
        ]
    )
    }
    else if (url === '/api/aboutus') {
        callback(
            {
                heading:'This is some heading',
                body:'this is the text body'
            }
        )
    }
}

export {
    api_pull,
    api_push,
    api_pull_dummy
}
