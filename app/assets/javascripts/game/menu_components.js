// Slider has a jqueryui slider and text label displaying its value.
Crafty.c("Slider", {

  slider: function(x, y, w, h, text, value, min, max) {

    // Crafty's entity to hold the slider.
    this.sliderHolder = Crafty.e("2D, DOM")
      .attr({x: x, y: y + 15, z: 1, w: w, h: h});

    // A text label for it.
    var textLabel = Crafty.e("2D, DOM, Text")
      .attr({x: x, y: y, z: 1, w: w, h: h})
      .text(text + ": " + value);

    if (this.has("Persist")) {

      // Add persistance
      this.sliderHolder.addComponent("Persist");
      textLabel.addComponent("Persist");
    }

    // Turn it into a slider input
    $(this.sliderHolder._element).slider({
      min: min,
      max: max,
      step: 1,
      value: value, // default
      slide: function (event, ui) {
        textLabel.text(text + ": " + ui.value);
      }
    });

    // Prevent clicking the slider from also clicking on
    // crafty elements beneath it:
    $(this.sliderHolder._element).mousedown(function (event) {
      event.stopPropagation();
    });
  },

  // Returns the value of the slider.
  value: function() {
    return $(this.sliderHolder._element).slider("option", "value");
  }
});

// Button has a jqueryui button and a function that is executed on click.
Crafty.c("Button", {
  
  button: function(x, y, w, h, text, click) {

    // Crafty's entity to hold the button.
    var buttonHolder = Crafty.e("2D, DOM, HTML")
      .replace("<button>" + text + "</button>")
      .attr({x: x, y: y, z: 1, w: w, h: h});

    if (this.has("Persist")) {

      // Add persistance
      buttonHolder.addComponent("Persist");
    }

    // Turn it into a jqueryui button.
    $(buttonHolder._element.children[0])
      .button()
      .click(click)
      .width(w)
      .height(h);

    // Prevent clicking the button from also clicking on crafty elements beneath it.
    $(buttonHolder._element.children[0]).mousedown(function (event) {
      event.stopPropagation();
    });
  }
});
