# my_position

- npm install next react react-dom --legacy-peer-deps  // npm install --legacy-peer-deps
- npm run dev


- uvicorn main:app --host 0.0.0.0 --port 8000 --reload


- https://lucide.dev/icons/


# vercel 관련
 - pages/api/hello.js 파일 생성 그리고 아래 코드 추가
    ```
    // OPTIONS 요청 처리
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.status(200).end();
        return;
    }
    ```
 - package.json 에 axios 의존성 추가
 - next.config.mjs 에 코드 추가가
