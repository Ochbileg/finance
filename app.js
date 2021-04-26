// Дэлгэцийн IIFE функц

var uiController = (function () {
  // index-тэй холбогдсон html class & tag-ууд болно
  var domStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
  };
  // uiController доторх public мэдээлэл
  return {
    // index-ees class-aar handaj form medeeliig tsugluulna
    getInput: function () {
      return {
        type: document.querySelector(domStrings.inputType).value,
        description: document.querySelector(domStrings.inputDescription).value,
        value: parseInt(document.querySelector(domStrings.inputValue).value),
      };
    },
    // deerh objectiig public baidlaar damjuulah zorilgotoi
    getDomStrings: function () {
      return domStrings;
    },

    clearFields: function () {
      var fields = document.querySelectorAll(
        domStrings.inputDescription + ", " + domStrings.inputValue
      );

      var fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function (el) {
        el.value = "";
      });

      fieldsArr[0].focus();
    },

    addListItem: function (item, type) {
      var typeList;
      var html;
      if (type === "inc") {
        typeList = domStrings.incomeList;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        typeList = domStrings.expenseList;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      html = html.replace("%id%", item.id);
      html = html.replace("%description%", item.description);
      html = html.replace("%value%", item.value);
      document.querySelector(typeList).insertAdjacentHTML("beforeend", html);
    },
  };
})();

// Санхүүгийн IIFE функц

var financeController = (function () {
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

    tusuv: 0,
    huvi: 0,
  };

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

  var calculateTotal = function (type) {
    //
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum = sum + el.value;
    });

    data.totals[type] = sum;
  };

  // // financeController доторх public мэдээлэл
  return {
    tusuvTootsoloh: function () {
      calculateTotal("inc");
      calculateTotal("exp");

      data.tusuv = data.totals.inc - data.totals.exp;
      //
      data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
    },

    tusuvAvah: function () {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalExp: data.totals.exp,
        totalInc: data.totals.inc,
      };
    },

    seeData: function () {
      return data;
    },
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

      return item;
    },
  };
})();

// Холбогч IFEE функц

var appController = (function (uiCtrl, fnCtrl) {
  // add darhad ajillah function
  var ctrlAddItem = function () {
    var i = uiCtrl.getInput();

    if (i.value && i.description !== "") {
      // Oruulah ugugdliig olj avna
      var item = fnCtrl.addItems(i.type, i.description, i.value);

      uiCtrl.addListItem(item, i.type);
      uiCtrl.clearFields();

      fnCtrl.tusuvTootsoloh();
      var tusuv = fnCtrl.tusuvAvah();

      console.log(fnCtrl.seeData());
    }
  };

  // Бүх эвэнт листенер байгаа газар
  var setupEventListeners = function () {
    // uiController доторх дом мэдээллийг хүлээж авна
    var DOM = uiCtrl.getDomStrings();
    // keyboard & icon event зарлалаа
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });
    // Keyboard event зарлалаа
    document.addEventListener("keyup", (event) => {
      if (event.key === "Enter" || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  // програм эхлэлэд ажиллах public function
  return {
    init: function () {
      console.log("app ehellee");
      setupEventListeners();
    },
  };
  // ui & finance function доторх public мэдээлэлтэй харьцах боломжийг олгоно
})(uiController, financeController);

// програм эхлүүлдэг функцыг дуудав.
appController.init();
