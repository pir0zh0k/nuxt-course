interface Route {
  name: string;
  url: string;
  icon: string;
}

export const AdminRoutes: Route[] = [
  {
    name: "Статистика",
    url: "/admin/statistic",
    icon: "fa6-solid:chart-line",
  },
  {
    name: "Видео",
    url: "/admin/video",
    icon: "fa6-solid:video",
  },
];
