import { NextResponse } from 'next/server';
import { handlePostRequest } from './handlers';
import { fetchImage } from './imageUtils';

// 处理GET请求
export async function GET(request: Request) {
  // 从请求URL中获取查询参数
  const { searchParams } = new URL(request.url);
  const promptId = searchParams.get('promptId');

  // 校验promptId是否存在
  if (!promptId) {
    return NextResponse.json({ error: '提示ID是必需的' }, { status: 400 });
  }

  try {
    // 根据提示ID获取生成的图像URL
    const imageUrl = await fetchImage(promptId);
    if (!imageUrl) {
      return NextResponse.json({ error: '未找到图像' }, { status: 404 });
    }

    // 返回图像URL
    return NextResponse.json({ imageUrl });
  } catch (error: any) {
    // 处理可能的错误并返回相应的响应
    return NextResponse.json({ error: error.message }, { status: 502 });
  }
}

// 处理POST请求
export async function POST(request: Request) {
  // 调用处理POST请求的函数
  return handlePostRequest(request);
}