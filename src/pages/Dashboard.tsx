import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Phone, User, DollarSign, MapPin, Users, ShoppingCart, CircleHelp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { useAuth } from '@/hooks/authState';

const TrafficLightIcon = () => (
  <div className="flex flex-col items-center justify-center gap-0.5">
    <span className="block w-2.5 h-2.5 bg-red-500 rounded-full" />
    <span className="block w-2.5 h-2.5 bg-yellow-400 rounded-full" />
    <span className="block w-2.5 h-2.5 bg-green-500 rounded-full" />
  </div>
);

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

  const [ leadData, setLeadData ] = useState([])
  const { user, loading } = useAuth()
  console.log("user is: ", user);

  useEffect(() => {
    if (!user) return 
    let userID = user.id

    async function getLeadData() {
    let { data: inauguralMango, error } = await supabase
    .from('Call Lead Details_duplicateCustom')
    .select('*')
    .eq('linked_user', userID);

    console.log("data from getLeadData is: ", inauguralMango, "and error is: ", error);

    setLeadData(inauguralMango);

    }

    getLeadData()
          
  },[user])

 




  const totalBudget = leadData.reduce((sum, item) => sum + item.budget, 0);
  const averageBudget = Math.round(totalBudget / leadData.length);
  const { toast } = useToast();

  const handleBuyLead = (customerName: string, customerId: number) => {
    toast({
      title: "Lead Purchased!",
      description: `Successfully purchased lead for ${customerName} (ID: ${customerId})`,
    });
  };

  if (!user?.id) return ( <p>nothing to see yet</p>)

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                Customer Dashboard
              </h1>
              <p className="text-gray-400 mt-2">Overview of customer data and analytics</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-900 border-gray-800 shadow-lg shadow-green-400/10 hover:shadow-green-400/20 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Prospect Calls</CardTitle>
              <Users className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{leadData.length}</div>
              <p className="text-xs text-gray-500">Active customer records</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 shadow-lg shadow-green-400/10 hover:shadow-green-400/20 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Lead Value</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">${totalBudget.toLocaleString()}</div>
              <p className="text-xs text-gray-500">Combined budget amount</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 shadow-lg shadow-green-400/10 hover:shadow-green-400/20 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Average Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">${averageBudget.toLocaleString()}</div>
              <p className="text-xs text-gray-500">Per customer average</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Customer Records</h2>
          <Card className="bg-gray-900 border-gray-800 shadow-lg">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800 hover:bg-gray-800/50">
                    <TableHead className="w-[100px] font-semibold text-gray-300">ID</TableHead>
                    <TableHead className="font-semibold text-gray-300">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Name
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-300">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-300">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Budget
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-300">
                      <div className="flex items-center gap-2">Move date</div>
                    </TableHead>
                    <TableHead className="font-semibold text-center text-gray-300">
                      <div className="flex items-center justify-center gap-2">
                        <CircleHelp className="h-4 w-4" />
                        Custom Questions
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-center text-gray-300">
                      <div className="flex items-center justify-center gap-2">
                        <TrafficLightIcon />
                        Lead Warmth
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leadData.map((customer, index) => (
                    <TableRow key={index} className="border-gray-800 hover:bg-gray-800/30 transition-colors">
                      <TableCell>
                        <Badge variant="secondary" className="bg-green-400/10 text-green-400 border-green-400/20">
                          {index}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-white">{customer?.name}</TableCell>
                      <TableCell>
                        <span className="font-mono text-sm text-gray-300">{customer?.phoneNumber}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-green-400">${customer?.budget?.toLocaleString()}</span>
                      </TableCell>
                      <TableCell className="text-gray-400">{customer?.when}</TableCell>
                      <TableCell className="align-top">
                        <div className="text-sm font-mono text-left leading-5 break-words whitespace-pre-wrap">
                          {Array.isArray(customer.custom_questions) && customer.custom_questions.length > 0 ? (
                            customer.custom_questions.map((q, i) => {
                              // normalize to [label, value]
                              const pairs =
                                q && typeof q === "object" && !("key" in q)
                                  ? Object.entries(q) // shape: [{ "Some label": "value" }]
                                  : [["" + q?.key, q?.value]] // shape: [{ key, value }]

                              return pairs.map(([label, value], j) => (
                                <div key={`${i}-${j}`} className="grid grid-cols-[auto,1fr] gap-x-2 gap-y-1 py-0.5">
                                  <span className="font-semibold text-white">{label}</span>
                                  <span className="text-gray-400">{String(value ?? "")}</span>
                                </div>
                              ))
                            })
                          ) : (
                            <span className="text-gray-500">—</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {customer.lead_warmth_rating ? (
                          <span
                            className={`inline-block w-3 h-3 rounded-full ${
                              customer.lead_warmth_rating.toLowerCase() === "warm"
                                ? "bg-green-500"
                                : customer.lead_warmth_rating.toLowerCase() === "medium"
                                  ? "bg-orange-500"
                                  : "bg-red-500"
                            }`}
                            title={customer.lead_warmth_rating}
                          />
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
};

export default Dashboard;