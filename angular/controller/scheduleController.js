var app = angular.module('myApp', ['ui.router']);
app.controller('scheduleCtrl', function($scope, $http) {
    // to filter data
    $scope.$on('$viewContentLoaded', Webflow.ready());
    $scope.appointment_show = 1;
    $scope.class_show = 1; 
    //to store short forms of days 
    //1 to 7 (Index Values) i.e 1st day of start from Monday 
    // 0 Index is skipped
    $days_short_names = ['','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

    //to store full forms of days 
    //1 to 7 (Index Values) i.e 1st day of start from Monday 
    // 0 Index is skipped
    $days_names = ['','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

    //to store the day index of first date of current month 
    // example if Current Month is August and August 1st is Tuesday we will store 2 in $scope.month_first_day
    // which 2 day of week i.e tuesday
    //Note: Considering Week starts with Monday
    $scope.month_first_day = null;

    //to store the day index of last date of current month 
    // example if Current Month is August and August 31st is Thursday we will store 4 in $$scope.month_last_day
    // which 4 day of week i.e Thursday
    //Note: Considering Week starts with Monday
    $scope.month_last_day = null;

    //Storing full Months Name
    // 1 to 12 i.e january to December
    $months = ['','January','February','March','April','May','June','July','August','September','October','November','December'];
    
    //Storing short Months Name
    // 1 to 12 i.e january to December
    $months_short = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    //no of days in months in a year
    //for leap year change the no of days in index 2 i.e february
    $months_day = [null,31,28,31,30,31,30,31,31,30,31,30,31] ;
    
    //to store days of current month
    // example For August,2017 Its can days info with array of size 32(0 to 31) where index 1 value is Tue,
    //index 2 value is Wed and so on upto index value of 31 is Thu
    //index 0 is ignored
    $current_month_days = [];

    // the month we are showing the details or the month we are handling
    $current_month = null;

    //reached beginging day of month
    $scope.begining_day_reached = false;

    //reached ending day of month
    $scope.ending_day_reached = false;

    //get value from querystring
    date = '09-25-2017';
    date = '';

    if(date.length == 10)
    {
        var $system_date = new Date();
        
        year = parseInt(date.substring(6,10));
        date_gen = parseInt(date.substring(3,5));
        month = parseInt(date.substring(0,2));
        month = month - 1;
        $system_date.setFullYear(year, month, date_gen);
    }
    else
    {
        $system_date = new Date();
    }


    $system_current_day = $system_date.getDay();// returns value range 0 - 6 
    if($system_current_day == 0)// i.e sunday
    {
        $system_current_day = 7;
    }
    $system_current_year = $system_date.getFullYear();

    $system_current_month = $system_date.getMonth();//returns any value from range of 0 to 11
    $system_current_month += 1; // 1 to 12

    $system_current_date = $system_date.getDate();

    //now caliculating the present month first day i.e mon or tue ... and so on 

    $mod_value = $system_current_date % 7 ;
    switch($mod_value){
        case 0:
        $current_month_start_day = $system_current_day + 1;
        if($current_month_start_day==8)
            $current_month_start_day = 1;//i.e monday
        break;
        case 1:
        $current_month_start_day = $system_current_day; //todays day will become months 1st day day name
        break;
        case 2:
        $current_month_start_day = $system_current_day-1;
        if($current_month_start_day==0)
            $current_month_start_day = 7;
        break;
        case 3:
        $current_month_start_day = $system_current_day-2;
        if($current_month_start_day<1)
            $current_month_start_day = $current_month_start_day + 7;
        break;
        case 4:
        $current_month_start_day = $system_current_day-3;
        if($current_month_start_day<1)
            $current_month_start_day = $current_month_start_day + 7;
        break;
        case 5:
        $current_month_start_day = $system_current_day-4;
        if($current_month_start_day<1)
            $current_month_start_day = $current_month_start_day + 7;
        break;
        case 6:
        $current_month_start_day = $system_current_day-6;
        if($current_month_start_day<1)
            $current_month_start_day = $current_month_start_day + 7;
        break;

    }
    //actual binding start
    $scope.year = $system_current_year;//year we handling right now this is variable 
    $scope.present_year = $system_current_year;//present year this is fixed mostly

    days_in_feb();

    $scope.month = $months[$system_current_month];//month we are handling  this is variable 
    $scope.present_month = $months[$system_current_month];//present month this is fixed mostly
    $current_month = $system_current_month; //current Month Index

    $scope.present_date = $system_current_date; //todays date i.e(1 to 31)

    $scope.month_first_day =  $current_month_start_day;// Day no. of  Month example if month starts with Tuesday send 2
    $scope.present_month_first_day =  $current_month_start_day;//Day no. of Present Month example if month starts with Tuesday send 2

    $scope.seven_start_date = $system_current_date;//Default Todays Date i.e Todays is 26th Aug,2017 then send 26

    //to store days of current month
    // example For August,2017 Its can days info with array of size 32(0 to 31) where index 1 value is Tue,
    //index 2 value is Wed and so on upto index value of 31 is Thu
    //index 0 is ignored
    //If param 1 is passed days generation starts from day 1 , day 2 .. and so on upto month end
    generateNoOfDays(1);
    //assigning the seven days 
    seven_days();

    //actual binding end




    //call service to get basic details of present date information
    /* The service must Return the following 
    * year - Present Year
    * month - Present Month example 8 for August
    * month_first_day - Day no. of Present Month example if month starts with Tuesday send 2
    * date - Default Todays Date i.e Todays is 26th Aug,2017 then send 26
    */

    $http({
        method : "GET",
        url : "schedule.json"
    }).then(function mySuccess(response) {
        
        $data = response.data;

        $scope.records = $data.records;
        
        
        

    }, function myError(response) {
        console.log(response.statusText);
    });
    

    //previous month click event
    $scope.previousMonth = function(){
        console.log('Previous Month');
        //change month to previous month example 8 to 7
        $current_month--;
        //TODO when current month is 0 goto previous year logic coding
        if($current_month==0){
            $scope.year --;
            $current_month=12;
            days_in_feb();
        }
        $scope.month = $months[$current_month];
        
        if($scope.month_first_day-1>0)
            $scope.month_last_day = $scope.month_first_day-1;
        else
            $scope.month_last_day = 7;//sunday
        //$scope.present_date = $data.present_date;
        console.log($scope.month_last_day);
        $scope.seven_start_date = 1;
        //generate days from last day
        generateNoOfDays(0);
        //assigning the seven days 
        seven_days();
    }
    //next month click event
    $scope.nextMonth = function(){
        console.log('Next Month');
        
        //change month to previous month example 8 to 7
        $current_month++;
        //TODO when current month is 13 goto next year logic coding
        if($current_month==13){
            $scope.year ++;
            $current_month=1;
            days_in_feb();
        }
        $scope.month = $months[$current_month];
        
        if($scope.month_last_day+1<8)
            $scope.month_first_day = $scope.month_last_day+1;
        else
            $scope.month_first_day = 1;//monday

        $scope.seven_start_date = 1;
        //generate days from last day
        generateNoOfDays(1);
        //assigning the seven days 
        seven_days();
    }

    //previous day click event
    $scope.previousDay = function(){
        
                if($scope.begining_day_reached==false)
                {
                    $scope.seven_start_date--;
                    seven_days();
                }
        
    };
    //next day click event
    $scope.nextDay = function(){
        
        if($scope.ending_day_reached==false)
        {
            $scope.seven_start_date++;
            seven_days();
        }
    };

    function generateNoOfDays($start)
    {
        //initialise array
        $current_month_days = [];
        for(i=0;i<=$months_day[$current_month];i++)
        {
            $current_month_days[i] = '';
        }
        if($start == 1)
        {
            //we know the start day of the month so generation of days starts from 1st day of Month
            $week_index = $scope.month_first_day;
            for(i=1;i<=$months_day[$current_month];i++)
            {
                if($week_index<8)
                {
                    $current_month_days[i] = $days_short_names[$week_index];
                    $scope.month_last_day = $week_index;//after for loop terimination it contains last day of month( week number )
                }
                $week_index++;
                if($week_index==8)
                {
                    //this means after sunday, monday comes
                    $week_index = 1;
                }
            }
        }
        else
        {
            //we know the start day of the month so generation of days starts from 1st day of Month
            $week_index = $scope.month_last_day;
            for(i=$months_day[$current_month];i>0;i--)
            {
                
                if($week_index>0)
                {
                    $current_month_days[i] = $days_short_names[$week_index];
                    $scope.month_first_day = $week_index;//after for loop terimination it contains first day of month( week number )
                }
                $week_index--;
                if($week_index==0)
                {
                    $week_index = 7;
                }
            }
            
        }
        console.log($current_month_days);
    }

    function seven_days()
    {
        $object_days=[{'day':'','date':''},{'day':'','date':''},
        {'day':'','date':''},{'day':'','date':''},{'day':'','date':''},{'day':'','date':''},{'day':'','date':''}
        ];
        $date_temp = $scope.seven_start_date;
        for(i=0; i<7 && $date_temp<$months_day[$current_month];i++)
        {
            $date_temp = parseInt($scope.seven_start_date) + i;
            $object_days[i].day = $current_month_days[$date_temp];
            $object_days[i].date = $date_temp;
        }
        //these conditions for previous day and next day
        if($object_days[0].date==1)
        {
            $scope.begining_day_reached = true;
        }else{
            $scope.begining_day_reached = false;
        }
        if($object_days[6].date==$months_day[$current_month]||i<7)
        {
            $scope.ending_day_reached = true;
        }
        else
        {
            $scope.ending_day_reached = false;
        }
        
        $scope.seven_days = $object_days;
    }
    function days_in_feb()
    {
        $leap_year = false;
        if($scope.year % 4 == 0)
        {
            if($scope.year%100==0)
            {
                if($scope.year % 400 == 0)
                {
                    $leap_year = true;
                }
                else
                {
                    $leap_year = false;
                }
            }
            else
            {
                $leap_year = true;
            }
        }
        if($leap_year){
            //change no of days in feb to 29
            $months_day[2] = 29;
        }
        else{
            //no of days in feb for non leap year
            $months_day[2] = 28;
        }
    }

});