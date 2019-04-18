	/*timer start */
 $(document).ready (function () {
    $('.clock').each(function () {
		
        var clock = $(this);

        setInterval(function () {
            var m = $('.min', clock),
                s = $('.sec', clock);
            if (m.length == 0 && parseInt(s.html()) <= 0) 
			{
                clock.html('<span class="sec2">Timer Complete.</span>');
			}
             
            if (parseInt(s.html()) <= 0) {
			var	minutes = "0"+parseInt(m.html() - 1);
                m.html(minutes);
                s.html(60);
            }
             
            if (parseInt(m.html()) <= 0) 
                clock.html('<span class="sec">59</span> <span class="sec1">00</span>');
				
		var str = parseInt(s.html() -1)
		  n = str.toString().length;
		 if(n <=1)
		 {
			 var	seconds = "0"+parseInt(s.html() - 1);
			 s.html(seconds);
		 }
		 else
		 {
	        s.html(parseInt(s.html() -1));
		 }
         
        }, 1000);
    });
});

/*timer end */


/*Tool Tip */
//$(function () { $("[data-toggle='tooltip']").tooltip(); });	