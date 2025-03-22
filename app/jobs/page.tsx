import type { Metadata } from "next"
import JobListings from "@/components/jobs/job-listings"
import JobFilters from "@/components/jobs/job-filters"
import JobSearch from "@/components/jobs/job-search"
import { SubtleBackground } from "@/components/ui/subtle-background"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/navigation/footer"

export const metadata: Metadata = {
  title: "Job Listings | DecentWork",
  description: "Browse available jobs and find your next gig",
}

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background animations */}
      <SubtleBackground type="wave" intensity="low" className="z-0" />

      {/* Navigation */}
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <h1 className="text-3xl font-bold mb-8">Find Work</h1>

        <JobSearch />

        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <div className="w-full md:w-64 lg:w-72 flex-shrink-0">
            <JobFilters />
          </div>

          <div className="flex-1">
            <JobListings />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

