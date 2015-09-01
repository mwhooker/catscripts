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

function sendHunters() {
  gamePage.village.huntAll();
}

function debug(msg) {
  console.log("%c[%s] %c%s", "color:red", Date(), "color:black", msg);
}

// 5 minutes
setInterval(function() {
  makeResource('parchment');
  makeResource('manuscript');
  //makeResource('compendium');
  makeResource('steel');
}, 3 * 60 * 1000);

// 10 minutes
setInterval(function() {
}, 10 * 60 * 1000);

// 30 minutes
setInterval(function() {
  // make alloy for eludium
  makeResource('alloy');
  // make eludium first, so we don't accidentally go over limit
  makeResource('eludium');
  // get uranium
  // tradeResource('Dragons', 'all');
  
  // turn on all outposts
  enableAll("Space", "Outpost");
  // reactivate reactors if we ran out of uranium
  enableAll("Bonfire", "Reactor");

  sendHunters();
}, 30 * 60 * 1000);

// 1 hour
setInterval(function() {
  praiseTheSun();
}, 60 * 60 * 1000);
