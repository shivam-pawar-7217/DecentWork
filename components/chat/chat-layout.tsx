"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Send, Paperclip, MoreHorizontal, Phone, Video, FileText, Image, Lock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

const contacts = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I've reviewed your proposal and I'm interested in moving forward.",
    time: "2h ago",
    unread: 2,
    online: true,
    project: "Smart Contract Development",
  },
  {
    id: 2,
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Can you provide more details about your experience with NFTs?",
    time: "Yesterday",
    unread: 0,
    online: false,
    project: "UI/UX Design for DeFi App",
  },
  {
    id: 3,
    name: "Mike Rivera",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The milestone has been approved. Payment has been released.",
    time: "2d ago",
    unread: 0,
    online: true,
    project: "NFT Collection Creation",
  },
  {
    id: 4,
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Let's schedule a call to discuss the project requirements.",
    time: "3d ago",
    unread: 0,
    online: false,
    project: "Web3 Frontend Development",
  },
]

const messages = [
  {
    id: 1,
    senderId: 1,
    text: "Hi there! I've reviewed your proposal for the Smart Contract Development project.",
    time: "10:30 AM",
    read: true,
  },
  {
    id: 2,
    senderId: 1,
    text: "I'm impressed with your experience and portfolio. I think you'd be a great fit for this project.",
    time: "10:32 AM",
    read: true,
  },
  {
    id: 3,
    senderId: "me",
    text: "Thank you for considering my proposal! I'm excited about the opportunity to work on your DeFi protocol.",
    time: "10:35 AM",
    read: true,
  },
  {
    id: 4,
    senderId: 1,
    text: "Great! I have a few questions about your approach to smart contract security. How do you typically handle auditing and testing?",
    time: "10:40 AM",
    read: true,
  },
  {
    id: 5,
    senderId: "me",
    text: "I follow a comprehensive security approach that includes static analysis, manual code review, and automated testing with tools like Hardhat and Slither. I also implement formal verification where appropriate and always conduct thorough gas optimization.",
    time: "10:45 AM",
    read: true,
  },
  {
    id: 6,
    senderId: 1,
    text: "That sounds excellent. When would you be available to start? We're hoping to begin development next week.",
    time: "10:50 AM",
    read: false,
  },
  {
    id: 7,
    senderId: 1,
    text: "Also, I've attached the technical specifications document for your review.",
    time: "10:51 AM",
    read: false,
    attachment: {
      type: "document",
      name: "defi_protocol_specs.pdf",
      size: "2.4 MB",
    },
  },
]

export default function ChatLayout() {
  const [activeContact, setActiveContact] = useState(contacts[0])
  const [messageText, setMessageText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const { theme, setTheme } = useTheme()

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.project.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (messageText.trim() === "") return

    // In a real app, you would send this to an API
    console.log("Sending message:", messageText)
    setMessageText("")
  }

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className={`container mx-auto px-4 py-8`}>
      <Card className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-[calc(100vh-120px)] overflow-hidden">
        {/* Contacts Sidebar */}
        <div className="border-r">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="p-4">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">
                All
              </TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">
                Unread
              </TabsTrigger>
              <TabsTrigger value="archived" className="flex-1">
                Archived
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="overflow-y-auto h-[calc(100%-130px)]">
            <AnimatePresence>
              {filteredContacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    className={`w-full text-left p-4 border-b hover:bg-muted/50 transition-colors ${
                      activeContact.id === contact.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setActiveContact(contact)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={contact.avatar} alt={contact.name} />
                          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate">{contact.name}</h3>
                          <span className="text-xs text-muted-foreground">{contact.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                        <p className="text-xs text-primary truncate mt-1">{contact.project}</p>
                      </div>
                      {contact.unread > 0 && <Badge className="ml-auto">{contact.unread}</Badge>}
                    </div>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Chat Area */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium">{activeContact.name}</h2>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${activeContact.online ? "bg-green-500" : "bg-muted-foreground"}`}
                  ></span>
                  <span className="text-xs text-muted-foreground">{activeContact.online ? "Online" : "Offline"}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {theme === "dark" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-sun"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-moon"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex justify-center mb-6">
              <Badge variant="outline" className="text-xs text-muted-foreground">
                Today
              </Badge>
            </div>

            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}>
                <div className="flex gap-2 max-w-[80%]">
                  {message.senderId !== "me" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                      <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.senderId === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      {message.attachment && (
                        <div className="mt-2 p-2 bg-background/10 rounded flex items-center gap-2">
                          {message.attachment.type === "document" ? (
                            <FileText className="h-4 w-4" />
                          ) : (
                            <Image className="h-4 w-4" />
                          )}
                          <div className="text-xs">
                            <p className="font-medium">{message.attachment.name}</p>
                            <p>{message.attachment.size}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center mt-1 gap-1">
                      <p className="text-xs text-muted-foreground">{message.time}</p>
                      {message.senderId === "me" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`${message.read ? "text-primary" : "text-muted-foreground"}`}
                        >
                          <path d="M18 6 7 17l-5-5" />
                          <path d="m22 10-7.5 7.5L13 16" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <div className="relative flex-1">
                <Input
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="pr-10"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage()
                    }
                  }}
                />
                <div className="absolute right-3 top-2.5 flex items-center text-xs text-muted-foreground gap-1">
                  <Lock className="h-3 w-3" />
                  <span>Encrypted</span>
                </div>
              </div>
              <Button size="icon" onClick={handleSendMessage} disabled={messageText.trim() === ""}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

