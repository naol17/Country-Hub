import { QueryClient, QueryClientProvider } from "react-query";
import NavBar from "./components/NavBar";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Darkmode from "./components/hooks/Darkmode";
import CountryDisplay from "./components/CountryDisplay";
import CountryDetailPage from "./components/CountryDetailPage";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<CountryDisplay />} />
          <Route path="Countrydetails/:name" element={<CountryDetailPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
