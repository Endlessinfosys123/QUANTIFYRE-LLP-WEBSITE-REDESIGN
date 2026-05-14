"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, Italic, List, ListOrdered, 
  Quote, Undo, Redo, Link as LinkIcon, 
  ImageIcon, Heading1, Heading2, Code
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export const TipTapEditor = ({ content, onChange, placeholder = "Start writing..." }: TipTapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: true }),
      Placeholder.configure({ placeholder }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[400px] px-6 py-4 text-white font-medium',
      },
    },
  });

  if (!editor) return null;

  const MenuBar = () => (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-[#1E1E2E] bg-[#13131F]">
      <MenuButton 
        onClick={() => editor.chain().focus().toggleBold().run()} 
        active={editor.isActive('bold')}
        icon={<Bold size={16} />} 
      />
      <MenuButton 
        onClick={() => editor.chain().focus().toggleItalic().run()} 
        active={editor.isActive('italic')}
        icon={<Italic size={16} />} 
      />
      <MenuButton 
        onClick={() => editor.chain().focus().toggleCode().run()} 
        active={editor.isActive('code')}
        icon={<Code size={16} />} 
      />
      <div className="w-px h-6 bg-[#1E1E2E] mx-1" />
      <MenuButton 
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
        active={editor.isActive('heading', { level: 1 })}
        icon={<Heading1 size={16} />} 
      />
      <MenuButton 
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
        active={editor.isActive('heading', { level: 2 })}
        icon={<Heading2 size={16} />} 
      />
      <div className="w-px h-6 bg-[#1E1E2E] mx-1" />
      <MenuButton 
        onClick={() => editor.chain().focus().toggleBulletList().run()} 
        active={editor.isActive('bulletList')}
        icon={<List size={16} />} 
      />
      <MenuButton 
        onClick={() => editor.chain().focus().toggleOrderedList().run()} 
        active={editor.isActive('orderedList')}
        icon={<ListOrdered size={16} />} 
      />
      <MenuButton 
        onClick={() => editor.chain().focus().toggleBlockquote().run()} 
        active={editor.isActive('blockquote')}
        icon={<Quote size={16} />} 
      />
      <div className="w-px h-6 bg-[#1E1E2E] mx-1" />
      <MenuButton 
        onClick={() => {
          const url = window.prompt('URL');
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }} 
        active={editor.isActive('link')}
        icon={<LinkIcon size={16} />} 
      />
      <MenuButton 
        onClick={() => {
          const url = window.prompt('Image URL');
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }} 
        icon={<ImageIcon size={16} />} 
      />
      <div className="flex-1" />
      <MenuButton onClick={() => editor.chain().focus().undo().run()} icon={<Undo size={16} />} />
      <MenuButton onClick={() => editor.chain().focus().redo().run()} icon={<Redo size={16} />} />
    </div>
  );

  return (
    <div className="border border-[#1E1E2E] rounded-2xl overflow-hidden bg-[#0A0A0F] focus-within:border-[#6C3FEF] transition-all">
      <MenuBar />
      <EditorContent editor={editor} />
    </div>
  );
};

const MenuButton = ({ onClick, active, icon }: { onClick: any, active?: boolean, icon: any }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "p-2 rounded-lg transition-all",
      active ? "bg-[#6C3FEF] text-white" : "text-[#A0A0B0] hover:bg-[#1E1E2E] hover:text-white"
    )}
  >
    {icon}
  </button>
);
