/**
 * @file CrawlingRequestPage.tsx
 * @description 크롤링 요청을 위한 UI 페이지.
 * 사용자는 여러 모드(ID, 라이브러리, 팔로워) 중 하나를 선택하고
 * 필요한 정보를 입력하여 크롤링을 요청할 수 있습니다.
 */
import React, { useState } from 'react';

/**
 * CrawlingRequestPage 컴포넌트
 * @description 크롤링 요청 기능을 제공하는 페이지.
 * - 'ID/라이브러리 기반'과 '시트 기반' 두 가지 주요 요청 섹션으로 구성됩니다.
 * - 모드(mode) 상태에 따라 다른 입력 필드와 설명을 동적으로 표시합니다.
 */
const CrawlingRequestPage = () => {
  // --- 상태 관리 (State Management) ---

  // 'ID/라이브러리 기반' 요청의 현재 선택 모드 상태 (user, meta, follower)
  const [mode, setMode] = useState('user');
  // 'ID/라이브러리 기반' 요청의 입력값 상태
  const [inputValue, setInputValue] = useState('');
  // 메타 광고 라이브러리 모드에서 선택할 국가 상태
  const [selectedCountry, setSelectedCountry] = useState('korea');
  // '시트 기반' 요청의 구글 시트 URL 상태
  const [sheetUrl, setSheetUrl] = useState('');
  // 시트 제출 완료 여부 상태
  const [isSheetSubmitted, setIsSheetSubmitted] = useState(false);

  // --- 이벤트 핸들러 (Event Handlers) ---

  /**
   * 'ID/라이브러리 기반' 크롤링 요청 버튼 클릭 핸들러
   */
  const handleCrawlRequest = () => {
    if (mode === 'meta') {
      alert(`모드: ${mode}\n입력값: ${inputValue}\n선택된 국가: ${selectedCountry}\n크롤링을 요청합니다.`);
    } else {
      alert(`모드: ${mode}\n입력값: ${inputValue}\n크롤링을 요청합니다.`);
    }
    // TODO: 실제 크롤링 요청 API 호출 로직 구현 필요
  };

  /**
   * '시트 기반' 확인 버튼 클릭 핸들러
   */
  const handleSheetSubmit = () => {
    if (sheetUrl) {
      setIsSheetSubmitted(true);
      alert(`시트 주소: ${sheetUrl}\n크롤링을 요청합니다.`);
      // TODO: 실제 시트 기반 크롤링 요청 API 호출 로직 구현 필요
    }
  };
  
  /**
   * '시트 기반' 취소 버튼 클릭 핸들러
   */
  const handleSheetCancel = () => {
    setIsSheetSubmitted(false);
    setSheetUrl('');
  };

  // --- UI 렌더링 (UI Rendering) ---
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>크롤링 요청</h1>
      
      {/* 섹션 1: ID/라이브러리 기반 요청 */}
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
        <h2 style={{ marginTop: 0 }}>ID/라이브러리 기반 요청</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* 크롤링 모드 선택 드롭다운 */}
          <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ padding: '8px' }}>
            <option value="user">유저ID 입력</option>
            <option value="meta">메타 광고 라이브러리</option>
            <option value="follower">팔로워 크롤링</option>
          </select>
          
          {/* 메타 광고 라이브러리 모드일 때만 국가 선택 드롭다운 표시 */}
          {mode === 'meta' && (
            <select 
              value={selectedCountry} 
              onChange={(e) => setSelectedCountry(e.target.value)} 
              style={{ padding: '8px' }}
            >
              <option value="korea">한국</option>
              <option value="japan">일본</option>
              <option value="usa">미국</option>
              <option value="uk">영국</option>
              <option value="mexico">멕시코</option>
              <option value="kazakhstan">카자흐스탄</option>
              <option value="uae">UAE</option>
              <option value="india">인도</option>
              <option value="indonesia">인도네시아</option>
            </select>
          )}
          
          {/* ID 또는 검색어 입력 필드 */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              mode === 'user' ? 'ID 입력 (celimax, @celimax, ...)' :
              mode === 'meta' ? '검색어 입력 (광고, #광고, medicube, ...)' :
              'ID 입력 (1개만, celimax 혹은 @celimax)'
            }
            style={{ padding: '8px', flexGrow: 1, minWidth: '200px' }}
          />
          <button onClick={handleCrawlRequest} style={{ padding: '8px 16px', background: '#1976d2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            크롤링 요청
          </button>
        </div>

        {/* 각 모드에 따른 설명 (조건부 렌더링) */}
        {mode === 'user' && (
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>
            * 유저ID 입력 모드 : 입력 받은 ID를 크롤링합니다. 여러 계정은 , 를 사용해 입력할 수 있습니다.
          </p>
        )}
        {mode === 'meta' && (
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>
            * 메타 광고 라이브러리 모드 : 입력 받은 단어를 메타 광고 라이브러리에 검색해, "함께 합니다"라고 써진 파트너십 광고를 운영 중인 계정만 추가합니다. 프로필 컬럼에 파트너십 광고 O로 표시됩니다.
          </p>
        )}
        {mode === 'follower' && (
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>
            * 팔로워 크롤링 모드: 입력한 유저 ID의 친구 추천 목록 20명과 각 친구의 친구 10명을 크롤링합니다 (총 약 200명).
          </p>
        )}
      </div>

      {/* 섹션 2: 시트 기반 요청 */}
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px' }}>
        <h2 style={{ marginTop: 0 }}>시트 기반 요청</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            value={sheetUrl}
            onChange={(e) => setSheetUrl(e.target.value)}
            placeholder="구글 시트 주소 입력"
            style={{ padding: '8px', flexGrow: 1, background: isSheetSubmitted ? '#f0f0f0' : 'white' }}
            disabled={isSheetSubmitted}
          />
          {/* 시트 제출 여부에 따른 버튼 (조건부 렌더링) */}
          {isSheetSubmitted ? (
            <button onClick={handleSheetCancel} style={{ padding: '8px 16px', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              취소
            </button>
          ) : (
            <button onClick={handleSheetSubmit} style={{ padding: '8px 16px', background: '#1976d2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrawlingRequestPage; 