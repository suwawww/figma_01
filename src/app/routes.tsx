import { createHashRouter } from "react-router";
import { LoginPage } from "./pages/login";
import { DashboardLayout } from "./components/dashboard-layout";
import { HomePage } from "./pages/home";
import { MedicalNetworkPage } from "./pages/medical-network";
import { HealthKnowledgePage } from "./pages/health-knowledge";
import { HealthProfilePage } from "./pages/health-profile";
import { OnlineConsultationPage } from "./pages/online-consultation";
import { ConsultationSelectionPage } from "./pages/consultation-selection";
import { MedicineBoxPage } from "./pages/medicine-box";
import { CommunityActivitiesPage } from "./pages/community-activities";
import { NotFoundPage } from "./pages/not-found";
import { ArticleDetailPage } from "./pages/article-detail";
import { AccountFamilyPage } from "./pages/account-family";
import { ActivityDetailPage } from "./pages/activity-detail";

export const router = createHashRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "medical-network", element: <MedicalNetworkPage /> },
      { path: "health-knowledge", element: <HealthKnowledgePage /> },
      { path: "health-knowledge/article/:id", element: <ArticleDetailPage /> },
      { path: "health-profile", element: <HealthProfilePage /> },
      { path: "online-consultation", element: <OnlineConsultationPage /> },
      { path: "consultation-selection", element: <ConsultationSelectionPage /> },
      { path: "medicine-box", element: <MedicineBoxPage /> },
      { path: "community-activities", element: <CommunityActivitiesPage /> },
      { path: "community-activities/:id", element: <ActivityDetailPage /> },
      { path: "account-family", element: <AccountFamilyPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);