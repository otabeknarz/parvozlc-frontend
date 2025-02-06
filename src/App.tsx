import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import SATPage from "@/pages/sat.tsx";
import ProgramPage from "@/pages/program.tsx";
import ConsultationPage from "@/pages/consultation.tsx";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} index={true} path="/" />
      <Route element={<SATPage />} index={true} path="/sat" />
      <Route element={<ProgramPage />} index={true} path="/program" />
      <Route element={<ConsultationPage />} index={true} path="/consultation" />
    </Routes>
  );
}

export default App;
