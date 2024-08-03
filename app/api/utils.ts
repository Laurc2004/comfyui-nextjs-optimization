import fs from 'fs/promises';

export const serverAddress = '127.0.0.1:8888'; // 服务器地址
export const clientId = uuidv4(); // 生成唯一客户端ID

export interface Prompt {
  [key: string]: any;
}

// 生成唯一客户端ID的函数
export function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 生成随机的长度，范围从1到15
export function getRandomNumberWithRandomLength(): string {
  const length = Math.floor(Math.random() * 15) + 1;
  return Array.from({ length }, () => Math.floor(Math.random() * 10).toString()).join('');
}

// 向服务器发送生成图像的请求
export async function queuePrompt(prompt: Prompt): Promise<{ prompt_id: string }> {
  const p = { prompt, client_id: clientId };
  const res = await fetch(`http://${serverAddress}/prompt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(p),
  });

  if (!res.ok) {
    throw new Error('队列请求失败');
  }

  return res.json();
}

// 加载工作流数据
export async function loadWorkflowData(filePath: string): Promise<Prompt> {
  const workflowData = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(workflowData);
}