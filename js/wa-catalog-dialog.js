(function () {
  var waUrl = "https://www.whatsapp.com/catalog/56933216493/?app_absent=0";
  var dialog = document.getElementById("wa-notice");
  var btnClose = document.getElementById("wa-notice-close");
  var btnConfirm = document.getElementById("wa-notice-confirm");

  document.querySelectorAll(".js-wa-catalog").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      if (dialog && typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }
    });
  });

  if (btnClose && dialog) {
    btnClose.addEventListener("click", function () {
      dialog.close();
    });
  }

  if (btnConfirm && dialog) {
    btnConfirm.addEventListener("click", function () {
      window.open(waUrl, "_blank", "noopener,noreferrer");
      dialog.close();
    });
  }

  if (dialog) {
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) {
        dialog.close();
      }
    });
  }
})();
