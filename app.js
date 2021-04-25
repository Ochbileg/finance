// Дэлгэцтэй ажиллах удирдлага

var uiController = (function () {
  // buh index-ees avch bui html class tag-nuud end tsuglarna
  var domStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };
  // return hiisneer busad function dotor doorh koduudiig public maygaar ashiglaj bolno
  return {
    // index-ees class-aar handaj form medeeliig tsugluulna
    getInput: function () {
      return {
        type: document.querySelector(domStrings.inputType).value,
        description: document.querySelector(domStrings.inputDescription).value,
        value: document.querySelector(domStrings.inputValue).value,
      };
    },
    // deerh objectiig public baidlaar damjuulah zorilgotoi
    getDomStrings: function () {
      return domStrings;
    },
  };
})();

// Санхүүтэй ажиллах удирдлага

var financeController = (function () {
  // orj irsen medeelliig ashiglaad shine object uusgedg funkts
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  // orj irsen objectiig hadgalah massive datatype huvisagch
  var data = {
    items: {
      inc: [],
      exp: [],
    },

    totals: {
      inc: 0,
      exp: 0,
    },
  };
  // return dotor single object uusgev
  return {
    // add items public function uusgev, herev gadnaas handaad medeellel avhiig husvel return bichij bolno
    addItems: function (type, description, value) {
      // item huvisagch dotor shineer uusgesn objectiig hadgalna
      var item, id;

      if (data.items[type].length == 0) {
        id = 1;
      } else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      //type hamaarch argumenteer orj irsen medeellig ashiglaad income esvel expense object uusgev
      if (type === "inc") {
        item = new Income(id, description, value);
      } else {
        item = new Expense(id, description, value);
      }
      data.items[type].push(item);
      console.log(data.items);
    },
  };
})();

// Програмын холбогч компютер
var appController = (function (uiCtrl, fnCtrl) {
  // add darhad ajillah function
  var ctrlAddItem = function () {
    var i = uiCtrl.getInput();
    // Oruulah ugugdliig olj avna
    fnCtrl.addItems(i.type, i.description, i.value);

    // Olj avsan ugugdluudee sanhuugiin controllruu shiljuulj hadgaldag bolgono
    // olj avsan medeeliig tohiroh orlogo zarlaga deer haruulna
    // tusviig tootsolno
    // etsiin uldegdel tootsoog haruulna
  };

  var setupEventListeners = function () {
    // uiController dotor bga dom medeelliig damjuulah zorilgotoi
    var DOM = uiCtrl.getDomStrings();
    // keyboard bolon icon event listeneeruud
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });
    // Keyboard unshih zorilgotoi
    document.addEventListener("keyup", (event) => {
      if (event.key === "Enter" || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  // public function huvisagch nar end hadgalnaa
  return {
    init: function () {
      console.log("app ehellee");
      setupEventListeners();
    },
  };
  // ui bolon finance functionii medeelliig access hiihed zoriulagdsan
})(uiController, financeController);

appController.init();
