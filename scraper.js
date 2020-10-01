const request = require('request-promise');
const cheerio = require('cheerio');



const url = "http://vssut.ac.in/notice-board.php";


//it scrapes the bhishut website 😏
const scraper =async()=>{
    let data = [];
    const response = await request({
        uri:url,
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-Encoding": "gzip, deflate",
            "accept-Language": "en-US,en;q=0.9,en-IN;q=0.8,hi;q=0.7"
        },
        json: true,
    });
    let $ = cheerio.load(response);
    for(i=1;i<=10;i++){

        let title = $(`#no-more-tables > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`).text().trim()
        let date = $(`#no-more-tables > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`).text().trim()
        let downloadLink = "http://vssut.ac.in/"+$(`#no-more-tables > table > tbody > tr:nth-child(${i}) > td:nth-child(4) > a`).attr("href");

        data.push({
            title,date,downloadLink
        });
    }
    console.log(data);
    return data;
}

module.exports= {scraper};