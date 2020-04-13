type SubscribeType =
  | {
      name: "bus_list";
      callback: (busList: string[]) => void;
    }
  | { name: "hitchhicker_list"; callback: (userList: string[]) => void }
  | { name: "open"; callback: () => void }
  | { name: "error"; callback: () => void }
  | { name: "chat"; callback: (/* TODO */) => void }
  | { name: "bus_subscribed"; callback: (/* TODO */) => void }
  | { name: "add_bus"; callback: (/* TODO */) => void }
  | { name: "username"; callback: (/* TODO */) => void }
  | { name: "terminate"; callback: (/* TODO */) => void };

export default class ChatBus {
  private ws: WebSocket;
  private name: string = "";

  public isEmptyName(): boolean {
    return this.name == "";
  }

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
    this.send("chat", {
      sender: this.name,
      text: message
    });
  }

  public busSubscribed(busName: string) {
    this.send("bus_subscribed", busName);
  }

  public addBus(busName: string) {
    this.send("add_bus", busName);
  }

  public username(name: string) {
    this.name = name;
    this.send("username", name);
  }

  public terminate() {
    this.send("terminate", "");
  }

  private send(type: string, msg: any): void {
    this.ws.send(
      JSON.stringify({
        type,
        msg
      })
    );
  }

  private subscribers: {
    [key: string]: Array<(data: any) => void>;
  } = {};
  public subscribe(s: SubscribeType): void {
    if (!this.subscribers[s.name]) {
      this.subscribers[s.name] = [];
    }
    this.subscribers[s.name].push(s.callback);
  }

  private publish(type: string, message: any): void {
    (this.subscribers[type] || []).forEach(cb => {
      cb(message);
    });
  }

  /*
      if (e.msg_type=="chat" && (_this.username == "" || _this.username == undefined)){
                         _this.info("Please select a username !");
                     };

                     Message = {
                         type: e.msg_type,
                         msg : e.message
                     };
                     console.log("sending ", Message);
                     _this.ws.send(JSON.stringify(Message));
      */
}
