const axios = require('axios')
const qs = require('querystring')
const fs = require('fs')

const url = 'https://gramsave.com/'
const nextUrl = 'https://gramsave.com/media'
let count = 1

const requestBody = qs.stringify({
    '__RequestVerificationToken':'aRT5MPWuSOcqobfbWGdK5X5p3FnU9aMOHoZ2834LNQasZCVRoywsidKqz9Ai3wZv58oOAcum2MxecHKF0EwCGjAxE1_ENKYpWQHBV3yGMzU1',
    'Item1.instagram_url': 'https://www.instagram.com/kimi.hime/',
    'X-Requested-With': 'XMLHttpRequest'
})

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': '*/*',
        'Cookie': '__cfduid=d9bfc6b6f623241b4d0301418fe5500b41552923741; __RequestVerificationToken=lbb7-qwtz3wekhxjg-JAfFgN2DSn70pumgHxSZ90NFsUHotwzy9bUbKXqczCP0o01xqHR6JLOquDUpkwDV0F-sgtYJtvaSjyvzXxwWEK23U1; _ga=GA1.2.225705460.1552923748; _gid=GA1.2.841458617.1552923749; __atuvc=1%7C12; __atuvs=5c8fbda9d669ba93000; _gat_gtag_UA_108087655_1=1',
    }
}

const writeFile = async (result, next) => {
    fs.readFile('result.json', 'utf8', (err, data) =>  {
        if(err) {
            console.log('error read')
            throw err
        };

        let read = JSON.parse(data)
        if(read.media) {
            read.media = [...read.media, ...result.media]
        } else {
            read = result
        }

        const write = JSON.stringify(read)
        fs.writeFile('result.json', write, 'utf8', (err) => {
            if (err) {
                console.log('error write')
                throw err
            };
            console.log('The file has been saved!', read.media.length);

            if(result.has_next_page) {
                next({
                    page: result.next_page,
                    userid: result.userid,
                    username: result.username
                })
            }

        }); 


    })

}

const main = async () => {
    try {
        const result = await axios.post(url, requestBody, config)
        count++
        writeFile(result.data, nextPage)
    } catch (err) {
        console.log(err, 'error fetch 1st')
    }
}

const nextPage = async ({page, userid, username}) => {
    try {
        const nextRequestBody = {page, userid, username}
        console.log(count, nextRequestBody.page)
        const result = await axios.post(nextUrl, nextRequestBody, {
            headers: {...config.headers, 'Content-Type': undefined}
        })
        count++
        writeFile(result.data, nextPage)
    } catch (err) {
        console.log(err)
    }

}

main()