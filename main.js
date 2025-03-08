import GetReqRestApi from "./src/GetReqRestApi.js";
import MyPrint from "./src/logColor.js";
import TimeUtils from "./src/timeUtils.js";

MyPrint


/* add your Location in this varable as string , 
    be sure the server(api) can handel your Location by testing it 
*/
const Location = "Alexandria";


//i love make main functhion like in c programing
async function main() {
    const TodayDate = TimeUtils.GetTodayDate();
    // const TimeNow = (new Date).toLocaleTimeString(); /*TODO*/
    const Res = await GetReqRestApi.getJson(TodayDate,Location);
    const Times = Res.data.timings;


    
    
    
    MyPrint.info("Location ",Location);
    MyPrint.info("Hijri Date",Res.data.date.hijri.date);
    MyPrint.info("Hijri Month",Res.data.date.hijri.month.en);
    MyPrint.info("Miladi Date",TodayDate);
    console.log("====================================================");
    console.log("Prayers");
    console.log("====================================================");
    
    MyPrint.prayTime("Fajr",Times.Fajr);
    MyPrint.timeBetweenPrayes(Times,"Dhuhr","Fajr");
    MyPrint.prayTime("Dhuhr",Times.Dhuhr);
    MyPrint.timeBetweenPrayes(Times,"Dhuhr","Asr");
    MyPrint.prayTime("Asr",Times.Asr);
    MyPrint.timeBetweenPrayes(Times,"Asr","Maghrib");
    MyPrint.prayTime("Maghrib",Times.Maghrib);
    MyPrint.timeBetweenPrayes(Times,"Maghrib" , "Isha");
    MyPrint.prayTime("Isha",Times.Isha);

}


main();