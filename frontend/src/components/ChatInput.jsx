import { useState } from 'react';
import useSendMessage from '../hooks/useSendMessage';

import { HiMiniPaperAirplane } from 'react-icons/hi2';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, loading } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await sendMessage(message);

    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-2">
      <label className="input flex items-center gap-2 rounded-full bg-base-200">
        <input
          type="text"
          className="grow"
          placeholder="Aa"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-circle btn-primary btn-sm -rotate-45">
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <HiMiniPaperAirplane />
          )}
        </button>
      </label>
    </form>
  );
};
export default ChatInput;
