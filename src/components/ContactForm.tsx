import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { TextArea } from './ui/TextArea';
import { Phone, Calendar, User, Mail, Send } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  meeting_datetime: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  meeting_datetime?: string;
  message?: string;
}

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    meeting_datetime: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
      isValid = false;
    } else if (!/^\+?[\d\s-]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
      isValid = false;
    }

    if (!formData.meeting_datetime) {
      newErrors.meeting_datetime = 'Date and time required';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch(`${import.meta.env.PUBLIC_API_CHAT}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error sending message');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        meeting_datetime: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage('There was an error sending the message. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center p-10 bg-green-50 dark:bg-green-900/20 rounded-3xl animate-fade-in">
        <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">Message sent!</h3>
        <p className="text-green-600 dark:text-green-300">
          Thanks for contacting me. I will review your meeting request and confirm soon.
        </p>
        <Button 
          variant="outline" 
          className="mt-6" 
          onClick={() => setStatus('idle')}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <Input 
          type="text" 
          name="name"
          placeholder="Your Name" 
          value={formData.name}
          onChange={handleChange}
          required 
          icon={<User size={20} />}
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && <p className="text-xs text-red-500 ml-1">{errors.name}</p>}
      </div>

      <div className="space-y-1">
        <Input 
          type="email" 
          name="email"
          placeholder="Your Email (e.g. user@email.com)" 
          value={formData.email}
          onChange={handleChange}
          required 
          icon={<Mail size={20} />}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1">
            <Input 
            type="tel" 
            name="phone"
            placeholder="Phone" 
            value={formData.phone}
            onChange={handleChange}
            required 
            icon={<Phone size={20} />}
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && <p className="text-xs text-red-500 ml-1">{errors.phone}</p>}
        </div>

        <div className="space-y-1">
          <Input 
            type="datetime-local" 
            name="meeting_datetime"
            value={formData.meeting_datetime}
            onChange={handleChange}
            required 
            icon={<Calendar size={20} />}
            className={`w-full ${errors.meeting_datetime ? 'border-red-500' : ''}`}
          />
          {errors.meeting_datetime && <p className="text-xs text-red-500 ml-1">{errors.meeting_datetime}</p>}
        </div>
      </div>

      <div className="space-y-1">
            <TextArea 
          name="message"
          placeholder="How can I help you?" 
          value={formData.message}
          onChange={handleChange}
          required 
          className={errors.message ? 'border-red-500' : ''}
        />
        {errors.message && <p className="text-xs text-red-500 ml-1">{errors.message}</p>}
      </div>

      {status === 'error' && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
          {errorMessage}
        </div>
      )}

      <Button type="submit" className="w-full sm:w-auto flex items-center gap-2" disabled={status === 'sending'}>
        {status === 'sending' ? (
          <>Sending...</>
        ) : (
          <>
            Send Message
            <Send size={16} />
          </>
        )}
      </Button>
    </form>
  );
}