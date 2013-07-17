# jQuery.nwslider

jQuery image slider with vertical thumbnail layout

* [demo](http://konitter.github.io/jQuery.nwslider/)

## Usage

### 1. Include some files

```html
<link rel="stylesheet" href="nwslider.css">
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="jquery.nwslider.min.js"></script>
```

### 2. Add markup

```html
<div class="nwslider">
	<ul class="nw-slides">
		<li><a href="#"><img src="img/slide1.jpg"></a></li>
		<li><a href="#"><img src="img/slide2.jpg"></a></li>
		<li><a href="#"><img src="img/slide3.jpg"></a></li>
		<li><a href="#"><img src="img/slide4.jpg"></a></li>
	</ul>
	<div class="nw-nav">
		<ul class="nw-thumbs">
			<li><a href="#"><img src="img/thumb/slide1.jpg"></a></li>
			<li><a href="#"><img src="img/thumb/slide2.jpg"></a></li>
			<li><a href="#"><img src="img/thumb/slide3.jpg"></a></li>
			<li><a href="#"><img src="img/thumb/slide4.jpg"></a></li>
		</ul>
	</div>
</div>
```

### 3. Hook up the slider

```js
$(function() {
	$('.nwslider').nwslider();
});
```

## Options

```js
$('.nwslider').nwslider({
	speed: 800,           // animation speed, false for no transition
	delay: 4000,          // delay between slides, false for no autoplay
	pause: true,          // pause on hover (boolean)
	loop: true,           // infinitely looping (boolean)
	complete: false,      // invoke after animation (function with argument)
	items: '.nw-slides',  // slides container selector
	item: '>li',          // slidable items selector
	thumbs: '.nw-thumbs', // thumbs container selector
	thumb: '>li',         // slidable thumbs selector
	nav: '.nw-nav'        // thumbs & controller container selector
});
```

## Accessing properties

```js
var slider = $('.nwslider').nwslider(),
	data = slider.data('nwslider');

//  Play nwslider
data.play();

//  Pause nwslider
data.stop();

//  Move to a slide index, with optional callback
data.move(2, function() {});

//  Move to the next slide (or the first slide if there isn't one)
data.next();

//  Move to the previous slide (or the last slide if there isn't one)
data.prev();
```
