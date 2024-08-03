# ComfyUI Next.js Optimization

[English Version](#english-version) | [中文版本](#中文版本)

---

## 📋 目录 / Table of Contents

- [中文版本](#中文版本)
  - [项目结构](#项目结构)
  - [安装和运行](#安装和运行)
  - [功能描述](#功能描述)
  - [主要文件](#主要文件)
  - [License](#license)
  - [项目展示](#项目展示)
- [English Version](#english-version)
  - [Project Structure](#project-structure)
  - [Installation and Running](#installation-and-running)
  - [Features](#features)
  - [Key Files](#key-files)
  - [License](#license-1)
  - [Project Showcase](#project-showcase)

---

## 中文版本

优化 ComfyUI 的 TypeScript 前端在 Next.js 中去除 WebSocket 调用的流程。本项目通过使用 RESTful API 替代 WebSocket 来实现图像生成请求和结果获取，提升了代码的简洁性和可维护性。

### 📁 项目结构

本项目包含以下几个主要部分：

- `/app` 目录：包含主要的应用程序文件，包括 API 处理、页面布局和组件。
- `/public` 目录：存放公共资源文件，如图片和配置文件。

#### `/app` 目录结构

- `favicon.ico`：站点图标。
- `globals.css`：全局样式文件。
- `layout.tsx`：应用的布局组件。
- `page.tsx`：主页面组件。
- `/api` 目录：API 处理文件。
  - `handlers.ts`：处理 API 请求，包括提交生成图像的请求和轮询获取结果。
  - `imageUtils.ts`：包含获取图像 URL 和历史记录的辅助函数。
  - `route.ts`：定义 API 路由的 GET 和 POST 请求处理逻辑。
  - `utils.ts`：包含生成唯一客户端 ID 和随机数的工具函数，以及加载工作流数据的函数。
- `/components` 目录：包含 React 组件。
  - `PromptImage.tsx`：主页面逻辑组件，包括输入提示词、提交请求、轮询结果、显示图像和处理错误。

#### `/public` 目录结构

- `next.svg`：Next.js 标志文件。
- `vercel.svg`：Vercel 标志文件。
- `/comfyUI` 目录：包含 `workflow_api.json` 配置文件，在这里要更改替换成你的。

### 💻 安装和运行

#### 克隆仓库

```bash
git clone https://github.com/Laurc2004/comfyui-nextjs-optimization.git
cd comfyui-nextjs-optimization
```

#### 安装依赖

```bash
npm install
```

#### 启动开发服务器

```bash
npm run dev
```

打开浏览器并访问 `http://localhost:3000` 以查看应用。

### ⚙️ 功能描述

- **Prompt 输入框**：用户可以在输入框中输入提示词。
- **POST 请求**：提交提示词后，发送 POST 请求到 `/api` 接口。
- **轮询 GET 请求**：每 3 秒轮询一次 GET 请求，直到获取到生成的图像或发生异常。
- **图片展示**：成功获取图像后，在页面中展示生成的图像。
- **错误处理**：请求过程中如果发生错误，会在页面中显示错误信息。

### 📂 主要文件

#### `PromptImage.tsx`

位于 `/app/components/` 下，包含了主页面逻辑，包括输入提示词、提交请求、轮询结果、显示图像和处理错误。

#### `handlers.ts`

位于 `/app/api/` 下，处理 API 请求，包括提交生成图像的请求和轮询获取结果。

#### `imageUtils.ts`

位于 `/app/api/` 下，包含获取图像 URL 和历史记录的辅助函数。

#### `route.ts`

位于 `/app/api/` 下，定义了 API 路由的 GET 和 POST 请求处理逻辑。

#### `utils.ts`

位于 `/app/api/` 下，包含生成唯一客户端 ID 和随机数的工具函数，以及加载工作流数据的函数。

### 📝 License

本项目采用 MIT 许可证。详细信息请参见 LICENSE 文件。

### 🌟 项目展示

![项目展示](https://github.com/user-attachments/assets/b1c2fd09-f178-43b7-8ba6-7cbb39d7f352)

---

## English Version

Optimize the ComfyUI TypeScript frontend in Next.js by removing WebSocket calls. This project enhances code simplicity and maintainability by using RESTful APIs to handle image generation requests and results retrieval.

### 📁 Project Structure

The project consists of the following main parts:

- `/app` directory: Contains the main application files, including API handling, page layout, and components.
- `/public` directory: Stores public resource files such as images and configuration files.

#### `/app` Directory Structure

- `favicon.ico`: Site icon.
- `globals.css`: Global stylesheet.
- `layout.tsx`: Application layout component.
- `page.tsx`: Main page component.
- `/api` directory: API handling files.
  - `handlers.ts`: Handles API requests, including submitting image generation requests and polling for results.
  - `imageUtils.ts`: Contains helper functions for retrieving image URLs and history.
  - `route.ts`: Defines GET and POST request handling logic for API routes.
  - `utils.ts`: Contains utility functions for generating unique client IDs and random numbers, as well as loading workflow data.
- `/components` directory: Contains React components.
  - `PromptImage.tsx`: Main page logic component, including inputting prompt words, submitting requests, polling results, displaying images, and handling errors.

#### `/public` Directory Structure

- `next.svg`: Next.js logo file.
- `vercel.svg`: Vercel logo file.
- `/comfyUI` directory: Contains `workflow_api.json` configuration file, which needs to be replaced with your own.

### 💻 Installation and Running

#### Clone the Repository

```bash
git clone https://github.com/Laurc2004/comfyui-nextjs-optimization.git
cd comfyui-nextjs-optimization
```

#### Install Dependencies

```bash
npm install
```

#### Start the Development Server

```bash
npm run dev
```

Open your browser and visit `http://localhost:3000` to view the application.

### ⚙️ Features

- **Prompt Input Box**: Users can enter prompt words in the input box.
- **POST Request**: After submitting the prompt, a POST request is sent to the `/api` endpoint.
- **Polling GET Request**: Polls a GET request every 3 seconds until the generated image is retrieved or an exception occurs.
- **Image Display**: Successfully retrieved images are displayed on the page.
- **Error Handling**: If an error occurs during the request process, an error message is displayed on the page.

### 📂 Key Files

#### `PromptImage.tsx`

Located in `/app/components/`, it contains the main page logic, including inputting prompt words, submitting requests, polling results, displaying images, and handling errors.

#### `handlers.ts`

Located in `/app/api/`, it handles API requests, including submitting image generation requests and polling for results.

#### `imageUtils.ts`

Located in `/app/api/`, it contains helper functions for retrieving image URLs and history.

#### `route.ts`

Located in `/app/api/`, it defines GET and POST request handling logic for API routes.

#### `utils.ts`

Located in `/app/api/`, it contains utility functions for generating unique client IDs and random numbers, as well as loading workflow data.

### 📝 License

This project is licensed under the MIT License. For more details, please refer to the LICENSE file.

### 🌟 Project Showcase

![Project Showcase](https://github.com/user-attachments/assets/b1c2fd09-f178-43b7-8ba6-7cbb39d7f352)