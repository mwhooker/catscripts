(function() {
  function makeResource(res) {
    var last = $("table.craftTable tr:contains(" + res + ") td a").last();
    if (last.is(":visible")) {
      debug("Making " + res);
      return last[0].click();
    }
  }

  function openTab(tab) {
    var selector = ".tabsContainer a:contains(" + tab + ")";
    return $(selector)[0].click();
  }

  function enableOutpost() {
    openTab("Space");
    return $("#gameContainerId > div.tabInner > div:nth-child(1) > div.container > div:nth-child(6) > div > div:nth-child(3) > a")[0].click();
  }

  function praiseTheSun() {
    openTab("Religion");
    return $("#gameContainerId > div.tabInner > div:nth-child(2) > div.container > div:nth-child(3) > div > span")[0].click();
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
    return $(".btnContent:visible").click();
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
      return f(e);
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

  function everyThirtySec() {
    observe();
    emergencyFood();
  }

  function everyTwoMin() {
    if (Math.random() >= 0.9) {
      tradeResource("Lizards", "all");
    } else {
      sendHunters();
    }
    $.each(["parchment", "manuscript", "compendium"], eachWrapper(makeResource));
  }
  // 5 minutes
  function everyFiveMin() {
    learnAllTechs();
    learnAllScience();
    $.each(["Hut", "Log House"], eachWrapper(buildMain));
    $.each(["Workshop", "Smelter"], eachWrapper(buildMain));
    $.each(["Lumber Mill", "Mine"], eachWrapper(buildMain));
    $.each(["Barn"], eachWrapper(buildMain));
    $.each(["Observatory", "Steamworks", "Harbour"], eachWrapper(buildMain));

    $.each(["beam", "slab", "steel"], eachWrapper(makeResource));

    if (Math.random() > 0.5) {
      enableAll("Small town", "Woodcutter");
    } else {
      enableAll("Small town", "Miner");
    }
    $.each(["Catnip field", "Pasture", "Aqueduct"], eachWrapper(buildMain));
    openTab("Bonfire");
  }

  // 10 minutes
  function everyTenMin() {
    $.each(["scaffold", "gear"], eachWrapper(makeResource));
  }

  // 1 hour
  function everyHour() {
    praiseTheSun();
  }

  debug("initializing");
  if (typeof window.mattIntervals !== 'undefined') {
    $.each(window.mattIntervals, function(i, e) {
      clearInterval(e);
    });
  }
  window.mattIntervals = [];

  window.mattIntervals.push(setInterval(everyThirtySec, 1000 * 30));
  window.mattIntervals.push(setInterval(everyTwoMin, 2 * 60 * 1000));
  window.mattIntervals.push(setInterval(everyFiveMin, 5 * 60 * 1000));
  window.mattIntervals.push(setInterval(everyTenMin, 10 * 60 * 1000));
  window.mattIntervals.push(setInterval(everyHour, 60 * 60 * 1000));
})();
