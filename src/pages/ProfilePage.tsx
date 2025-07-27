/**
 * @file ProfilePage.tsx
 * @description 인스타그램 프로필 분석 대시보드 페이지.
 * 필터링, 검색, 페이지네이션 기능이 포함된 데이터 테이블을 표시합니다.
 */

import React, { useState, useMemo } from 'react';
import './ProfilePage.css';

/**
 * 언어 코드와 한글 이름을 매핑하는 객체
 * @type {{ [key: string]: string }}
 */
const LANG_MAP: { [key: string]: string } = {
  ko: '한국어',
  en: '영어',
  ja: '일본어',
  es: '스페인어',
  ru: '러시아어',
  ar: '아랍어',
};

// random 함수 정의
const random = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

/**
 * 인스타그램 더미 데이터 생성 함수
 * @param {number} id - 생성할 유저의 고유 ID
 * @returns {object} 생성된 유저 프로필 더미 데이터 객체
 */
const makeInstagramDummy = (id: number) => {
  const followers = Math.floor(Math.random() * 500000) + 1000;
  const following = Math.floor(Math.random() * 1000);
  const heart = Math.floor(Math.random() * 20000000);
  const playAvg = Math.floor(Math.random() * 200000) + 1000;
  const diggAvg = +(Math.random() * 10000).toFixed(2);
  const commentAvg = +(Math.random() * 500).toFixed(2);
  const playMedian = Math.floor(Math.random() * 100000) + 1000;
  const diggMedian = Math.floor(Math.random() * 8000) + 100;
  const commentMedian = Math.floor(Math.random() * 300) + 1;
  const playStd = Math.floor(Math.random() * 300000);
  const hashtags = random(['mixsoon,kbeauty', 'skin1004,dalba', 'beautyofjoseon,torriden', 'somebymi', 'numbuzin', 'benton', 'tocobo', 'd\'alba']);
  const hashtagCount = hashtags.split(',').length;
  const videoUploadCount = Math.floor(Math.random() * 100) + 10;
  const videoDesc = random([
    'what\'s one glow up tip you would share with others? ✨#glowuptips #beautyhacks #beautyhabits #glowup',
    'This also is good for my fellow black peopleeee using a skin tone powder can prevent any ashy look t',
    '여러분의 뷰티 루틴은?',
    '오늘의 심화 촬영!',
    '상품 장착 리뷰',
    '일상 브이로그',
    '운동 루틴 공유',
  ]);
  const reels = Array.from({ length: 5 }, (_, i) => ({
    thumb: `https://picsum.photos/seed/instagram${id}_${i}/80/80`,
    title: `인스타그램 영상 ${i + 1}`,
  }));
  const profileImg = `https://picsum.photos/seed/profile${id}/80/80`;
  // 비율 지표 계산
  const viewsPerFollower = playMedian / followers;
  const likesPerView = diggMedian / playMedian;
  const commentsPerView = commentMedian / playMedian;
  // 추천 카테고리
  const aiSummary = random([
    '국내 여행, 맛집 탐방, 일상 브이로그, 카페 투어, 도시 산책',
    '해외 여행, 세계 각국 문화 체험, 현지 맛집, 관광지 탐방',
    '올리브영 꿀템 리뷰, 뷰티 제품 사용기, 화장품 추천, 스킨케어 루틴',
    '패션 코디, 스타일링 팁, 옷장 정리, 트렌디한 패션 아이템',
    '운동 루틴, 건강 관리, 다이어트 팁, 피트니스 라이프',
  ]);
  const lang = random(Object.keys(LANG_MAP));
  const bioLink = `t.me/user${id}`;
  const modaeUrl = `https://modae.site/user${id}`;
  const totalPosts = Math.floor(Math.random() * 1000) + 10;
  const totalReels = Math.floor(Math.random() * 500) + 5;
  const avgUploadInterval = (Math.random() * 5 + 1).toFixed(1);
  const partnershipAd = Math.random() > 0.7 ? 'O' : '';
  const email = Math.random() > 0.5 ? `user${id}@example.com` : '';

  return {
    id,
    unique_id: `user${id}`,
    nickname: `유저${id}`,
    bio: random([
      'tokyo\nfrom korea\n✨*ੈ♡₊˚:✧\niamkoocat@gmail.com',
      'Just a sexy girl in her own world ✨Welcome✨\nJaylayahj@gmail.com',
      '뷰티 크리에이터',
      '여행을 사랑하는 인스타그래머',
      '일상 영상 공유',
    ]),
    follower_count: followers,
    following_count: following,
    heart_count: heart,
    url: `https://instagram.com/@user${id}`,
    play_count_avg: playAvg,
    digg_count_avg: diggAvg,
    comment_count_avg: commentAvg,
    play_count_median: playMedian,
    digg_count_median: diggMedian,
    comment_count_median: commentMedian,
    play_count_std: playStd,
    video_upload_count: videoUploadCount,
    video_description: videoDesc,
    reels,
    profile_image: profileImg,
    viewsPerFollower,
    likesPerView,
    commentsPerView,
    aiSummary,
    lang,
    bioLink,
    modaeUrl,
    totalPosts,
    totalReels,
    avgUploadInterval,
    partnershipAd,
    email,
  };
};

