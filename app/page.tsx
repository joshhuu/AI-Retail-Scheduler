"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart } from "@/components/ui/chart"
import { Smile, Meh, Frown, CakeSlice, Package, ShoppingBag, MessageSquare } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { LineChart } from "@/components/ui/chart"
import { Trophy, TrendingUp } from "lucide-react"

// Mock data - in a real application, this would be loaded from CSV files
const mockSweetsMakersData = [
  {
    Employee_ID: "SM001",
    Target_Laddoos: 50,
    Assigned_Laddoos: 50,
    Adjusted_Assigned_Laddoos: 45,
    Target_Jalebis: 40,
    Assigned_Jalebis: 40,
    Adjusted_Assigned_Jalebis: 36,
  },
  {
    Employee_ID: "SM002",
    Target_Laddoos: 50,
    Assigned_Laddoos: 50,
    Adjusted_Assigned_Laddoos: 50,
    Target_Jalebis: 40,
    Assigned_Jalebis: 40,
    Adjusted_Assigned_Jalebis: 40,
  },
  {
    Employee_ID: "SM003",
    Target_Laddoos: 50,
    Assigned_Laddoos: 50,
    Adjusted_Assigned_Laddoos: 40,
    Target_Jalebis: 40,
    Assigned_Jalebis: 40,
    Adjusted_Assigned_Jalebis: 32,
  },
  {
    Employee_ID: "SM004",
    Target_Laddoos: 50,
    Assigned_Laddoos: 50,
    Adjusted_Assigned_Laddoos: 47,
    Target_Jalebis: 40,
    Assigned_Jalebis: 40,
    Adjusted_Assigned_Jalebis: 38,
  },
]

const mockPackagersData = [
  { Employee_ID: "SP001", Target_Packaged: 100, Assigned_Packaged: 100, Adjusted_Assigned_Packaged: 90 },
  { Employee_ID: "SP002", Target_Packaged: 100, Assigned_Packaged: 100, Adjusted_Assigned_Packaged: 100 },
  { Employee_ID: "SP003", Target_Packaged: 100, Assigned_Packaged: 100, Adjusted_Assigned_Packaged: 85 },
  { Employee_ID: "SP004", Target_Packaged: 100, Assigned_Packaged: 100, Adjusted_Assigned_Packaged: 95 },
]

const mockRetailersData = [
  { Employee_ID: "RT001", Target_Sales: 25, Assigned_Sales: 25, Adjusted_Assigned_Sales: 22 },
  { Employee_ID: "RT002", Target_Sales: 25, Assigned_Sales: 25, Adjusted_Assigned_Sales: 25 },
  { Employee_ID: "RT003", Target_Sales: 25, Assigned_Sales: 25, Adjusted_Assigned_Sales: 20 },
  { Employee_ID: "RT004", Target_Sales: 25, Assigned_Sales: 25, Adjusted_Assigned_Sales: 23 },
]

const mockFeedbackData = [
  { Employee_ID: "SM001", Date: "2025-03-09", Rating: "😊", Comment: "Great day at work!" },
  { Employee_ID: "SP002", Date: "2025-03-09", Rating: "😐", Comment: "Average day, some challenges with packaging." },
  { Employee_ID: "RT003", Date: "2025-03-09", Rating: "☹️", Comment: "Difficult customers today." },
  { Employee_ID: "SM004", Date: "2025-03-08", Rating: "😊", Comment: "Productive day!" },
  { Employee_ID: "SP001", Date: "2025-03-08", Rating: "😊", Comment: "Smooth operations." },
  { Employee_ID: "RT002", Date: "2025-03-08", Rating: "😐", Comment: "Sales were okay." },
]

