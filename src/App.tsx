/**
 * @file App.tsx
 * @description 애플리케이션의 최상위 컴포넌트.
 * 라우팅 및 전반적인 레이아웃 구조를 정의합니다.
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import ProfilePage from './pages/ProfilePage';
import CrawlingRequestPage from './pages/CrawlingRequestPage';
import './index.css';

/**
 * App 컴포넌트
 * @description 전체 애플리케이션의 진입점.
 * - BrowserRouter를 사용하여 클라이언트 사이드 라우팅을 활성화합니다.
 * - NavigationBar를 상단에 고정 표시합니다.
 * - Routes와 Route를 사용하여 경로에 따라 렌더링할 페이지를 지정합니다.
 *   - `/`: 프로필 분석 대시보드 페이지 (ProfilePage)
 *   - `/request`: 크롤링 요청 페이지 (CrawlingRequestPage)
 * @returns {JSX.Element} 애플리케이션의 루트 JSX 엘리먼트
 */
function App() {
  return (
    <Router>
      {/* 전체 앱 컨테이너 */}
      <div className="app-container">
        {/* 모든 페이지 상단에 표시될 네비게이션 바 */}
        <NavigationBar />
        {/* 메인 콘텐츠 영역 */}
        <main className="content-area">
          <Routes>
            {/* 기본 경로: 프로필 페이지 */}
            <Route path="/" element={<ProfilePage />} />
            {/* 크롤링 요청 페이지 경로 */}
            <Route path="/request" element={<CrawlingRequestPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
