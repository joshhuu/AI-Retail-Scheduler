"use client"

import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend)

export function BarChart({ data, options, className }) {
  const { theme } = useTheme()
  const [chartOptions, setChartOptions] = useState(options)

  useEffect(() => {
    if (theme === "dark") {
      setChartOptions({
        ...options,
        plugins: {
          legend: {
            labels: {
              color: "white",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "white",
            },
          },
          y: {
            ticks: {
              color: "white",
            },
          },
        },
      })
    } else {
      setChartOptions(options)
    }
  }, [theme, options])

  return <Bar data={data} options={chartOptions} className={className} />
}

export function LineChart({ data, options, className }) {
  const { theme } = useTheme()
  const [chartOptions, setChartOptions] = useState(options)

  useEffect(() => {
    if (theme === "dark") {
      setChartOptions({
        ...options,
        plugins: {
          legend: {
            labels: {
              color: "white",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "white",
            },
          },
          y: {
            ticks: {
              color: "white",
            },
          },
        },
      })
    } else {
      setChartOptions(options)
    }
  }, [theme, options])

  return <Line data={data} options={chartOptions} className={className} />
}

