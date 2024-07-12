class Message {
   constructor(name, commands){
      this.name = name;
      if(!name){
         throw Error("Name is requered.")
      }
      this.commands = commands;
   }
}

module.exports = Message;