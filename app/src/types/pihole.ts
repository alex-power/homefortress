export interface PiholeStatus {
  status: string
  queries_today: number
  ads_blocked_today: number
  ads_percentage_today: number
  unique_domains: number
  queries_forwarded: number
  queries_cached: number
  clients_ever_seen: number
  unique_clients: number
  dns_queries_all_types: number
  reply_NODATA: number
  reply_NXDOMAIN: number
  reply_CNAME: number
  reply_IP: number
  privacy_level: number
  gravity_size: number
}

export interface QueryType {
  name: string
  count: number
  percentage: number
}

export interface ForwardDestination {
  name: string
  count: number
  percentage: number
}

export interface Query {
  timestamp: number
  type: string
  domain: string
  client: string
  status: number
  dnssec: number
  reply: string
  response_time: number
}

export interface TopItem {
  domain: string
  count: number
}

export interface ClientItem {
  name: string
  ip: string
  count: number
}

export interface PiholeConfig {
  api_port: number
  web_port: number
  interface: string
  blocking_mode: string
  privacy_level: number
}

export interface PiholeListItem {
  id: number
  type: string
  domain: string
  enabled: boolean
  date_added: number
  date_modified: number
  comment: string
  groups: number[]
}

export interface PiholeGroup {
  id: number
  name: string
  description: string
  enabled: boolean
}

