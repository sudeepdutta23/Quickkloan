import { lazy, Suspense } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home, ServicePage, Blogs, BlogDetails, AboutUs } from "../pages";
import { usePreLoginState } from "../hooks/Store";
import { CONFIG } from "../config";
import { isFeatureActive } from "../utils";
import { PreLoginContextInterface } from "../store";
import { Loader } from "../components";
import { Protected, Public } from "../HOC";

// Lazy Loading
const Login = lazy(() => import("../pages/Admin/Login"));
const UploadDocuments = lazy(() => import("../pages/UploadDocuments"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const DashboardHome = lazy(() => import("../pages/Dashboard/Childs/Home"));
const CompleteForm = lazy(() => import("../pages/CompleteForm"));
const MainApplicationForm = lazy(() => import("../pages/MainApplicationForm"));
const AdminDashboard = lazy(() => import("../pages/Admin/Dashboard"));
const Leads = lazy(() => import("../pages/Admin/Leads"));
const AdminBlog = lazy(() => import("../pages/Admin/Blogs"));
const AboutUsAdmin = lazy(() => import("../pages/Admin/AboutUsAdmin"));
const AdminHome = lazy(() => import("../pages/Admin/Home"));
const LeadDetails = lazy(() => import("../pages/Admin/LeadDetails"));
const Services = lazy(() => import("../pages/Admin/Services"));
const Master = lazy(() => import("../pages/Admin/Master"));
const HomeBanner = lazy(() => import("../pages/Admin/HomeBanner"));

const RoutesWrapper = () => {
  const { blogFeatureId } = CONFIG;

  const {
    state: { feature },
  }: PreLoginContextInterface = usePreLoginState();

  return (
    <HashRouter>
      <Suspense fallback={<Loader isFullPage />}>
        <Routes>
          <Route
            path="/"
            element={
              <Public type="User">
                <Home />
              </Public>
            }
          />
          <Route
            path="/aboutUs"
            element={
              <Public type="User">
                <AboutUs />
              </Public>
            }
          />
          {isFeatureActive(feature, blogFeatureId) ? (
            <>
              <Route
                path="/blogs"
                element={
                  <Public type="User">
                    <Blogs />
                  </Public>
                }
              />
              <Route
                path="/blogs/:blogId"
                element={
                  <Public type="User">
                    <BlogDetails />
                  </Public>
                }
              />
            </>
          ) : null}
          <Route
            path="/services/:id"
            element={
              <Public type="User">
                <ServicePage />
              </Public>
            }
          />
          <Route
            path="/adminLogin"
            element={
              <Public type="Admin">
                <Login />
              </Public>
            }
          />
          <Route
            path="/uploadDocuments/:fullParam"
            element={<UploadDocuments />}
          />

            <Route
              path="/dashboard"
              element={
                <Protected type="User">
                  <Dashboard />
                </Protected>
              }
            >
              <Route
                path="home"
                element={
                    <DashboardHome />
                }
              />
              <Route
                path="appFlow"
                element={
                    <MainApplicationForm />
                }
              />
              <Route
                path="leads/:data"
                element={
                    <CompleteForm />
                }
              />
            </Route>
          <Route
            path="/admin"
            element={
              <Protected type="Admin">
                <AdminDashboard />
              </Protected>
            }
          >
            <Route path="getAllLeads/:param" element={<Leads />} />
            <Route path="master" element={<Master />} />
            {isFeatureActive(feature, blogFeatureId) && (
              <Route path="blogs" element={<AdminBlog />} />
            )}
            <Route path="services" element={<Services />} />
            <Route path="aboutUs" element={<AboutUsAdmin />} />
            <Route path="banner" element={<HomeBanner />} />
            <Route
              path="leads/:leadId"
              element={<LeadDetails isAdmin={true} />}
            />
            <Route path="home" element={<AdminHome />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default RoutesWrapper;
