/*!
 * jQuery.nwslider v0.2
 *
 * Copyright 2013, Haruki Konishi
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
;(function($, window, document, undefined) {
	//  Set plugin name & some options
	var name = 'nwslider',
		defaults = {
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
		};

	//  Create object
	function Plugin(el, o) {
		this.el = $(el);
		this.o = $.extend({}, defaults, o);
		this.init();
	}

	Plugin.prototype = {

		//  Initialize functionality
		init: function() {
			var _ = this,
				el = _.el,
				o = _.o;

			//  Set some elements
			_.items = el.find(o.items);
			_.item = _.items.find(o.item);
			_.item.len = _.item.length;

			_.nav = el.find(o.nav);
			_.thumbs = el.find(o.thumbs);
			_.thumb = _.thumbs.find(o.thumb);
			_.thumb.len = _.thumb.length;
			_.thumb.size = _.thumb.eq(0).outerHeight();
			_.thumbs.basePos = _.thumbs.position().top - _.thumb.size * 2;
			_.thumbs.limitPos = -(_.thumb.len * _.thumb.size - _.thumbs.basePos);

			//  Current index
			_.index = 0;

			//  Set up parts
			_.setup();
		},

		//  Set up the items & nav
		setup: function() {
			var _ = this,
				z,
				html;

			//  Set the items
			_.item.eq(0).addClass('active');
			z = _.item.len;
			_.item.each(function() {
				$(this).css({
					'position': 'absolute',
					'z-index': z
				});
				z--;
			}).not('.active').hide();

			//  Set the thumbs & nav
			if (_.thumb.len > 1) {
				_.thumbs
					.prepend(_.thumb.slice(-2).clone())
					.append(_.thumb.slice(0,2).clone())
					.css({'top': _.thumbs.basePos});

				html = '<span class="nw-prev nw-prev-cover"></span><span class="nw-next nw-next-cover"></span><a class="nw-prev">Previous</a><a class="nw-next">Next</a>';
				_.nav
					.append(html)
					.on('click', '.nw-prev', function(e) {
						e.preventDefault();
						_.prev();
					})
					.on('click', '.nw-next', function(e) {
						e.preventDefault();
						_.next();
					});
			}

			//  Autoslide
			if (_.o.delay) {
				_.play();

				if (_.o.pause) {
					_.items.on('mouseover mouseout', function(e) {
						_.stop();
						e.type === 'mouseout' && _.play();
					});
				}
			}
		},

		//  Move a slide & thumb
		move: function(index, callback) {
			var _ = this,
				o = _.o,
				current = _.item.eq(_.index),
				target = _.item.eq(index),
				range = _.thumb.size,
				limit = _.thumbs.limitPos,
				base = _.thumbs.basePos;

			//  To slide or not to slide
			if ((!target.length || index < 0) && !o.loop) return;

			//  Check if it's out of bounds
			if (index < _.index) {
				range = -range;
				limit = _.thumbs.basePos;
				base = _.thumbs.limitPos;
			}
			if (!target.length) index = 0;
			if (index < 0) index = _.item.length - 1;
			target = _.item.eq(index);

			var speed = callback ? 5 : o.speed | 0;
			if (callback) range = range * index;

			if (_.thumbs.position().top === limit) {
				_.thumbs.css({'top': base});
			}

			_.thumbs.not(':animated').animate(
				{top: _.thumbs.position().top - range},
				speed, function() {
					var me = $(this);
					if (me.position().top === limit) {
						me.css({'top': base});
					}
					current.fadeOut(speed);
					target.fadeIn(speed);

					_.index = index;
					$.isFunction(o.complete) && !callback && o.complete(_.el);
				}
			);

			return _;
		},

		//  Autoplay functionality
		play: function() {
			var _ = this;
			this.timer = setInterval(function() {
				_.move(_.index + 1);
			}, this.o.delay);
		},

		//  Stop autoplay
		stop: function() {
			this.timer = clearInterval(this.timer);
			return this;
		},

		//  Move to next slide
		next: function() {
			return this.stop().move(this.index + 1).play();
		},

		//  Move to previous slide
		prev: function() {
			return this.stop().move(this.index - 1).play();
		}

	};

	//  Create a jQuery plugin
	$.fn[name] = function(o) {
		return this.each(function() {
			if (!$.data(this, name)) {
				$.data(this, name, new Plugin(this, o));
			}
		});
	};

})(jQuery, window, document);
