import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from 'sonner';
import { Eye, EyeOff, User, Lock } from 'lucide-react';

const AuthForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    // Here you would typically call an API to handle authentication
    // For this example, we'll just simulate a successful login/signup
    onLogin(email);
    toast.success(isLogin ? 'Logged in successfully' : 'Signed up successfully');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="p-8 max-w-md mx-auto bg-card text-card-foreground shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-primary text-center">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-input text-input-foreground pl-10"
          />
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        </div>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-input text-input-foreground pl-10 pr-10"
          />
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        </div>
        {!isLogin && (
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-input text-input-foreground pl-10 pr-10"
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          </div>
        )}
        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <Button
          variant="link"
          onClick={() => setIsLogin(!isLogin)}
          className="p-0 text-primary hover:underline"
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </Button>
      </p>
    </Card>
  );
};

export default AuthForm;
