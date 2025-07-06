import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Loader2, Calculator, DollarSign, Leaf, Zap, Database, BarChart3, Award, TrendingUp, Sun, Home, Shield, Target, Globe, TrendingDown, AlertCircle, Sparkles, Battery, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

interface ApiResponse {
  recommended_kw: number;
  yield_per_kwp: number;
  total_yield_kwh_year1: number;
  total_cost: number;
  state_subsidy: number;
  central_subsidy: number;
  net_cost: number;
  npv: number;
  irr_percent: number;
  payback_period_years: number;
  lifetime_savings: number;
  co2_avoided_kg: number;
  trees_saved_equivalent: number;
}

interface ResultData {
  recommended_kW: number;
  solarYield: number;
  annualEnergy: number;
  totalCost: number;
  subsidy: number;
  netCost: number;
  monthlySavings: number;
  annualSavings: number;
  paybackYears: number;
  irrPercent: number;
  lifetimeSavings: number;
  co2Avoided: number;
  treesSaved: number;
  npv: number;
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Puducherry', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Andaman and Nicobar Islands'
];

const phases = [
  { 
    key: 'phase1', 
    label: 'Solar Data Collection', 
    description: 'Gathering precise solar radiation data for your location',
    icon: <Database className="h-8 w-8 text-orange-500" />,
    color: 'from-orange-400 to-red-500'
  },
  { 
    key: 'phase2', 
    label: 'Solar Energy Calculation', 
    description: 'Estimating your rooftop solar energy production',
    icon: <Zap className="h-8 w-8 text-yellow-500" />,
    color: 'from-yellow-400 to-orange-500'
  },
  { 
    key: 'phase3', 
    label: 'Financial Modelling', 
    description: 'Calculating costs, subsidies and savings',
    icon: <BarChart3 className="h-8 w-8 text-green-500" />,
    color: 'from-green-400 to-emerald-500'
  },
  { 
    key: 'phase4', 
    label: 'Personalized Results', 
    description: 'Preparing your detailed solar report',
    icon: <Award className="h-8 w-8 text-blue-500" />,
    color: 'from-blue-400 to-purple-500'
  }
];

