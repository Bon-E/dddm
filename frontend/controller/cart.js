$(document).ready(function () {
  initPage().then(() => {
    routePages();
    printcart();
  });
});
function printcart(){
  let model = Model.getInstance();
  console.log(model.GetCart());
  
}