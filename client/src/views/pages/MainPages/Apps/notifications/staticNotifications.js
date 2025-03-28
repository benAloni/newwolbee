import nicole from "../../../../../imgs/avatar_4.JPG";
import jacob from "../../../../../imgs/jacob.jpg";
import john from "../../../../../imgs/avatar_6.JPG";

const today = new Date()
today.toLocaleDateString('en-GB')

const staticNotifications = [
  {
    _id: 11,
    id:1,
    priority: "High",
    priorityNumber: 3,
    message:
      "It's Nicole Miller's birthday tomorrow. Don't forget to send her a gift!",
    fullName: "Nicole",
    link: "/de",
    className: "birthday",
    read: false,
    viewed: false,
    dismissed: false,
    createdAt: new Date(today),
    date: "1996-09-08",
    image: nicole,
  },
  {
    _id: 22,
    id: 2,
    priority: "Medium",
    priorityNumber: 2,
    message:
      "Tomorrow is the international pizza day. View your options for spoiling your team!",
    className: "bg-pink",
    link: "/task-board",
    createdAt: new Date(today),
    date: "1996-09-08",
    read: false,
    dismissed: false,
    viewed: false,
  },
  {
    _id: 33,
    id: 3,
    priority: "High",
    priorityNumber: 3,
    fullName: "Fourth of July",
    message:
      "The Fourth of July celebration is in one month. Ensure there are food options for those with allergies and dietary preferences.",
    createdAt: new Date(today),
    date: "2024-12-08",
    className: "bg-info",
    read: false,
    dismissed: false,
    viewed: false,
  },
  {
    _id: 44,
    id: 4,
    priority: "High",
    priorityNumber: 3,
    message: "Note! A meeting was arranged with Nicole when she is at home",
    link: "/departments",
    createdAt: new Date(today),
    date: "1996-09-08",
    read: false,
    viewed: false,
    dismissed: false,
    image: nicole,
    className: "nicole's-meeting"
  },
  {
    _id: 55,
    id: 5,
    priority: "Medium",
    priorityNumber: 2,
    message:
      "Jacob used over 20 days of sick days in the last quarter. Let him know he has reached his limit.",
    createdAt: new Date(today),
    date: "1996-09-08",
    read: false,
    viewed: false,
    dismissed: false,
    image: jacob,
  },
  {
    _id: 66,
    id: 6,
    priority: "Medium",
    priorityNumber: 2,
    message: "John's work routine has significantly changed.",
    link: "/departments",
    createdAt: new Date(today),
    date: "1996-09-08",
    read: false,
    dismissed: false,
    viewed: false,
    image: john,
    className: "john's-work-routine"
  },
  {
    _id: 77,
    id: 7,
    priority: "Low",
    priorityNumber: 1,
    message:
      "A Maccabi Tel-Aviv Soccer Game is coming up in a week. Wanna find out who from your workers is a fan of the team?",
    link: "/task-board",
    createdAt: new Date(today),
    date: "1996-09-08",
    read: false,
    viewed: false,
    dismissed: false,
    className: "soccer-game"
  },
  {
    _id: 88,
    id: 8,
    priority: "High",
    priorityNumber: 3,
    message:
      "John is flying to rome tomorrow - lets make it a real vacation for him.",
    link: "/low-priority-notification",
    createdAt: new Date(today),
    date: "1996-09-08",
    className: "vacation",
    read: false,
    dismissed: false,
    viewed: false,
    image: john,
  },
];

export default staticNotifications;
