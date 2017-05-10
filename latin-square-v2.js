$(document).ready(function() {
	var tab = document.getElementById("board");
	for (var col=1; col<=4; col = col + 1){
		var allcol = document.createElement("div");
		tab.appendChild(allcol);
		for (var row=1; row<=4; row = row + 1) {
			var square = document.createElement("div");
			square.setAttribute("id",col*10+row);
			square.setAttribute("class","square" + " C" + row + " R" + col);
			allcol.appendChild(square);
		};
	};
    
    //add white images for empty squares, value = 0
	$('div .square').append('<div class="img"><img data-value="0" src="empty.png"></div>');
    
    //add pop-up menu for each square.
	$('div .square').append('<div class="option"><ul class="list"><li>1</li><li>2</li><li>3</li><li>4</li></ul></div>');
	
	// Add some pre-defined squares. Users can not change these values
	// $('.R1.C3').find('.img').html('<img class="fixed" width=50 height=50 data-value=3 src="3-fixed.png">');
	// $('.R2.C4').find('.img').html('<img class="fixed" width=50 height=50 data-value=3 src="3-fixed.png">');
	// $('.R3.C2').find('.img').html('<img class="fixed" width=50 height=50 data-value=1 src="1-fixed.png">');
    var allRow = ['.R1','.R2','.R3','.R4'];
    var allCol = ['.C1','.C2','.C3','.C4'];
    var allVal = [1,2,3,4];
    allVal.sort(function(a,b) {return 0.5-Math.random()});
    for (var i=0; i<3; i++) {
        row = Math.floor(Math.random()*4);
        col = Math.floor(Math.random()*4);
        start(allRow[row]+allCol[col],allVal.pop())
    }
    
    //calculate the sum of rows and columns
    calculate();

});

// starting pattern
function start(pos,value) {
    // value = Math.floor(Math.random()*4+1)
    $(pos).find('.img').html('<img class="fixed" width=50 height=50 data-value='+value+' src="'+value+'-fixed.png">')
}

//pop-up menu
$(function() {
    
    //click on <img>, except for those with class 'fixed'
	$('img:not(".fixed")').parent().click(function() {
        
        //fade in pop-up menu
		$(this).siblings().fadeIn(10);
	});
    
    //fade out when hover out of menu
	$('.option').hover(function(){}, function(){
		$(this).fadeOut(10) 
	});
    
    //when selecting a value
	$('.list li').click(function() {
        
		var number = $(this).text();
		
		//insert the correct number image in the square
		$(this).closest('.option').siblings().html('<img width=50 height=50 data-value="'+number+'" src="'+number+'.png">');
        
        //fade out pop-up menu
		$('.option').fadeOut(10);
        
        //re-calculate all row and column
        calculate();
        
        result();
        
	});
})

//test for row and column sums = 10, also check for empty square
function result() {
	var sqr = ["R1","R2","R3","R4","C1","C2","C3","C4"];
    
    //run when click on #test button
	// $('#test').click(function rslt() {
	
		//look for empty squares, which are white images with data-value=0
		if ($("img[data-value='0']").length != 0) {
			$('#result').text('Fill all the squares.');
			return
		}
		
		//go through each row and column and calculate the sum
		for (var i in sqr) {
			var cur = $('.'+sqr[i]).find('img');
			sum = 0;
			
			sum =	parseInt(cur[0].getAttribute('data-value')) + 
					parseInt(cur[1].getAttribute('data-value')) + 
					parseInt(cur[2].getAttribute('data-value')) + 
					parseInt(cur[3].getAttribute('data-value'));
			if (sum != 10) {
				$('#result').text('Not Correct.');
				return
			}
		}
		$('#result').text('Correct!');
	// });
};

//calculate the value of each row and column, then update the values
function calculate() {
    
    var sqr = ["R1","R2","R3","R4","C1","C2","C3","C4"];
    
    for (var i in sqr) {
			var cur = $('.'+sqr[i]).find('img');
			sum =	parseInt(cur[0].getAttribute('data-value')) + 
					parseInt(cur[1].getAttribute('data-value')) + 
					parseInt(cur[2].getAttribute('data-value')) + 
					parseInt(cur[3].getAttribute('data-value'));
                    
            //update rows and columns' values
			$('.sum .'+sqr[i]).text(sum);
	}
}

$('#test').click(result)