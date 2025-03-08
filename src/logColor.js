import timeUtils from "./timeUtils.js";


const ResetCode = "\x1b[0m";   // Reset to default

// Text Colors
const RedCode = "\x1b[31m";    
const GreenCode = "\x1b[32m";  
const BlueCode = "\x1b[34m";   
const GrayCode = "\x1b[90m";   

// Background Colors
const BgRed = "\x1b[41m";      
const BgGreen = "\x1b[42m";    
const BgBlue = "\x1b[44m";     
const BgGray = "\x1b[100m";    




const MyPrint = new Object();


MyPrint.timeBetweenPrayes = (prayesTimesObj , prayKey1,prayKey2) => {
    const prayTime1 = prayesTimesObj[prayKey1];
    const prayTime2 = prayesTimesObj[prayKey2];
    const timeBetween = timeUtils.howManyMinutesBetween(prayTime1,prayTime2);

    console.log(`${prayKey1} ------${timeBetween}----> ${prayKey2}`);
    
}

MyPrint.prayTime = ( prayName,time ) => {
    //time here mean 12 base 12:88 AM or PM
    time = String(time);
    prayName = String(prayName);

    
    if (!time || !prayName) {
        throw new Error("can't be undefined");
    }

    time = timeUtils.formatTime_12Based(time);

    console.log(`${BgGreen} ${prayName}: ${BgBlue} ${time} ${RedCode}${ResetCode}`);
}


MyPrint.info = ( infoType,infoValue ) => {
    infoType = String(infoType);
    infoValue = String(infoValue);
    
    if (!infoType || !infoValue) {
        throw new Error("can't be undefined");
    }

    console.log("> "+BlueCode+infoType+" : "+GreenCode+infoValue+ResetCode);
}


export default MyPrint;