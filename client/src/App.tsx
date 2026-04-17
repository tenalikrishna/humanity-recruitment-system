import { Switch, Route, Redirect, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
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
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import ApplicantsPage from "@/pages/admin/applicants";
import InterviewPage from "@/pages/admin/interview";
import UsersPage from "@/pages/admin/users";
import { AdminAuthProvider } from "@/lib/adminAuth";

function Router() {
  return (
    <Switch>
      {/* Public website */}
      <Route path="/" component={HomePage} />
      <Route path="/School-AI-program" component={SchoolProjectsPage} />
      <Route path="/CCI-programs" component={CCIProgramsPage} />
      <Route path="/donate" component={DonationPage} />
      <Route path="/volunteer" component={VolunteerPage} />
      <Route path="/impact" component={ImpactStoriesPage} />
      <Route path="/leadership" component={CXOProfilePage} />
      <Route path="/partner-with-us">{() => <Redirect to="/School-AI-program?partner=true" />}</Route>
      <Route path="/school-projects">{() => <Redirect to="/School-AI-program" />}</Route>
      <Route path="/cci-programs">{() => <Redirect to="/CCI-programs" />}</Route>
      <Route path="/impact-stories">{() => <Redirect to="/impact" />}</Route>

      {/* Admin / Recruitment portal */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/applicants" component={ApplicantsPage} />
      <Route path="/admin/interview/:id" component={InterviewPage} />
      <Route path="/admin/users" component={UsersPage} />
      <Route path="/admin">{() => <Redirect to="/admin/dashboard" />}</Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AdminAuthProvider>
          <WouterRouter hook={useHashLocation}>
            <Router />
          </WouterRouter>
        </AdminAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
