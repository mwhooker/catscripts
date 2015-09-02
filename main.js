function makeResource(res) {
  debug("Making " + res);
  var selector = "table.craftTable tr:contains(" + res + ") td a";
  $(selector).last()[0].click();
}

function openTab(tab) {
  var selector = ".tabsContainer a:contains(" + tab + ")";
  $(selector)[0].click();
}

function enableOutpost() {
  openTab("Space");
  $("#gameContainerId > div.tabInner > div:nth-child(1) > div.container > div:nth-child(6) > div > div:nth-child(3) > a")[0].click();
}

function praiseTheSun() {
  openTab("Religion");
  $("#gameContainerId > div.tabInner > div:nth-child(2) > div.container > div:nth-child(3) > div > span")[0].click();
}

function enableAll(tab, resource) {
  debug("Enabling " + resource);
  openTab(tab);
  var button = $('.btnContent span:contains(' + resource + ')').parent();
  $("a:contains(+all)", button)[0].click();
}

function tradeResource(race, number) {
  openTab("Trade");
  debug("Trading " + number + " times with " + race);
  var panel = $(".panelContainer div:contains(" + race + ")").parent();
  $("a:contains(" + number + ")", panel)[0].click();
}

function getMainBuildTab() {
  return $('.tabsContainer').children().first().text();
}

function build(tab, building) {
  debug("Building " + building);
  openTab(tab);
  var button = $('.btnContent span:contains(' + building + ')').parent();
  button.click();
}

function buildMain(building) {
  build(getMainBuildTab(), building);
}

function sendHunters() {
  gamePage.village.huntAll();
}

function learnAllScience() {
  debug("Learning");
  openTab("Science");
  $(".btnContent:visible").click();
}

function learnAllTechs() {
  debug("Teching");
  openTab("Workshop");
  $('#gameContainerId > div.tabInner > div:nth-child(3) > div .btnContent:visible').click();
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
  }
}

// 5 minutes
setInterval(function() {
  $.each(["Hut", "Log House", "Barn", "Warehouse"], eachWrapper(buildMain));
  $.each(["Lumbermill", "Mine", "Smelter", "Workshop"], eachWrapper(buildMain));
  $.each(["Library", "Academy"], eachWrapper(buildMain));
  sendHunters();
  $.each(["beam", "slab", "plate", "parchment", "manuscript"], eachWrapper(makeResource));
  if (resourceIncreasing("catnip")) {
    $.each(["Catnip field", "Pasture", "Aqueduct"], eachWrapper(buildMain));
  }
  $.each(["Tradepost", "Ampitheatre", "Unic. Pasture"], eachWrapper(buildMain));

  if (Math.random() > .5) {
    enableAll("Village", "Woodcutter")
  } else {
    enableAll("Village", "Miner")
  }
  learnAllScience();
  learnAllTechs();
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
