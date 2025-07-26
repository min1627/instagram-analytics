# 인스타그램 계정 분석 대시보드

React와 TypeScript로 구현된 인스타그램 계정 분석 대시보드입니다.

## 주요 기능

- **계정 정보**: 프로필 사진, ID, 닉네임, 바이오, 팔로워/팔로잉 수
- **성과 지표**: 조회수/좋아요/댓글 중앙값, 비율 지표
- **컨텐츠 분석**: 누적 게시물/릴스 수, 평균 업로드 주기
- **AI 분석**: 최근 5개 영상 주제 요약, 언어 분석
- **검색 & 필터**: 동적 필터, 검색, 정렬 기능
- **페이지네이션**: 50개씩 표시

## 기술 스택

- React 18
- TypeScript
- CSS3

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 빌드
npm run build
```

## 배포

### GitHub Pages 배포

1. `package.json`에 homepage 추가:
```json
{
  "homepage": "https://yourusername.github.io/instagram-analytics"
}
```

2. GitHub에 푸시:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

3. GitHub Pages 설정:
   - Repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: main, folder: / (root)

### Vercel 배포

1. [Vercel](https://vercel.com) 가입
2. GitHub repository 연결
3. 자동 배포 설정

### Netlify 배포

1. [Netlify](https://netlify.com) 가입
2. GitHub repository 연결
3. Build command: `npm run build`
4. Publish directory: `build`

## 프로젝트 구조

```
src/
├── App.tsx          # 메인 컴포넌트
├── App.css          # 스타일
├── index.tsx        # 앱 진입점
└── index.css        # 글로벌 스타일
```

## 라이센스

MIT License
