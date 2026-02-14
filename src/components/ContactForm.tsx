import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { TextArea } from './ui/TextArea';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('success'), 1500);
  };

  if (status === 'success') {
    return (
      <div className="text-center p-10 bg-green-50 dark:bg-green-900/20 rounded-3xl">
        <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">¡Mensaje enviado!</h3>
        <p className="mt-2 text-green-600">Te contactaré lo antes posible, Enrique.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input 
        type="text" 
        placeholder="Enter your Name" 
        required 
        icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
      />
      <Input 
        type="email" 
        placeholder="Enter your Email (e.g. enlabe@gmail.com)" 
        required 
        icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>}
      />
      <TextArea placeholder="Enter your Message" required />
      <Button type="submit" className="w-full sm:w-auto" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Submit'}
      </Button>
    </form>
  );
}