import { QueryClient, QueryClientProvider } from "react-query";
import NavBar from "./components/NavBar";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Darkmode from "./components/hooks/Darkmode";
import Countries from "./components/CountryDisplay";
import Country from "./components/CountryDetailPage";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="Countrydetails/:name" element={<Country />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
