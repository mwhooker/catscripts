//TODO: make in to web server so I can use bookmarklet 

function makeResource(res) {
  debug("Making " + res);
  var selector = "table.craftTable tr:contains(" + res + ") td a";
  return $(selector).last()[0].click();
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
  debug("Building " + building);
  openTab(tab);
  var button = $('.btnContent span:contains(' + building + ')').parent();
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
    return tradeOnce("Sharks");
  }
}

setInterval(function() {
  observe();
  emergencyFood();
}, 1000 * 30);

// 5 minutes
setInterval(function() {
  learnAllTechs();
  learnAllScience();
  $.each(["Hut", "Log House"], eachWrapper(buildMain));
  $.each(["Workshop", "Smelter"], eachWrapper(buildMain));
  $.each(["Library", "Academy"], eachWrapper(buildMain));
  $.each(["Lumber Mill", "Mine"], eachWrapper(buildMain));
  $.each(["Barn", "Warehouse"], eachWrapper(buildMain));

  //$.each(["Library", "Academy"], eachWrapper(buildMain));
  sendHunters();
  $.each(["beam", "slab", "steel", "parchment", "manuscript"], eachWrapper(makeResource));
  if (resourceIncreasing("catnip")) {
    $.each(["Catnip field", "Pasture", "Aqueduct"], eachWrapper(buildMain));
    // replenish catnip
    tradeOnce("Sharks");
  }
  $.each(["Tradepost", "Ampitheatre", "Unic. Pasture"], eachWrapper(buildMain));

  if (Math.random() > 0.5) {
    enableAll("Village", "Woodcutter");
  } else {
    enableAll("Village", "Miner");
  }
  openTab("Bonfire");
}, 5 * 60 * 1000);

// 10 minutes
setInterval(function() {
}, 10 * 60 * 1000);

// 30 minutes
setInterval(function() {
}, 30 * 60 * 1000);

// 1 hour
setInterval(function() {
  //praiseTheSun();
}, 60 * 60 * 1000);
