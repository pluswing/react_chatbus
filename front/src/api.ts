export default class ChatBus {
  private ws: WebSocket;

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
    this.send("chat", message);
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
    this.ws.send(
      JSON.stringify({
        type,
        msg
      })
    );
  }
  // TODO keyをunion typeにする
  //  | ....

  private subscribers: {
    [key: string]: Array<(data: any) => void>;
  } = {};
  public subscribe(eventName: string, callback: (data: any) => void): void {
    if (!this.subscribers[eventName]) {
      this.subscribers[eventName] = [];
    }
    this.subscribers[eventName].push(callback);
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
