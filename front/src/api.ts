// const wsUrl = "ws://localhost:5000/ws";

export default class ChatBus {
  private ws: WebSocket;

  constructor(url: string) {
    this.ws = new WebSocket(url);
    this.ws.onerror = this.onError;
    this.ws.onopen = this.onOpen;
    this.ws.onmessage = this.onMessage;
  }

  private onError(this: WebSocket, event: Event): any {}
  private onOpen(this: WebSocket, ev: Event): any {
    /*
    $.event.trigger({
      type: "send_message",
            msg_type: 'bus_list',
            message: ""
        });
        $.event.trigger({
      type: "send_message",
            msg_type: 'hitchhicker_list',
            message: ""
        });
        this.info("Connected to chatBus server ! Please type in username");
      */
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
  private onMessage(this: WebSocket, ev: MessageEvent): any {
    /*
    var Data = JSON.parse(e.data);
             console.log(Data);
             $.event.trigger({
	         type: Data.type,
                 msg: Data.msg
             });
    */
  }
}
