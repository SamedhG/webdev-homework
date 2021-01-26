(function() {
    "use strict";
    // The available functions: 
    // NOTE: ID of the function is where it appears in this list
    const funcs = ["+/=", "-", "*", "/"]

    // The state of the calculator
    let state = {
        // The currently selected function
        curr_func: 0,
        // The number currently in memory
        curr_num: 0,
        // Was the decimal point already added?
        dec: false,
        // Are we ready to start taking the next number?
        next_num: false
    }

    /**
     * This is called when a number button is pressed
     * int n: the digit that was pressed
     */
    function num(n) {
        let display = document.getElementById('display');
        if(state.next_num) {
            display.innerText = n
            state.next_num = false;
        }
        else if (display.innerText.length <= 10) {
            display.innerText = display.innerText + n
        }
    }

    /**
     * This is called when one of the function buttons are pressed
     * int n: Represents the id of the operator that was pressed.
     */
    function fun(n) {
        let display = document.getElementById('display');
        if (!state.next_num) {
            let num = parseFloat(display.innerText);
            switch(state.curr_func) {
                case 0:
                    state.curr_num = state.curr_num + num;
                    break;
                case 1:
                    state.curr_num = state.curr_num - num;
                    break;
                case 2:
                    state.curr_num = state.curr_num * num;
                    break;
                case 3:
                    state.curr_num = state.curr_num / num;
                    break;
                default: 
                    alert("error")
            }
            display.innerText = state.curr_num;
        }
        state.next_num = true;
        document.getElementById(funcs[state.curr_func]).className = "button";
        document.getElementById(funcs[n]).className = "selected_button";
        state.curr_func = n;
    }

    /**
     * This is called when the clear button is pressed
     * Resets the state of the calculator
     */
    function clear() {
        state.dec = false;
        state.curr_num = 0;
        state.next_num = false;
        state.curr_func = 0;
        for (let i = 0; i < 4; i++) {
            document.getElementById(funcs[i]).className = "button";
        }
        document.getElementById('display').innerText = "";
    }
   
    /**
     * This called when the decimal button is pressed:
     *  makes sure that the decimal button was not previously pressed.
     */
    function decimal() {
        if (!state.dec) num(".")
        state.dec = true;
    }


    /**
     * Called onLoad and creates all the buttons needed for the calculator
     */
    function setup_calc () {
        let main = document.getElementById('calc');
        // The bottom row added manually
        // The clear button
        let button = document.createElement("DIV");
        button.innerHTML = "C";
        button.className = "button";
        button.addEventListener('click', clear, false); 
        main.appendChild(button);
        // The 0 button
        button = document.createElement("DIV");
        button.innerHTML = 0;
        button.className = "button";
        button.addEventListener('click', () => num(0), false); 
        main.appendChild(button);
        // The decimal button
        button = document.createElement("DIV");
        button.innerHTML = ".";
        button.className = "button";
        button.addEventListener('click', decimal, false); 
        main.appendChild(button);
        // The plus function
        button = document.createElement("DIV");
        button.innerHTML = funcs[0];
        button.id = funcs[0];
        button.className = "button";
        button.addEventListener('click', () => fun(0), false); 
        main.appendChild(button);
        // Adding all the other buttons
        for (let i = 1; i <=9; i++) {
            let button = document.createElement("DIV");
            button.innerHTML = i;
            button.className = "button";
            button.addEventListener('click', () => num(i), false); 
            main.appendChild(button);
            if (i % 3 == 0) {
                let button = document.createElement("DIV");
                button.innerHTML = funcs[i/3];
                button.id = funcs[i/3];
                button.className = "button";
            button.addEventListener('click', () => fun(i/3), false); 
                main.appendChild(button);
            }
        }
    }

    window.addEventListener('load', setup_calc, false);
})()
