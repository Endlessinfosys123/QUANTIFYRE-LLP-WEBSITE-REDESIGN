"use client";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { 
  Bold, Italic, List, ListOrdered, Link as LinkIcon, 
  Image as ImageIcon, Heading1, Heading2, Heading3,
  Quote, Code, Minus
} from 'lucide-react'
import { AdminButton } from '../ui/AdminButton'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export const RichTextEditor = ({
  content,
  onChange,
  placeholder = "Start writing...",
  className,
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  const MenuBar = () => {
    const addLink = () => {
      const url = window.prompt('URL')
      if (url) {
        editor.chain().focus().setLink({ href: url }).run()
      }
    }

    const addImage = () => {
      const url = window.prompt('Image URL')
      if (url) {
        editor.chain().focus().setImage({ src: url }).run()
      }
    }

    return (
      <div className="flex flex-wrap gap-1 p-2 border-b border-[#E5E7EB] bg-[#F9F9FF]">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} icon={<Bold size={16} />} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} icon={<Italic size={16} />} />
        <div className="w-px h-6 bg-gray-200 mx-1" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} icon={<Heading1 size={16} />} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} icon={<Heading2 size={16} />} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} icon={<Heading3 size={16} />} />
        <div className="w-px h-6 bg-gray-200 mx-1" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} icon={<List size={16} />} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} icon={<ListOrdered size={16} />} />
        <div className="w-px h-6 bg-gray-200 mx-1" />
        <ToolbarButton onClick={addLink} active={editor.isActive('link')} icon={<LinkIcon size={16} />} />
        <ToolbarButton onClick={addImage} icon={<ImageIcon size={16} />} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} icon={<Quote size={16} />} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} icon={<Code size={16} />} />
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} icon={<Minus size={16} />} />
      </div>
    )
  }

  return (
    <div className={cn("border border-[#D1D5DB] rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#6C3FEF] focus-within:border-transparent transition-all", className)}>
      <MenuBar />
      <EditorContent 
        editor={editor} 
        className="prose prose-sm max-w-none p-4 min-h-[200px] outline-none" 
      />
    </div>
  )
}

const ToolbarButton = ({ onClick, active, icon }: { onClick: () => void, active?: boolean, icon: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "p-2 rounded-md transition-colors",
      active ? "bg-[#F3F0FF] text-[#6C3FEF]" : "text-[#6B7280] hover:bg-gray-100"
    )}
  >
    {icon}
  </button>
)
