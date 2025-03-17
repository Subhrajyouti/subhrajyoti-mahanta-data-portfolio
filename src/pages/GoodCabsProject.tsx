import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Database, ExternalLink, FileCode, Github, LineChart, Lightbulb, Monitor, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const GoodCabsProject = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section with Cover Image */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img 
            src="/alexander-red-S9qxkJN0f4Q-unsplash.jpg" 
            alt="Yellow taxi cab on city street" 
            className="w-full h-full object-cover brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 flex flex-col justify-center">
            <div className="container max-w-5xl mx-auto px-4">
              <Link to="/" className="inline-flex items-center mb-6 text-white/90 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">GoodCabs Performance Analysis</h1>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline" className="bg-white/20 text-white font-normal backdrop-blur-sm hover:-translate-y-0.5 transition-transform">Power BI</Badge>
                <Badge variant="outline" className="bg-white/20 text-white font-normal backdrop-blur-sm hover:-translate-y-0.5 transition-transform">PostgreSQL</Badge>
                <Badge variant="outline" className="bg-white/20 text-white font-normal backdrop-blur-sm hover:-translate-y-0.5 transition-transform">SQL</Badge>
                <Badge variant="outline" className="bg-white/20 text-white font-normal backdrop-blur-sm hover:-translate-y-0.5 transition-transform">Data Analysis</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="container max-w-5xl mx-auto px-4 py-12">
          {/* Project Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FileCode className="text-primary" /> Project Overview
            </h2>
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-border/50 hover:border-primary/30 shadow-md">
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  This project involved a comprehensive analysis of GoodCabs' operational data to 
                  uncover insights that could drive strategic decisions. Working directly with the 
                  Chief of Operations, I developed a robust data pipeline from PostgreSQL databases into 
                  an interactive Power BI dashboard, enabling real-time monitoring of critical 
                  performance metrics and business KPIs.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Key Features & Contributions */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <LineChart className="text-primary" /> Key Features & Contributions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FeatureCard title="Trip Volume & Revenue Trends">
                Analyzed historical trip data to identify peak times, seasonal patterns, and revenue opportunities.
              </FeatureCard>
              <FeatureCard title="New vs Repeat Passenger Analysis">
                Segmented customer base to understand retention rates and spending patterns across customer types.
              </FeatureCard>
              <FeatureCard title="City-wise Performance Insights">
                Mapped performance metrics by geography to highlight regional strengths and areas for improvement.
              </FeatureCard>
              <FeatureCard title="Target vs Actual Performance">
                Created dynamic benchmarking tools to track actual performance against strategic targets.
              </FeatureCard>
            </div>
          </section>

          {/* Embedded Power BI Dashboard */}
          <section className="mb-12">
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
          </section>

          {/* Data Setup & SQL Queries */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Database className="text-primary" /> Data Setup & SQL Queries
            </h2>
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-border/50 hover:border-primary/30 shadow-md">
              <CardContent className="p-6">
                <Collapsible className="space-y-4">
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full flex justify-between">
                      <span>Trips Data Analysis Query</span>
                      <span>+</span>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
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
                  </CollapsibleContent>
                </Collapsible>
                
                <Collapsible className="space-y-4 mt-4">
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full flex justify-between">
                      <span>Customer Retention Analysis</span>
                      <span>+</span>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
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
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </section>

          {/* Key Insights & Recommendations */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="text-primary" /> Key Insights & Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InsightCard title="Customer Retention Issue">
                Repeat customers spend more, but retention is low. Implement a loyalty program to increase customer retention.
              </InsightCard>
              <InsightCard title="City Performance">
                Jaipur is the most profitable city—replicate success factors in other cities to boost performance.
              </InsightCard>
              <InsightCard title="Service Quality">
                Repeat customers give lower ratings—improve service quality by addressing common complaints.
              </InsightCard>
              <InsightCard title="Declining Demand">
                Trip demand is declining—introduce targeted marketing strategies to reverse the trend.
              </InsightCard>
            </div>
          </section>

          {/* GitHub Repository */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Github className="text-primary" /> GitHub Repository
            </h2>
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-border/50 hover:border-primary/30 shadow-md">
              <CardContent className="p-6 flex justify-center">
                <a 
                  href="https://github.com/username/goodcabs-analytics" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span className="font-medium">View Project Repository</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>
          </section>

          {/* Conclusion & Next Steps */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Rocket className="text-primary" /> Conclusion & Next Steps
            </h2>
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-border/50 hover:border-primary/30 shadow-md">
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  This project provided GoodCabs with actionable insights that led to immediate operational improvements. 
                  The custom dashboard continues to serve as a central monitoring tool for the executive team, enabling 
                  data-driven decision making.
                </p>
                <h3 className="font-medium mb-2">Future Plans:</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Implement predictive analytics to forecast demand patterns</li>
                  <li>Automate reporting processes for operational efficiency</li>
                  <li>Develop impact monitoring tools to track the results of strategic changes</li>
                  <li>Extend analysis to driver performance and satisfaction metrics</li>
                </ul>
              </CardContent>
            </Card>
          </section>
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
      <p className="text-sm text-muted-foreground">{children}</p>
    </CardContent>
  </Card>
);

export default GoodCabsProject;
