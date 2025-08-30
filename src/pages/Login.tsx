import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Leaf, User, Lock, Zap, Globe, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setIsLoading(true);
    
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = login(username, password);
    
    if (!success) {
      toast({
        title: "Login Failed",
        description: "Please use 'producer', 'buyer', or 'regulator' in your username",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const stats = [
    { label: 'Credits Traded', value: '1,234', icon: Leaf },
    { label: 'Producers', value: '156', icon: Zap },
    { label: 'Buyers', value: '89', icon: Globe }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero section */}
      <div className="flex-1 bg-gradient-to-br from-primary via-primary to-green-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col justify-center h-full px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Green Ledger</h1>
                <p className="text-white/80">Carbon Credit Platform</p>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Transparent, blockchain-powered carbon credit trading for a sustainable future
            </h2>
          </div>

          <div className="space-y-6 mb-12">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Producer Portal</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Record hydrogen production and generate verified carbon credits instantly
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Buyer Marketplace</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Browse and purchase carbon credits from verified producers
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Regulatory Oversight</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Complete transparency with real-time transaction monitoring
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-bold text-2xl mb-1">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-96 flex items-center justify-center bg-background p-8">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h2>
            <p className="text-muted-foreground">Sign in to your Green Ledger account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="username"
                  placeholder="Enter username (producer, buyer, or regulator)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button className="text-primary hover:underline font-medium">
                Sign up
              </button>
            </p>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center mb-2">Demo Users:</p>
            <div className="space-y-1 text-xs">
              <div>• <span className="font-medium">producer</span> - Access Producer Dashboard</div>
              <div>• <span className="font-medium">buyer</span> - Access Buyer Dashboard</div>
              <div>• <span className="font-medium">regulator</span> - Access Regulator Dashboard</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;