/**
* 
*  CoverFlow using CSS3
*  Hjörtur Elvar Hilmarsson
*
**/
(function() {

    var idx = 0,
    covers = [],
    titles=[],
    descripts=[],

    // Constants
    OFFSET = 40; // pixels
    BASE_ZINDEX = -10; // 
    MAX_ZINDEX = 0; // 

    function get( selector ) {
        return document.querySelector( selector );
    };

    function render() {

        // loop through albums & transform positions
        for( var i = 0; i < covers.length; i++ ) {
 
            // before 
            if( i < idx ) {
                covers[i].style.webkitTransform = "translateX(" + (-1*OFFSET*(idx-i)) + "% ) scale(" + Math.pow(0.9,(idx-i)) + ")";
                covers[i].style.zIndex = BASE_ZINDEX + i;  
            } 

            // current
             if( i === idx ) {
                covers[i].style.webkitTransform = "translateZ( 1px )";
                covers[i].style.zIndex = MAX_ZINDEX;  
                document.getElementById("album-title").innerHTML = titles[i];
                document.getElementById("album-descript").innerHTML=descripts[i];
            } 

             // after
            if( i > idx ) {
                covers[i].style.webkitTransform = "translateX(" + (OFFSET*(i-idx)) + "% ) scale(" + Math.pow(0.9,-1*(idx - i)) + ")";
                covers[i].style.zIndex = BASE_ZINDEX + ( covers.length - i  ); 
            }         
        
        }

    };
    function shiftR() {
       if( idx ) {
            idx--;
            render();
       }
    };

    function shiftL() {
       if( covers.length > ( idx + 1)  ) {
            idx++;
            render();
       }
    };

    function keyDown(event){
        switch(event.keyCode){
            case 37: shiftR(); break;
            case 39: shiftL();
        }

    };

    function registerEvents() {
        document.addEventListener('keydown', keyDown, false);
    };

    function init() {
        covers = Array.prototype.slice.call( document.querySelectorAll( 'section' ));
        idx = Math.floor( covers.length / 2 );
        _coverflow = get('#coverflow');
        for( var i = 0; i < covers.length; i++ ) {
            var url = covers[i].getAttribute("data-cover");
            covers[i].style.backgroundImage = "url("+ url  +")";
            titles[i] = covers[i].getAttribute("album-title");
            descripts[i] = covers[i].getAttribute("descript");
        }
        registerEvents();
        render();
   };
    init();
    $('section').hover(function(){
      idx = covers.indexOf(this);
      render();
    });
}());