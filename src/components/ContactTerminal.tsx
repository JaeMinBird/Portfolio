'use client';

import { useState, useRef, useEffect } from 'react';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export function ContactTerminal() {
  const [formData, setFormData] = useState<Partial<ContactFormData>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmitReady, setIsSubmitReady] = useState(false);
  const [isInputActive, setIsInputActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const questions = [
    { key: 'firstName', prompt: 'What\'s your First Name?' },
    { key: 'lastName', prompt: 'What\'s your Last Name?' },
    { key: 'email', prompt: 'What\'s your Email Address?' },
    { key: 'message', prompt: 'What message would you like to send?' }
  ];

  // Email validation regex
  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    if (!isSubmitReady) return;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        resetForm();
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred while sending the message');
    }
  };

  const resetForm = () => {
    setFormData({});
    setCurrentQuestion(0);
    setIsSubmitReady(false);
    setIsInputActive(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const currentQuestionObj = questions[currentQuestion];
      const value = (e.target as HTMLInputElement).value.trim();

      // Validate email specifically
      if (currentQuestionObj.key === 'email' && !validateEmail(value)) {
        alert('Please enter a valid email address');
        return;
      }

      if (value) {
        const updatedFormData = {
          ...formData,
          [currentQuestionObj.key]: value
        };

        setFormData(updatedFormData);
        setCurrentQuestion(prev => prev + 1);
        
        // Only set isSubmitReady if we've reached the end
        if (currentQuestion === questions.length - 1) {
          setIsSubmitReady(true);
        }
      }
    }
  };

  const handleInputClick = (index: number) => {
    setCurrentQuestion(index);
    setIsInputActive(true);
  };

  useEffect(() => {
    if (isInputActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputActive, currentQuestion]);

  return (
    <div className="flex justify-center items-center mt-8 mb-16">
      <div className="relative w-full max-w-2xl border-2 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
        {/* Window Title Bar */}
        <div className="flex justify-between items-center px-4 py-2 bg-white/10 border-b-2 border-white/20">
          <span className="font-mono text-white">contact.exe</span>
          <div className="flex gap-2">
            {['-', '×'].map((button) => (
              <div key={button} className="relative group">
                <span className="font-mono text-white text-xl leading-none neon-hover">
                  {button}
                </span>
                <span className="absolute hidden group-hover:block whitespace-nowrap bg-black/90 text-white text-xs px-2 py-1 rounded bottom-full left-1/2 -translate-x-1/2 mb-2">
                  can&apos;t do that（｀▽´ )
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 font-mono bg-black/80 backdrop-blur-sm">
          <div className="text-white space-y-4">
            {questions.map((q, index) => (
              <div key={q.key} className="mb-2">
                <div className="text-white font-bold">{`> ${q.prompt}`}</div>
                {index <= currentQuestion && (
                  <div className="flex items-center">
                    <input
                      ref={index === currentQuestion ? inputRef : null}
                      id={`contact-${q.key}`}
                      name={q.key}
                      type={q.key === 'email' ? 'email' : 'text'}
                      value={formData[q.key as keyof ContactFormData] || ''}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          [q.key]: e.target.value
                        }));
                      }}
                      onClick={() => handleInputClick(index)}
                      className={`
                        w-full outline-none transition-all duration-300 ease-in-out cursor-text
                        ${index === currentQuestion 
                          ? 'bg-white text-black' 
                          : formData[q.key as keyof ContactFormData] 
                            ? 'bg-transparent text-white' 
                            : 'bg-transparent text-white'}
                        ${(index === questions.length - 1 && isSubmitReady)
                          ? 'bg-transparent text-white caret-transparent' 
                          : 'caret-black'}
                      `}
                      onKeyDown={handleKeyDown}
                      disabled={index !== currentQuestion || (index === questions.length - 1 && isSubmitReady)}
                      autoComplete={
                        q.key === 'firstName' ? 'given-name' :
                        q.key === 'lastName' ? 'family-name' :
                        q.key === 'email' ? 'email' :
                        q.key === 'message' ? 'off' : 
                        'on'
                      }
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 justify-center mt-4 relative z-20">
              <button 
                onClick={handleSubmit}
                disabled={!isSubmitReady}
                className={`
                  px-2 py-1 border text-sm transition-colors relative z-10
                  ${isSubmitReady 
                    ? 'border-white/40 neon-hover hover:border-white/80' 
                    : 'border-white/20 text-white/50 cursor-not-allowed'}
                `}
              >
                Send
              </button>
              <button 
                onClick={resetForm}
                className="px-2 py-1 border border-white/40 text-sm neon-hover hover:border-white/80 transition-colors relative z-10"
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 