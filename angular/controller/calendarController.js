app.controller('calendarCtrl', function($scope, $http) {
    
    $days_short = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];//0 to 6 (Index Values)
    $days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];//0 to 6 (Index Values)

    $months = ['January','February','March','April','May','June','July','August','September','October','November','December'];//0 to 11 (Index Values)
    $months_short = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];//0 to 11 (Index Values)
    $months_day = [31,28,31,30,31,30,31,31,30,31,30,31] ;//no of days in months in a year
    $object_days=[{'day':'','day':''},{'day':'','day':''},
    {'day':'','day':''},{'day':'','day':''},{'day':'','day':''},{'day':'','day':''},{'day':'','day':''}
    ];
    $present_month_days = [];
    $present_month = null;
    //call service to get basic details of present date information
    $http({
        method : "GET",
        url : "schedule.json"
    }).then(function mySuccess(response) {
        
        $data = response.data;

        $scope.year = $data.year;

        $scope.month = $months[$data.month-1];
        $present_month = $data.month-1;
        $scope.month_day_start = $data.month_day_start-1;
        generateNoOfDays(1);
        //assigning the seven days 
        $scope.present_date = $data.present_date;
        for(i=0;i<7;i++)
        {
            $object_days[i].day = $present_month_days[$scope.present_date-1+i];
            $object_days[i].date = parseInt($scope.present_date) + i;
        }
        $scope.seven_days = $object_days;
        console.log($scope.seven_days);

    }, function myError(response) {
        console.log(response.statusText);
    });
    
    $scope.previousMonth = function(){
        console.log('Previous Month');
    }
    $scope.nextMonth = function(){
        console.log('next Month');
    }

    function generateNoOfDays($start)
    {
        //initialise array
        $present_month_days = [];
        for(i=0;i<$months_day[$present_month];i++)
        {
            $present_month_days[i] = '';
        }
        if($start == 1)
        {
            $week_index = $scope.month_day_start;
            for(i=0;i<$months_day[$present_month];i++)
            {
                if($week_index<7)
                {
                    $present_month_days[i] = $days_short[$week_index];
                }
                $week_index++;
                if($week_index==7)
                {
                    $week_index = 0;
                }
            }
        }
        else
        {
            for(i=$months_day[$present_month]-1;i>=0;i++)
            {
                $week_index = $scope.month_day_end;
                if($week_index>-1)
                {
                    $present_month_days[i] = $days_short[$week_index];
                }
                $week_index--;
                if($week_index==-1)
                {
                    $week_index = 6;
                }
            }
        }
    }
});