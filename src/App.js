import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import AdminCategoryPage from "./pages/Admin/AdminCategoryPage";
import AdminCreateCategory from "./pages/Admin/AdminCreateCategory";
import AdminCreateProduct from "./pages/Admin/AdminCreateProduct";
import AdminCreateUser from "./pages/Admin/AdminCreateUser";
import AdminEditCategory from "./pages/Admin/AdminEditCategory";
import AdminEditProduct from "./pages/Admin/AdminEditProduct";
import AdminEditUser from "./pages/Admin/AdminEditUser";
import AdminOrderDetail from "./pages/Admin/AdminOrderDetail";
import AdminOrdersPage from "./pages/Admin/AdminOrdersPage";
import AdminPages from "./pages/Admin/AdminPages";
import AdminProductPage from "./pages/Admin/AdminProductPage";
import AdminUserPage from "./pages/Admin/AdminUserPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import Page404 from "./pages/Page404";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductListUser from "./pages/ProductListUser";
import RegisterPage from "./pages/RegisterPage";
import ShopPage from "./pages/ShopPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfile from "./pages/UserProfile";
import WhistlistPage from "./pages/WhistlistPage";
import { categoriesAction } from "./store/reducers/categoryReducer";
import AlreadyLogin from "./utils/AlreadyLogin";
import ProtectedAdminRoute from "./utils/ProtectedAdminRoute";
import ProtectedUserRoute from "./utils/ProtectedUserRoute";
import RouteWithHeaderAdmin from "./utils/RouteWithHeaderAdmin";
import RouteWithHeaderAndFooter from "./utils/RouteWithHeaderAndFooter";
import ScrollTop from "./utils/ScrollTop";

function App() {
  const dispatch = useDispatch();

  const getCategories = async () => {
    dispatch(categoriesAction.changeLoading(true));
    const { data } = await axios.get("/api/categories");
    return data;
  };
  useEffect(() => {
    getCategories().then((res) => {
      dispatch(categoriesAction.getCategories(res));
      dispatch(categoriesAction.changeLoading(false));
    });
  }, []);
  return (
    <>
      <ScrollTop />
      <Routes>
        <Route element={<ProtectedUserRoute />}>
          <Route element={<RouteWithHeaderAndFooter />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/product-list" element={<ProductListUser />} />
            <Route
              path="/shop/product-list/:pageNumParam"
              element={<ProductListUser />}
            />
            <Route
              path="/shop/product-list/category/:category"
              element={<ProductListUser />}
            />
            <Route
              path="/shop/product-list/category/:category/:pageNumParam"
              element={<ProductListUser />}
            />
            <Route
              path="/shop/product-list/search/:searchQuery"
              element={<ProductListUser />}
            />
            <Route
              path="/shop/product-list/search/:searchQuery/:pageNumParam"
              element={<ProductListUser />}
            />
            <Route
              path="/shop/product-list/category/:category/search/:searchQuery"
              element={<ProductListUser />}
            />
            <Route
              path="/shop/product-list/category/:category/search/:searchQuery/:pageNumParam"
              element={<ProductListUser />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WhistlistPage />} />
            <Route element={<AlreadyLogin />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route
              path="/shop/product-detail/:id"
              element={<ProductDetailPage />}
            />
            <Route path="/user" element={<UserProfile />} />
            <Route path="/user/orders" element={<UserOrdersPage />} />
            <Route
              path="/user/order-detail/:id"
              element={<OrderDetailsPage />}
            />
          </Route>
          <Route path="/checkout/:id" element={<CheckoutPage />} />
        </Route>
        <Route path="*" element={<Page404 />} />

        <Route element={<ProtectedAdminRoute />}>
          <Route element={<RouteWithHeaderAdmin />}>
            <Route
              path="/admin"
              element={<Navigate to={"/admin/dashboard"} replace />}
            />
            <Route path="/admin/dashboard" element={<AdminPages />} />
            <Route path="/admin/users" element={<AdminUserPage />} />
            <Route path="/admin/user/add" element={<AdminCreateUser />} />
            <Route path="/admin/user/edit/:id" element={<AdminEditUser />} />
            <Route path="/admin/products" element={<AdminProductPage />} />
            <Route
              path="/admin/product/create"
              element={<AdminCreateProduct />}
            />
            <Route
              path="/admin/product/edit/:id"
              element={<AdminEditProduct />}
            />
            <Route path="/admin/category" element={<AdminCategoryPage />} />
            <Route
              path="/admin/category/create"
              element={<AdminCreateCategory />}
            />
            <Route
              path="/admin/category/edit/:id"
              element={<AdminEditCategory />}
            />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route
              path="/admin/order-detail/:id"
              element={<AdminOrderDetail />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
