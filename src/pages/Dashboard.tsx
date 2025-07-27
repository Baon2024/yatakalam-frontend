import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Phone, User, DollarSign, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

// Fake sample data
const dashboardData = [
  {
    id: 1,
    phoneNumber: '+1 (555) 123-4567',
    name: 'Alice Johnson',
    budget: 5000,
    cityArea: 'Downtown Manhattan'
  },
  {
    id: 2,
    phoneNumber: '+1 (555) 987-6543',
    name: 'Bob Smith',
    budget: 3500,
    cityArea: 'Brooklyn Heights'
  },
  {
    id: 3,
    phoneNumber: '+1 (555) 456-7890',
    name: 'Carol Williams',
    budget: 7200,
    cityArea: 'San Francisco Bay'
  },
  {
    id: 4,
    phoneNumber: '+1 (555) 321-0987',
    name: 'David Brown',
    budget: 4800,
    cityArea: 'Austin Central'
  },
  {
    id: 5,
    phoneNumber: '+1 (555) 654-3210',
    name: 'Emma Davis',
    budget: 6100,
    cityArea: 'Seattle Capitol Hill'
  },
  {
    id: 6,
    phoneNumber: '+1 (555) 789-0123',
    name: 'Frank Miller',
    budget: 2900,
    cityArea: 'Chicago Loop'
  }
];

const Dashboard = () => {
  const totalBudget = dashboardData.reduce((sum, item) => sum + item.budget, 0);
  const averageBudget = Math.round(totalBudget / dashboardData.length);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Customer Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Overview of customer data and analytics
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card shadow-soft border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.length}</div>
              <p className="text-xs text-muted-foreground">
                Active customer records
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card shadow-soft border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Combined budget amount
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card shadow-soft border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${averageBudget.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Per customer average
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Customer Data Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Customer Records</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardData.map((customer) => (
              <Card key={customer.id} className="bg-gradient-card shadow-soft border-0 hover:shadow-medium transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      {customer.name}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      ID: {customer.id}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-mono">{customer.phoneNumber}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold text-lg text-primary">
                      ${customer.budget.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{customer.cityArea}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;