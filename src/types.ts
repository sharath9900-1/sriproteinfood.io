export interface MealPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  monthlyPrice: number;
  originalMonthlyPrice: number;
  type: 'veg' | 'non-veg';
  image: string;
  details?: string[];
}

export interface PaymentDetails {
  meal: MealPlan;
  isSubscription: boolean;
  amount: number;
  customerDetails: CustomerDetails;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  location?: string;
}

export interface Review {
  rating: number;
  text: string;
  date: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  orders: Order[];
}

export interface Order {
  id: string;
  mealId: string;
  status: 'pending' | 'confirmed' | 'delivered';
  date: string;
  amount: number;
  customerDetails: CustomerDetails;
  review?: Review;
}