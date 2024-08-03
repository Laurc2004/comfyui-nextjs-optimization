import { NextResponse } from 'next/server';
import path from 'path';
import { queuePrompt, getRandomNumberWithRandomLength, loadWorkflowData } from './utils';

// 处理POST请求
export async function handlePostRequest(request: Request): Promise<NextResponse> {
  // 从请求体中解析JSON数据
  const body = await request.json();
  const promptText = body.text; // 从请求体中获取提示文本

  // 检查提示文本是否存在
  if (!promptText) {
    return NextResponse.json({ error: '提示文本是必需的' }, { status: 404 });
  }

  // 定义工作流文件的路径
  const workflowPath = path.resolve(process.cwd(), 'public/comfyUI/workflow_api.json');

  try {
    // 加载工作流数据
    const prompt = await loadWorkflowData(workflowPath);

    // 检查工作流数据的结构是否有效
    if (!prompt['6'] || !prompt['3'] || !prompt['6']['inputs'] || !prompt['3']['inputs']) {
      return NextResponse.json({ error: '无效的工作流数据结构' }, { status: 500 });
    }

    // 设置提示文本和随机种子
    prompt['6']['inputs']['text'] = promptText;
    prompt['3']['inputs']['seed'] = getRandomNumberWithRandomLength();

    // 向服务器发送生成图像的请求
    const promptResponse = await queuePrompt(prompt);
    return NextResponse.json({ id: promptResponse.prompt_id });
  } catch (err) {
    // 处理可能的错误并返回相应的响应
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}