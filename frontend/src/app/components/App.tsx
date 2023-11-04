import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';
import NodeComparator from './NodeComparator';
import LoginForm from './LoginForm';
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(true);
  return (
    <div>
      {isAuthenticated ? (
        <NodeComparator />
      ) : showRegistrationForm ? (
        <RegistrationForm setIsAuthenticated={setIsAuthenticated} setShowRegistrationForm={setShowRegistrationForm} />
      ) : (
        <LoginForm setIsAuthenticated={setIsAuthenticated} setShowRegistrationForm={setShowRegistrationForm} />
      )}
    </div>
  );
};
export default App;
