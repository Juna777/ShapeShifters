$(document).ready(function() {
    let totalCalories = 0;

    $('#food-item').on('input', function() {
        const query = $(this).val().toLowerCase();
        const calorieData = {
            'apple': 52,
            'banana': 89,
            'chicken breast': 165,
            'spaghetti': 200,
            'burger': 150,
            'pizza': 100,
            'rice': 50,
            'fish': 40,
            'pork': 100,
            'chicken': 90
            
        };



        const calories = calorieData[query];
        if (calories) {
            $('#calories').val(calories);
        } else {
            $('#calories').val('Calories not found');
        }
    });

    $('#add-btn').click(function() {
        const calories = parseInt($('#calories').val());
        if (!isNaN(calories)) {
            totalCalories += calories;
            $('#total-calories').text(totalCalories);
            
            const foodItem = $('#food-item').val();
            $('#calorie-list').append('<li class="list-group-item">' + foodItem + ': ' + calories + ' calories</li>');
        }
    });
});

