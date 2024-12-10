const inquirer = require('inquirer');
const consola = require('consola')

enum Action {
    List = "list",
    Add = "add",
    Remove = "remove",
    Quit = "quit"
  }

  enum MessageVariant {
    Success = 'success',
    Error = 'error',
    Info = 'info',
  }

  interface User {
    name: string;
    age: number;
  }
  
  type InquirerAnswers = {
    action: Action
  }

class Message {
    private content: string;
  
    constructor(content: string) {
      this.content = content;
    }
  
    public show(): void {
      console.log(this.content);
    }
  
    public capitalize(): void {
      this.content = this.content.charAt(0).toUpperCase() + this.content.slice(1).toLowerCase();
    }
  
    public toUpperCase(): void {
      this.content = this.content.toUpperCase();
    }
  
    public toLowerCase(): void {
      this.content = this.content.toLowerCase();
    }
  
    static showColorized(variant: MessageVariant, text: string): void {
      switch (variant) {
        case MessageVariant.Success:
          consola.success(text);
          break;
        case MessageVariant.Error:
          consola.error(text);
          break;
        case MessageVariant.Info:
          consola.info(text);
          break;
        default:
          console.error('Unsupported color variant');
      }
    }
  };


class UsersData {
  private data: User[] = [];

  public showAll(): void {
    Message.showColorized(MessageVariant.Info, 'Users data');
    if (this.data.length > 0) {
      console.table(this.data);
    } else {
      console.log('No data...');
    }
  }

  public add(user: User): void {
    if (this.isValidUser(user)) {
      this.data.push(user);
      Message.showColorized(MessageVariant.Success, 'User has been successfully added!');
    } else {
      Message.showColorized(MessageVariant.Error, 'Wrong data!');
    }
  }

  public remove(userName: string): void {
    const userIndex = this.data.findIndex(user => user.name === userName);
    if (userIndex !== -1) {
      this.data.splice(userIndex, 1);
      Message.showColorized(MessageVariant.Success, 'User deleted!');
    } else {
      Message.showColorized(MessageVariant.Error, 'User not found...');
    }
  }

  private isValidUser(user: User): boolean {
    return user.age > 0 && user.name.length > 0;
  }
}

const users = new UsersData();

console.log("\n");
console.info("???? Welcome to the UsersApp!");
console.log("====================================");
Message.showColorized(MessageVariant.Info, "Available actions");
console.log("\n");
console.log("list – show all users");
console.log("add – add new user to the list");
console.log("remove – remove user from the list");
console.log("quit – quit the app");
console.log("\n");

const startApp = () => {
    inquirer.prompt([{
      name: 'action',
      type: 'input',
      message: 'How can I help you?',
    }]).then(async (answers: InquirerAnswers) => {
      switch (answers.action) {
        case Action.List:
          users.showAll();
          break;
        case Action.Add:
          const user = await inquirer.prompt([{
            name: 'name',
            type: 'input',
            message: 'Enter name',
          }, {
            name: 'age',
            type: 'number',
            message: 'Enter age',
          }]);
          users.add(user);
          break;
        case Action.Remove:
          const name = await inquirer.prompt([{
            name: 'name',
            type: 'input',
            message: 'Enter name',
          }]);
          users.remove(name.name);
          break;
        case Action.Quit:
          Message.showColorized(MessageVariant.Info, "Bye bye!");
          return;
      }
  
      startApp();
    });
  }

startApp();