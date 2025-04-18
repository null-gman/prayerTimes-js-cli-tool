import GetReqRestApi from "./src/GetReqRestApi.js";
import MyPrint from "./src/logColor.js";
import TimeUtils from "./src/timeUtils.js";
import FLAGES_OBJ from "./src/getFlages.js";
import isFileExistAsync from "./src/isFileExistAsync.js";
import CachedJsonFs from "./src/CachedJsonFs.js";



/* 
    add your Location in this varable as string , 
    be sure the server(api) can handel your Location by testing it .
*/
const Location = "Alexandria";


/* The -pytm <file path> argument flag is used to configure the cache file location.
   By default, it uses "prayTimes.json" in the current working directory. */
let cachedFilePath = "./prayTimes.json";
//to disable the cach add "-nocach" flage

async function get_resDataSec_fromCach() {
    if(!await isFileExistAsync(cachedFilePath)){
        return false;
    }
    
    const stringObjFromFile = await CachedJsonFs.readCachedJson(cachedFilePath);
    if(!stringObjFromFile){
        return false;
    }

    let resDataSecObj = null;
    try {
        /* if the file is't Json */
        resDataSecObj = JSON.parse(stringObjFromFile);
     } catch (error) {
        return false ;
     }

    
    if (!resDataSecObj.timings || !resDataSecObj.date ) {
        return false;
    }

    const TodayDate = TimeUtils.GetTodayDate() ;

    if(resDataSecObj.date.gregorian.date !== TodayDate){
        return false;
    }

    return resDataSecObj;
}   

//i like to make a main function like in c programing
async function main() {

    if (FLAGES_OBJ["pytm"]) cachedFilePath = FLAGES_OBJ["pytm"];
    if (FLAGES_OBJ["nocach"]) {}


    const DateNow = new Date();
    const TodayDate = TimeUtils.GetTodayDate() ;
    const TimeNow = DateNow.getHours() + ":" + DateNow.getMinutes()  ; /*TODO*/ 
    const TimeNow12 = TimeUtils.formatTime_12Based(TimeNow);


    let resDataSec = false;

    if(!("nocach" in FLAGES_OBJ)){
        resDataSec = await get_resDataSec_fromCach();
    }

    if(!resDataSec){    
        resDataSec = (await GetReqRestApi.getJson(TodayDate,Location)).data;
        if(!("nocach" in FLAGES_OBJ)) await CachedJsonFs.createCachedJson(cachedFilePath,JSON.stringify(resDataSec));
    }
    

     
    MyPrint.info("TimeNow ",TimeNow12);
    MyPrint.info("Location ",Location);
    MyPrint.info("Hijri Date",resDataSec.date.hijri.date);
    MyPrint.info("Hijri Month",resDataSec.date.hijri.month.en);
    MyPrint.info("Miladi Date",TodayDate);
    console.log("====================================================");
    console.log("Prayers");
    console.log("====================================================");
    
    MyPrint.prayTime("Fajr",resDataSec.timings.Fajr);
    MyPrint.timeBetweenPrayes(resDataSec.timings,"Dhuhr","Fajr");
    MyPrint.prayTime("Dhuhr",resDataSec.timings.Dhuhr);
    MyPrint.timeBetweenPrayes(resDataSec.timings,"Dhuhr","Asr");
    MyPrint.prayTime("Asr",resDataSec.timings.Asr);
    MyPrint.timeBetweenPrayes(resDataSec.timings,"Asr","Maghrib");
    MyPrint.prayTime("Maghrib",resDataSec.timings.Maghrib);
    MyPrint.timeBetweenPrayes(resDataSec.timings,"Maghrib" , "Isha");
    MyPrint.prayTime("Isha",resDataSec.timings.Isha);

    console.log("====================================================");
    console.log("next prayer :");
    console.log("====================================================");

    
    const NextPray = TimeUtils.nextPray(resDataSec.timings,TimeNow);
    console.log(NextPray);
    
}



main();