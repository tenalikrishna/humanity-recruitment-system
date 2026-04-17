import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import SchoolProjectsPage from "@/pages/school-projects";
import CCIProgramsPage from "@/pages/cci-programs";
import DonationPage from "@/pages/donate";
import VolunteerPage from "@/pages/volunteer";
import ImpactStoriesPage from "@/pages/impact-stories";
import CXOProfilePage from "@/pages/cxo-profile";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/School-AI-program" component={SchoolProjectsPage} />
      <Route path="/CCI-programs" component={CCIProgramsPage} />
      <Route path="/donate" component={DonationPage} />
      <Route path="/volunteer" component={VolunteerPage} />
      <Route path="/impact" component={ImpactStoriesPage} />
      <Route path="/leadership" component={CXOProfilePage} />
      {/* Partner with us - dedicated shareable URL */}
      <Route path="/partner-with-us">{() => <Redirect to="/School-AI-program?partner=true" />}</Route>
      {/* Redirects for old URLs */}
      <Route path="/school-projects">{() => <Redirect to="/School-AI-program" />}</Route>
      <Route path="/cci-programs">{() => <Redirect to="/CCI-programs" />}</Route>
      <Route path="/impact-stories">{() => <Redirect to="/impact" />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
