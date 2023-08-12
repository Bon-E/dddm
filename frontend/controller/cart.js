$(document).ready(() => {
  initPage().then(() => {
      routePages();
      let model =Model.getInstance();
      console.log("help",model.GetCart());
  });
});
