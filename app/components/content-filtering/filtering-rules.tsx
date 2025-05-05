"use client"

import { useState } from "react"
import { Check, Edit, MoreHorizontal, Plus, Trash2, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const categories = [
  {
    id: "1",
    name: "Adult Content",
    description: "Block adult and explicit content",
    enabled: true,
    domains: 12450,
  },
  {
    id: "2",
    name: "Social Media",
    description: "Block social media platforms",
    enabled: true,
    domains: 850,
  },
  {
    id: "3",
    name: "Gambling",
    description: "Block gambling websites",
    enabled: true,
    domains: 3200,
  },
  {
    id: "4",
    name: "Malware",
    description: "Block known malware domains",
    enabled: true,
    domains: 24600,
  },
  {
    id: "5",
    name: "Ads & Trackers",
    description: "Block advertising and tracking domains",
    enabled: true,
    domains: 32800,
  },
]

const customRules = [
  {
    id: "1",
    domain: "example.com",
    type: "block",
    description: "Example domain",
  },
  {
    id: "2",
    domain: "safesearch.google.com",
    type: "allow",
    description: "Safe search",
  },
  {
    id: "3",
    domain: "ads.example.net",
    type: "block",
    description: "Ad network",
  },
]

export function FilteringRules() {
  const [categoryList, setCategoryList] = useState(categories)
  const [ruleList, setRuleList] = useState(customRules)
  const [newRule, setNewRule] = useState({ domain: "", type: "block", description: "" })

  const toggleCategory = (id: string) => {
    setCategoryList(
      categoryList.map((category) => (category.id === id ? { ...category, enabled: !category.enabled } : category)),
    )
  }

  const addRule = () => {
    if (newRule.domain) {
      setRuleList([
        ...ruleList,
        {
          id: (ruleList.length + 1).toString(),
          ...newRule,
        },
      ])
      setNewRule({ domain: "", type: "block", description: "" })
    }
  }

  const deleteRule = (id: string) => {
    setRuleList(ruleList.filter((rule) => rule.id !== id))
  }

  return (
    <Tabs defaultValue="categories" className="space-y-4">
      <TabsList>
        <TabsTrigger value="categories">Content Categories</TabsTrigger>
        <TabsTrigger value="custom">Custom Rules</TabsTrigger>
      </TabsList>
      <TabsContent value="categories" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categoryList.map((category) => (
            <Card key={category.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>{category.name}</CardTitle>
                  <Switch checked={category.enabled} onCheckedChange={() => toggleCategory(category.id)} />
                </div>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  {category.domains.toLocaleString()} domains in database
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="custom">
        <Card>
          <CardHeader>
            <CardTitle>Custom Filtering Rules</CardTitle>
            <CardDescription>Add custom domains to block or allow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-4 mb-6">
              <div className="grid gap-2 flex-1">
                <Label htmlFor="domain">Domain</Label>
                <Input
                  id="domain"
                  placeholder="example.com"
                  value={newRule.domain}
                  onChange={(e) => setNewRule({ ...newRule, domain: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newRule.type}
                  onChange={(e) => setNewRule({ ...newRule, type: e.target.value })}
                >
                  <option value="block">Block</option>
                  <option value="allow">Allow</option>
                </select>
              </div>
              <div className="grid gap-2 flex-1">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  placeholder="Optional description"
                  value={newRule.description}
                  onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                />
              </div>
              <Button onClick={addRule}>
                <Plus className="mr-2 h-4 w-4" />
                Add Rule
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Domain</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ruleList.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.domain}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={rule.type === "block" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}
                      >
                        {rule.type === "block" ? <X className="mr-1 h-3 w-3" /> : <Check className="mr-1 h-3 w-3" />}
                        {rule.type === "block" ? "Block" : "Allow"}
                      </Badge>
                    </TableCell>
                    <TableCell>{rule.description}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => deleteRule(rule.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

