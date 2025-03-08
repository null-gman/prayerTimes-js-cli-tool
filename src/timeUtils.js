/* time prameter mean  :  hh:mm 24 hour base */


function formatDD_MM_TT(DD_MM_TT) {
    //day-month-time(hour or minutes)
    /*
        - to make singel day or date like that 01 - 05 not 1 - 5
            : 1 - 5 - 2003 -> 01 - 05 - 2003 "in genral" .

        - the function do it for the day or month only
    */
    DD_MM_TT = String(DD_MM_TT);
    if (!DD_MM_TT) {
        throw new Error("can't be undefined");
    }

    if (2 > DD_MM_TT.length) {
        return "0" + DD_MM_TT;
    }

    return DD_MM_TT;    
}

/*
00:00 -> 0 minutes
01:00 -> 60 minutes
01:20 -> 60 minutes
01:20 -> 80 minutes

convert time from hh:mm ->  minutes only
*/
function TimeToMinutes(time) {
       //time mean : hh:mm 24 hour base

    const houers = +(time.split(":")[0]);
    const remainMinutes = +(time.split(":")[1]);
    const minutes = (houers * 60) + remainMinutes;
    return minutes;
}

// The opposite of the TimeToMinutes function
function MinutesToTime(minutes) {
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    hours = formatDD_MM_TT(hours)
    minutes = formatDD_MM_TT(minutes)

    return hours + ":" + minutes;
}


/*
    from 24 based hours to 12 hours :
        00:00 -> 12:00 AM "the AM will not be returned"
        13:00 -> 01:00 PM
        20:00 -> 08:00 
 */
function formatTime_12Based(time = "") {
    
    time = String(time);
    if (!time) {
        throw new Error("can't be undefined");
    }
    
    let hoursSec = time.split(":")[0];
    let minutesSec = time.split(":")[1];
    
    if (+hoursSec > 12) {
        hoursSec = +hoursSec - 12;
    }

    if(hoursSec === "00"){
        hoursSec = "12";   
    }
    

    if (+minutesSec < 10) {
        minutesSec = "0" + minutesSec;
    }
    //just to be more clear :) , i know about string concatenating
    return String(hoursSec) + ":" + minutesSec;
}





function howManyMinutesBetween(time1 , time2) {
    //time mean : hh:mm 24 hour base : 22:32

    /* 
      !!
        Be careful when using this function: always subtract the the bigger vlue from smaller one .
        => (20:00 , 10:00) === (10:00 , 20:00)  
      !!
    */
  
    let time1InMin = TimeToMinutes(time1);
    let time2InMin = TimeToMinutes(time2);


    if (time1InMin > time2InMin) {
        return MinutesToTime(time1InMin - time2InMin)
    }else{
        return MinutesToTime(time2InMin - time1InMin);
    }

}




function GetTodayDate() {
        //in dd-mm-yy format
        const DateToday = (new Date());
        const FormatDateToday = formatDD_MM_TT(DateToday.getDate()) +
                                "-" +
                                formatDD_MM_TT((DateToday.getMonth()+1)) /*the monthes in js is 0 - 11*/ +
                                "-" +
                                DateToday.getFullYear();

        return FormatDateToday;
}


export default {GetTodayDate,formatTime_12Based,GetTodayDate,howManyMinutesBetween};