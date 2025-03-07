import https from "node:https";

function getJson(FormatDateToday,Location)
{   
    if (!FormatDateToday || !Location) {
        throw new Error("can't be undefined");
    }
    
    const UrlReq = `https://api.aladhan.com/v1/timingsByAddress/${FormatDateToday}?address=${Location}}`;

    return new Promise((resolve) => {
            https.get(UrlReq,(res)=>{
                let buffer = "";
                let JsonData ;
                res.on("data",(data)=>{
                    buffer += data.toString();
                });
        
                res.on("end",()=>{
                    JsonData = JSON.parse(buffer)
                    resolve(JsonData);
                });
            });
    })
}



export default {getJson};