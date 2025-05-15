import React, { useState } from 'react';
import { MealPlan, PaymentDetails, CustomerDetails } from '../types';
import { useAuth } from '../context/AuthContext';
import OrderModal from './OrderModal';
import PaymentModal from './PaymentModal';
import CustomerDetailsModal from './CustomerDetailsModal';

const mealPlans: MealPlan[] = [
  {
    id: 'veg-plan',
    name: 'Veg Meal',
    description: 'A balanced vegetarian meal with protein sources',
    price: 189,
    monthlyPrice: 4929,
    originalMonthlyPrice: 5859,
    type: 'veg',
    details: ['VEGIES', 'FRUITS', 'Egg 1', 'Paneer 100g', 'Soybean 100g', 'RICE (Optional)'],
    image: 'https://media-hosting.imagekit.io/1a3efe0cd99c4554/5c5232e2-126c-4f1d-9c5d-492634b17f33.jpg?Expires=1840689653&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=sTFYHSZzd8L4XUCzpweO5lu0IazUFqBR~9g6GHjDTtjpq1WBrlk7mBAxV2IaeYx9pc6GXzAy60oa1MFooBbxRRFxUB0rU~2Hmld8ArXnmUsjuWLkyKdwMhy~eFWvsQW8Xf82lG9UYntz0zuimRrArKPMnod1Trf1CMvR4qML3s4iAb5Ul1gH0ye5t0QZEchN6V3-5KsGcU66GX1jbbOReXiE1MvNJsApX-Br3cwXhLkliXbnaDdj9wVYnnc9Yenmc6Ssdk8tRQRwjHYzfJvN-5XavukjcwHxIASJDiFsMwu~o7Bt~l57PAEwwtPMYyMGF5XQiarRtNtmMNZ7hqoOzg__'
  },
  {
    id: 'paneer-sprouts',
    name: 'Paneer Sprouts',
    description: 'Mixed sprouts with paneer (Total 150gm)',
    price: 69,
    monthlyPrice: 0,
    originalMonthlyPrice: 0,
    type: 'veg',
    image: 'https://media-hosting.imagekit.io/f216c0b1ab74488f/Screenshot%202025-05-01%20132238.png?Expires=1840693990&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=gzMCYt7kcfHlg-QzoGwii6EcEjwDdhs8Ov~RaIl~LrNKgALxmYAtLOstjh~Fz-znrio37DvxVCNUcA65qNUUkpB5vryOymFXm8FaGYzMbkVbXSq45oXPjO4~rZUER0q1QjGYNfquhkah~UIX6xMGSQW8k8al4xx8mSXg74S0esRrqmdedxBfDb-3f1dKnJ~H8naEK4cRUlxf2~FN2OoY0IVEf9fDX9oCziYitvkgl3AOdZeAO0FCVqxpwhspKkSTwmDRqfZfV5ZzeGFFIivNrZffc1SEqVf5kWxJi-vD7uR~QBZ276TzVwQMLHUf91Ys9~0ev1mn-7BTthXEuEyb1A__'
  },
  {
    id: 'soybean-sprouts',
    name: 'Soybean Sprouts',
    description: 'Mixed sprouts with soybean (Total 150gm)',
    price: 69,
    monthlyPrice: 0,
    originalMonthlyPrice: 0,
    type: 'veg',
    image: 'https://media-hosting.imagekit.io/1a89575e33264c47/Screenshot%202025-05-01%20132821.png?Expires=1840694314&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=I5U3tuLXsC7BqtylvNJLRjA0VzwS5a0M1X0vLardK9L0U8Yz3kgGhCARnAubgaoYMl7k2doXJlLcAFaQ5pVeJZTzMQu8j82vR3OTNHUgJrwEPefNdTqXlcnGb0MXPhLBU8O4tc4AYBn7XAbBVgctsYh4~qRVbZBvIxzyhoV-LaTYkZZFBozV4XZqi8KeaOQ8eeHdaBmt7VQej8-K97PK3nI4H7M44rfa3D~VGVs-eX9Wvaz1BM8Z~Ywsr0HXDJKpvDeFYUDNc2b7JDorKjTDcFv9RVEOGhlIE98IsUSkLa95G1LhdJgPQumlbjj-TIM2-MVXnhcCPFfiOIX9--DEag__'
  },
  {
    id: 'non-veg-plan',
    name: 'Non-Veg Meal',
    description: 'A protein-rich meal with meat and vegetables',
    price: 219,
    monthlyPrice: 5549,
    originalMonthlyPrice: 6789,
    type: 'non-veg',
    details: ['VEGIES', 'FRUITS', 'Egg 1', 'Chicken 100g', 'Fish 100g', 'Rice 150g'],
    image: 'https://media-hosting.imagekit.io/d70d0d0beb064538/316150b4-dad3-4d3d-a5dd-b29e9869a787.jpg?Expires=1840689752&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=GKJ517ENuzNCgzUMtqJrJCKJzCHKSHK~SpIWU8Ut4fSWed8blAOHHpPjxFK1VtJhe-QkAzYAUJP7bu2XfuwakYuOwxmqaIx39ke0DhdIvn2jNxABm-EXLBTqo7UwEaS5uW-Cz-Slc3fqXJr~ZqHnvdxXxt-hmOaPtg~7xTJqdcfs0OrqXIS~-XBwRo7WDgj8LaVQqfin~GSHZ6zT93hwofp69sX-j5vp71XYP8lcaB-b8b~Qt0KSb1Algi-oW3Tp~WHsTp-wceoW0Uug97FsNhz22GUMOEQOG8VZZjfa7mlC5cXE~frLbACwPW2zvH-D3s-HKcCA~82zXK8Vsa6WTA__'
  }
];

