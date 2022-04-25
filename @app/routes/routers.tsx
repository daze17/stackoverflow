import _ from "lodash";

// interface 
interface RouteProps {
  [index: string]: RoutePropsItems

}
interface RoutePropsItems {
  route: string;
  fallback?: string;
  title?: string;
}
// - HELPER
const getRoutes = (n: any) =>
  Object.keys(n).reduce((p: any, key: any) => {
    const childRoutes = Object.keys(n[key]).reduce((childP: any, childKey: any) => {
      if (_.get(n[key], "route")) {
        return [...childP, n[key]];
      }
      return [...childP, n[key][childKey]];
    }, []);
    return [...p, ...childRoutes];
  }, []);


const AdditionalRoutes: RouteProps = {
  Home: {
    route: "/about",
    fallback: "/",
    title: "About",
  },
  UserList: {
    route: "/products",
    fallback: "/",
    title: "Products",
  },
  UserAdd: {
    route: "/forteams",
    fallback: "/",
    title: "For teams",
  },
  BookList: {
    route: "/login",
    fallback: "/",
    title: "Login",
  },
  BookAdd: {
    route: "/register",
    fallback: "/",
    title: "Register",
  },
};

const MainRoutes: RouteProps = {
  Home: { route: "/", fallback: "/", title: "Home" },
  Questions: { route: "/questions", fallback: "/", title: "Questions list" },
  QuestionsDetail: { route: "/questions/[id]", fallback: "/questions", title: "Questions Detail" },
  Tags: { route: "/tags", fallback: "/", title: "Tags" },
  Users: { route: "/users", fallback: "/", title: "User list" },
  Companies: { route: "/companies", fallback: "/", title: "Companies" },
};

const romuRoutes = [AdditionalRoutes, MainRoutes].reduce(
  (p: any, n: any) => [...p, ...getRoutes(n)],
  []
);

const Routes = {
  Main: MainRoutes,
  Additainal: AdditionalRoutes,
  get: (route: string, params: any) => {
    let _route = route;
    if (params) {
      Object.keys(params).forEach((paramKey) => {
        _route = _route.replace(`[${paramKey}]`, params[paramKey]);
      });
    }
    return _route;
  },
  getRoute: (route: string) => {
    const AdminPages = getRoutes(MainRoutes);
    const _route = AdminPages.find((r) => r.route === route);
    return _route;
  },
  getTitle: (route: string) => {
    const _route = romuRoutes.find((r) => r.route === route);
    if (_route) return _route.title;
    return "Stack overflow";
  },
  isMain: (route: string) => {
    const landingPages = getRoutes(MainRoutes);
    const _route = landingPages.find((r) => r.route === route);
    return _route;
  },
  isAdditional: (route: string) => {
    const adminPages = getRoutes(AdditionalRoutes);
    const _route = adminPages.find((r) => r.route === route);
    return _route;
  },
};

export default Routes;