// Add this after the existing mock data (before the Dashboard component)
// Mock performance history data for individual performance tracking
const mockPerformanceHistory = {
  SM001: [
    { date: "2025-03-01", laddoos_assigned: 45, laddoos_completed: 42, jalebis_assigned: 36, jalebis_completed: 33 },
    { date: "2025-03-02", laddoos_assigned: 48, laddoos_completed: 45, jalebis_assigned: 38, jalebis_completed: 36 },
    { date: "2025-03-03", laddoos_assigned: 50, laddoos_completed: 46, jalebis_assigned: 40, jalebis_completed: 37 },
    { date: "2025-03-04", laddoos_assigned: 47, laddoos_completed: 44, jalebis_assigned: 37, jalebis_completed: 35 },
    { date: "2025-03-05", laddoos_assigned: 49, laddoos_completed: 47, jalebis_assigned: 39, jalebis_completed: 38 },
    { date: "2025-03-06", laddoos_assigned: 51, laddoos_completed: 48, jalebis_assigned: 41, jalebis_completed: 39 },
    { date: "2025-03-07", laddoos_assigned: 46, laddoos_completed: 43, jalebis_assigned: 36, jalebis_completed: 34 },
  ],
  
  SM002: [
    { date: "2025-03-01", laddoos_assigned: 40, laddoos_completed: 38, jalebis_assigned: 32, jalebis_completed: 30 },
    { date: "2025-03-02", laddoos_assigned: 42, laddoos_completed: 39, jalebis_assigned: 34, jalebis_completed: 31 },
    { date: "2025-03-03", laddoos_assigned: 44, laddoos_completed: 41, jalebis_assigned: 36, jalebis_completed: 33 },
    { date: "2025-03-04", laddoos_assigned: 41, laddoos_completed: 39, jalebis_assigned: 33, jalebis_completed: 30 },
    { date: "2025-03-05", laddoos_assigned: 45, laddoos_completed: 42, jalebis_assigned: 37, jalebis_completed: 35 },
    { date: "2025-03-06", laddoos_assigned: 47, laddoos_completed: 44, jalebis_assigned: 38, jalebis_completed: 36 },
    { date: "2025-03-07", laddoos_assigned: 43, laddoos_completed: 40, jalebis_assigned: 34, jalebis_completed: 32 }
  ],
  SM003: [
    { date: "2025-03-01", laddoos_assigned: 55, laddoos_completed: 50, jalebis_assigned: 45, jalebis_completed: 40 },
    { date: "2025-03-02", laddoos_assigned: 57, laddoos_completed: 53, jalebis_assigned: 47, jalebis_completed: 42 },
    { date: "2025-03-03", laddoos_assigned: 60, laddoos_completed: 56, jalebis_assigned: 50, jalebis_completed: 46 },
    { date: "2025-03-04", laddoos_assigned: 58, laddoos_completed: 54, jalebis_assigned: 48, jalebis_completed: 44 },
    { date: "2025-03-05", laddoos_assigned: 59, laddoos_completed: 55, jalebis_assigned: 49, jalebis_completed: 45 },
    { date: "2025-03-06", laddoos_assigned: 62, laddoos_completed: 58, jalebis_assigned: 52, jalebis_completed: 48 },
    { date: "2025-03-07", laddoos_assigned: 56, laddoos_completed: 52, jalebis_assigned: 46, jalebis_completed: 42 }
  ],
  SM004: [
    { date: "2025-03-01", laddoos_assigned: 38, laddoos_completed: 35, jalebis_assigned: 30, jalebis_completed: 27 },
    { date: "2025-03-02", laddoos_assigned: 40, laddoos_completed: 37, jalebis_assigned: 32, jalebis_completed: 29 },
    { date: "2025-03-03", laddoos_assigned: 42, laddoos_completed: 38, jalebis_assigned: 34, jalebis_completed: 30 },
    { date: "2025-03-04", laddoos_assigned: 39, laddoos_completed: 36, jalebis_assigned: 31, jalebis_completed: 28 },
    { date: "2025-03-05", laddoos_assigned: 41, laddoos_completed: 39, jalebis_assigned: 33, jalebis_completed: 31 },
    { date: "2025-03-06", laddoos_assigned: 43, laddoos_completed: 40, jalebis_assigned: 35, jalebis_completed: 32 },
    { date: "2025-03-07", laddoos_assigned: 37, laddoos_completed: 34, jalebis_assigned: 29, jalebis_completed: 27 }
  ],
  SM005: [
    { date: "2025-03-01", laddoos_assigned: 50, laddoos_completed: 46, jalebis_assigned: 40, jalebis_completed: 37 },
    { date: "2025-03-02", laddoos_assigned: 52, laddoos_completed: 49, jalebis_assigned: 42, jalebis_completed: 39 },
    { date: "2025-03-03", laddoos_assigned: 55, laddoos_completed: 50, jalebis_assigned: 45, jalebis_completed: 40 },
    { date: "2025-03-04", laddoos_assigned: 53, laddoos_completed: 49, jalebis_assigned: 43, jalebis_completed: 39 },
    { date: "2025-03-05", laddoos_assigned: 54, laddoos_completed: 51, jalebis_assigned: 44, jalebis_completed: 41 },
    { date: "2025-03-06", laddoos_assigned: 57, laddoos_completed: 53, jalebis_assigned: 47, jalebis_completed: 43 },
    { date: "2025-03-07", laddoos_assigned: 51, laddoos_completed: 48, jalebis_assigned: 41, jalebis_completed: 38 }
  ],
  SP001: [
    { date: "2025-03-01", packages_assigned: 90, packages_completed: 85 },
    { date: "2025-03-02", packages_assigned: 92, packages_completed: 87 },
    { date: "2025-03-03", packages_assigned: 95, packages_completed: 90 },
    { date: "2025-03-04", packages_assigned: 88, packages_completed: 83 },
    { date: "2025-03-05", packages_assigned: 93, packages_completed: 89 },
    { date: "2025-03-06", packages_assigned: 97, packages_completed: 92 },
    { date: "2025-03-07", packages_assigned: 91, packages_completed: 86 },
  ],
  SP002: [
    { date: "2025-03-01", packages_assigned: 85, packages_completed: 80 },
    { date: "2025-03-02", packages_assigned: 88, packages_completed: 83 },
    { date: "2025-03-03", packages_assigned: 90, packages_completed: 85 },
    { date: "2025-03-04", packages_assigned: 84, packages_completed: 78 },
    { date: "2025-03-05", packages_assigned: 89, packages_completed: 85 },
    { date: "2025-03-06", packages_assigned: 92, packages_completed: 88 },
    { date: "2025-03-07", packages_assigned: 87, packages_completed: 82 }
  ],
  SP003: [
    { date: "2025-03-01", packages_assigned: 78, packages_completed: 73 },
    { date: "2025-03-02", packages_assigned: 81, packages_completed: 76 },
    { date: "2025-03-03", packages_assigned: 83, packages_completed: 78 },
    { date: "2025-03-04", packages_assigned: 79, packages_completed: 74 },
    { date: "2025-03-05", packages_assigned: 82, packages_completed: 77 },
    { date: "2025-03-06", packages_assigned: 86, packages_completed: 81 },
    { date: "2025-03-07", packages_assigned: 80, packages_completed: 75 }
  ],
  SP004: [
    { date: "2025-03-01", packages_assigned: 95, packages_completed: 90 },
    { date: "2025-03-02", packages_assigned: 98, packages_completed: 93 },
    { date: "2025-03-03", packages_assigned: 100, packages_completed: 95 },
    { date: "2025-03-04", packages_assigned: 96, packages_completed: 91 },
    { date: "2025-03-05", packages_assigned: 99, packages_completed: 94 },
    { date: "2025-03-06", packages_assigned: 103, packages_completed: 98 },
    { date: "2025-03-07", packages_assigned: 97, packages_completed: 92 }
  ],
  SP005: [
    { date: "2025-03-01", packages_assigned: 88, packages_completed: 84 },
    { date: "2025-03-02", packages_assigned: 91, packages_completed: 87 },
    { date: "2025-03-03", packages_assigned: 93, packages_completed: 89 },
    { date: "2025-03-04", packages_assigned: 89, packages_completed: 85 },
    { date: "2025-03-05", packages_assigned: 92, packages_completed: 88 },
    { date: "2025-03-06", packages_assigned: 95, packages_completed: 91 },
    { date: "2025-03-07", packages_assigned: 90, packages_completed: 86 }
  ],
  RT001: [
    { date: "2025-03-01", sales_assigned: 22, sales_completed: 20 },
    { date: "2025-03-02", sales_assigned: 23, sales_completed: 21 },
    { date: "2025-03-03", sales_assigned: 24, sales_completed: 22 },
    { date: "2025-03-04", sales_assigned: 21, sales_completed: 19 },
    { date: "2025-03-05", sales_assigned: 23, sales_completed: 22 },
    { date: "2025-03-06", sales_assigned: 25, sales_completed: 23 },
    { date: "2025-03-07", sales_assigned: 22, sales_completed: 20 },
  ],
  RT002: [
    { date: "2025-03-01", sales_assigned: 18, sales_completed: 16 },
    { date: "2025-03-02", sales_assigned: 19, sales_completed: 17 },
    { date: "2025-03-03", sales_assigned: 20, sales_completed: 18 },
    { date: "2025-03-04", sales_assigned: 17, sales_completed: 15 },
    { date: "2025-03-05", sales_assigned: 19, sales_completed: 17 },
    { date: "2025-03-06", sales_assigned: 21, sales_completed: 19 },
    { date: "2025-03-07", sales_assigned: 18, sales_completed: 16 }
  ],
  RT003: [
    { date: "2025-03-01", sales_assigned: 30, sales_completed: 28 },
    { date: "2025-03-02", sales_assigned: 31, sales_completed: 29 },
    { date: "2025-03-03", sales_assigned: 32, sales_completed: 30 },
    { date: "2025-03-04", sales_assigned: 29, sales_completed: 27 },
    { date: "2025-03-05", sales_assigned: 31, sales_completed: 30 },
    { date: "2025-03-06", sales_assigned: 33, sales_completed: 31 },
    { date: "2025-03-07", sales_assigned: 30, sales_completed: 28 }
  ],
  RT004: [
    { date: "2025-03-01", sales_assigned: 25, sales_completed: 23 },
    { date: "2025-03-02", sales_assigned: 26, sales_completed: 24 },
    { date: "2025-03-03", sales_assigned: 27, sales_completed: 25 },
    { date: "2025-03-04", sales_assigned: 24, sales_completed: 22 },
    { date: "2025-03-05", sales_assigned: 26, sales_completed: 25 },
    { date: "2025-03-06", sales_assigned: 28, sales_completed: 26 },
    { date: "2025-03-07", sales_assigned: 25, sales_completed: 23 }
  ],
  RT005: [
    { date: "2025-03-01", sales_assigned: 28, sales_completed: 26 },
    { date: "2025-03-02", sales_assigned: 29, sales_completed: 27 },
    { date: "2025-03-03", sales_assigned: 30, sales_completed: 28 },
    { date: "2025-03-04", sales_assigned: 27, sales_completed: 25 },
    { date: "2025-03-05", sales_assigned: 29, sales_completed: 28 },
    { date: "2025-03-06", sales_assigned: 31, sales_completed: 29 },
    { date: "2025-03-07", sales_assigned: 28, sales_completed: 26 }
  ],

}
export default function Dashboard() {
  const [orderVolume, setOrderVolume] = useState(1000)
  const [sweetsMakersData, setSweetsMakersData] = useState(mockSweetsMakersData)
  const [packagersData, setPackagersData] = useState(mockPackagersData)
  const [retailersData, setRetailersData] = useState(mockRetailersData)
  const [feedbackData, setFeedbackData] = useState(mockFeedbackData)

  // Add these state variables inside the Dashboard component, after the existing useState declarations
  const [selectedEmployee, setSelectedEmployee] = useState("SM001")
  const [performanceData, setPerformanceData] = useState(mockPerformanceHistory["SM001"])

  // Recalculate targets based on order volume
  // Replace the existing mock-based function with:
const recalculateTargets = async () => {
  try {
    const response = await fetch('http://localhost:5000/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderVolume: orderVolume
      })
    });

    if (!response.ok) throw new Error('Failed to recalculate targets');
    
    const apiData = await response.json();
    
    // Update all worker data states
    setSweetsMakersData(apiData.sweetsMakers);
    setPackagersData(apiData.packagers);
    setRetailersData(apiData.retailers);

  } catch (error) {
    console.error('API Error:', error);
    // Add error handling here
  }
}

  // Add these helper functions inside the Dashboard component, after the recalculateTargets function
  // Find the best worker in each category
  const findBestWorker = (workerGroup, metric) => {
    if (workerGroup === "sweetsMakers") {
      // For sweets makers, find the one with highest completion rate (smallest difference between assigned and adjusted)
      return sweetsMakersData.reduce((best, current) => {
        const currentRatio =
          (current.Adjusted_Assigned_Laddoos / current.Assigned_Laddoos +
            current.Adjusted_Assigned_Jalebis / current.Assigned_Jalebis) /
          2
        const bestRatio =
          (best.Adjusted_Assigned_Laddoos / best.Assigned_Laddoos +
            best.Adjusted_Assigned_Jalebis / best.Assigned_Jalebis) /
          2

        return currentRatio > bestRatio ? current : best
      }, sweetsMakersData[0])
    } else if (workerGroup === "packagers") {
      return packagersData.reduce((best, current) => {
        const currentRatio = current.Adjusted_Assigned_Packaged / current.Assigned_Packaged
        const bestRatio = best.Adjusted_Assigned_Packaged / best.Assigned_Packaged

        return currentRatio > bestRatio ? current : best
      }, packagersData[0])
    } else if (workerGroup === "retailers") {
      return retailersData.reduce((best, current) => {
        const currentRatio = current.Adjusted_Assigned_Sales / current.Assigned_Sales
        const bestRatio = best.Adjusted_Assigned_Sales / best.Assigned_Sales

        return currentRatio > bestRatio ? current : best
      }, retailersData[0])
    }

    return null
  }

  // Handle employee selection change
  const handleEmployeeChange = (employeeId) => {
    setSelectedEmployee(employeeId)
    setPerformanceData(mockPerformanceHistory[employeeId] || [])
  }

  // Add this effect to update performance data when selected employee changes
  useEffect(() => {
    if (mockPerformanceHistory[selectedEmployee]) {
      setPerformanceData(mockPerformanceHistory[selectedEmployee])
    }
  }, [selectedEmployee])

  // Prepare chart data for sweets makers (Laddoos)
  const sweetsMakersLaddoosChartData = {
    labels: sweetsMakersData.map((maker) => maker.Employee_ID),
    datasets: [
      {
        label: "Assigned Laddoos",
        data: sweetsMakersData.map((maker) => maker.Assigned_Laddoos),
        backgroundColor: "rgba(59, 130, 246, 0.8)",
      },
      {
        label: "AI-Adjusted Laddoos",
        data: sweetsMakersData.map((maker) => maker.Adjusted_Assigned_Laddoos),
        backgroundColor: "rgba(99, 102, 241, 0.8)",
      },
    ],
  }

  // Prepare chart data for sweets makers (Jalebis)
  const sweetsMakersJalebisChartData = {
    labels: sweetsMakersData.map((maker) => maker.Employee_ID),
    datasets: [
      {
        label: "Assigned Jalebis",
        data: sweetsMakersData.map((maker) => maker.Assigned_Jalebis),
        backgroundColor: "rgba(249, 115, 22, 0.8)",
      },
      {
        label: "AI-Adjusted Jalebis",
        data: sweetsMakersData.map((maker) => maker.Adjusted_Assigned_Jalebis),
        backgroundColor: "rgba(234, 88, 12, 0.8)",
      },
    ],
  }

  // Prepare chart data for packagers
  const packagersChartData = {
    labels: packagersData.map((packager) => packager.Employee_ID),
    datasets: [
      {
        label: "Assigned Packages",
        data: packagersData.map((packager) => packager.Assigned_Packaged),
        backgroundColor: "rgba(16, 185, 129, 0.8)",
      },
      {
        label: "AI-Adjusted Packages",
        data: packagersData.map((packager) => packager.Adjusted_Assigned_Packaged),
        backgroundColor: "rgba(5, 150, 105, 0.8)",
      },
    ],
  }

  // Prepare chart data for retailers
  const retailersChartData = {
    labels: retailersData.map((retailer) => retailer.Employee_ID),
    datasets: [
      {
        label: "Assigned Sales",
        data: retailersData.map((retailer) => retailer.Assigned_Sales),
        backgroundColor: "rgba(236, 72, 153, 0.8)",
      },
      {
        label: "AI-Adjusted Sales",
        data: retailersData.map((retailer) => retailer.Adjusted_Assigned_Sales),
        backgroundColor: "rgba(219, 39, 119, 0.8)",
      },
    ],
  }

  // Prepare feedback chart data
  const feedbackRatings = feedbackData.reduce((acc, item) => {
    acc[item.Rating] = (acc[item.Rating] || 0) + 1
    return acc
  }, {})

  const feedbackChartData = {
    labels: Object.keys(feedbackRatings),
    datasets: [
      {
        label: "Feedback Count",
        data: Object.values(feedbackRatings),
        backgroundColor: ["rgba(52, 211, 153, 0.8)", "rgba(251, 191, 36, 0.8)", "rgba(239, 68, 68, 0.8)"],
      },
    ],
  }

  // Add these chart data preparations inside the Dashboard component, after the existing chart data preparations
  // Prepare performance trend chart data
  const preparePerformanceTrendData = () => {
    if (!performanceData || performanceData.length === 0) return null

    // Check what type of worker is selected
    const isSweetsMaker = selectedEmployee.startsWith("SM")
    const isPackager = selectedEmployee.startsWith("SP")
    const isRetailer = selectedEmployee.startsWith("RT")

    const labels = performanceData.map((item) => item.date)

    if (isSweetsMaker) {
      return {
        labels,
        datasets: [
          {
            label: "Laddoos Completed",
            data: performanceData.map((item) => item.laddoos_completed),
            borderColor: "rgba(59, 130, 246, 1)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.3,
          },
          {
            label: "Jalebis Completed",
            data: performanceData.map((item) => item.jalebis_completed),
            borderColor: "rgba(249, 115, 22, 1)",
            backgroundColor: "rgba(249, 115, 22, 0.1)",
            tension: 0.3,
          },
        ],
      }
    } else if (isPackager) {
      return {
        labels,
        datasets: [
          {
            label: "Packages Completed",
            data: performanceData.map((item) => item.packages_completed),
            borderColor: "rgba(16, 185, 129, 1)",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            tension: 0.3,
          },
        ],
      }
    } else if (isRetailer) {
      return {
        labels,
        datasets: [
          {
            label: "Sales Completed",
            data: performanceData.map((item) => item.sales_completed),
            borderColor: "rgba(236, 72, 153, 1)",
            backgroundColor: "rgba(236, 72, 153, 0.1)",
            tension: 0.3,
          },
        ],
      }
    }

    return null
  }

  const performanceTrendData = preparePerformanceTrendData()

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Sweets Production Dashboard</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Daily Order Input</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="orderVolume">Order Volume</label>
              <Input
                id="orderVolume"
                type="number"
                value={orderVolume}
                onChange={(e) => setOrderVolume(Number.parseInt(e.target.value))}
                min="1"
              />
            </div>
            <Button onClick={recalculateTargets}>Recalculate Targets</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="sweetsMakers">
        <TabsList className="mb-4">
          <TabsTrigger value="sweetsMakers" className="flex items-center gap-2">
            <CakeSlice className="h-4 w-4" />
            Sweets Makers
          </TabsTrigger>
          <TabsTrigger value="packagers" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Packagers
          </TabsTrigger>
          <TabsTrigger value="retailers" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Retailers
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Feedback
          </TabsTrigger>
          <TabsTrigger value="individual" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Individual Performance
          </TabsTrigger>
        </TabsList>

        {/* Sweets Makers Tab */}
        <TabsContent value="sweetsMakers">
          {/* Best Worker Card */}
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Monthly Best Worker
              </CardTitle>
              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                March 2025
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{findBestWorker("sweetsMakers").Employee_ID}</h3>
                  <p className="text-sm text-muted-foreground">Sweets Maker</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Laddoos Efficiency</p>
                    <p className="text-lg font-medium">
                      {Math.round(
                        (findBestWorker("sweetsMakers").Adjusted_Assigned_Laddoos /
                          findBestWorker("sweetsMakers").Assigned_Laddoos) *
                          100,
                      )}
                      %
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Jalebis Efficiency</p>
                    <p className="text-lg font-medium">
                      {Math.round(
                        (findBestWorker("sweetsMakers").Adjusted_Assigned_Jalebis /
                          findBestWorker("sweetsMakers").Assigned_Jalebis) *
                          100,
                      )}
                      %
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sweets Makers - Laddoos Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={sweetsMakersLaddoosChartData}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                  className="h-[300px]"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sweets Makers - Jalebis Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={sweetsMakersJalebisChartData}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                  className="h-[300px]"
                />
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Sweets Makers - Detailed Data</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Assigned Laddoos</TableHead>
                    <TableHead>AI-Adjusted Laddoos</TableHead>
                    <TableHead>Assigned Jalebis</TableHead>
                    <TableHead>AI-Adjusted Jalebis</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sweetsMakersData.map((maker) => (
                    <TableRow key={maker.Employee_ID}>
                      <TableCell>{maker.Employee_ID}</TableCell>
                      <TableCell>{maker.Assigned_Laddoos}</TableCell>
                      <TableCell>{maker.Adjusted_Assigned_Laddoos}</TableCell>
                      <TableCell>{maker.Assigned_Jalebis}</TableCell>
                      <TableCell>{maker.Adjusted_Assigned_Jalebis}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Packagers Tab */}
        <TabsContent value="packagers">
          {/* Best Worker Card */}
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Monthly Best Worker
              </CardTitle>
              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                March 2025
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{findBestWorker("packagers").Employee_ID}</h3>
                  <p className="text-sm text-muted-foreground">Packager</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Packaging Efficiency</p>
                  <p className="text-lg font-medium">
                    {Math.round(
                      (findBestWorker("packagers").Adjusted_Assigned_Packaged /
                        findBestWorker("packagers").Assigned_Packaged) *
                        100,
                    )}
                    %
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Packagers - Assignment Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={packagersChartData}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                className="h-[300px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Packagers - Detailed Data</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Assigned Packaged</TableHead>
                    <TableHead>AI-Adjusted Packaged</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packagersData.map((packager) => (
                    <TableRow key={packager.Employee_ID}>
                      <TableCell>{packager.Employee_ID}</TableCell>
                      <TableCell>{packager.Assigned_Packaged}</TableCell>
                      <TableCell>{packager.Adjusted_Assigned_Packaged}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Retailers Tab */}
        <TabsContent value="retailers">
          {/* Best Worker Card */}
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Monthly Best Worker
              </CardTitle>
              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                March 2025
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{findBestWorker("retailers").Employee_ID}</h3>
                  <p className="text-sm text-muted-foreground">Retailer</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sales Efficiency</p>
                  <p className="text-lg font-medium">
                    {Math.round(
                      (findBestWorker("retailers").Adjusted_Assigned_Sales /
                        findBestWorker("retailers").Assigned_Sales) *
                        100,
                    )}
                    %
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Retailers - Assignment Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={retailersChartData}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                className="h-[300px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Retailers - Detailed Data</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Assigned Sales</TableHead>
                    <TableHead>AI-Adjusted Sales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {retailersData.map((retailer) => (
                    <TableRow key={retailer.Employee_ID}>
                      <TableCell>{retailer.Employee_ID}</TableCell>
                      <TableCell>{retailer.Assigned_Sales}</TableCell>
                      <TableCell>{retailer.Adjusted_Assigned_Sales}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Feedback Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={feedbackChartData}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          stepSize: 1,
                        },
                      },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                  className="h-[300px]"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <Smile className="h-8 w-8 text-green-500 mb-2" />
                    <div className="text-2xl font-bold">
                      {feedbackData.filter((item) => item.Rating === "😊").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Positive</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <Meh className="h-8 w-8 text-yellow-500 mb-2" />
                    <div className="text-2xl font-bold">
                      {feedbackData.filter((item) => item.Rating === "😐").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Neutral</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <Frown className="h-8 w-8 text-red-500 mb-2" />
                    <div className="text-2xl font-bold">
                      {feedbackData.filter((item) => item.Rating === "☹️").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Negative</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Comment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feedbackData.map((feedback, index) => (
                    <TableRow key={index}>
                      <TableCell>{feedback.Employee_ID}</TableCell>
                      <TableCell>{feedback.Date}</TableCell>
                      <TableCell>{feedback.Rating}</TableCell>
                      <TableCell>{feedback.Comment}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="individual">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Individual Performance Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="flex items-end gap-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <label htmlFor="employeeSelect">Select Employee</label>
                    <Select value={selectedEmployee} onValueChange={handleEmployeeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SM001">SM001 (Sweets Maker)</SelectItem>
                        <SelectItem value="SM002">SM002 (Sweets Maker)</SelectItem>
                        <SelectItem value="SM003">SM003 (Sweets Maker)</SelectItem>
                        <SelectItem value="SM004">SM004 (Sweets Maker)</SelectItem>
                        <SelectItem value="SM005">SM005 (Sweets Maker)</SelectItem>
                        <SelectItem value="SP001">SP001 (Packager)</SelectItem>
                        <SelectItem value="SP002">SP002 (Packager)</SelectItem>
                        <SelectItem value="SP003">SP003 (Packager)</SelectItem>
                        <SelectItem value="SP004">SP004 (Packager)</SelectItem>
                        <SelectItem value="SP005">SP005 (Packager)</SelectItem>
                        <SelectItem value="RT001">RT001 (Retailer)</SelectItem>
                        <SelectItem value="RT002">RT002 (Retailer)</SelectItem>
                        <SelectItem value="RT003">RT003 (Retailer)</SelectItem>
                        <SelectItem value="RT004">RT004 (Retailer)</SelectItem>
                        <SelectItem value="RT005">RT005 (Retailer)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {performanceTrendData && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Trend (Last 7 Days)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <LineChart
                        data={performanceTrendData}
                        options={{
                          scales: {
                            y: {
                              beginAtZero: true,
                            },
                          },
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                        className="h-[300px]"
                      />
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          {selectedEmployee.startsWith("SM") && (
                            <>
                              <TableHead>Laddoos Assigned</TableHead>
                              <TableHead>Laddoos Completed</TableHead>
                              <TableHead>Jalebis Assigned</TableHead>
                              <TableHead>Jalebis Completed</TableHead>
                            </>
                          )}
                          {selectedEmployee.startsWith("SP") && (
                            <>
                              <TableHead>Packages Assigned</TableHead>
                              <TableHead>Packages Completed</TableHead>
                            </>
                          )}
                          {selectedEmployee.startsWith("RT") && (
                            <>
                              <TableHead>Sales Assigned</TableHead>
                              <TableHead>Sales Completed</TableHead>
                            </>
                          )}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {performanceData.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.date}</TableCell>
                            {selectedEmployee.startsWith("SM") && (
                              <>
                                <TableCell>{item.laddoos_assigned}</TableCell>
                                <TableCell>{item.laddoos_completed}</TableCell>
                                <TableCell>{item.jalebis_assigned}</TableCell>
                                <TableCell>{item.jalebis_completed}</TableCell>
                              </>
                            )}
                            {selectedEmployee.startsWith("SP") && (
                              <>
                                <TableCell>{item.packages_assigned}</TableCell>
                                <TableCell>{item.packages_completed}</TableCell>
                              </>
                            )}
                            {selectedEmployee.startsWith("RT") && (
                              <>
                                <TableCell>{item.sales_assigned}</TableCell>
                                <TableCell>{item.sales_completed}</TableCell>
                              </>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

