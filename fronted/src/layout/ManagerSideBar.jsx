
const  ManagerSideBar = [
  {
    tittle: "Main menu",
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: "Home page",
        hasSubRoute: false,
        showSubRoute: false,
        route: "/adminDashboard",
        icon: "la la-user",
      },
      {
        menuValue: "Your employees",
        hasSubRoute: false,
        showSubRoute: false,
        route: "/employees",
        icon: "la la-users",
      },
      {
        menuValue: 'Notifications',
        hasSubRoute: false,
        showSubRoute: false,
        route: "/notifications",
        icon: "las la-bell",
        // style: getMenuItemStyle('Upcoming events'),
      },
      {
        menuValue: "Upcoming events",
        hasSubRoute: false,
        showSubRoute: false,
        route: "/upcoming-events",
        icon: "la la-ticket",
      },
      {
        menuValue: "Company events",
        hasSubRoute: false,
        showSubRoute: false,
        route: "/company-events",
        icon: "las la-bell",
      },

      {
        menuValue: "Personalized gifts",
        hasSubRoute: false,
        showSubRoute: false,
        route: "#",
        icon: "la la-dashcube",
      },
      {
        menuValue: "Calendar",
        hasSubRoute: false,
        showSubRoute: false,
        route: "/calendar",
        icon: "la la-calendar",

      },
      {
        menuValue: "Wallet",
        hasSubRoute: false,
        showSubRoute: false,
        route: "/wallet",
        icon: "la la-dashcube",
      },
      {
        menuValue: "To do list",
        hasSubRoute: false,
        showSubRoute: false,
        route: "#",
        icon: "la la-list",
      },

      {
        menuValue: "Useful info",
        hasSubRoute: false,
        showSubRoute: false,
        route: "#",
        icon: "la la-info",
      },
    ],
  },
];
export default ManagerSideBar;
