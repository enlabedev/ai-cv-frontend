import { useState, useEffect } from 'react';

export interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: '¡Hola! Soy el asistente virtual de Enrique. ¿En qué puedo ayudarte hoy?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');

    useEffect(() => {
        let storedSessionId = sessionStorage.getItem('chatSessionId');
        if (!storedSessionId) {
            storedSessionId = crypto.randomUUID();
            sessionStorage.setItem('chatSessionId', storedSessionId);
        }
        setSessionId(storedSessionId);
    }, []);

    const addMessage = (message: Message) => {
        setMessages((prev) => [...prev, message]);
    };

    const sendMessage = async (content: string) => {
        if (!content.trim()) return;

        setIsLoading(true);
        const userMessage: Message = { role: 'user', content };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const response = await fetch(`${import.meta.env.PUBLIC_API_CHAT}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: content, sessionId }),
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            const assistantMessage: Message = { role: 'assistant', content: data.answer };
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error(error);
            const errorMessage: Message = { role: 'assistant', content: 'Lo siento, hubo un error de conexión.' };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return { messages, isLoading, sendMessage, addMessage };
}