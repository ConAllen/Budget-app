
// Budget Controller module

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

    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(currentElement){
        // the sum is equal to the sum of the previous element + current element's value
            sum += currentElement.value;
        });
        data.totals[type] = sum;
    };

    var data = {

        allItems: {
            exp: [],
            inc: []
        },

        totals: {
            exp:0,
            inc:0
        },

        budget:0,
        percentage: -1
    };


    return {

        // this public method creates an add item function that takes a type,des and val
        addItem: function(type, des, val){
        // next we declare the variables
            var newItem,ID;


            // create a new ID
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;

            } else {
                id = 0;
            }




          // create a new item based on Expense or Income type
           if( type === 'exp' ){
                newItem = new Expense(id, des, val);
           } else if (type === 'inc'){
                newItem = new Income(id, des, val);
           }
           // call the data/allItems/whichever type and push a new item to the array and return it.
           data.allItems[type].push(newItem);
           // return the new element
           return newItem;
        },

        calculateBudget: function() {

            //.1 sum of all incomes
            calculateTotal('exp');
            calculateTotal('inc');

            //.2 sum of all expenses

            data.budget = data.totals.inc - data.totals.exp;

            //.3 calculate budget: income - expense

            //.4 calculate the percentage of that we spent

            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }


        },

        getBudget: function(){

            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };

        },

        testing: function(){
            console.log(data);
        }

    };

})();



//////////////UI Controller module ////////////////

var UIController = (function(){

    var DOMStrings = {

        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'


    };
    return {
        getInput: function() {
            return {
            // 3 input variables
              type: document.querySelector(DOMStrings.inputType).value, // will be either inc or exp
              description: document.querySelector(DOMStrings.inputDescription).value,
              // changes a string into a number
              value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },
        addListItem: function(obj, type){
            var html, newHtml, element;
            // create HTML STRING WTH PLACEHOLDER TEXT

            if (type === 'inc') {

                element = DOMStrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            } else if (type === 'exp'){

                element = DOMStrings.expensesContainer;

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            }

            // REPLACE PLACEHOLDER TEXT WITH DATA FROM OBJ

                newHtml = html.replace('%id%', obj.id);
                newHtml = newHtml.replace('%description%',obj.description)
                newHtml = newHtml.replace('%value%',obj.value)


            // INSERT THE HTML INTO THE DOM
                document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        },

        clearFields: function(){
            var fields, fieldsArr;
            // this code selects all the fields in the input description and input value
            var fields = document.querySelectorAll(DOMStrings.inputDescription + ' ,' + DOMStrings.inputValue);

            // convert a list to an array -  takes the ARRAY function constructor and tricks the slice method into thinking we gave it an array
               var fieldsArr = Array.prototype.slice.call(fields)
            // the forEach method has access to the following parameters
            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            });

            // sets the focus back to the description
            fieldsArr[0].focus();
        },

        displayBudget: function(obj){

            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMStrings.expenseLabel).textContent = obj.totalExp;

            if (obj.percentage > 0 ){
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';

            }
        },


        // this method has now made domstring a public method so it can be passed into the other controllers
        getDOMStrings: function(){
            return DOMStrings;
        },
    }
})();


// Global App Controller module


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

    var updateBudget = function(){

    // 1. calculate the budget
        budgetCtrl.calculateBudget();

    // 2. Returns the budget

    var budget = budgetCtrl.getBudget();


    // 3. display the budget
       UICtrl.displayBudget(budget);

    };

    var ctrlAddItem = function(){
        var input, newItem;

    // 1. get the filed input data
       var input = UICtrl.getInput();
        // if the input description is not empty and is not NAN
       if (input.description !== "" && !isNaN(input.value) && input.value > 0 ){

            // 2. add the item to the budget controller
                var newItem = budgetCtrl.addItem(input.type, input.description,input.value);

            // 3. add the item to the ui
                UICtrl.addListItem(newItem,input.type);

            // 4. clear the fields
                UICtrl.clearFields();

            // 5. Calculate and update the budget

            updateBudget();
       }




    };

    return {
        init: function(){
            setUpEventListeners();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            console.log("app started");
        }

    };



})(budgetController, UIController);

controller.init();