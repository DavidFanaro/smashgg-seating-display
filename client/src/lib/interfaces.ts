export interface RootObject {
  tournament: Tournament;
}

export interface Tournament {
  name?: string;
  city?: string;
  events?: Event[];
}

interface Event {
  videogame: Videogame;
  sets: Sets;
}

interface Sets {
  nodes: Node[];
}

interface Node {
  fullRoundText: string;
  slots: Slot[];
  station?: Station;
}

interface Station {
  number: number;
}

interface Slot {
  entrant: Videogame;
}

interface Videogame {
  name: string;
}