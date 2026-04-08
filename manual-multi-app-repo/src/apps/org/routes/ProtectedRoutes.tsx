import { Route, Routes } from "react-router-dom";
import ModelCatalog from "../pages/models/ModelCatalog";

const ProtectedRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ModelCatalog />} />
    </Routes>
  );
};

export default ProtectedRoutes;
