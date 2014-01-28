// Slider has a jqueryui slider and text label displaying its value.
Crafty.c("Slider", {

  slider: function(x, y, w, h, text, value, min, max) {

    // Crafty's entity to hold the slider.
    this.sliderHolder = Crafty.e("2D, DOM")
      .attr({x: x, y: y + 15, z: 1, w: w, h: h, z: Game.order.menuElements});

    // A text label for it.
    var textLabel = Crafty.e("2D, DOM, Text")
      .attr({x: x, y: y, z: Game.order.menuElements, w: w, h: h})
      .text(text + ": " + value)
      .css({"color": "white", "text-align": "center"});

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

    return this;
  },

  // Returns the value of the slider.
  getValue: function() {
    return $(this.sliderHolder._element).slider("option", "value");
  },

  // Sets the value of the slider.
  setValue: function(value) {
    $(this.sliderHolder._element).slider("value", value);
  }
});

// Button has a jqueryui button and a function that is executed on click.
Crafty.c("Button", {
  
  button: function(x, y, w, h, text, click) {

    // Crafty's entity to hold the button.
    this.buttonHolder = Crafty.e("2D, DOM, HTML")
      .replace("<button>" + text + "</button>")
      .attr({x: x, y: y, z: 1, w: w, h: h, z: Game.order.menuElements});

    if (this.has("Persist")) {

      // Add persistance
      this.buttonHolder.addComponent("Persist");
    }

    // Turn it into a jqueryui button.
    $(this.buttonHolder._element.children[0])
      .button()
      .click(click)
      .width(w)
      .height(h);

    // Prevent clicking the button from also clicking on crafty elements beneath it.
    $(this.buttonHolder._element.children[0]).mousedown(function (event) {
      event.stopPropagation();
    });

    return this;
  },

  click: function() {
    this.buttonHolder._element.children[0].click();
  }
});

Crafty.c("TopBar", {

  init: function() {
    this.requires("2D, DOM, Color, Persist");
  },

  topBar: function(width) {

    this.attr({
      x: Game.sideBarWidth,
      y: 0,
      w: width,
      h: Game.topBarHeight,
      z: Game.order.menuElements
    });

    this.color(Game.colors.topBar);

    // Notification icons.
    var iconPadding = 5;
    var iconOffsetX = 50;
    UI.pitsIcon = Crafty.e("PitIcon, Persist")
      .attr({
        x: Game.sideBarWidth + iconPadding,
        y: iconPadding,
        z: Game.order.menuElements
      });
    UI.pitsIcon.visible = false;

    UI.wumpusIcon = Crafty.e("WumpusIcon, Persist")
      .attr({
        x: Game.sideBarWidth + iconPadding + iconOffsetX,
        y: iconPadding,
        z: Game.order.menuElements
      });
    UI.wumpusIcon.visible = false;

    UI.treasureIcon = Crafty.e("ChestIcon, Persist")
      .attr({
        x: Game.sideBarWidth + iconPadding + 2 * iconOffsetX,
        y: iconPadding,
        z: Game.order.menuElements
      });
    UI.treasureIcon.visible = false;

    return this;
  }
});

Crafty.c("SideBar", {

  init: function() {
    this.requires("2D, DOM, Color, Persist");
  },

  sideBar: function(height) {

    this.attr({
      x: 0,
      y: 0,
      w: Game.sideBarWidth,
      h: height,
      z: Game.order.menuElements
    });

    this.color(Game.colors.sideBar);

    // Sliders.
    var sliderBarOffsetY = 40;
    var sliderPadding = 13;

    UI.rowsSlider = Crafty.e("Slider, Persist")
      .slider(sliderPadding, 0, Game.sideBarWidth - 2 * sliderPadding - 3, 5, "No. of rows", GameModel.params.rowsCount, 8, 15);

    UI.columnsSlider = Crafty.e("Slider, Persist")
      .slider(sliderPadding, sliderBarOffsetY, Game.sideBarWidth - 2 * sliderPadding - 3, 5, "No. of columns", GameModel.params.columnsCount, 8, 15);

    UI.pitsSlider = Crafty.e("Slider, Persist")
      .slider(sliderPadding, 2 * sliderBarOffsetY, Game.sideBarWidth - 2 * sliderPadding - 3, 5, "No. of pits", GameModel.params.pitsCount, 0, 16);

    UI.batsSlider = Crafty.e("Slider, Persist")
      .slider(sliderPadding, 3 * sliderBarOffsetY, Game.sideBarWidth - 2 * sliderPadding - 3, 5, "No. of bats", GameModel.params.batsCount, 0, 16);

    UI.arrowsSlider = Crafty.e("Slider, Persist")
      .slider(sliderPadding, 4 * sliderBarOffsetY, Game.sideBarWidth - 2 * sliderPadding - 3, 5, "No. of arrows", GameModel.params.arrowsCount, 0, 16);

    // Buttons.
    var buttonPadding = 3;
    UI.newGameButton = Crafty.e("Button, Persist").button(buttonPadding, 5 * sliderBarOffsetY, Game.sideBarWidth - 2 * buttonPadding - 1, 30, "New Game", NewGameService.execute);

    return this;
  }
});