const MealPlans: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [selectedMeal, setSelectedMeal] = useState<MealPlan | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isCustomerDetailsModalOpen, setIsCustomerDetailsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'veg' | 'non-veg' | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [isSubscription, setIsSubscription] = useState(false);
  const [showMinMeals, setShowMinMeals] = useState(false);
  const [currentCustomerDetails, setCurrentCustomerDetails] = useState<CustomerDetails | null>(null);

  const handleOrderClick = (meal: MealPlan, isSubscribe: boolean = false) => {
    setSelectedMeal(meal);
    setIsSubscription(isSubscribe);
    setIsCustomerDetailsModalOpen(true);
  };
  
  const handleCustomerDetails = (customerDetails: CustomerDetails) => {
    if (selectedMeal) {
      setCurrentCustomerDetails(customerDetails);
      const amount = isSubscription ? selectedMeal.monthlyPrice : selectedMeal.price;
      setPaymentDetails({
        meal: selectedMeal,
        isSubscription,
        amount,
        customerDetails
      });
      setIsCustomerDetailsModalOpen(false);
      setIsPaymentModalOpen(true);
    }
  };
  
  const handlePaymentComplete = () => {
    setIsPaymentModalOpen(false);
    setIsOrderModalOpen(true);
  };

  const filteredMeals = mealPlans.filter(meal => {
    const typeMatch = !selectedType || meal.type === selectedType;
    const priceMatch = !showMinMeals || meal.price < 100;
    return typeMatch && priceMatch;
  });

  return (
    <section id="meals" className="py-12 px-4 bg-orange-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Meal Plans</h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => {
              setSelectedType(null);
              setShowMinMeals(false);
            }}
            className={`px-6 py-3 rounded-full transition-colors ${
              !selectedType && !showMinMeals
                ? 'bg-orange-600 text-white' 
                : 'bg-white hover:bg-orange-100'
            }`}
          >
            ALL ITEMS
          </button>
          <button
            onClick={() => setShowMinMeals(!showMinMeals)}
            className={`px-6 py-3 rounded-full transition-colors ${
              showMinMeals
                ? 'bg-orange-600 text-white' 
                : 'bg-white hover:bg-orange-100'
            }`}
          >
            MIN MEALS
          </button>
          <button
            onClick={() => setSelectedType('veg')}
            className={`px-6 py-3 rounded-full transition-colors ${
              selectedType === 'veg' 
                ? 'bg-orange-600 text-white' 
                : 'bg-white hover:bg-orange-100'
            }`}
          >
            Vegetarian
          </button>
          <button
            onClick={() => setSelectedType('non-veg')}
            className={`px-6 py-3 rounded-full transition-colors ${
              selectedType === 'non-veg' 
                ? 'bg-orange-600 text-white' 
                : 'bg-white hover:bg-orange-100'
            }`}
          >
            Non-Vegetarian
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMeals.map((meal) => (
            <div 
              key={meal.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={meal.image} 
                  alt={meal.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 m-2 rounded-full text-sm">
                  {meal.type === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{meal.name}</h3>
                <p className="text-gray-600 mb-4">{meal.description}</p>
                
                {meal.details && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Includes:</h4>
                    <ul className="list-disc ml-5 text-gray-700">
                      {meal.details.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span>Price:</span>
                    <span className="font-bold text-orange-600">₹{meal.price}</span>
                  </div>
                  <button
                    onClick={() => handleOrderClick(meal)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    Order Now
                  </button>
                </div>

                {meal.monthlyPrice > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span>Monthly Plan:</span>
                      <div>
                        <span className="line-through text-gray-500 mr-2">₹{meal.originalMonthlyPrice}</span>
                        <span className="font-bold text-orange-600">₹{meal.monthlyPrice}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleOrderClick(meal, true)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
                    >
                      Subscribe Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white p-8 rounded-lg text-center shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Want to Customize Your Meal?</h3>
          <p className="text-gray-700 mb-6">
            Get your meal customized according to your preferences through WhatsApp chat.
          </p>
          <a 
            href="https://wa.me/917676578507?text=I%20want%20to%20customize%20my%20meal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
          >
            Chat with Us
          </a>
        </div>
      </div>

      {isCustomerDetailsModalOpen && selectedMeal && (
        <CustomerDetailsModal
          meal={selectedMeal}
          isSubscription={isSubscription}
          onClose={() => setIsCustomerDetailsModalOpen(false)}
          onSubmit={handleCustomerDetails}
        />
      )}

      {isOrderModalOpen && selectedMeal && (
        <OrderModal 
          meal={selectedMeal}
          customerDetails={currentCustomerDetails || undefined}
          onClose={() => setIsOrderModalOpen(false)} 
        />
      )}
      
      {isPaymentModalOpen && paymentDetails && (
        <PaymentModal
          paymentDetails={paymentDetails}
          onClose={() => setIsPaymentModalOpen(false)}
          onProceed={handlePaymentComplete}
        />
      )}
    </section>
  );
};

export default MealPlans;