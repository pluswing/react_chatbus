interface Message {
  sender: string;
  text: string;
}
export type SubscribeType =
  | {
      name: "bus_list";
      callback: (busList: string[]) => void;
    }
  | { name: "hitchhicker_list"; callback: (userList: string[]) => void }
  | { name: "open"; callback: () => void }
  | { name: "error"; callback: () => void }
  | {
      name: "chat";
      callback: (data: Message) => void;
    }
  | { name: "bus_subscribed"; callback: (busName: string) => void }
  | { name: "username"; callback: (userName: string) => void }
  | { name: "username_error"; callback: () => void };

export default class ChatBus {
  private ws: WebSocket;
  private name: string = "";

  constructor(url: string) {
    this.ws = new WebSocket(url);
    const self = this;
    this.ws.onerror = function (_): any {
      self.publish("error", {});
    };
    this.ws.onopen = function (_): any {
      self.publish("open", {});
    };
    this.ws.onmessage = function (event): any {
      const data = JSON.parse(event.data);
      console.log("received:", data);
      self.publish(data.type, data.msg);
    };
  }

  public busList() {
    this.send("bus_list", "");
  }

  public hitchhickerList() {
    this.send("hitchhicker_list", "");
  }

  public chat(message: string) {
    const data = {
      sender: this.name,
      text: message,
    };
    this.send("chat", data);
    this.publish("chat", data);
  }

  public busSubscribed(busName: string) {
    this.send("bus_subscribed", busName);
  }

  public addBus(busName: string) {
    this.send("add_bus", busName);
  }

  public username(name: string) {
    this.send("username", name);
  }

  public terminate() {
    this.send("terminate", "");
  }

  private send(type: string, msg: any): void {
    console.log("send:", {
      type,
      msg,
    });
    this.ws.send(
      JSON.stringify({
        type,
        msg,
      })
    );
  }

  private subscribers: SubscribeType[] = [];
  public subscribe(s: SubscribeType): void {
    this.subscribers.push(s);
  }

  public unsubscribe(s: SubscribeType): void {
    this.subscribers = this.subscribers.filter((v) => v !== s);
  }

  private publish(type: string, message: any): void {
    this.subscribers
      .filter((s) => s.name == type)
      .forEach((s) => s.callback(message));
  }

  public isEmptyName(): boolean {
    return this.name == "";
  }

  public setUserName(name: string): void {
    this.name = name;
  }
}
