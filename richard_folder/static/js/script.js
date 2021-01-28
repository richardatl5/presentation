let labels1 = ['Left', 'Right'];
let data1 = [589, 1780];
let colors1 = ['#f7a10c', '#9e0931'];

let myDoughnutChart = document.getElementById("myChart").getContext('2d');

d3.json("/charts").then(data=>{
    console.log(data);

    // CHART 1
    var foot_arr=data.map(player=>player['foot'])
    var counts = {};
    for (var i = 0; i < foot_arr.length; i++) {
        var foot = foot_arr[i];
        counts[foot] = counts[foot] ? counts[foot] + 1 : 1;
    };
    // console.log(foot_arr);

    let chart1 = new Chart(myDoughnutChart, {
        type: 'doughnut',
        data: {
            labels: Object.keys(counts), //['Left', 'Right'],
            datasets: [ {
                data: Object.values(counts), //[589, 1780],
                backgroundColor: ['#f7a10c', '#9e0931']
            }]
        },
        options: {
            title: {
                text: "Right vs Left Foot Players",
                display: true
            }
        }
    });

    // CHART 2
    let labels2 = ['C. Attacking Midfielder', 'Corner Back', 'C. Defensive Midfielder', 'C. Forward', 
                'C. Midfielder', 'Goalkeeper', 'L. Back', 'L. Midfielder', 'L. Wing', 'L. Wing Back', 'R. Back', 
                'R. Midfielder', 'R. Wing', 'R. Wing Back', 'Striker'];
    let data2 = [353, 403, 218, 40, 200, 242, 119, 97, 37, 25, 135, 126, 36, 34, 304];
    let colors2 = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF', '#AC5353', '#f7a10c', '#49A9EA', 
                    '#36CAAB', '#34495E', '#B370CF', '#AC5353', '#f7a10c', '#49A9EA', '#36CAAB', '#34495E'];

    var pos_arr=data.map(player=>player['bestposition'])
    var counts = {};
    for (var i = 0; i < pos_arr.length; i++) {
        var pos = pos_arr[i];
        counts[pos] = counts[pos] ? counts[pos] + 1 : 1;
    };
    // console.log(pos_arr);
    let myChart2 = document.getElementById("myChart2").getContext('2d');

    let chart2 = new Chart(myChart2, {
        type: 'bar',
        data: {
            labels: Object.keys(counts), //labels2,
            datasets: [ {
                data: Object.values(counts), //data2,
                backgroundColor: colors2
            }]
        },
        options: {
            title: {
                text: "# Of Players In Each Position",
                display: true
            },
            legend: {
            display: false
            }
        }
    });

    // CHART 3
    let labels3 = ['Attacking', 'Skill', 'Movement', 'Power', 'Mentality', 'Defending', 'Goalkeeping'];
    let myChart3 = document.getElementById("myChart3").getContext('2d');

    function stats_summary(foot_selected) {
        var player_arr=data.filter(player=>player['foot']==foot_selected)
        // console.log(left_arr);
        var stats_sum={'attacking':1, 'skill':0, 'movement':0, 'power':0, 'mentality':0, 'defending':0, 'goalkeeping':0}
        for (var i = 0; i<player_arr.length; i++) {
            Object.keys(stats_sum).forEach(stat=>{
                if (player_arr[i][stat]){ 
                    stats_sum[stat]+=parseInt(player_arr[i][stat]); 
                }
            });
        };
        Object.keys(stats_sum).forEach(stat=>{
            stats_sum[stat]/=player_arr.length; 
        });
        return stats_sum;
    };
    // console.log(stats_sum);

    var left_stats=stats_summary('Left')
    var right_stats=stats_summary('Right')

    let chart3 = new Chart(myChart3, {
        type: 'radar',
        data: {
            labels: Object.keys(left_stats), // labels3,
            datasets: [
            {
                label: 'Left Footed',
                fill: true,
                borderColor: "#9e0931",
                pointBorderColor: "#9e0931",
                pointBackgroundColor: "#9e0931",
                data: Object.values(left_stats) // [72, 71, 77, 77, 75, 62, 16]
            },
            {
                label: 'Right Footed',
                fill: true,
                borderColor: "#f7a10c",
                pointBorderColor: "#f7a10c",
                pointBackgroundColor: "#f7a10c",
                data: Object.values(right_stats) // [69, 66, 74, 76, 72, 59, 20]
            }
            ]
        },
        options: {
            title: {
                text: "Average Attribute Ratings Of Left vs Right Footed Players",
                display: true
            }
        }
    });


    // CHART 4
    let labels4 = ['500-50,000', '50,001-100,000', '100,001-150,000', '150,001-200,000', 
    '200,001-250,000', '250,000+'];
    // let bins=[]
    let data4 = [1691, 424, 91, 33, 16, 13];
    let colors4 = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF', '#AC5353', '#f7a10c'];

    var wage_arr=data.map(player=>player['wage']);
    // JESS TO FINISH

    function wage_bin(wage){
        if (wage>250000){
            return '€250,000+'; 
        } else if (wage>200000){
            return '€200,001-250,000';
        } else if (wage>150000){
            return '€150,001-200,000';
        } else if (wage>100000){
            return '€100,001-150,000';
        } else if (wage>50000){
            return '€50,001-100,000';
        } else {
            return '€500-50,000';
        };
    };
    var wage_bin=wage_arr.map(wage_bin);
    var counts = {};
    for (var i = 0; i < wage_bin.length; i++) {
        var wage = wage_bin[i];
        counts[wage] = counts[wage] ? counts[wage] + 1 : 1;
    };
    console.log(counts);

    let myChart4 = document.getElementById("myChart4").getContext('2d');

    let chart4 = new Chart(myChart4, {
        type: 'pie',
        data: {
            labels: Object.keys(counts), // labels4,
            datasets: [ {
                data: Object.values(counts), // data4,
                backgroundColor: colors4
            }]
        },
        options: {
            title: {
                text: "Player Wages",
                display: true
            }
        }
    });

});
