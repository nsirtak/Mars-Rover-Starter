const Rover = require('./rover.js');
const Command = require('./command.js');
const Message = require('./message.js');


let rover = new Rover("rover", 98382, "NORMAL", 155); 

console.log(`This is rover result: ${rover}`);
console.log(typeof rover);


let commands = [
    new Command('MOVE', 4321),
    new Command('STATUS_CHECK'),
]

let messages = new Message('Test Message with two commands', commands)
let results = [
    {
        completed: true
    },
    {
       completed: true, 
       roverStatus: { mode: 'LOW_POWER', generatorWatts: 110, position: 98382 }
    }
]
console.log(messages);
console.log(results);