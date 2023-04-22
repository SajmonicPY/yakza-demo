import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const SpeechForm = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    prompt: '',
    photo: null,
    audioFile: null // added audioFile to the state
  });
  const [generatingSpeech, setGeneratingSpeech] = useState(false);

  const generateSpeech = async () => {
    setGeneratingSpeech(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: form.prompt })
      });
  
      const data = await response.json();
  
      setForm({ ...form, audioFile: data.audioFile });
    } catch (error) {
      console.error(error);
    }

    setGeneratingSpeech(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:8080/api/v1/speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: form.prompt })
      });
  
      const data = await response.json();
  
      setForm({ ...form, audioFile: data.audioFile });
  
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  
  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>
          Create
        </h1>
        <p className='mt-2 text-[#666e75] text-[14px] max-w[500px]'>
          Create imaginative and visually stunning images through Yakza AI and share them with the community.
        </p>
      </div>
  
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
            <FormField 
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="a sea otter with a pearl earring by Johannes Vermeer"
            value={form.prompt}  // value bound to form.prompt
            isSurpriseMe
            onChange={(e) => setForm({ ...form, prompt: e.target.value })} // updates form.prompt
            />
            <div className='relative bg-gray-50 border border-gray-300 text-gray-900 
            text-sm rounded-lg focus:ring-blue-500 focus:border-500 
            w-64 p-3 h-64 flex justify-center items-center'>
            {form.audio && ( 
              <audio
                src={form.audio}
                controls
                className='w-full h-full object-contain'
              />
            )}
            {!form.audio && (
              <img 
                src='https://i.ibb.co/2y2QGZ7/audio-waveform.png'
                alt='audio waveform'
                className='w-9/12 h-9/12 object-contain opacity-40'           
              />
            )}
  
            {loading && (
              <div className='absolute inset-0 z-0 flex justify-center items-center 
                bg-[rgba(0,0,0,0.5)]
                rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>
  
        <div className='mt-5 flex- gap-5'>
          <button
            type='submit'
            //disabled={!form.prompt}
            className='text-white bg-green-700 font-medium rounded-md text-sm w-full 
              sm:w-auto px-5 py-2.5 text-center'
          >
            {loading ? 'Generating...' : 'Generate Speech'}
          </button>
        </div>
      </form>
    </section>
  );
  

} 

export default SpeechForm;
