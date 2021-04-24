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
  //
})();

// Програмын холбогч компютер
var appController = (function (uiCtrl, fnCtrl) {
  // add darhad ajillah function
  var ctrlAddItem = function () {
    console.log(uiCtrl.getInput().value);
    // Oruulah ugugdliig olj avna
    // Olj avsan ugugdluudee sanhuugiin controllruu shiljuulj hadgaldag bolgono
    // olj avsan medeeliig tohiroh orlogo zarlaga deer haruulna
    // tusviig tootsolno
    // etsiin uldegdel tootsoog haruulna
  };
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
  // ui bolon finance functionii medeelliig access hiihed zoriulagdsan
})(uiController, financeController);
