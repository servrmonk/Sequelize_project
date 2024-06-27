import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProduct from "./screens/AddProduct";
import ShowProducts from "./screens/ShowProducts";
import EditProduct from "./screens/EditProduct";
import ProductDetail from "./screens/ProductDetail";

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* switch basically checks that if the patch is exist in ur apk or not */}
        <Route exact path="/addProduct" Component={AddProduct} />
        <Route exact path="/products" Component={ShowProducts} />
        <Route exact path="/product/edit/:id" Component={EditProduct} />
        <Route exact path="/product/:id" Component={ProductDetail} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
