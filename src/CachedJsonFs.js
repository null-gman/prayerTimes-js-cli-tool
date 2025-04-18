import fs from "node:fs" ;




function createCachedJson(filePath,jsonStr) {

    return new Promise((resolve, _) => {
        fs.writeFile(filePath,
                    jsonStr,
                    (err)=>{
                        if(err)resolve(false);
                        else resolve(true);
                    })
    })

}

function readCachedJson(filePath) {

    return new Promise((resolve, _) => {
        fs.readFile(filePath,
                    (err,data)=>{
                        if(err)resolve(false);
                        else resolve(data);
                    })
    })

}


export default {createCachedJson, readCachedJson};