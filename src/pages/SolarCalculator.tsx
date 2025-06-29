
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Calculator, Sun, Zap, MapPin, DollarSign } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface SolarResults {
  requiredKW: number;
  annualProduction: number;
  monthlySavings: number;
  paybackPeriod: number;
  co2Reduction: number;
}

const SolarCalculator = () => {
  const [monthlyConsumption, setMonthlyConsumption] = useState<number>(800);
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [roofArea, setRoofArea] = useState<number[]>([100]);
  const [electricityRate, setElectricityRate] = useState<number>(0.12);
  const [systemCost, setSystemCost] = useState<number>(3.5);
  const [results, setResults] = useState<SolarResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  const calculateSolarViability = async () => {
    if (!latitude || !longitude) {
      toast({
        title: "Missing Location",
        description: "Please enter latitude and longitude coordinates.",
        variant: "destructive"
      });
      return;
    }

    setIsCalculating(true);
    
    try {
      // Simulate TMY data processing and calculations
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);
      
      // Calculate solar irradiance based on location (simplified model)
      const avgSolarIrradiance = calculateSolarIrradiance(lat);
      const systemEfficiency = 0.85; // 85% system efficiency
      const panelWatts = 400; // 400W panels
      
      // Calculate required system size
      const annualConsumption = monthlyConsumption * 12; // kWh per year
      const requiredKW = annualConsumption / (avgSolarIrradiance * 365 * systemEfficiency);
      
      // Calculate annual production
      const annualProduction = requiredKW * avgSolarIrradiance * 365 * systemEfficiency;
      
      // Financial calculations
      const monthlySavings = (annualProduction / 12) * electricityRate;
      const totalSystemCost = requiredKW * systemCost * 1000; // Cost per kW in dollars
      const paybackPeriod = totalSystemCost / (monthlySavings * 12);
      
      // Environmental impact
      const co2Reduction = annualProduction * 0.4; // kg CO2 per kWh
      
      setResults({
        requiredKW: Math.round(requiredKW * 100) / 100,
        annualProduction: Math.round(annualProduction),
        monthlySavings: Math.round(monthlySavings * 100) / 100,
        paybackPeriod: Math.round(paybackPeriod * 100) / 100,
        co2Reduction: Math.round(co2Reduction)
      });
      
      toast({
        title: "Calculation Complete",
        description: "Your solar viability assessment is ready!"
      });
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const calculateSolarIrradiance = (latitude: number): number => {
    // Simplified solar irradiance calculation based on latitude
    const absLat = Math.abs(latitude);
    if (absLat <= 23.5) return 5.5; // Tropical regions
    if (absLat <= 40) return 4.5; // Temperate regions
    if (absLat <= 60) return 3.5; // Higher latitudes
    return 2.5; // Polar regions
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                <Sun className="h-12 w-12 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Solar Viability Calculator
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Calculate your home's solar potential with precision. Get personalized recommendations based on your location, consumption, and roof specifications.
            </p>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Panel */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-orange-600" />
                    System Parameters
                  </CardTitle>
                  <CardDescription>
                    Enter your details to calculate solar viability
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Monthly Consumption */}
                  <div className="space-y-2">
                    <Label htmlFor="consumption">Monthly Electricity Consumption (kWh)</Label>
                    <Input
                      id="consumption"
                      type="number"
                      value={monthlyConsumption}
                      onChange={(e) => setMonthlyConsumption(Number(e.target.value))}
                      placeholder="800"
                    />
                  </div>

                  {/* Location Inputs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="latitude" className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        Latitude
                      </Label>
                      <Input
                        id="latitude"
                        type="number"
                        step="0.000001"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder="40.7128"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        id="longitude"
                        type="number"
                        step="0.000001"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder="-74.0060"
                      />
                    </div>
                  </div>

                  {/* Roof Area */}
                  <div className="space-y-4">
                    <Label>Available Roof Area: {roofArea[0]} m²</Label>
                    <Slider
                      value={roofArea}
                      onValueChange={setRoofArea}
                      max={500}
                      min={20}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  {/* Electricity Rate */}
                  <div className="space-y-2">
                    <Label htmlFor="rate" className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      Electricity Rate ($/kWh)
                    </Label>
                    <Input
                      id="rate"
                      type="number"
                      step="0.01"
                      value={electricityRate}
                      onChange={(e) => setElectricityRate(Number(e.target.value))}
                      placeholder="0.12"
                    />
                  </div>

                  {/* System Cost */}
                  <div className="space-y-2">
                    <Label htmlFor="cost">System Cost ($/W)</Label>
                    <Input
                      id="cost"
                      type="number"
                      step="0.1"
                      value={systemCost}
                      onChange={(e) => setSystemCost(Number(e.target.value))}
                      placeholder="3.5"
                    />
                  </div>

                  <Button 
                    onClick={calculateSolarViability} 
                    className="w-full" 
                    disabled={isCalculating}
                    size="lg"
                  >
                    {isCalculating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Calculate Solar Potential
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Results Panel */}
              <div className="space-y-6">
                {results ? (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-green-600">System Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{results.requiredKW} kW</div>
                            <div className="text-sm text-muted-foreground">System Size Needed</div>
                          </div>
                          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{results.annualProduction.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">kWh/Year Production</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-green-600">Financial Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <span>Monthly Savings</span>
                            <span className="font-bold text-green-600">${results.monthlySavings}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <span>Payback Period</span>
                            <span className="font-bold text-blue-600">{results.paybackPeriod} years</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <span>Annual Savings</span>
                            <span className="font-bold text-orange-600">${(results.monthlySavings * 12).toFixed(0)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-green-600">Environmental Impact</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{results.co2Reduction.toLocaleString()} kg</div>
                          <div className="text-sm text-muted-foreground">CO₂ Reduction per Year</div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Sun className="h-16 w-16 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Ready to Calculate</h3>
                      <p className="text-center text-muted-foreground">
                        Enter your details and click calculate to see your solar potential
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SolarCalculator;
