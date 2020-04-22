export interface Bus {
  name: string;
  selected: boolean;
}

export interface Hitchhiker {
  name: string;
}

export interface Message {
  text: string;
  sender: string;
}

export type MessageDict = {
  [key: string]: Message[];
};
