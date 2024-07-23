const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover", function() {
  //test 7 
  test("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(98382);
    expect(rover.position).toBe(98382);
    expect(rover.mode).toBe("NORMAL");
    expect(rover.generatorWatts).toBe(110);
  });
//test 8 
  test("response returned by receiveMessage contains the name of the message", function() {
    let commands = [new Command("MODE_CHANGE", "LOW_POWER")];
    let message = new Message("Test message", commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.message).toBe("Test message");
  });
//test 9 
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("STATUS_CHECK")];
    let message = new Message("Test message", commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toBe(2);
  });
//test 10 
  test("responds correctly to the status check command", function() {
    let commands = [new Command("STATUS_CHECK")];
    let message = new Message("Test message", commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus.mode).toBe("NORMAL");
    expect(response.results[0].roverStatus.generatorWatts).toBe(110);
    expect(response.results[0].roverStatus.position).toBe(98382);
  });
//test 11 
  test("responds correctly to the mode change command", function() {
    let commands = [new Command("MODE_CHANGE", "LOW_POWER")];
    let message = new Message("Test message", commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(rover.mode).toBe("LOW_POWER");
    expect(response.results[0].completed).toBe(true);
  });
//test 12 
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command("MOVE", 12000)];
    let message = new Message("Test message", commands);
    let rover = new Rover(98382);
    rover.mode = "LOW_POWER";
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(false);
    expect(rover.position).toBe(98382);
  });
  //test 13 
  test("responds with the position for the move command", function() {
    let commands = [new Command("MOVE", 12000)];
    let message = new Message("Test message", commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(rover.position).toBe(12000);
    expect(response.results[0].completed).toBe(true);
  });
});