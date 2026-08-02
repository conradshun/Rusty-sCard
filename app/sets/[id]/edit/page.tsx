import { createClient } from "@/lib/supabase/server"
import type { FlashcardSet, Flashcard } from "@/lib/types"
import { notFound } from "next/navigation"
import { EditSetForm } from "@/components/edit-set-form"
import { FlashcardEditor } from "@/components/flashcard-editor"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function EditSetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: set } = await supabase
    .from("flashcard_sets")
    .select(`
      *,
      flashcards(*)
    `)
    .eq("id", id)
    .single()

  if (!set) {
    notFound()
  }

  const flashcardSet = set as FlashcardSet & { flashcards: Flashcard[] }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="mb-6">
            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Edit Flashcard Set</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Update your flashcard set details and manage individual cards
            </p>
          </div>

          {/* Edit Set Details */}
          <EditSetForm flashcardSet={flashcardSet} />

          {/* Flashcard Editor */}
          <FlashcardEditor flashcardSet={flashcardSet} />
        </div>
      </div>
    </div>
  )
}
