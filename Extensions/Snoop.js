function snoopObject(object) {
    // Check if the input is an object
    if (typeof object !== 'object' || object === null) {
        console.error('Input is not an object.');
        return;
    }

    // Log properties
    console.log('Properties:');
    for (let property in object) {
        console.log(`- ${property}: ${object[property]}`);
    }

    // Log methods
    console.log('\nMethods:');
    for (let method in object) {
        if (typeof object[method] === 'function') {
            console.log(`- ${method}`);
        }
    }
}
function snoopMethods(object) {
    // Check if the input is an object
    if (typeof object !== 'object' || object === null) {
        console.error('Input is not an object.');
        return;
    }

    // Log methods
    console.log('\nMethods:');
    for (let method in object) {
        if (typeof object[method] === 'function') {
            console.log(`- ${method}`);
        }
    }
}
function snoopProperties(object) {
    // Check if the input is an object
    if (typeof object !== 'object' || object === null) {
        console.error('Input is not an object.');
        return;
    }

    // Log properties
    console.log('Properties:');
    for (let property in object) {
        console.log(`- ${property}: ${object[property]}`);
    }
}