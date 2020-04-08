// const wsUrl = "ws://localhost:5000/ws";

export default class ChatBus {
  private ws: WebSocket;

  constructor(url: string) {
    this.ws = new WebSocket(url);
    const self = this;
    this.ws.onerror = function (event): any {
      self.subscribers["error"].forEach(cb => {
        cb({});
      });
    };
    this.ws.onopen = function (event): any {
      self.subscribers["open"].forEach(cb => {
        cb({});
      });
    };
    this.ws.onmessage = function (event): any {
      const data = JSON.parse(event.data);
      // data をpublishする。
      (self.subscribers[data.type] || []).forEach(cb => {
        cb(data.msg);
      });
    };
  }

  public busList() {
    this.ws.send(
      JSON.stringify({
        type: "bus_list",
        msg: ""
      })
    );
  }

  public hitchhickerList() {
    this.ws.send(
      JSON.stringify({
        type: "hitchhicker_list",
        msg: ""
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
