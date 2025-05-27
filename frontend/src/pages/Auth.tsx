import { useState } from 'react';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

const Auth = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 font-medium ${
              activeTab === 'login'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 font-medium ${
              activeTab === 'register'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>

        {activeTab === 'login' ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default Auth; 