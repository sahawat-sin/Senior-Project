document.addEventListener('DOMContentLoaded', function () {
	
	
	
    var button = document.querySelectorAll('button');
    button[0].addEventListener('click', clickHandler);
    button[1].addEventListener('click', clickHandler);
	
	button[0].style.display = 'none';
	button[1].style.display = 'none';
	
    document.querySelector('label').addEventListener('click', display); 
    });

    function clickHandler(element) {
		var button = document.querySelectorAll('button');
		if(button[0].style.backgroundColor === "#ff7e5e" || button[1].style.backgroundColor === "#ff7e5e")
		{
				this.style.backgroundColor = "white";
		}
		else
		{
			this.style.backgroundColor = "#ff7e5e";
		}
       
    }

	function display(element) {
		var button = document.querySelectorAll('button');
		
		
		if (button[0].style.display === 'none' ){
			button[0].style.display = 'inline';
			button[1].style.display = 'inline';
		} 
		/*else if (button[0].style.display === 'inline') {
			button[0].style.display = 'none';
			button[1].style.display = 'none';			
		}*/
		/*	button[0].style.display = 'none';
			button[1].style.display = 'none';
		}*/
		//button[0].style.display = 'block';
		//button[1].style.display = 'block';		
		//element.preventDefault();
		
	}

