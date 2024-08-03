import { serverAddress } from './utils';

// 获取生成的图像的URL
export function getImage(filename: string, subfolder: string, folderType: string): string {
  const data = { filename, subfolder, type: folderType };
  const urlValues = new URLSearchParams(data as any);
  if (folderType === 'output') {
    return `http://${serverAddress}/view?${urlValues}`;
  }
  return '';
}

// 获取指定请求ID的历史记录
export async function getHistory(promptId: string): Promise<any> {
  const res = await fetch(`http://${serverAddress}/history/${promptId}`, {
    method: 'GET',
  });
  if (!res.ok) {
    throw new Error('获取历史记录失败');
  }
  return res.json();
}

// 获取生成图像
export async function fetchImage(promptId: string): Promise<string | null> {
  // 获取请求ID的历史记录
  const history = await getHistory(promptId);
  if (!history) {
    return null;
  }

  const promptData = history[promptId];

  // 检查任务是否完成
  if (promptData?.status?.completed) {
    const outputs = promptData.outputs;
    if (outputs) {
      // 从最后一个输出开始，查找包含图像的节点输出
      const outputKeys = Object.keys(outputs).reverse();
      for (const key of outputKeys) {
        const nodeOutput = outputs[key];
        if (nodeOutput.images) {
          for (const image of nodeOutput.images) {
            // 如果图像类型是output，生成图像的URL
            if (image.type === 'output') {
              return getImage(image.filename, image.subfolder, image.type);
            }
          }
        }
      }
    }
  }
  return null;
}