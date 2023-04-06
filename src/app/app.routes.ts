import { Routes } from "@angular/router";

export const AppRoutes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "login",
        loadComponent: () => import("./pages/login/login.component")
    }
]