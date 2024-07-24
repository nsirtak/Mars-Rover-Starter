const Message = require("./message");

class Rover {
   constructor(position, mode="NORMAL", generatorWatts=110) {
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }
 
   receiveMessage(message) { // interprete communication from command
      let response = {
         message : message.name,
         results : []
      }

      for (let i=0; i<message.commands.length; i++) { // determines command and pushes appropriate messages to results
         if (message.commands[i].commandType === "STATUS_CHECK") { 
            response.results.push(
               {
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position,
                  }
               })
         } else if (message.commands[i].commandType === "MODE_CHANGE") { 
            response.results.push(
               {
               completed: true
               }
            )
            this.mode = message.commands[i].value
            } else if (message.commands[i].commandType === "MOVE") {  
               if (this.mode === "NORMAL") {
                  response.results.push( // pushes "NORMAL" to results 
                     {
                     completed: true
                     }
                  )
                this.position = message.commands[i].value; }
                else if (this.mode === "LOW_POWER") { 
                  response.results.push( // pushes "LOW_POWER" to results (no movement possible)
                     {
                     completed: false
                     }
                  )
                }
            } 
         }
      return response;
   }
}

module.exports = Rover;