const SolarCalculator: React.FC = () => {
  const [formData, setFormData] = useState({ state: '', monthly: '', latlong: '' });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [loading, setLoading] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(-1);
  const [result, setResult] = useState<ResultData|null>(null);
  const { toast } = useToast();

  const validate = () => {
    const errs: Record<string,string> = {};
    if (!formData.state) errs.state = 'Select a state';
    if (!formData.monthly || isNaN(+formData.monthly) || +formData.monthly <= 0) errs.monthly = 'Enter valid monthly units';
    if (!/^[-\d.]+, [-\d.]+$/.test(formData.latlong)) errs.latlong = 'Enter coords as lat,lng';
    setErrors(errs);
    return Object.keys(errs).length===0;
  };

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits:0 }).format(v);
  const formatNum = (v: number, d=1) => v.toFixed(d);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setResult(null);
    setPhaseIndex(-1);

    // Step through phases with 10 second intervals
    for (let i=0; i<phases.length-1; i++) {
      setPhaseIndex(i);
      await new Promise(res => setTimeout(res, 200));
    }
    
    // Start final phase
    setPhaseIndex(phases.length-1);

    try {
      const res = await fetch('https://sunlytics.onrender.com/api/calculate', {
        method: 'POST', headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({
          state: formData.state,
          monthly_units: parseFloat(formData.monthly),
          latlong: formData.latlong
        })
      });
      if (!res.ok) throw new Error(res.statusText);
      const data: ApiResponse = await res.json();
      const combinedSubsidy = data.state_subsidy + data.central_subsidy;
      const annualSavings = data.lifetime_savings / 25;
      const monthlySavings = annualSavings / 12;
      setResult({
        recommended_kW: data.recommended_kw,
        solarYield: data.yield_per_kwp,
        annualEnergy: data.total_yield_kwh_year1,
        totalCost: data.total_cost,
        subsidy: combinedSubsidy,
        netCost: data.net_cost,
        monthlySavings,
        annualSavings,
        lifetimeSavings: data.lifetime_savings,
        paybackYears: data.payback_period_years,
        irrPercent: data.irr_percent,
        co2Avoided: data.co2_avoided_kg,
        treesSaved: data.trees_saved_equivalent,
        npv: data.npv
      });
      toast({ title:'Analysis Complete', description:'Your solar report is ready!' });
    } catch(err) {
      console.error(err);
      toast({ title:'Error', description:'Analysis failed. Please try again.', variant:'destructive' });
    } finally {
      setLoading(false);
      setPhaseIndex(-1);
    }
  };

  const handleChange = (field:string, v:string) => {
    setFormData(prev=>({ ...prev, [field]:v }));
    if (errors[field]) setErrors(prev=>({ ...prev, [field]:'' }));
  };

  const handleCalculateAgain = () => {
    setResult(null);
    setFormData({ state: '', monthly: '', latlong: '' });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-2">
            <img 
              src="/lovable-uploads/8a33c45a-43ec-4541-9b7f-61c5ac392b48.png" 
              alt="Sunlytics - Precision Solar Insights" 
              className="h-16 md:h-20 w-auto mx-auto mb-1"
            />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Precision Solar Insights for Your Home
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto px-4">

          {/* Left Side - Form (hide when results are shown) */}
          {!result && (
            <div className="space-y-6 max-w-sm ml-2 lg:ml-8">

              <Card className="glass backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:brightness-110 hover:shadow-blue-500/20" style={{animation: 'floating 40s ease-in-out infinite'}}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-blue-600" />
                    Calculate Your Solar Potential
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <Label className="text-sm text-gray-700 dark:text-gray-300 font-medium">State *</Label>
                      <Select value={formData.state} onValueChange={v=>handleChange('state',v)}>
                        <SelectTrigger className="h-10 bg-white/50 dark:bg-white/10 backdrop-blur border-white/30">
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDIAN_STATES.map(s=><SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
                    </div>

                    <div className="space-y-1">
                      <Label className="text-sm text-gray-700 dark:text-gray-300 font-medium">Monthly Electricity Units (kWh) *</Label>
                      <Input 
                        type="number" 
                        placeholder="e.g. 300" 
                        value={formData.monthly} 
                        onChange={e=>handleChange('monthly',e.target.value)}
                        className="h-10 bg-white/50 dark:bg-white/10 backdrop-blur border-white/30"
                      />
                      {errors.monthly && <p className="text-red-500 text-xs">{errors.monthly}</p>}
                    </div>

                    <div className="space-y-1">
                      <Label className="text-sm text-gray-700 dark:text-gray-300 font-medium">Location Coordinates *</Label>
                      <Input 
                        placeholder="lat,lon (e.g. 28.6139, 77.2090)" 
                        value={formData.latlong} 
                        onChange={e=>handleChange('latlong',e.target.value)}
                        className="h-10 bg-white/50 dark:bg-white/10 backdrop-blur border-white/30"
                      />
                      <p className="text-gray-500 dark:text-gray-400 text-xs">Get coordinates from Google Maps</p>
                      {errors.latlong && <p className="text-red-500 text-xs">{errors.latlong}</p>}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300" 
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin mr-2 h-4 w-4" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          Calculate Solar Potential
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Right Side - Enhanced Benefits Cards */}
          <div className="space-y-4">
            {/* Show enhanced solar benefits when form is visible and not loading */}
            {!result && !loading && (
              <div className="space-y-3">
                {/* Hero Benefit Card */}
                <Card className="relative overflow-hidden bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 group">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-3 right-3 opacity-20">
                    <Sun className="h-16 w-16 text-white" />
                  </div>
                  <CardContent className="relative z-10 p-4 text-white">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-1">Transform Your Home</h3>
                          <p className="text-white/90 text-xs">Into a Clean Energy Powerhouse</p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-2 mb-2">
                      <div className="text-xl font-bold">Free Electricity Forever</div>
                    </div>
                    <div className="text-xs text-white/80">Join 10+ million homes already saving with solar</div>
                  </CardContent>
                </Card>

                {/* Benefits Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {/* ROI Card */}
                  <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-400 to-teal-600 border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 group">
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-white/10 rounded-full"></div>
                    <CardContent className="p-3 text-white relative z-10">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                        <span className="font-semibold text-xs">High Returns</span>
                      </div>
                      <div className="text-xl font-bold mb-1">15-20%</div>
                      <div className="text-xs text-white/90">Annual ROI</div>
                    </CardContent>
                  </Card>

                  {/* Payback Card */}
                  <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 group">
                    <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-white/10 rounded-full"></div>
                    <CardContent className="p-3 text-white relative z-10">
                      <div className="flex items-center gap-2 mb-1">
                        <Battery className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                        <span className="font-semibold text-xs">Quick Payback</span>
                      </div>
                      <div className="text-xl font-bold mb-1">4-6 Yrs</div>
                      <div className="text-xs text-white/90">Investment Recovery</div>
                    </CardContent>
                  </Card>

                  {/* Property Value Card */}
                  <Card className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 group">
                    <div className="absolute top-0 right-0 w-6 h-6 bg-white/10 rounded-full"></div>
                    <CardContent className="p-3 text-white relative z-10">
                      <div className="flex items-center gap-2 mb-1">
                        <Home className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                        <span className="font-semibold text-xs">Property+</span>
                      </div>
                      <div className="text-xl font-bold mb-1">10-15%</div>
                      <div className="text-xs text-white/90">Value Increase</div>
                    </CardContent>
                  </Card>

                  {/* Environmental Card */}
                  <Card className="relative overflow-hidden bg-gradient-to-br from-green-500 to-lime-600 border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 group">
                    <div className="absolute -top-1 -left-1 w-5 h-5 bg-white/20 rounded-full"></div>
                    <CardContent className="p-3 text-white relative z-10">
                      <div className="flex items-center gap-2 mb-1">
                        <Leaf className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                        <span className="font-semibold text-xs">Eco Impact</span>
                      </div>
                      <div className="text-xl font-bold mb-1">5T+ CO₂</div>
                      <div className="text-xs text-white/90">Saved Annually</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Loading Animation */}
            {loading && phaseIndex >= 0 && (
              <Card className="glass backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-xl animate-fade-in hover:scale-105 hover:-translate-y-1 hover:brightness-110 hover:shadow-blue-500/20 transition-all duration-300" style={{animation: 'floating 40s ease-in-out infinite'}}>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Analyzing Your Solar Potential</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Please wait while we process your data</p>
                  </div>
                  
                  <div className="space-y-3">
                    {phases.map((phase, index) => (
                      <div 
                        key={phase.key}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 backdrop-blur ${
                          index === phaseIndex 
                            ? 'bg-gradient-to-r ' + phase.color + ' bg-opacity-10 scale-105 border border-blue-200/50' 
                            : index < phaseIndex 
                              ? 'bg-green-50/20 dark:bg-green-900/20 opacity-75 border border-green-200/50'
                              : 'bg-gray-50/20 dark:bg-gray-800/20 opacity-50'
                        }`}
                      >
                        <div className={`${index === phaseIndex ? 'animate-pulse' : ''}`}>
                          {index < phaseIndex ? (
                            <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
                              <Award className="h-5 w-5 text-white" />
                            </div>
                          ) : (
                            <div className="h-10 w-10 flex items-center justify-center">
                              {React.cloneElement(phase.icon, { className: "h-6 w-6 text-orange-500" })}
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{phase.label}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-300">{phase.description}</p>
                        </div>
                        {index === phaseIndex && (
                          <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        

        {/* Results Cards - Full Width, Side by Side */}
        {!loading && result && (
          <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Your Solar Analysis</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Solar Output Card */}
              <Card className="glass backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:brightness-110 hover:shadow-orange-500/25 group" style={{animation: 'floating 40s ease-in-out infinite'}}>
                <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg group-hover:from-orange-400 group-hover:to-red-400 transition-all duration-300 pb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    <CardTitle className="text-lg">Solar Output & Potential</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 bg-white/50 dark:bg-white/5 backdrop-blur rounded-b-lg group-hover:bg-white/60 dark:group-hover:bg-white/10 transition-all duration-300">
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform duration-300">{formatNum(result.recommended_kW)} kW</div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Recommended Load</p>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform duration-300">{formatNum(result.solarYield)} kWh/kWp</div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Solar Potential at Your Area (per year)</p>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform duration-300">{formatNum(result.annualEnergy)} kWh</div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Total Generation in Your System</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Metrics Card */}
              <Card className="glass backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105 hover:-translate-y-2 hover:brightness-110 hover:shadow-green-500/25 group" style={{animation: 'floating 40s ease-in-out infinite 4s'}}>
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg group-hover:from-green-400 group-hover:to-emerald-400 transition-all duration-300 pb-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    <CardTitle className="text-lg">Financial Metrics</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 bg-white/50 dark:bg-white/5 backdrop-blur h-full group-hover:bg-white/60 dark:group-hover:bg-white/10 transition-all duration-300">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600 dark:text-gray-300">Total System Cost:</span>
                      <span className="font-semibold text-sm text-gray-900 dark:text-white">{formatCurrency(result.totalCost)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600 dark:text-gray-300">Total Subsidies:</span>
                      <span className="font-semibold text-sm text-green-600 dark:text-green-400">{formatCurrency(result.subsidy)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600 dark:text-gray-300">Net Investment:</span>
                      <span className="font-semibold text-sm text-blue-600 dark:text-blue-400">{formatCurrency(result.netCost)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600 dark:text-gray-300">Monthly Savings:</span>
                      <span className="font-semibold text-sm text-green-600 dark:text-green-400">{formatCurrency(result.monthlySavings)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600 dark:text-gray-300">Annual Savings:</span>
                      <span className="font-semibold text-sm text-green-600 dark:text-green-400">{formatCurrency(result.annualSavings)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600 dark:text-gray-300">Payback Period:</span>
                      <span className="font-semibold text-sm text-blue-600 dark:text-blue-400">{formatNum(result.paybackYears)} years</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600 dark:text-gray-300">IRR:</span>
                      <span className="font-semibold text-sm text-purple-600 dark:text-purple-400">{formatNum(result.irrPercent)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600 dark:text-gray-300">NPV:</span>
                      <span className="font-semibold text-sm text-purple-600 dark:text-purple-400">{formatCurrency(result.npv)}</span>
                    </div>
                    <div className="border-t border-white/20 pt-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">25-Year Total Savings:</span>
                        <span className="text-base font-bold text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">{formatCurrency(result.lifetimeSavings)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Environmental Impact Card */}
              <Card className="glass backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105 hover:-translate-y-2 hover:brightness-110 hover:shadow-teal-500/25 group" style={{animation: 'floating 40s ease-in-out infinite 8s'}}>
                <CardHeader className="bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-t-lg group-hover:from-teal-400 group-hover:to-green-400 transition-all duration-300 pb-3">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    <CardTitle className="text-lg">Environmental Impact</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 bg-white/50 dark:bg-white/5 backdrop-blur h-full group-hover:bg-white/60 dark:group-hover:bg-white/10 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform duration-300">{formatNum(result.co2Avoided/1000, 1)}</div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Metric tons CO₂ avoided over 25 years</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">{result.treesSaved}</div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Trees equivalent planted</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Calculate Again Button */}
            <div className="text-center mt-6">
              <Button 
                onClick={handleCalculateAgain}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Again
              </Button>
            </div>
          </div>
        )}

        {/* India's Rooftop Solar Scenario Section */}
        <div className="mt-16 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            India's Rooftop Solar Scenario and Why Sunlytics Matters
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* India's Solar Initiative */}
            <div className="glass backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg p-5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:brightness-110 hover:shadow-orange-500/20" style={{animation: 'floating 40s ease-in-out infinite'}}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-100/50 dark:bg-orange-900/50 backdrop-blur rounded-lg flex items-center justify-center">
                  <Target className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">India's Solar Initiative</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                The <strong>PM Surya Ghar Muft Bijli Yojana</strong> has set an ambitious goal of installing rooftop solar on <strong>1 crore households by 2027</strong>.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                This initiative is backed by generous central and state-level subsidies, making solar adoption more attractive than ever for Indian homeowners.
              </p>
            </div>

            {/* Decreasing Cost of Rooftop Solar */}
            <div className="glass backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg p-5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:brightness-110 hover:shadow-green-500/20" style={{animation: 'floating 40s ease-in-out infinite 4s'}}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100/50 dark:bg-green-900/50 backdrop-blur rounded-lg flex items-center justify-center">
                  <TrendingDown className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Decreasing Solar Costs</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Rapid technological advancements have significantly reduced rooftop solar installation costs, making solar energy <strong>financially accessible</strong> to more households.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Solar panel efficiency has improved while prices have dropped, creating an ideal environment for widespread adoption.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Challenges Homeowners Face */}
            <div className="glass backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg p-5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:brightness-110 hover:shadow-red-500/20" style={{animation: 'floating 40s ease-in-out infinite 8s'}}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100/50 dark:bg-red-900/50 backdrop-blur rounded-lg flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Challenges Homeowners Face</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Despite the benefits, homeowners lack accurate information about:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Optimal rooftop solar capacity for their needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Location-specific solar energy generation potential</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Detailed financial insights including costs and subsidy availability</span>
                </li>
              </ul>
            </div>

            {/* Sunlytics as the Solution */}
            <div className="glass backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg p-5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:brightness-110 hover:shadow-blue-500/20" style={{animation: 'floating 40s ease-in-out infinite 12s'}}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100/50 dark:bg-blue-900/50 backdrop-blur rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sunlytics as the Solution</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Sunlytics resolves these challenges by providing:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300"><strong>Precise location data</strong> to estimate solar energy production accurately</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300"><strong>Optimal system sizing</strong> based on your electricity consumption patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300"><strong>Detailed financial modeling</strong> including costs, subsidies, payback period, and long-term savings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* How It Works Section - Always visible */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-10">How Our Calculator Works</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg p-5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:brightness-110 hover:shadow-orange-500/20" style={{animation: 'floating 40s ease-in-out infinite'}}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-100/50 dark:bg-orange-900/50 backdrop-blur rounded-lg flex items-center justify-center">
                  <Database className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Solar Data Collection</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We gather precise solar radiation data for your exact location using trusted global sources (NREL). 
                This ensures highly accurate and personalized results.
              </p>
            </div>

            <div className="glass backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg p-5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:brightness-110 hover:shadow-yellow-500/20" style={{animation: 'floating 40s ease-in-out infinite 4s'}}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-yellow-100/50 dark:bg-yellow-900/50 backdrop-blur rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Solar Energy Calculation</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Advanced simulations estimate exactly how much solar energy your rooftop system can produce each year, 
                based on your location and standard equipment.
              </p>
            </div>

            <div className="glass backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg p-5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:brightness-110 hover:shadow-green-500/20" style={{animation: 'floating 40s ease-in-out infinite 8s'}}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100/50 dark:bg-green-900/50 backdrop-blur rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Financial Modelling</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Detailed financial calculations factor in your state's electricity tariffs, subsidies, and costs, 
                clearly showing your potential savings, payback period, and returns.
              </p>
            </div>

            <div className="glass backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg p-5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:brightness-110 hover:shadow-blue-500/20" style={{animation: 'floating 40s ease-in-out infinite 12s'}}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100/50 dark:bg-blue-900/50 backdrop-blur rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Personalized Results</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Receive clear, actionable insights like recommended system size, net installation cost, savings, 
                payback period, environmental benefits, and lifetime returns.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SolarCalculator;
