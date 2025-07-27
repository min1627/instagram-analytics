import React, { useState } from 'react';

const CrawlingRequestPage = () => {
  const [mode, setMode] = useState('user');
  const [inputValue, setInputValue] = useState('');
  const [sheetUrl, setSheetUrl] = useState('');
  const [isSheetSubmitted, setIsSheetSubmitted] = useState(false);

  const handleCrawlRequest = () => {
    alert(`모드: ${mode}\n입력값: ${inputValue}\n크롤링을 요청합니다.`);
    // 실제 크롤링 요청 로직은 여기에 추가됩니다.
  };

  const handleSheetSubmit = () => {
    if (sheetUrl) {
      setIsSheetSubmitted(true);
      alert(`시트 주소: ${sheetUrl}\n크롤링을 요청합니다.`);
    }
  };
  
  const handleSheetCancel = () => {
    setIsSheetSubmitted(false);
    setSheetUrl('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>크롤링 요청</h1>
      
      {/* 입력창 1 */}
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
        <h2 style={{ marginTop: 0 }}>ID/라이브러리 기반 요청</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ padding: '8px' }}>
            <option value="user">유저ID 입력</option>
            <option value="meta">메타 광고 라이브러리</option>
            <option value="follower">팔로워 크롤링</option>
          </select>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="ID 또는 검색어 입력"
            style={{ padding: '8px', flexGrow: 1 }}
          />
          <button onClick={handleCrawlRequest} style={{ padding: '8px 16px', background: '#1976d2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            크롤링 요청
          </button>
        </div>
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

      {/* 입력창 2 */}
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