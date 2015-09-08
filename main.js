(function() {
  function makeResource(res) {
    if (res == "compendium") {
      // hack for typo in game
      res = "compedium";
    }
    gamePage.workshop.craftAll(res);
    debug("Making " + res);
  }

  function openTab(tab) {
    var selector = ".tabsContainer a:contains(" + tab + ")";
    return $(selector)[0].click();
  }

  function praiseTheSun() {
    debug("praising the sun");
    return gamePage.religion.praise();
  }

  function enableBuilding(building, n) {
    debug("Enabling " + n + " of " + resource);
    gamePage.bld.getBuilding(building).on = n;
  }

  function enableAll(tab, resource) {
    debug("Enabling " + resource);
    openTab(tab);
    var button = $('.btnContent span:contains(' + resource + ')').parent();
    return $("a:contains(+all)", button)[0].click();
  }

  function tradeOnce(race) {
    openTab("Trade");
    debug("Trading once with " + race);
    var panel = $(".panelContainer div:contains(" + race + ")").parent();
    return $(".btn", panel).click();
  }

  function tradeResource(race, number) {
    openTab("Trade");
    debug("Trading " + number + " times with " + race);
    var panel = $(".panelContainer div:contains(" + race + ")").parent();
    return $("a:contains(" + number + ")", panel)[0].click();
  }

  function getMainBuildTab() {
    return $('.tabsContainer').children().first().text();
  }

  function build(tab, building) {
    openTab(tab);
    var button = $('.btnContent span:contains(' + building + ')').parent();
    if (button.parent().hasClass("disabled")) {
      return;
    }
    debug("Building " + building);
    return button.click();
  }

  function buildMain(building) {
    return build(getMainBuildTab(), building);
  }

  function sendHunters() {
    return gamePage.village.huntAll();
  }

  function learnAllScience() {
    debug("Learning");
    openTab("Science");
    var sci = $("table .btn:visible").not(".disabled");
    if (sci.length > 0) {
      var toLearn = sci.first();
      debug("trying to learn " + toLearn.text());
      toLearn.click();
    }
  }

  function learnAllTechs() {
    debug("Teching");
    openTab("Workshop");
    return $('#gameContainerId > div.tabInner > div:nth-child(3) > div .btnContent:visible').click();
  }

  function resourceIncreasing(res) {
    var x = $("#resContainer > table > tr td:contains(" + res + ")").parent();
    return $("td:nth-child(4):contains(+)", x).length > 0;
  }

  function debug(msg) {
    console.log("%c[%s] %c%s", "color:red", Date(), "color:black", msg);
  }

  function eachWrapper(f) {
    return function (i, e) {
        f(e);
    };
  }

  function observe() {
    return $('#observeBtn').click();
  }

  function emergencyFood() {
    if ($("#advisorsContainer").children().length > 0) {
      debug("emergencyFood");
      return tradeOnce("Sharks");
    }
  }

  function everyTenSec() {
    observe();
    emergencyFood();
  }

  function everyMin() {
    /*
    if (Math.random() >= 0.5) {
    }
    */
    // makeResource("slab")
    // tradeResource("Dragons", "all");
    // tradeResource("Zebras", "all");
  }
  // 5 minutes
  function everyFiveMin() {
    learnAllTechs();
    learnAllScience();
    sendHunters();
    $.each(["blueprint", "compendium", "manuscript", "parchment"], eachWrapper(makeResource, 500));
    $.each(["Hut", "Log House"], eachWrapper(buildMain));
    $.each(["Workshop", "Smelter", "Calciner", "Oil Well"], eachWrapper(buildMain));
    // $.each(["Barn", "Warehouse"/*, "Harbour"*/], eachWrapper(buildMain));
    // $.each(["Magneto", "Steamworks", "Factory", "Reactor", "Accelerator"], eachWrapper(buildMain));
    // $.each(["Observatory", "Library", "Academy"], eachWrapper(buildMain));
    // $.each(["Chapel", "Temple"], eachWrapper(buildMain));
    $.each(["Lumber Mill", "Mine", /*"Quarry",*/ "Tradepost"], eachWrapper(buildMain));

    /*
    if (Math.random() > 0.5) {
      enableAll("Small town", "Woodcutter");
    } else {
      enableAll("Small town", "Miner");
    }
    */
    // $.each(["Catnip field", "Pasture", "Aqueduct"], eachWrapper(buildMain));
    $.each(["steel", "slab", "beam", /*"concrete",*/ "alloy"], eachWrapper(makeResource));

    enableAll("Space", "Outpost");
    tradeResource("Zebras", "all");
    tradeResource("Dragons", "all");
    // reactivate reactors if we ran out of uranium
    enableBuilding("reactor", 7);
    openTab("Bonfire");
  }
  

  // 10 minutes
  function everyTenMin() {
    praiseTheSun();
  }

  // 1 hour
  function everyHour() {
  }

  window.unloadMatt = function() {
    if (typeof window.mattIntervals !== 'undefined') {
      debug("unloading");
      $.each(window.mattIntervals, function(i, e) {
        clearInterval(e);
      });
    }
  };
  window.unloadMatt();
  window.mattIntervals = [];

  debug("initializing");
  //window.mattIntervals.push(setInterval(everyTenSec, 1000 * 10));
  //window.mattIntervals.push(setInterval(everyMin, 60 * 1000));
  window.mattIntervals.push(setInterval(everyFiveMin, 5 * 60 * 1000));
  window.mattIntervals.push(setInterval(everyTenMin, 10 * 60 * 1000));
  //window.mattIntervals.push(setInterval(everyHour, 60 * 60 * 1000));
})();
