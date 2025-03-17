
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Database, 
  ExternalLink, 
  FileCode, 
  Github, 
  LineChart, 
  Lightbulb, 
  Monitor, 
  Rocket, 
  GraduationCap, 
  Link2, 
  FileText, 
  Eye
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const GoodCabsProject = () => {
  const [defaultTab, setDefaultTab] = useState("overview");
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section with Cover Image */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img 
            src="/alexander-red-S9qxkJN0f4Q-unsplash.jpg" 
            alt="Yellow taxi cab on city street" 
            className="w-full h-full object-cover brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background flex flex-col justify-center">
            <div className="container max-w-5xl mx-auto px-4">
              <Link to="/" className="inline-flex items-center mb-6 text-white/90 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">GoodCabs Performance Analysis & Dashboard</h1>
              <p className="text-xl text-white/90 mb-6 max-w-2xl">
                A data-driven exploration of GoodCabs' operations—empowering insights for strategic decisions.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline" className="bg-white/20 text-white font-normal backdrop-blur-sm hover:-translate-y-0.5 transition-transform">Power BI</Badge>
                <Badge variant="outline" className="bg-white/20 text-white font-normal backdrop-blur-sm hover:-translate-y-0.5 transition-transform">PostgreSQL</Badge>
                <Badge variant="outline" className="bg-white/20 text-white font-normal backdrop-blur-sm hover:-translate-y-0.5 transition-transform">SQL</Badge>
                <Badge variant="outline" className="bg-white/20 text-white font-normal backdrop-blur-sm hover:-translate-y-0.5 transition-transform">Data Analysis</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container max-w-5xl mx-auto px-4 py-8">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-8">
              <TabsTrigger value="overview" onClick={() => setDefaultTab("overview")} className="gap-1.5">
                <Eye className="w-4 h-4" /> <span className="hidden md:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="data-setup" onClick={() => setDefaultTab("data-setup")} className="gap-1.5">
                <Database className="w-4 h-4" /> <span className="hidden md:inline">Data Setup</span>
              </TabsTrigger>
              <TabsTrigger value="dashboard" onClick={() => setDefaultTab("dashboard")} className="gap-1.5">
                <Monitor className="w-4 h-4" /> <span className="hidden md:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="insights" onClick={() => setDefaultTab("insights")} className="gap-1.5">
                <Lightbulb className="w-4 h-4" /> <span className="hidden md:inline">Insights</span>
              </TabsTrigger>
              <TabsTrigger value="challenges" onClick={() => setDefaultTab("challenges")} className="gap-1.5">
                <GraduationCap className="w-4 h-4" /> <span className="hidden md:inline">Challenges</span>
              </TabsTrigger>
              <TabsTrigger value="files" onClick={() => setDefaultTab("files")} className="gap-1.5">
                <FileText className="w-4 h-4" /> <span className="hidden md:inline">Files</span>
              </TabsTrigger>
              <TabsTrigger value="conclusion" onClick={() => setDefaultTab("conclusion")} className="gap-1.5">
                <Rocket className="w-4 h-4" /> <span className="hidden md:inline">Conclusion</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Eye className="text-primary" /> Project Overview
                </h2>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-border/50 hover:border-primary/30 shadow-md">
                  <CardContent className="p-6">
                    <p className="mb-4">
                      This project is an in-depth analysis of GoodCabs' operations, focusing on:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-6">
                      <li>Trip volume & revenue trends</li>
                      <li>New vs repeat passenger behavior</li>
                      <li>City-wise performance & customer satisfaction</li>
                      <li>Target vs actual business performance</li>
                    </ul>
                    
                    <p className="mb-4">To achieve this, I:</p>
                    <ul className="list-none space-y-2">
                      <li className="flex items-start">
                        <span className="inline-flex justify-center items-center h-5 w-5 text-[10px] rounded-full bg-primary text-white font-bold mr-2 mt-0.5">✓</span>
                        Designed a Power BI dashboard for interactive reporting
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex justify-center items-center h-5 w-5 text-[10px] rounded-full bg-primary text-white font-bold mr-2 mt-0.5">✓</span>
                        Structured a PostgreSQL database and imported data
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex justify-center items-center h-5 w-5 text-[10px] rounded-full bg-primary text-white font-bold mr-2 mt-0.5">✓</span>
                        Wrote SQL queries to extract key insights
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex justify-center items-center h-5 w-5 text-[10px] rounded-full bg-primary text-white font-bold mr-2 mt-0.5">✓</span>
                        Created data models to optimize Power BI relationships
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex justify-center items-center h-5 w-5 text-[10px] rounded-full bg-primary text-white font-bold mr-2 mt-0.5">✓</span>
                        Provided strategic recommendations for business growth
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </section>
            </TabsContent>
            
            {/* Data Setup & SQL Queries Tab */}
            <TabsContent value="data-setup" className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Database className="text-primary" /> Data Setup & SQL Queries
                </h2>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-border/50 hover:border-primary/30 shadow-md">
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="db-creation">
                        <AccordionTrigger className="hover:text-primary text-base font-medium py-3">
                          Database Creation in PostgreSQL
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="bg-card/20 p-4 rounded-md overflow-x-auto">
                            <pre className="text-sm">
                              {`CREATE DATABASE GoodCabs;`}
                            </pre>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="table-creation">
                        <AccordionTrigger className="hover:text-primary text-base font-medium py-3">
                          Creating Tables (Example Snippet)
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="bg-card/20 p-4 rounded-md overflow-x-auto">
                            <pre className="text-sm">
                              {`CREATE TABLE IF NOT EXISTS dim_city (
    city_id VARCHAR(10) PRIMARY KEY,
    city_name VARCHAR(50) NOT NULL
);

-- Additional tables: dim_date, fact_passenger_summary, dim_repeat_trip_distribution,
-- fact_trips, city_target_passenger_rating, monthly_target_new_passengers,
-- monthly_target_trips, etc.`}
                            </pre>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="import-data">
                        <AccordionTrigger className="hover:text-primary text-base font-medium py-3">
                          Importing CSV Data
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="bg-card/20 p-4 rounded-md overflow-x-auto">
                            <pre className="text-sm">
                              {`COPY dim_city FROM '/path/to/dim_city.csv' DELIMITER ',' CSV HEADER;
-- Continue for other tables in correct order`}
                            </pre>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="trip-analysis">
                        <AccordionTrigger className="hover:text-primary text-base font-medium py-3">
                          Trip Volume Analysis Query
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="bg-card/20 p-4 rounded-md overflow-x-auto">
                            <pre className="text-sm">
                              {`-- Trip Volume Analysis by City
WITH trip_data AS (
  SELECT 
    city_name,
    trip_date,
    COUNT(*) as trip_count,
    SUM(fare_amount) as total_revenue,
    AVG(rating) as avg_rating
  FROM trips t
  JOIN cities c ON t.city_id = c.city_id
  WHERE trip_date BETWEEN '2022-01-01' AND '2022-12-31'
  GROUP BY city_name, trip_date
)
SELECT 
  city_name,
  SUM(trip_count) as yearly_trips,
  ROUND(SUM(total_revenue), 2) as yearly_revenue,
  ROUND(AVG(avg_rating), 1) as average_rating
FROM trip_data
GROUP BY city_name
ORDER BY yearly_revenue DESC;`}
                            </pre>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="customer-retention">
                        <AccordionTrigger className="hover:text-primary text-base font-medium py-3">
                          Customer Retention Analysis
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="bg-card/20 p-4 rounded-md overflow-x-auto">
                            <pre className="text-sm">
                              {`-- New vs Repeat Customer Analysis
WITH customer_trips AS (
  SELECT 
    customer_id,
    MIN(trip_date) as first_trip_date,
    COUNT(*) as total_trips,
    SUM(fare_amount) as total_spent,
    AVG(rating) as avg_rating
  FROM trips
  GROUP BY customer_id
),
classified_customers AS (
  SELECT
    customer_id,
    CASE 
      WHEN total_trips = 1 THEN 'New' 
      WHEN total_trips BETWEEN 2 AND 5 THEN 'Occasional' 
      ELSE 'Regular' 
    END as customer_type,
    total_trips,
    total_spent,
    avg_rating
  FROM customer_trips
)
SELECT
  customer_type,
  COUNT(*) as customer_count,
  ROUND(AVG(total_trips), 1) as avg_trips_per_customer,
  ROUND(AVG(total_spent), 2) as avg_spend_per_customer,
  ROUND(AVG(avg_rating), 1) as avg_rating
FROM classified_customers
GROUP BY customer_type
ORDER BY avg_spend_per_customer DESC;`}
                            </pre>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </section>
            </TabsContent>
            
            {/* Power BI Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Monitor className="text-primary" /> Power BI Dashboard
                </h2>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-border/50 hover:border-primary/30 shadow-md">
                  <CardContent className="p-0">
                    <div className="aspect-video w-full">
                      <iframe 
                        title="GoodCabs Dashboard" 
                        src="https://app.powerbi.com/reportEmbed?reportId=9e0825b7-06b5-4209-ae7d-df25d95de537&autoAuth=true&ctid=7c917c3d-4a50-4092-a77b-171388bb6f94" 
                        className="w-full h-full border-none"
                        allowFullScreen 
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <div className="mt-6">
                  <h3 className="text-xl font-medium mb-4">Dashboard Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FeatureCard title="KPI Cards">
                      Total trips, revenue, passenger ratings
                    </FeatureCard>
                    <FeatureCard title="City-Wise Performance">
                      Compare revenue, trip volume, satisfaction
                    </FeatureCard>
                    <FeatureCard title="New vs Repeat Passengers">
                      Retention trends and customer behavior
                    </FeatureCard>
                    <FeatureCard title="Trip Volume Trends">
                      Demand changes over time
                    </FeatureCard>
                    <FeatureCard title="Target vs Actual Metrics">
                      Company goals vs real data
                    </FeatureCard>
                    <FeatureCard title="Filters & Drilldowns">
                      City, Month, Passenger Type
                    </FeatureCard>
                  </div>
                </div>
              </section>
            </TabsContent>
            
            {/* Key Insights & Recommendations Tab */}
            <TabsContent value="insights" className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Lightbulb className="text-primary" /> Key Insights & Recommendations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InsightCard title="Repeat Customers Generate More Revenue, but Retention is Low">
                    <p className="mb-2">Repeat customers spend significantly more than new users, but the retention rate is concerning.</p>
                    <p className="font-medium text-primary">Solution: Implement loyalty programs and targeted offers to increase customer retention.</p>
                  </InsightCard>
                  
                  <InsightCard title="Jaipur is the Most Profitable City">
                    <p className="mb-2">Jaipur consistently outperforms other cities in revenue generation and trip volume.</p>
                    <p className="font-medium text-primary">Solution: Analyze and replicate Jaipur's strategies in underperforming cities.</p>
                  </InsightCard>
                  
                  <InsightCard title="Repeat Customers Give Lower Ratings">
                    <p className="mb-2">Analysis shows repeat customers tend to provide lower satisfaction ratings over time.</p>
                    <p className="font-medium text-primary">Solution: Improve service quality and invest in driver training programs.</p>
                  </InsightCard>
                  
                  <InsightCard title="Declining Trip Trends">
                    <p className="mb-2">Trip volume has been on a downward trend for the past two quarters.</p>
                    <p className="font-medium text-primary">Solution: Introduce discounts during off-peak hours and develop referral programs.</p>
                  </InsightCard>
                </div>
              </section>
            </TabsContent>
            
            {/* Challenges & Learnings Tab */}
            <TabsContent value="challenges" className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <GraduationCap className="text-primary" /> Challenges & Learnings
                </h2>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-border/50 hover:border-primary/30 shadow-md">
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="challenge-1">
                        <AccordionTrigger className="hover:text-primary text-base font-medium py-3">
                          Foreign Key Constraint Issues in PostgreSQL
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground mb-2">
                            Initially encountered errors when importing data due to foreign key constraints.
                          </p>
                          <p className="text-muted-foreground">
                            <span className="font-medium">Solution:</span> Resolved by carefully planning the import sequence, ensuring parent tables were populated before child tables.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="challenge-2">
                        <AccordionTrigger className="hover:text-primary text-base font-medium py-3">
                          Displaying City Names Above Bars in Power BI
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground mb-2">
                            Struggled with showing city names directly above bar charts in Power BI.
                          </p>
                          <p className="text-muted-foreground">
                            <span className="font-medium">Solution:</span> Used custom DAX measures and formatting techniques to display city names as data labels above each bar.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="challenge-3">
                        <AccordionTrigger className="hover:text-primary text-base font-medium py-3">
                          Comparing Targets vs. Actuals
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground mb-2">
                            Creating visualizations that effectively compared target metrics against actual performance was challenging.
                          </p>
                          <p className="text-muted-foreground">
                            <span className="font-medium">Solution:</span> Implemented custom DAX formulas and combination charts to show both metrics in a visually intuitive way.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </section>
            </TabsContent>
            
            {/* Project Files & Links Tab */}
            <TabsContent value="files" className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Link2 className="text-primary" /> Project Files & Links
                </h2>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-border/50 hover:border-primary/30 shadow-md">
                  <CardContent className="p-6 flex flex-col space-y-4">
                    <div className="flex items-center space-x-2">
                      <Monitor className="text-primary h-5 w-5" />
                      <a 
                        href="https://shorturl.at/KKjrs" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center"
                      >
                        Live Dashboard Link
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Github className="text-primary h-5 w-5" />
                      <a 
                        href="https://github.com/Subhrajyouti/GoodCabs-Analytics" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center"
                      >
                        GitHub Repository
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </TabsContent>
            
            {/* Conclusion Tab */}
            <TabsContent value="conclusion" className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Rocket className="text-primary" /> Conclusion & Next Steps
                </h2>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-border/50 hover:border-primary/30 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-3">Key Takeaways</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-6 text-muted-foreground">
                      <li>Repeat customers drive revenue, but retention is low</li>
                      <li>Jaipur is outperforming other cities—replicate its success</li>
                      <li>Customer satisfaction needs improvement for repeat users</li>
                      <li>Declining trip trends require new marketing strategies</li>
                    </ul>
                    
                    <h3 className="text-lg font-medium mb-3">Next Steps</h3>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Expand the dashboard with predictive analytics</li>
                      <li>Automate reporting with scheduled SQL queries</li>
                      <li>Monitor the impact of new retention strategies</li>
                      <li>Develop driver performance metrics to improve customer satisfaction</li>
                    </ul>
                  </CardContent>
                </Card>
              </section>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-border/50 hover:border-primary/30 shadow-md">
    <CardContent className="p-6">
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{children}</p>
    </CardContent>
  </Card>
);

// Insight Card Component
const InsightCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-border/50 hover:border-primary/30 shadow-md">
    <CardContent className="p-6">
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="text-sm text-muted-foreground">{children}</div>
    </CardContent>
  </Card>
);

export default GoodCabsProject;
