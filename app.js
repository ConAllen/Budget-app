
// Budget Controller

var budgetController = (function(){

    // some code

})();

// UI Controller
var UIController = (function(){

    var DOMStrings = {

        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value'

    };

    return {
        getInput: function() {
            return {
            // 3 input variables
              type: document.querySelector(DOMStrings.inputType).value, // will be either inc or exp
              description: document.querySelector(DOMStrings.inputDescription).value,
              value: document.querySelector(DOMStrings.inputValue).value

            }
        }
    }


})();


// Global App Controller


var controller = (function(budgetCtrl,UICtrl){

    var ctrlAddItem = function(){
    // 1. get the filed input data
       var input = UICtrl.getInput();
       console.log(input);

    // 2. add the item to the budget controller

    // 3. add the item to the ui

    // 4. calculate the budget

    // 5. display the budget

    }

document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

document.addEventListener('keypress', function(event){

    if (event.keyCode === 13 || event.which === 13){

        ctrlAddItem();

    }

});

})(budgetController, UIController);