// 200개의 더미 데이터 생성
const DUMMY = Array.from({ length: 200 }, (_, i) => makeInstagramDummy(i + 1));

// 페이지당 표시할 데이터 개수 기본값
const PAGE_SIZE = 10;

// 고급 필터에서 사용할 필드 목록
const FILTER_FIELDS = [
  { label: '구독자수', value: 'follower_count' },
  { label: '조회수', value: 'play_count_avg' },
  { label: '좋아요수', value: 'digg_count_avg' },
  { label: '댓글수', value: 'comment_count_avg' },
];
// 고급 필터에서 사용할 연산자 목록
const FILTER_OPS = [
  { label: '>=', value: 'gte' },
  { label: '<=', value: 'lte' },
];

/**
 * ProfilePage 컴포넌트
 * @description 인스타그램 계정 분석 대시보드의 메인 컴포넌트.
 * 모든 상태 관리, 필터링 로직, UI 렌더링을 담당합니다.
 */
function ProfilePage() {
  // --- 상태 관리 (State Management) ---

  // 일반 검색어 상태
  const [search, setSearch] = useState('');
  // 언어 필터 상태
  const [lang, setLang] = useState('');
  // 현재 페이지 번호 상태
  const [page, setPage] = useState(1);
  // 페이지당 표시할 항목 수 상태
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  // 고급 필터 목록 상태
  const [filters, setFilters] = useState([
    { field: '', op: 'gte', value: '', logic: 'AND' }
  ]);

  // "검색" 버튼 클릭 시 실제 적용될 필터 상태들
  const [appliedFilters, setAppliedFilters] = useState([...filters]);
  const [appliedLang, setAppliedLang] = useState(lang);
  const [appliedSearch, setAppliedSearch] = useState(search);
  
  // 테이블 행 확장/축소 상태
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  // --- 이벤트 핸들러 (Event Handlers) ---

  /**
   * 고급 필터 추가 핸들러
   */
  const addFilter = () => setFilters([...filters, { field: '', op: 'gte', value: '', logic: 'AND' }]);

  /**
   * 고급 필터 제거 핸들러
   * @param {number} idx - 제거할 필터의 인덱스
   */
  const removeFilter = (idx: number) => setFilters(filters.filter((_, i) => i !== idx));

  /**
   * 고급 필터 업데이트 핸들러
   * @param {number} idx - 업데이트할 필터의 인덱스
   * @param {string} key - 업데이트할 필드의 키 (field, op, value, logic)
   * @param {string} val - 새로운 값
   */
  const updateFilter = (idx: number, key: string, val: string) => setFilters(filters.map((f, i) => i === idx ? { ...f, [key]: val } : f));

  /**
   * "검색" 버튼 클릭 또는 Enter 키 입력 핸들러
   * 현재 필터 설정들을 'applied' 상태로 복사하여 실제 필터링을 트리거합니다.
   * 페이지는 1로 초기화됩니다.
   */
  const handleSearch = () => {
    setAppliedFilters([...filters]);
    setAppliedLang(lang);
    setAppliedSearch(search);
    setPage(1);
  };

  /**
   * 키보드 입력 핸들러 (Enter 키 감지)
   * @param {React.KeyboardEvent} e - 키보드 이벤트 객체
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  /**
   * 테이블 행 클릭 핸들러
   * 클릭된 행의 ID를 expandedRows Set에 추가하거나 제거하여 확장/축소 상태를 토글합니다.
   * @param {number} rowId - 클릭된 행의 ID
   */
  const handleRowClick = (rowId: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(rowId)) {
      newExpanded.delete(rowId);
    } else {
      newExpanded.add(rowId);
    }
    setExpandedRows(newExpanded);
  };

  // --- 데이터 필터링 및 페이지네이션 (Data Filtering & Pagination) ---

  /**
   * 필터링된 데이터 목록 (useMemo 사용)
   * appliedSearch, appliedLang, appliedFilters 상태가 변경될 때만 재계산하여 성능을 최적화합니다.
   */
  const filtered = useMemo(() => {
    return DUMMY.filter(row => {
      // 1. 일반 검색어 필터링 (ID, 닉네임, 바이오)
      const searchMatch =
        row.unique_id.toLowerCase().includes(appliedSearch.toLowerCase()) ||
        row.nickname.toLowerCase().includes(appliedSearch.toLowerCase()) ||
        row.bio.toLowerCase().includes(appliedSearch.toLowerCase());
      
      // 2. 언어 필터링
      const langMatch = appliedLang ? row.lang === appliedLang : true;
      
      // 3. 고급 필터링
      const advancedFilterMatch = appliedFilters.reduce((result, filter, index) => {
        if (!filter.field || !filter.value) return result;
        
        const value = +filter.value;
        const fieldValue = row[filter.field as keyof typeof row] as number;
        
        let filterResult = false;
        switch (filter.op) {
          case 'gte': filterResult = fieldValue >= value; break;
          case 'lte': filterResult = fieldValue <= value; break;
          default: filterResult = true;
        }
        
        if (index === 0) return filterResult;
        
        // 이전 결과와 현재 필터 결과를 logic에 따라 결합
        if (filter.logic === 'AND') {
          return result && filterResult;
        } else { // OR
          return result || filterResult;
        }
      }, true);
      
      // 언어와 다른 조건들을 AND로 결합
      return searchMatch && langMatch && advancedFilterMatch;
    });
  }, [appliedSearch, appliedLang, appliedFilters]);

  // 현재 페이지에 표시할 데이터 계산
  const totalPages = Math.ceil(filtered.length / pageSize);
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  // --- UI 렌더링 (UI Rendering) ---
  return (
    <div className="profile-page-container">
      {/* --- 필터 섹션 --- */}
      <div className="dashboard-filters" style={{ alignItems: 'center' }}>
        <span style={{ fontSize: '1.1rem', color: '#666', marginRight: 16, fontWeight: '600' }}>
          전체 {filtered.length}명
        </span>
        <span style={{ fontWeight: 600, marginRight: 4 }}>필터:</span>
        {filters.map((f, idx) => (
          <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: 4, marginRight: 8 }}>
            {idx > 0 && (
              <select 
                value={f.logic} 
                onChange={e => updateFilter(idx, 'logic', e.target.value)} 
                style={{ minWidth: 50, marginRight: 4 }}
              >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </select>
            )}
            <select 
              value={f.field} 
              onChange={e => updateFilter(idx, 'field', e.target.value)} 
              style={{ minWidth: 80 }}
            >
              <option value="">선택</option>
              {FILTER_FIELDS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
            <select 
              value={f.op} 
              onChange={e => updateFilter(idx, 'op', e.target.value)} 
              style={{ minWidth: 50 }}
            >
              {FILTER_OPS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
            <input 
              value={f.value} 
              onChange={e => updateFilter(idx, 'value', e.target.value)} 
              onKeyDown={handleKeyDown}
              placeholder="값 입력" 
              style={{ width: 70 }} 
            />
            {filters.length > 1 && (
              <button style={{ background: '#f44336', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 8px', fontWeight: 600, cursor: 'pointer' }} onClick={() => removeFilter(idx)}>삭제</button>
            )}
          </span>
        ))}
        <button style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: '50%', width: 28, height: 28, fontSize: 20, fontWeight: 700, marginRight: 12, cursor: 'pointer' }} onClick={addFilter}>+</button>
        

        
        {/* 언어 필터 */}
        <span style={{ fontWeight: 600, marginRight: 4 }}>언어:</span>
        <select value={lang} onChange={e => setLang(e.target.value)} style={{ minWidth: 80, marginRight: 12 }}>
          <option value="">전체</option>
          {Object.entries(LANG_MAP).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
        
        {/* 검색 */}
        <span style={{ fontWeight: 600, marginRight: 4 }}>검색:</span>
        <input 
          placeholder="검색어 입력" 
          style={{ width: 120, marginRight: 4 }} 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button 
          onClick={handleSearch}
          style={{ border: '1px solid #bdbdbd', borderRadius: 4, background: '#f8f8fa', padding: '4px 12px', fontWeight: 600, cursor: 'pointer' }}
        >
          검색
        </button>
      </div>

      {/* --- 데이터 테이블 섹션 --- */}
      <div className="dashboard-table-card">
        <table className="dashboard-table" style={{ minWidth: 3100, tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: 60 }}>프로필</th>
                <th style={{ width: 100 }}>ID</th>
                <th style={{ width: 120 }}>닉네임</th>
                <th style={{ width: 80 }}>언어</th>
                <th style={{ width: 150 }}>바이오</th>
                <th style={{ width: 120 }}>팔로워</th>
                <th style={{ width: 120 }}>팔로잉</th>
                <th style={{ width: 100 }}>프로필URL</th>
                <th style={{ width: 140 }}>조회수중앙값</th>
                <th style={{ width: 140 }}>좋아요중앙값</th>
                <th style={{ width: 140 }}>댓글 중앙값</th>
                <th style={{ width: 140 }}>조회수/구독자</th>
                <th style={{ width: 140 }}>좋아요/조회수</th>
                <th style={{ width: 140 }}>댓글/조회수</th>
                <th style={{ width: 120 }}>총 게시물수</th>
                <th style={{ width: 120 }}>총 릴스 수</th>
                <th style={{ width: 160 }}>평균 업로드주기(일)</th>
                <th style={{ width: 240 }}>최근 5개 영상 썸네일</th>
                <th style={{ width: 400 }}>최근 5개 영상 주제 요약</th>
                <th style={{ width: 120 }}>파트너쉽 광고</th>
                <th style={{ width: 120 }}>하트</th>
                <th style={{ width: 150 }}>바이오링크</th>
                <th style={{ width: 150 }}>이메일</th>
                <th style={{ width: 100 }}>모대시링크</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((row, i) => (
                <tr key={row.id} onClick={() => handleRowClick(row.id)} style={{ cursor: 'pointer' }} className={expandedRows.has(row.id) ? 'row-expanded' : ''}>
                  <td><img src={row.profile_image} alt="프로필" className="profile-img" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e1306c', background: '#fff' }} /></td>
                  <td>{row.unique_id}</td>
                  <td style={{ minWidth: 120 }}>{row.nickname}</td>
                  <td>{LANG_MAP[row.lang as keyof typeof LANG_MAP] || row.lang}</td>
                  <td>
                    <div className="cell-content bio-content">{row.bio}</div>
                  </td>
                  <td>{row.follower_count.toLocaleString()}</td>
                  <td>{row.following_count.toLocaleString()}</td>
                  <td><a href={row.url} target="_blank" rel="noopener noreferrer">링크</a></td>
                  <td>{row.play_count_median.toLocaleString()}</td>
                  <td>{row.digg_count_median.toLocaleString()}</td>
                  <td>{row.comment_count_median.toLocaleString()}</td>
                  <td>{row.viewsPerFollower.toFixed(2)}</td>
                  <td>{row.likesPerView.toFixed(2)}</td>
                  <td>{row.commentsPerView.toFixed(2)}</td>
                  <td>{row.totalPosts}</td>
                  <td>{row.totalReels}</td>
                  <td>{row.avgUploadInterval}</td>
                  <td className="reels-cell" style={{ 
                    display: 'flex', 
                    gap: 4, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    flexWrap: 'nowrap',
                    width: '100%',
                    height: '100%'
                  }}>
                    {row.reels.map((r: any, idx: number) => (
                      <img 
                        key={idx} 
                        src={r.thumb} 
                        alt={r.title} 
                        title={r.title} 
                        className="reels-thumb-img" 
                        style={{ 
                          width: 40, 
                          height: 40, 
                          flexShrink: 0
                        }} 
                      />
                    ))}
                  </td>
                  <td 
                    style={{ 
                      textAlign: 'left',
                      padding: '8px 12px'
                    }}
                  >
                    <div className="cell-content summary-content">{row.aiSummary}</div>
                  </td>
                  <td style={{ textAlign: 'center' }}>{row.partnershipAd}</td>
                  <td style={{ textAlign: 'center' }}>{row.heart_count.toLocaleString()}</td>
                  <td><a href={row.bioLink} target="_blank" rel="noopener noreferrer">{row.bioLink}</a></td>
                  <td>{row.email}</td>
                  <td><a href={row.modaeUrl} target="_blank" rel="noopener noreferrer">링크</a></td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
      
      {/* --- 페이지네이션 섹션 --- */}
      <div className="dashboard-pagination" style={{ 
        marginTop: '12px', 
        padding: '12px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '12px',
        border: '1px solid #e9ecef',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
          {/* 페이지 크기 선택 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px'
          }}>
            <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: '500' }}>
              페이지당 표시:
            </span>
            <select 
              value={pageSize} 
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1); // 페이지 크기 변경 시 첫 페이지로 이동
              }}
              style={{
                padding: '6px 10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '0.9rem',
                backgroundColor: '#fff'
              }}
            >
              <option value={10}>10개</option>
              <option value={20}>20개</option>
              <option value={50}>50개</option>
              <option value={100}>100개</option>
            </select>
          </div>
          {/* 중앙: 페이지네이션 버튼들 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px'
          }}>
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))} 
              disabled={page === 1}
              style={{
                background: page === 1 ? '#bdbdbd' : '#6c63ff',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 12px',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                transition: 'all 0.18s'
              }}
            >
              ← 이전
            </button>
            
            {/* 페이지 번호들 */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  style={{
                    background: page === pageNum ? '#6c63ff' : '#fff',
                    color: page === pageNum ? '#fff' : '#6c63ff',
                    border: '1px solid #6c63ff',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.18s',
                    minWidth: '32px'
                  }}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
              disabled={page === totalPages}
              style={{
                background: page === totalPages ? '#bdbdbd' : '#6c63ff',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 12px',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: page === totalPages ? 'not-allowed' : 'pointer',
                transition: 'all 0.18s'
              }}
            >
              다음 →
            </button>
          </div>
          
          {/* 오른쪽: 현재 페이지 정보 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px'
          }}>
            <span style={{ 
              fontSize: '0.85rem', 
              color: '#666', 
              fontWeight: '500',
              padding: '6px 10px',
              backgroundColor: '#fff',
              borderRadius: '4px',
              border: '1px solid #e9ecef'
            }}>
              {page} / {totalPages}
            </span>
            <span style={{ 
              fontSize: '0.8rem', 
              color: '#888'
            }}>
              (총 {filtered.length}개)
            </span>
          </div>
      </div>
    </div>
  );
}

export default ProfilePage; 