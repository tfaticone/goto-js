/**
 * Created by thomas on 4/23/17.
 */
/**
 * Description: goto-js is a minimalistic library that enables
 * a fade-in-fade-out or linear transition from one x,y coordinate
 * to another via javascript without the need for css.
 *
 * @author: Thomas Faticone <tjf4881@rit.edu>
 */


/**
 * Calculates the current position using a fade-in-fade-out transition. This
 * is based on a modified sine function with currentStep in the x-axis
 * and position in the y-axis.
 *
 * @param xi The beginning position.
 * @param xf The final position
 * @param currentStep Current step
 * @param totalSteps The total amount of steps
 * @returns the current position
 */
function stepSmooth(xi, xf, currentStep, totalSteps) {
    return .5 * (xf - xi) * (Math.sin(((Math.PI * currentStep)/ totalSteps) - (Math.PI/2)) + 1) + xi
}

/**
 * Calculates the current position using a linear transition. This uses
 * a simple linear function that using current step on the x-axis and position
 * on the y-axis.
 *
 * @param xi The beginning position.
 * @param xf The final position
 * @param currentStep Current step
 * @param totalSteps The total amount of steps
 * @returns the current position
 */
function stepLinear(xi, xf, currentStep, totalSteps) {
    return (currentStep/ totalSteps) * (xf - xi) + xi;
}

/**
 * Gets the current x any y position of the user on the page.
 *
 * @returns {{x: number, y: number}} The current x,y coordinates of the user
 */
function getScrollPosition(){
    var doc = document.documentElement;
    var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

    return {x: left, y: top};
}

/**
 * This function enables the 'looping' within the scrolling. It calculates
 * the interval and within every interval it calls the function to calculate
 * the next position then scrolls to it. It also makes sure to clear the timer
 * based on the current step.
 *
 * @param xi The initial x position
 * @param xf The final x position
 * @param yi The initial y position
 * @param yf The final y position
 * @param time Duration of the scrolling in milliseconds
 * @param totalSteps Number of steps in order to complete scrolling
 * @param algorithm Either linear or fadeInFadeOut, type of transition
 */
function setTimer(xi, xf, yi, yf, time, totalSteps, algorithm){

    var interval = time/totalSteps,     //Calculate the interval
        currentStep = 0,
        timer = null;

    timer = window.setInterval(_ => {
            if(algorithm == 'fadeInfadeOut'){ //Use the fadeInFadeOut algorithm
        var xStep = stepSmooth(xi, xf, currentStep, totalSteps);
        var yStep = stepSmooth(yi, yf, currentStep, totalSteps);
    } else if (algorithm == 'linear'){ //Use the linear algorithm
        var xStep = stepLinear(xi, xf, currentStep, totalSteps);
        var yStep = stepLinear(yi, yf, currentStep, totalSteps);
    }
    window.scrollTo(xStep, yStep);  //scroll to the calculated position
    currentStep++;

    if(currentStep >= totalSteps) { //Clear interval if currentSteps reached
        clearInterval(timer);
        timer = null;
    }
},interval);
}

/**
 * The entry point for goTo. Sets the defaults (if not provided) and
 * and calls the function to set the timer.
 *
 * @param xf Finishing x-coordinate
 * @param yf Finishing y-coordinate
 * @param time Duration of the transition (in milliseconds)
 * @param options All other optional requirements. If not provided they
 * fall back to defaults
 *
 * Defaults:
 * smooth: fadeInfadeOut
 * xi: initial x-position, the current position
 * yi: initial y-position, the current position
 * totalSteps: Based on time multiplied by 30(fps)
 * element: No default, but allows the insertion of an DOM element
 * to scroll to the elements position
 */
function goTo(xf, yf, time, options = {}) {
    //Set the defaults
    options.smooth = (!options.smooth) ? 'fadeInfadeOut' : options.smooth;
    options.xi = (!options.xi) ? this.getScrollPosition().x : options.xi;
    options.yi = (!options.yi) ? this.getScrollPosition().y : options.yi;
    options.totalSteps = (!options.totalSteps) ? (time/1000) * 60 : options.totalSteps;

    //Set the coordinates if end point is a defined element
    if(options.element){
        var boundingRectangle = options.element.getBoundingClientRect();
        xf = boundingRectangle.left;
        yf = boundingRectangle.top;
    }

    this.setTimer(
        options.xi,
        xf,
        options.yi,
        yf,
        time,
        options.totalSteps,
        options.smooth);
}

module.exports.goTo = goTo;