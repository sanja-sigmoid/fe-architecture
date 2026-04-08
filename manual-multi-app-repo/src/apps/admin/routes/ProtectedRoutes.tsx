import { Route, Routes } from "react-router-dom";
import ViewPipelines from "../pages/pipelines/ViewPipeline";

const ProtectedRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ViewPipelines />} />
    </Routes>
  );
};

export default ProtectedRoutes;
