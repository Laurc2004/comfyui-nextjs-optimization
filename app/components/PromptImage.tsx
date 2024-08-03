'use client'
import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const PromptImage: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [promptId, setPromptId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 处理输入框变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: prompt }),
      });

      if (!response.ok) {
        throw new Error('提交失败，请重试');
      }

      const data = await response.json();
      setPromptId(data.id);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  // 轮询获取图片
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (promptId) {
      interval = setInterval(async () => {
        try {
          const response = await fetch(`/api?promptId=${promptId}`);
          if (response.ok) {
            const data = await response.json();
            setImageUrl(data.imageUrl);
            setLoading(false);
            clearInterval(interval);
          } else if (response.status !== 404) {
            throw new Error('获取图片失败，请重试');
          }
        } catch (err: any) {
          setError(err.message);
          setLoading(false);
          clearInterval(interval);
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [promptId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">提示词图像生成器</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          value={prompt}
          onChange={handleInputChange}
          placeholder="输入提示词"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? '提交中...' : '提交'}
        </button>
      </form>
      {loading && (
        <div className="mt-4 text-center">
          <div className="loader border-t-4 border-b-4 border-blue-500 h-6 w-6 mx-auto mb-2 animate-spin"></div>
          <p>加载图片中...</p>
        </div>
      )}
      {imageUrl && (
        <div className="mt-4">
          <img src={imageUrl} alt="生成的图像" className="max-w-full max-h-96 rounded" />
        </div>
      )}
      {error && (
        <div className="mt-4 p-2 bg-red-500 text-white rounded">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default PromptImage;