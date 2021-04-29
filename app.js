// uiController start

var uiController = (function () {
  var domStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    budgetValue: ".budget__value",
    budgetIncValue: ".budget__income--value",
    budgetExpValue: ".budget__expenses--value",
    budgetExpPercentage: ".budget__expenses--percentage",
    containerDiv: ".container",
    expensePercentageLabel: ".item__percentage",
    dateLabel: ".budget__title--month",
  };
  // uiController PRIVATE functions
  var nodeListForEach = function (list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  var formatMoney = function (too, type) {
    var num = "" + too;
    var count = 0;
    var y = "";

    num = num.split("").reverse().join("");
    for (var i = 0; i < num.length; i++) {
      count++;
      y = y + num[i];
      if (count % 3 === 0) {
        y = y + ",";
      }
    }
    num = y.split("").reverse().join("");
    if (num[0] === ",") {
      num = num.substring(1);
    }
    if (type === "inc") {
      num = "+ " + num;
    } else if (type === "exp") {
      num = "- " + num;
    }

    return num;
  };
  // uiController PUBLIC functions
  return {
    changeType: function () {
      var fields = document.querySelectorAll(
        domStrings.inputType +
          ", " +
          domStrings.inputDescription +
          ", " +
          domStrings.inputValue
      );
      nodeListForEach(fields, function (el) {
        el.classList.toggle("red-focus");
      });

      document.querySelector(domStrings.addBtn).classList.toggle("red");
      // window.location = "https://1234.mn" bdag shuu
    },
    displayDate: function () {
      var unuudur = new Date();
      document.querySelector(domStrings.dateLabel).textContent =
        unuudur.getFullYear() + " оны " + unuudur.getMonth() + " сар";
    },
    displayPercentages: function (allPercentages) {
      var elements = document.querySelectorAll(
        domStrings.expensePercentageLabel
      );

      nodeListForEach(elements, function (el, index) {
        el.textContent = allPercentages[index];
      });
    },
    tusuvHaruulna: function (t) {
      // console.log(t.huvi);
      if (t.huvi === 0 || isNaN(t.huvi) || t.huvi == Infinity) {
        document.querySelector(domStrings.budgetExpPercentage).textContent = 0;
      } else {
        document.querySelector(domStrings.budgetExpPercentage).textContent =
          t.huvi + "%";
      }
      var type;
      if (t.tusuv > 0) {
        type = "inc";
      } else {
        type = "exp";
      }
      document.querySelector(domStrings.budgetValue).textContent = formatMoney(
        t.tusuv,
        type
      );

      document.querySelector(
        domStrings.budgetExpValue
      ).textContent = formatMoney(t.totalExp, "exp");
      document.querySelector(
        domStrings.budgetIncValue
      ).textContent = formatMoney(t.totalInc, "inc");
    },
    getInput: function () {
      return {
        type: document.querySelector(domStrings.inputType).value,
        description: document.querySelector(domStrings.inputDescription).value,
        value: parseInt(document.querySelector(domStrings.inputValue).value),
      };
    },
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
    deleteListItem: function (id) {
      var a = document.getElementById(id);
      a.parentNode.removeChild(a);
    },
    addListItem: function (item, type) {
      var typeList;
      var html;
      if (type === "inc") {
        typeList = domStrings.incomeList;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        typeList = domStrings.expenseList;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      html = html.replace("%id%", item.id);
      html = html.replace("%description%", item.description);
      html = html.replace("%value%", formatMoney(item.value, type));
      document.querySelector(typeList).insertAdjacentHTML("beforeend", html);
    },
  };
})();
// financeController START

var financeController = (function () {
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
  // PRIVATE functions
  var Income = function (id, description, value) {
    // орж ирсэн мэдээллийг Object болгоно
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };
  var calculateTotal = function (type) {
    //
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum = sum + el.value;
    });

    data.totals[type] = sum;
  };
  Expense.prototype.calcPercentage = function (totalIncome) {
    // Нийт орлого тоог аваад тухайн Object-ийн хэдэн хувь эзлэхийг тооцолно
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = 0;
    }
  };
  Expense.prototype.getPercentage = function () {
    // Тухайн Object-ийн хувь-ийг буцаана
    return this.percentage;
  };

  // PUBLIC functions
  return {
    calculateAllPercentages: function () {
      // Object бүрийн хувийг тооцолно
      data.items.exp.forEach(function (el) {
        // console.log(el);
        el.calcPercentage(data.totals.inc);
      });
    },
    getAllPercentages: function () {
      // Object бүрийн хувийг буцаана
      var percentages = data.items.exp.map(function (el) {
        return el.getPercentage();
      });

      return percentages;
    },
    deleteItem: function (type, inputId) {
      // console.log("deleteItem: " + type + "-" + inputId);
      for (var i = 0; i < data.items[type].length; i++) {
        if (parseInt(inputId) === data.items[type][i].id) {
          // console.log(inputId + " tentsuu " + data.items[type][i].id);
          data.items[type].splice(i, 1);
          break;
        }
      }
    },
    tusuvTootsoloh: function () {
      calculateTotal("inc");
      calculateTotal("exp");

      data.tusuv = data.totals.inc - data.totals.exp;
      if (data.totals.inc > 0) {
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.huvi = 0;
      }
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
    addItems: function (type, description, value) {
      // add items public function uusgev, herev gadnaas handaad medeellel avhiig husvel return bichij bolno
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
// appController START

var appController = (function (uiCtrl, fnCtrl) {
  // PRIVATE functions
  var ctrlAddItem = function () {
    // add darhad ajillah function
    var i = uiCtrl.getInput();

    if (i.value && i.description !== "") {
      // Oruulah ugugdliig olj avna
      var item = fnCtrl.addItems(i.type, i.description, i.value);

      uiCtrl.addListItem(item, i.type);
      uiCtrl.clearFields();

      updateBudget();
    }
  };
  var updateBudget = function () {
    fnCtrl.tusuvTootsoloh();
    var tusuv = fnCtrl.tusuvAvah();
    uiCtrl.tusuvHaruulna(tusuv);
    fnCtrl.calculateAllPercentages();
    var allPercentages = fnCtrl.getAllPercentages();
    uiCtrl.displayPercentages(allPercentages);
  };
  var setupEventListeners = function () {
    // Бүх эвэнт листенер байгаа газар
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

    document
      .querySelector(DOM.inputType)
      .addEventListener("change", uiCtrl.changeType);
    document
      .querySelector(DOM.containerDiv)
      .addEventListener("click", function (event) {
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (id) {
          var arr = id.split("-");
          var type = arr[0];
          var itemId = arr[1];
          fnCtrl.deleteItem(type, itemId);
          uiCtrl.deleteListItem(id);
          updateBudget();
        }
      });
  };
  // PUBLIC functions
  return {
    init: function () {
      console.log("app ehellee");
      setupEventListeners();
      uiCtrl.displayDate();
      uiCtrl.tusuvHaruulna({
        tusuv: 0,
        huvi: 0,
        totalExp: 0,
        totalInc: 0,
      });
    },
  };
  // ui & finance function доторх public мэдээлэлтэй харьцах боломжийг олгоно
})(uiController, financeController);

// програм эхлүүлдэг функцыг дуудав.
appController.init();
