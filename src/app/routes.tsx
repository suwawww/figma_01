import { createHashRouter } from "react-router";
import { LoginPage } from "./pages/login";
import { DashboardLayout } from "./components/dashboard-layout";
import { HomePage } from "./pages/home";
import { MedicalNetworkPage } from "./pages/medical-network";
import { HealthServicesPage } from "./pages/health-services";
import { HealthKnowledgePage } from "./pages/health-knowledge";
import { MemberManagementPage } from "./pages/member-management";
import { HealthProfilePage } from "./pages/health-profile";
import { OnlineConsultationPage } from "./pages/online-consultation";
import { ConsultationSelectionPage } from "./pages/consultation-selection";
import { MedicineBoxPage } from "./pages/medicine-box";
import { CommunityActivitiesPage } from "./pages/community-activities";
import { NotFoundPage } from "./pages/not-found";

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
      { path: "health-services", element: <HealthServicesPage /> },
      { path: "health-knowledge", element: <HealthKnowledgePage /> },
      { path: "member-management", element: <MemberManagementPage /> },
      { path: "health-profile", element: <HealthProfilePage /> },
      { path: "online-consultation", element: <OnlineConsultationPage /> },
      { path: "consultation-selection", element: <ConsultationSelectionPage /> },
      { path: "medicine-box", element: <MedicineBoxPage /> },
      { path: "community-activities", element: <CommunityActivitiesPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
