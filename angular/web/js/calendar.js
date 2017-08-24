class Calander{
    //private varables
    $days_short = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];//0 to 6 (Index Values)
    $days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];//0 to 6 (Index Values)

    $months = ['January','February','March','April','May','June','July','August','September','October','November','December'];//0 to 11 (Index Values)
    $months_short = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];//0 to 11 (Index Values)

    constructor(year,date,month,day)
    {
        this.year = year;
        this.date = date;
        this.month = month;
        this.day = day;
    }
}