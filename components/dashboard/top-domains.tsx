"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "ads.example.com",
    total: 432,
  },
  {
    name: "tracker.example.net",
    total: 356,
  },
  {
    name: "analytics.example.org",
    total: 271,
  },
  {
    name: "ads.social.net",
    total: 190,
  },
  {
    name: "metrics.example.io",
    total: 134,
  },
  {
    name: "track.example.com",
    total: 98,
  },
]

export function TopDomains() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

