// Дэлгэцтэй ажиллах удирдлага

var uiController = (function () {
  console.log("hello ");
})();

// Санхүүтэй ажиллах удирдлага

var financeController = (function () {
  console.log("hello ");
})();

// Програмын холбогч компютер
var appController = (function (uiCtrl, fnCtrl) {
  var ctrlAddItem = function () {
    alert("enter daragdlaa");
    // Oruulah ugugdliig olj avna
    // Olj avsan ugugdluudee sanhuugiin controllruu shiljuulj hadgaldag bolgono
    // olj avsan medeeliig tohiroh orlogo zarlaga deer haruulna
    // tusviig tootsolno
    // etsiin uldegdel tootsoog haruulna
  };
  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "Enter" || event.which === 13) {
      ctrlAddItem();
    }
  });
  //
})(uiController, financeController);
