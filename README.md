# goto-js
* * *
## Description
goto-js is a minimalistic javascript-based library that enables
the user to have scrolling or goTo functionality with a smoothing
algorithm. The smoothing algorithm can either be linear or a sine-like
smoothing function, similar to that of fadeInfadeOut found in CSS.

* * *

## Installation

The easiest method of installation would be to use npm.
```npm install goto-js```

Otherwise, feel free to do a git clone
```git clone https://github.com/tfaticone/goto-js.git```

* * *

## How to Use
goto-js only has one entry point, the function goTo. In order to use goTo there are only a few basic pieces of information required: the final x and y position and the duration of the transition. There are a set of optional inputs that add some customization to the needs of the user. For example, initial start position, smoothing algorithm, total number of steps, and element are all optional.

#### Basic Format
Just as a reminder the **required** inputs are:
1. Finishing x-coodrinate
2. Finishing y-coordinate
3. Time duration of the transition (in milliseconds)

The **optional** inputs are:
1. The smoothing algorithm (either fadeInfadeOut or linear, default is fadeInfadeOut)
2. Initial x-coordinate (Default is current x position)
3. Initial y-coordinate (Default is current y position)
4. Total Number of 'steps' (increments, default is 60fps * time [in seconds])
5. A DOM element to act as the final location (this will override the final x and y coordinate)


With these in mind the basic format is:
```
var gotojs = require('goto-js');
gotojs.goTo(xf, yf, time, {
    smooth,
    xi,
    yi,
    totalSteps,
    element
});
```

#### Examples
Assuming that
```var gotojs = require('goto-js');```

##### Example 1
In order to go to **(50,100)** from the current position in **2 seconds**, the call would be as follows:
```gotojs.goTo(50, 100, 2000);```

##### Example 2
In order to go from **(25,50)** to **(300,10)** with the duration of the transition being **4 seconds**, the function call would be
```
gotojs.goTo(300, 10, 4000,{
    xi = 25,
    yi = 50
});
```

##### Example 3
In order to go from **(25,50)** to **(300,10)** with the duration of the transition being **4 seconds** within **100 steps**, the function call would be
```
gotojs.goTo(300, 10, 4000,{
    xi = 25,
    yi = 50,
    totalSteps = 100
});
```

##### Example 4
In order to go from **(25,50)** to **(300,10)** with the duration of the transition being **4 seconds** using the **linear algorithm**, the function call would be
```
gotojs.goTo(300, 10, 4000,{
    xi = 25,
    yi = 50,
    smooth = 'linear'
});
```

##### Example 5
In order to go from **(25,50)** to **element button** with the duration of the transition being **4 seconds** using the **linear algorithm**, the function call would be
```
var button = document.querySelector('button');
gotojs.goTo(0, 0, 4000,{
    xi = 25,
    yi = 50,
    element = button
});
```

** As a side note, the final x and y coordinates will be overridden with the x and y coordinates of the element.
* * *
## Contributions
Thomas Faticoone <tjf4881@rit.edu>

Feel free to email with any suggestions.

**Note** This is in early stages. Lots of developement is still to be done.