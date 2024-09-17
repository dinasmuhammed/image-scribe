import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from 'sonner';

const AuthForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  return (
    <Card className="p-6 max-w-md mx-auto bg-card text-card-foreground shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-primary">{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-input text-input-foreground"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-input text-input-foreground"
        />
        {!isLogin && (
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full bg-input text-input-foreground"
          />
        )}
        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-muted-foreground">
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