type Event = {
  title: string;
  description: string;
  date: string;
  start: string;
  end: string;
  type: "online" | "in-person";
  capacity: number;
  link?: string;
  location?: string;
};

export default Event;
