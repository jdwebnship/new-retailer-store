import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";
import { Contact } from "lucide-react";
import Contacts from "../pages/Contacts";
import NotFound from "../pages/NotFound";

// Lazy-loaded routes
const About = lazy(() => import("../pages/About"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const Home = lazy(() => import("../pages/Home"));
const MyAccount = lazy(() => import("../pages/MyAccount"));
const OrderFailure = lazy(() => import("../pages/OrderFailure"));
const OrderSuccess = lazy(() => import("../pages/OrderSuccess"));
const Payment = lazy(() => import("../pages/Payment"));
const Product = lazy(() => import("../pages/Product"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const Shop = lazy(() => import("../pages/Shop"));
const SignIn = lazy(() => import("../pages/SignIn"));
const SignUp = lazy(() => import("../pages/SignUp"));
const Faq = lazy(() => import("../pages/Faq"));
const Terms = lazy(() => import("../pages/Terms"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const Support = lazy(() => import("../pages/Support"));

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

const GuestRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <Routes>
        {/* Guest-only routes */}
        <Route
          path="/signin"
          element={
            <GuestRoute>
              <SignIn />
            </GuestRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <SignUp />
            </GuestRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <GuestRoute>
              <ForgotPassword />
            </GuestRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <GuestRoute>
              <ResetPassword />
            </GuestRoute>
          }
        />

        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Product />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/categories" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/terms-use" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/support" element={<Support />} />
        <Route path="/contact" element={<Contacts />} />

        {/* Protected routes */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-account"
          element={
            <ProtectedRoute>
              <MyAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-failure"
          element={
            <ProtectedRoute>
              <OrderFailure />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contacts />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
