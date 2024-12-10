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
  
  type InquirerAnswers = {
    action: Action
  }

const startApp = () => {
  inquirer.prompt([{
    name: 'action',
    type: 'input',
    message: 'How can I help you?',
  }]).then(async (answers: { action: 'list' | 'add' | 'remove' | 'quit' }) => {
    console.log("Chosen action: " + answers.action);
    startApp();
    if (answers.action === "quit")
      return;
  });
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
  
    public showColorized(variant: MessageVariant, text: string): void {
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
  }

startApp();