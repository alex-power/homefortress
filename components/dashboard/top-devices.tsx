import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TopDevices() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>LP</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Living Room PC</p>
          <p className="text-sm text-muted-foreground">192.168.1.101</p>
        </div>
        <div className="ml-auto font-medium">3,240 queries</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>MP</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Mom's Phone</p>
          <p className="text-sm text-muted-foreground">192.168.1.102</p>
        </div>
        <div className="ml-auto font-medium">2,180 queries</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>KT</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Kids Tablet</p>
          <p className="text-sm text-muted-foreground">192.168.1.103</p>
        </div>
        <div className="ml-auto font-medium">1,845 queries</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>SL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Smart TV</p>
          <p className="text-sm text-muted-foreground">192.168.1.104</p>
        </div>
        <div className="ml-auto font-medium">1,520 queries</div>
      </div>
    </div>
  )
}

