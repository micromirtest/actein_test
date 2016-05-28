
<div id="demo">
    <h2 style="font-weight:bold;">Demographics</h2>
    <h3>Age</h3>
    <div id="age-plot"></div>
    <table class="demo-table">
        <tr>
            <th>13-17</th>
            <th>18-22</th>
            <th>23-27</th>
            <th>28-32</th>
            <th>32-up</th>
        </tr>
        <tr>
            <td><?php echo $ages['13-17'] ?></td>
            <td><?php echo $ages['18-22'] ?></td>
            <td><?php echo $ages['23-27'] ?></td>
            <td><?php echo $ages['28-32'] ?></td>
            <td><?php echo $ages['32-up'] ?></td>
        </tr>
    </table>
    <h3>Gender</h3>
    <div id="gender-plot"></div>
    <table class="demo-table">
        <tr>
            <th>Male</th>
            <td><?php echo $male ?></td>
            <td><?php echo number_format(($male / $number_of_users) * 100, 0, '', '') ?>%</td>

        </tr>
        <tr>
            <th>Female</th>
            <td><?php echo $female ?></td>
            <td><?php echo number_format(($female / $number_of_users) * 100, 0, '', '') ?>%</td>
        </tr>
    </table>
    <h3>Hometown</h3>    
    <table  class="demo-table">
        <tr>
            <th>First 2 letters of zipcode</th>
            <th>Number of occurrences</th>
        </tr>
        <?php foreach ($zips as $key => $value): ?>
            <tr>
                <td><?php echo $key ?></td>
                <td><?php echo $value ?></td>
            </tr>
        <?php endforeach ?>
    </table>

    <h3>Number of times played</h3>
    <div id="number-plot"></div>
   
    <table  class="demo-table">
        <tr>
            <th>Number of sessions</th>
            <th>Number of users</th>
            <th>% of users</th>
        </tr>
        <?php foreach ($number_of_orders as $key => $value): ?>
            <tr>
                <td><?php echo $key ?></td>
                <td><?php echo $value ?></td>
                <td><?php echo number_format(($value / $number_of_orders_total) * 100, 0, '', '') ?>%</td>
            </tr>
        <?php endforeach ?>
    </table>
    <p>Average: <b><?php echo number_format($number_of_orders_avg / $number_of_orders_total, 2, '.', '') ?></b> sessions per user</p>
</div>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script type="text/javascript">

    google.load('visualization', '1.0', {'packages': ['corechart']});
    google.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
            ['13-17', <?php echo $ages['13-17'] ?>],
            ['18-22', <?php echo $ages['18-22'] ?>],
            ['23-27', <?php echo $ages['23-27'] ?>],
            ['28-32', <?php echo $ages['28-32'] ?>],
            ['32-up', <?php echo $ages['32-up'] ?>]
        ]);
 
        var options = {'title': 'Age',
            'width': 400,
            'height': 300};

        var chart = new google.visualization.PieChart(document.getElementById('age-plot'));
        chart.draw(data, options);
        
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
            ['Male', <?php echo $male ?>],
            ['Female', <?php echo $female ?>]
        ]);
 
        var options = {'title': 'Age',
            'width': 400,
            'height': 300};

        var chart = new google.visualization.PieChart(document.getElementById('gender-plot'));
        chart.draw(data, options);
        
        /***************/
         var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        <?php
        $new = array();
        foreach($number_of_orders as $key=>$value)
        {
            $new[$key.' sessions']=$value;
        }
      
        ?>
                var d = <?php echo json_encode($new) ?>;
                var arr = jQuery.map(d, function(el) { return el; });;
                console.log(arr);
        data.addRows([
            <?php foreach($number_of_orders as $key=>$value): ?>
            ['<?php echo $key ?> sessions', <?php echo $value ?>] <?php if($key<count($number_of_orders)-1):?>,<?php endif ?>
                    <?php endforeach ?>
        
        ]);
        
 
        var options = {'title': 'Age',
            'width': 400,
            'height': 300};

        var chart = new google.visualization.PieChart(document.getElementById('number-plot'));
        chart.draw(data, options);
    }
</script>

<style>
    
    #age-plot,#number-plot,#gender-plot{
        margin-bottom: 20px;
    }
    
    .demo-table,
    .demo-table td,
    .demo-table th
    {
        border-collapse: collapse;
        border: 1px solid #ccc;
    }

    .demo-table
    {
        width: 300px;
    }

    .demo-table td,
    .demo-table th
    {
        padding: 5px;
        background: #fff;
    }

    .demo-table th
    {
        background: #eee;
        font-weight: bold;
    }
</style>
