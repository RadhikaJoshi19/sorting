let stack = [];
let isSorting = false;
let speed = 1000;

// Switch to stack input
document.getElementById('submit-elements').onclick = function () {
    const numElements = document.getElementById('num-elements').value;
    if (numElements >= 5 && numElements <= 8) {
        document.querySelector('.controls').classList.add('hidden');
        document.getElementById('stack-input').classList.remove('hidden');
    } else {
        alert('Please enter a valid number of elements between 5 and 8.');
    }
};

// Accept stack input and show visualization
document.getElementById('start-sorting').onclick = function () {
    const values = document.getElementById('stack-values').value.split(',').map(Number);
    if (values.length >= 5 && values.length <= 8) {
        stack = values;
        document.getElementById('stack-input').classList.add('hidden');
        document.getElementById('visualization').classList.remove('hidden');
        renderStack();
        displayStatus([], [], stack);
    } else {
        alert('Enter exactly 5 to 8 numbers.');
    }
};

// Render stack
function renderStack() {
    const stackContainer = document.getElementById('stack-container');
    stackContainer.innerHTML = '';
    stack.forEach((value) => {
        const element = document.createElement('div');
        element.classList.add('stack-element');
        element.textContent = value;
        stackContainer.appendChild(element);
    });
}

// Display comparing, swapping, and sorted arrays
function displayStatus(comparing, swapping, sorted) {
    const statusContainer = document.getElementById('status-container');
    if (!statusContainer) {
        const newStatusContainer = document.createElement('div');
        newStatusContainer.id = 'status-container';
        document.body.appendChild(newStatusContainer);
    }

    document.getElementById('status-container').innerHTML = `
        <p><strong>Comparing:</strong> [${comparing.join(', ')}]</p>
        <p><strong>Swapping:</strong> [${swapping.join(', ')}]</p>
        <p><strong>Sorted:</strong> [${sorted.join(', ')}]</p>
    `;
}

// Bubble sort logic
async function bubbleSort() {
    isSorting = true;
    const sortedElements = [];

    for (let i = 0; i < stack.length - 1; i++) {
        for (let j = 0; j < stack.length - i - 1; j++) {
            const elements = document.querySelectorAll('.stack-element');

            // Highlight comparing elements
            elements[j].classList.add('comparing');
            elements[j + 1].classList.add('comparing');
            displayStatus([stack[j], stack[j + 1]], [], sortedElements);
            await delay(speed);

            if (stack[j] > stack[j + 1]) {
                // Highlight all elements during swapping
                elements.forEach((el) => el.classList.add('swapping'));

                // Swap elements in the stack
                [stack[j], stack[j + 1]] = [stack[j + 1], stack[j]];

                // Update visualization and status
                renderStack();
                displayStatus([], [stack[j], stack[j + 1]], sortedElements);

                await delay(speed);

                // Remove swapping highlight
                elements.forEach((el) => el.classList.remove('swapping'));
            }

            // Remove comparing highlight
            elements[j].classList.remove('comparing');
            elements[j + 1].classList.remove('comparing');
        }

        // Mark the sorted element
        sortedElements.unshift(stack[stack.length - i - 1]);
        renderStack();
        displayStatus([], [], sortedElements);
    }

    // Mark the last remaining element as sorted
    sortedElements.unshift(stack[0]);
    renderStack();
    displayStatus([], [], sortedElements);
    isSorting = false;
}

// Start button
document.getElementById('start').onclick = async function () {
    if (!isSorting) await bubbleSort();
};

// Pause button
document.getElementById('pause').onclick = function () {
    isSorting = false;
};

// Restart button
document.getElementById('restart').onclick = function () {
    location.reload();
};

// Speed selector
document.getElementById('speed').onchange = function () {
    speed = 1000 / this.value;
};

// Delay function
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
