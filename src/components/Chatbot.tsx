import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, Loader2, MessageCircle, X, FileUp, FileJson } from 'lucide-react';
import { useChat } from '../hooks/useChat';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isLoading, sendMessage, addMessage } = useChat();
  const [input, setInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);

  const chips = ["Experiencia Cloud"];

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChipClick = (chip: string) => {
    if (!isLoading) sendMessage(`Cuéntame sobre tu ${chip}`);
  };

  /* =========================================
     LÓGICA DE SUBIDA DE CV
     ========================================= */
  const handleCvUploadClick = () => {
    cvInputRef.current?.click();
  };

  const handleCvFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validExtensions = ['.md', '.html', '.pdf', '.docx'];
    const validMimes = [
      'application/pdf', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
      'text/html', 
      'text/markdown', 
      '' 
    ];

    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const isExtensionValid = validExtensions.includes(fileExtension);
    const isMimeValid = validMimes.includes(file.type) || (file.type === '' && fileExtension === '.md');

    if (!isExtensionValid || !isMimeValid) {
      alert('Formato de archivo no válido. Solo se permiten .md, .html, .pdf y .docx');
      e.target.value = ''; 
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/cv/ingest`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analisis_cv_${file.name.split('.')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url); 

    } catch (error) {
      console.error('[CV Upload Error]:', error);
      alert('Hubo un error al procesar el archivo.');
    } finally {
      setIsUploading(false);
      e.target.value = ''; 
    }
  };

  /* =========================================
     NUEVA LÓGICA DE SUBIDA DE JSON
     ========================================= */
  const handleJsonUploadClick = () => {
    jsonInputRef.current?.click();
  };

  const handleJsonFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/json' && !file.name.toLowerCase().endsWith('.json')) {
      alert('Formato no válido. Por favor, sube únicamente un archivo .json');
      e.target.value = '';
      return;
    }

    setIsUploading(true);
    
    try {
      const fileText = await file.text();
      JSON.parse(fileText); // Validamos que el JSON sea íntegro

      const formData = new FormData();
      formData.append('file', file);

      // Enviamos el archivo al endpoint correcto
      const response = await fetch(`${import.meta.env.PUBLIC_API_CHAT}/knowledge/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      // 1. Extraemos la respuesta del backend
      const data = await response.json();

      // 2. Insertamos la respuesta directamente en el chat como el asistente
      addMessage({
        role: 'assistant',
        content: data.answer || data.message || `✅ Se ha cargado el documento ${file.name} a la base de conocimiento exitosamente.`
      });

    } catch (error) {
      console.error('[JSON Upload Error]:', error);
      addMessage({
        role: 'assistant',
        content: '❌ Lo siento, hubo un problema al subir o procesar el archivo JSON.'
      });
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
};

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl transition-transform duration-300 z-50 flex items-center justify-center ${
          isOpen ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 scale-90' : 'bg-brand-blue text-white hover:scale-110'
        }`}
        aria-label="Toggle chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      <div
        className={`fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[400px] h-[600px] max-h-[75vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200 dark:border-gray-700 transition-all duration-300 origin-bottom-right overflow-hidden ${
          isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-brand-blue p-4 flex items-center gap-3 text-white shadow-sm z-10">
          <div className="bg-white/20 p-2 rounded-full">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Enrique's AI Assistant</h3>
            <p className="text-xs text-blue-100">Ask me anything about his profile</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-brand-light dark:bg-gray-900/50 scroll-smooth">
          <div className="flex flex-col gap-4 pb-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end gap-2 max-w-[85%] ${
                  msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-brand-blue text-white' : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-brand-blue dark:text-white'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                
                <div className={`p-3 rounded-2xl text-sm shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-brand-blue text-white rounded-br-none'
                    : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-bl-none text-gray-800 dark:text-gray-200'
                }`}>
                  <div className="prose prose-sm dark:prose-invert max-w-none break-words">
                    <ReactMarkdown
                      components={{
                        ul: ({ ...props }) => <ul className="list-disc pl-4 my-1 space-y-1" {...props} />,
                        ol: ({ ...props }) => <ol className="list-decimal pl-4 my-1 space-y-1" {...props} />,
                        a: ({ ...props }) => <a className="text-blue-500 hover:underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                        p: ({ ...props }) => <p className="mb-1 last:mb-0" {...props} />,
                        strong: ({ ...props }) => <strong className="font-semibold text-current" {...props} />
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 ml-2">
                <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-brand-blue" />
                </div>
                <span className="text-xs font-medium">Escribiendo...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-3 border-t border-gray-100 dark:border-gray-700 flex flex-col gap-3">
          
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide items-center">
            {chips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleChipClick(chip)}
                disabled={isLoading || isUploading}
                className="whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-colors disabled:opacity-50"
              >
                {chip}
              </button>
            ))}
            <button
              onClick={handleCvUploadClick}
              disabled={isLoading || isUploading}
              className="whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-full border border-brand-blue bg-brand-blue/10 text-brand-blue dark:text-blue-300 hover:bg-brand-blue hover:text-white transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileUp className="w-3.5 h-3.5" />}
              Subir CV
            </button>
            <input 
              type="file" 
              ref={cvInputRef} 
              onChange={handleCvFileChange} 
              accept=".md,.html,.pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/html,text/markdown"
              className="hidden" 
            />
            <button
              onClick={handleJsonUploadClick}
              disabled={isLoading || isUploading}
              className="whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-full border border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500 hover:text-white transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileJson className="w-3.5 h-3.5" />}
              Subir JSON
            </button>
            <input 
              type="file" 
              ref={jsonInputRef} 
              onChange={handleJsonFileChange} 
              accept=".json,application/json"
              className="hidden" 
            />

            
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading || isUploading}
              className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-brand-blue dark:focus:border-brand-blue transition-colors disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || isUploading || !input.trim()}
              className="p-2.5 rounded-full bg-brand-blue text-white disabled:opacity-50 disabled:bg-gray-300 dark:disabled:bg-gray-600 transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}