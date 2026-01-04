
import React, { useState, useRef } from 'react';
import { editImageWithAI, getStyleAdvice } from '../services/geminiService';

const StyleLabView: React.FC = () => {
  const [baseImage, setBaseImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState<string | null>(null);
  const [chatLoading, setChatLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBaseImage(reader.result as string);
        setEditedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!baseImage || !prompt) return;
    setLoading(true);
    const result = await editImageWithAI(baseImage, prompt);
    if (result) {
      setEditedImage(result);
    } else {
      alert("Failed to edit image. Try a different prompt.");
    }
    setLoading(false);
  };

  const handleChat = async () => {
    if (!chatInput) return;
    setChatLoading(true);
    const advice = await getStyleAdvice(chatInput);
    setChatResponse(advice);
    setChatLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs">Powered by Nano Banana</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-2 mb-4">AI Style Lab</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">Upload a photo and let our AI show you how a new hairstyle, color, or makeup would look on you before you book.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Visual Editor */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Appearance Visualizer
            </h2>

            <div className="mb-8 aspect-square bg-slate-100 rounded-2xl flex items-center justify-center overflow-hidden relative border-2 border-dashed border-slate-200">
              {editedImage ? (
                <img src={editedImage} alt="AI Preview" className="w-full h-full object-cover" />
              ) : baseImage ? (
                <img src={baseImage} alt="Original" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-8">
                  <div className="text-slate-300 mb-4">
                    <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-slate-400 mb-6">Upload a clear photo of your face</p>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold shadow-lg"
                  >
                    Select Photo
                  </button>
                </div>
              )}

              {loading && (
                <div className="absolute inset-0 bg-indigo-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-white p-8">
                  <svg className="animate-spin h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="font-bold text-center">Gemini is processing your transformation...</p>
                </div>
              )}
            </div>

            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />

            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700">What would you like to try?</label>
              <textarea 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none h-24"
                placeholder="Ex: Add a retro 70s filter, change hair color to platinum blonde, add dramatic smokey eye makeup..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="flex gap-4">
                <button 
                  disabled={!baseImage || loading || !prompt}
                  onClick={handleEdit}
                  className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition shadow-lg"
                >
                  Generate Preview
                </button>
                <button 
                  onClick={() => { setBaseImage(null); setEditedImage(null); setPrompt(''); }}
                  className="px-6 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Style Advisor Chat */}
          <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl text-white">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Style Advisor Chat
            </h2>

            <div className="bg-slate-800 rounded-2xl p-6 mb-8 h-96 overflow-y-auto border border-slate-700">
              {chatResponse ? (
                <div className="space-y-4">
                   <div className="flex justify-end">
                    <div className="bg-indigo-600 text-white px-4 py-2 rounded-2xl rounded-tr-none text-sm max-w-[80%]">
                      {chatInput}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-slate-700 text-slate-200 px-4 py-2 rounded-2xl rounded-tl-none text-sm max-w-[80%] whitespace-pre-wrap">
                      {chatResponse}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 text-center">
                  <p className="mb-4">Ask me anything about beauty trends, hair types, or saloon recommendations!</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <button onClick={() => setChatInput('What hairstyle suits an oval face?')} className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-full transition">Face shapes?</button>
                    <button onClick={() => setChatInput('Best saloon for a facial in downtown?')} className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-full transition">Saloons nearby?</button>
                    <button onClick={() => setChatInput('How to maintain hair color longer?')} className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-full transition">Color maintenance?</button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <input 
                type="text"
                placeholder="Type your message..."
                className="w-full bg-slate-800 border-none rounded-xl py-4 pl-4 pr-16 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChat()}
              />
              <button 
                onClick={handleChat}
                disabled={chatLoading || !chatInput}
                className="absolute right-2 top-2 bottom-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {chatLoading ? (
                   <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleLabView;
