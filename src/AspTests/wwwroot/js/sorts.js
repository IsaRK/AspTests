var array = [];
var loop1Timeout;
var loop2Timeout;

function clearWindow() {
    clearComplexity();
    window.clearTimeout(loop1Timeout);
    window.clearTimeout(loop2Timeout);
}

function generateNumber() {
    clearWindow();

    var originalNumber = [];
    var withDuplicates = ($(".withDuplicates").is(":checked"));

    //generateRandomNumber
    var cpt = 1;
    for (var i = 1; i < 21; i++) {
        if (!withDuplicates) {
            originalNumber.push(i);
        }
        else{
            originalNumber.push(Math.floor((Math.random() * 20) + 1));
        }      
    }

    //shuffle originalNumber
    array = [];
    for (var b = 0; b < 20; b++) {
        var nbRandom = Math.floor((Math.random() * 20));
        var tmp = originalNumber[nbRandom];
        originalNumber[nbRandom] = originalNumber[b];
        originalNumber[b] = tmp;
    }

    for (var a = 0; a < 20; a++) {
        array.push({ x: a + 1, y: originalNumber[a] });
    }

    displayChart();
}

function displayChart(toColorRed, toColorGrey) {

    var data = [];
    for (var i = 0; i < array.length; i++) {
        if (toColorRed !== null && toColorRed === i)
        {
            data.push({ label: array[i].x, y: array[i].y, color: "Red"});
        }
        else if (toColorGrey !== null && toColorGrey === i)
        {
            data.push({ label: array[i].x, y: array[i].y, color: "DarkGrey" });
        }
        else{
            data.push({ label: array[i].x, y: array[i].y });
        }       
    }

    //var chart = new CanvasJS.Chart("chartContainer", {
    //    data: [
    //    {
    //        type: "column",
    //        dataPoints: [
    //        { x: 10, y: 10 },
    //        { x: 20, y: 15 }
    //        ]
    //    }
    //    ]
    //});

    var chart = new CanvasJS.Chart("chartContainer", {     
        data: [
        {
            type: "column",
            color: "LightSeaGreen",
            //dataPoints: [
            //{ x: 10, y: 10 },
            //{ x: 20, y: 15 },
            //{ x: 30, y: 25 },
            //{ x: 40, y: 30 },
            //{ x: 50, y: 28 }
            //]
            dataPoints: data
        }
        ]
    });

    chart.render();
}

function bubbleSort() {
    clearWindow();
    var spaceComplexity = 0, timeComplexity = 0;
    var ThSpaceComplexity = 1, ThTimeComplexity = "n2";

    //for (var i = 0; i < array.length; i++)
    //{
    //    timeComplexity++;
    //    for (var j = 0; j < array.length-i-1; j++)
    //    {
    //        timeComplexity++;
    //        if (array[j].y > array[j + 1].y) {
    //            var tmp = array[j+1];
    //            array[j + 1] = array[j];
    //            array[j] = tmp;
    //        }
    //        spaceComplexity = 1;
    //    }
    //}

    var i = 0;
    function loop1() {       
        var j = 0;
        var movingTime = 350;

        loop2(j);
        timeComplexity++;
        if (i < array.length) {
            loop1Timeout = setTimeout(loop1, movingTime * array.length);
        }
        else {
            calculateComplexity(ThTimeComplexity, ThSpaceComplexity, timeComplexity, spaceComplexity);
            window.clearTimeout(loop1Timeout);
            window.clearTimeout(loop2Timeout);
        }

        function loop2() {        
            applyPermutation(i, j);
            timeComplexity++;
            j = j + 1;
            if (j < array.length - i - 1) {
                loop2Timeout = setTimeout(loop2, movingTime);
            }
            else {
                i = i + 1;
                j = 0;
            }
        }

        function applyPermutation(i,j)
        {
            var toColorRed;
            if (array[j].y > array[j + 1].y) {
                var tmp = array[j+1];
                array[j + 1] = array[j];
                array[j] = tmp;
                toColorRed = j + 1;
            }
            spaceComplexity = 1;
            displayChart(toColorRed);
        }
    }

    loop1();
}

function calculateComplexity(ThTimeComplexity, ThSpaceComplexity, timeComplexity, spaceComplexity) {
    timeComplexity = parseFloat(Math.round(Math.sqrt(timeComplexity) * 100) / 100).toFixed(2);
    displayComplexity(ThTimeComplexity, ThSpaceComplexity, timeComplexity, spaceComplexity);
}

function displayComplexity(ThTimeComplexity, ThSpaceComplexity, timeComplexity, spaceComplexity) {
    $("#timeComplexity").val("Time Complexity \nTherotical : O(" + ThTimeComplexity + ")\nReal : O(" + timeComplexity + ")");
    $("#spaceComplexity").val("Space Complexity \nTherotical : O(" + ThSpaceComplexity + ")\nReal : O(" + spaceComplexity + ")");
}

function clearComplexity() {
    $("#timeComplexity").val("");
    $("#spaceComplexity").val("");
}

function selectionSort() {
    clearWindow();
    var spaceComplexity = 0, timeComplexity = 0;
    var ThSpaceComplexity = 1, ThTimeComplexity = "n2";

    //for (var i = 0; i < array.length; i++)
    //{
    //    var plusPetit = array[i];
    //    for (var j = i; j < array.length; j++)
    //    {
    //        if (array[j].y < plusPetit.y) {
    //            var tmp = array[i];
    //            array[i] = array[j];
    //            array[j] = tmp;
    //            plusPetit = array[i];
    //        }
    //    }
    //}

    var i = 0;
    function loop1() {
        var j = i;
        var movingTime = 350;

        loop2(j);
        timeComplexity++;
        if (i < array.length) {
            loop1Timeout = setTimeout(loop1, movingTime * array.length);
        }
        else {
            calculateComplexity(ThTimeComplexity, ThSpaceComplexity, timeComplexity, spaceComplexity);
            window.clearTimeout(loop1Timeout);
            window.clearTimeout(loop2Timeout);
        }

        function loop2() {
            applyPermutation(i, j);
            timeComplexity++;
            j = j + 1;
            if (j < array.length) {
                loop2Timeout = setTimeout(loop2, movingTime);
            }
            else {
                i = i + 1;
            }
        }

        function applyPermutation(i, j) {
            var toColorRed;
            var toColorGrey = i;

            if (array[j].y < array[i].y) {
                var tmp = array[i];
                array[i] = array[j];
                array[j] = tmp;
                plusPetit = array[i];
                toColorRed = j;
            }
            spaceComplexity = 1;
            displayChart(i,j);
        }
    }

    loop1();
}