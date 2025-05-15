import React from 'react';
import MealPlans from './components/MealPlans';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomerReviews from './components/CustomerReviews';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <main className="flex-grow">
          <MealPlans />
          <CustomerReviews />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;