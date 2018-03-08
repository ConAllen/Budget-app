
// Budget Controller

var budgetController = (function(){

    // expense function consctructor methods will be added by prototype
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    // income function consctuctor  methods will be added by prototype
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {

        allItems: {
            Expenses: [],
            Incomes: []
        },

        totals: {
            Expenses:0,
            Incomes:0
        }
    };

})();



// UI Controller
var UIController = (function(){

    var DOMStrings = {

        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value',
        inputBtn: '.add__btn'

    };
    return {
        getInput: function() {
            return {
            // 3 input variables
              type: document.querySelector(DOMStrings.inputType).value, // will be either inc or exp
              description: document.querySelector(DOMStrings.inputDescription).value,
              value: document.querySelector(DOMStrings.inputValue).value
            }
        },
        // this method has now made domstring a public method so it can be passed into the other controllers
        getDOMStrings: function(){
            return DOMStrings;
        }
    }
})();


// Global App Controller


var controller = (function(budgetCtrl,UICtrl){

    var setUpEventListeners = function(){

         // this method is carried in from the UICtrl to eliminate the DOM strings
        var DOM = UICtrl.getDOMStrings();
        // event listeners
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event){
            if (event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });

    }

    var ctrlAddItem = function(){
    // 1. get the filed input data
       var input = UICtrl.getInput();
       console.log(input);

    // 2. add the item to the budget controller

    // 3. add the item to the ui

    // 4. calculate the budget

    // 5. display the budget
    };

    return {
        init: function(){
            setUpEventListeners();
        }

    };



})(budgetController, UIController);

controller.init();