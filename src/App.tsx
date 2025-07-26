import React, { useState, useMemo } from 'react';
import './App.css';

// random 함수 정의
const random = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

// 인스타그램 더미 데이터 생성 함수
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
    'what’s one glow up tip you would share with others? ✨ #glowuptips #beautyhacks #beautyhabits #glowup',
    'This also is good for my fellow black peopleeee using a skin tone powder can prevent any ashy look t',
    '여러분의 뷰티 루틴은?',
    '오늘도 열심히 촬영!',
    '신상 화장품 리뷰',
    '여행 브이로그',
    '운동 루틴 공유',
  ]);
  const reels = Array.from({ length: 5 }, (_, i) => ({
    thumb: `https://picsum.photos/seed/tiktok${id}_${i}/80/80`,
    title: `틱톡 영상 ${i + 1}`,
  }));
  const profileImg = `https://picsum.photos/seed/profile${id}/80/80`;
  // 비율 지표 계산용
  const viewsPerFollower = playMedian / followers;
  const likesPerView = diggMedian / playMedian;
  const commentsPerView = commentMedian / playMedian;
  // 추가 더미
  const aiSummary = random([
    '예술, 전시, 문화 중심 컨텐츠',
    '카페, 맛집, 일상 브이로그',
    '운동, 건강, 자기계발',
    '여행, 풍경, 자연',
    '패션, 뷰티, 스타일',
  ]);
  const lang = random(['ko', 'en', 'ja', 'es']);
  const bioLink = `https://linktr.ee/user${id}`;
  const threadLink = `https://threads.net/@user${id}`;
  const modaeUrl = `https://modae.site/user${id}`;
  const totalPosts = Math.floor(Math.random() * 1000) + 10;
  const totalReels = Math.floor(Math.random() * 500) + 5;
  const avgUploadInterval = (Math.random() * 5 + 1).toFixed(1);
  return {
    id,
    unique_id: `user${id}`,
    nickname: `닉네임${id}`,
    bio: random([
      '📍tokyo\nfrom 🇨🇦\n･:*ੈ♡‧₊˚:･\n💌 iamkoocat@gmail.com',
      'Just a sexy girl in her own world ✨Welcome✨\n💌: Jaylayahj@gmail.com',
      '뷰티 크리에이터',
      '여행을 사랑하는 인스타그래머',
      '운동과 일상 공유',
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
    threadLink,
    modaeUrl,
    totalPosts,
    totalReels,
    avgUploadInterval,
  };
};
const DUMMY = Array.from({ length: 200 }, (_, i) => makeInstagramDummy(i + 1));

const PAGE_SIZE = 50;

// 필터 항목 정의
const FILTER_FIELDS = [
  { label: '구독자', value: 'follower_count' },
  { label: '조회수', value: 'play_count_avg' },
  { label: '좋아요/조회수', value: 'digg_count_avg' },
  { label: '댓글/조회수', value: 'comment_count_avg' },
];
const FILTER_OPS = [
  { label: '>', value: 'gt' },
  { label: '<', value: 'lt' },
  { label: '>=', value: 'gte' },
  { label: '<=', value: 'lte' },
  { label: '=', value: 'eq' },
];

function App() {
  // 검색/필터 상태
  const [search, setSearch] = useState('');
  const [lang, setLang] = useState('');
  const [minViews, setMinViews] = useState('');
  const [minFollowers, setMinFollowers] = useState('');
  const [minLikeView, setMinLikeView] = useState('');
  const [logic, setLogic] = useState<'AND' | 'OR'>('AND');
  const [page, setPage] = useState(1);

  // 동적 필터 상태
  const [filters, setFilters] = useState([
    { field: '', op: 'gt', value: '' }
  ]);

  // 필터 추가/삭제 핸들러
  const addFilter = () => setFilters([...filters, { field: '', op: 'gt', value: '' }]);
  const removeFilter = (idx: number) => setFilters(filters.filter((_, i) => i !== idx));
  const updateFilter = (idx: number, key: string, val: string) => setFilters(filters.map((f, i) => i === idx ? { ...f, [key]: val } : f));

  // 필터/검색 적용
  const filtered = useMemo(() => {
    return DUMMY.filter(row => {
      const searchMatch =
        row.unique_id.includes(search) ||
        row.nickname.includes(search) ||
        row.bio.includes(search);
      const langMatch = lang ? row.nickname.includes(lang) : true; // Assuming nickname is the primary language indicator
      const viewMatch = minViews ? row.play_count_avg >= +minViews : true;
      const followerMatch = minFollowers ? row.follower_count >= +minFollowers : true;
      const likeViewMatch = minLikeView ? row.digg_count_avg >= +minLikeView : true;
      if (logic === 'AND') {
        return searchMatch && langMatch && viewMatch && followerMatch && likeViewMatch;
      } else {
        return searchMatch || langMatch || viewMatch || followerMatch || likeViewMatch;
      }
    });
  }, [search, lang, minViews, minFollowers, minLikeView, logic]);

  // 페이지네이션
  const total = filtered.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // UI
  return (
    <div className="App" style={{ padding: 24, background: '#f7f7fa', minHeight: '100vh' }}>
      <h1>인스타그램 계정 분석 대시보드</h1>
      <div className="dashboard-filters" style={{ alignItems: 'center' }}>
        <span style={{ fontWeight: 600, marginRight: 4 }}>필터:</span>
        {filters.map((f, idx) => (
          <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: 4, marginRight: 8 }}>
            <select value={f.field} onChange={e => updateFilter(idx, 'field', e.target.value)} style={{ minWidth: 80 }}>
              <option value="">선택</option>
              {FILTER_FIELDS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
            <select value={f.op} onChange={e => updateFilter(idx, 'op', e.target.value)} style={{ minWidth: 50 }}>
              {FILTER_OPS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
            <input value={f.value} onChange={e => updateFilter(idx, 'value', e.target.value)} placeholder="값 입력" style={{ width: 70 }} />
            {filters.length > 1 && (
              <button style={{ background: '#f44336', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 8px', fontWeight: 600, cursor: 'pointer' }} onClick={() => removeFilter(idx)}>삭제</button>
            )}
          </span>
        ))}
        <button style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: '50%', width: 28, height: 28, fontSize: 20, fontWeight: 700, marginRight: 12, cursor: 'pointer' }} onClick={addFilter}>+</button>
        <span style={{ fontWeight: 600 }}>거주지:</span>
        <select style={{ minWidth: 80, marginRight: 8 }}><option>전체</option></select>
        <span style={{ fontWeight: 600 }}>언어:</span>
        <select value={lang} onChange={e => { setLang(e.target.value); setPage(1); }} style={{ minWidth: 80, marginRight: 8 }}>
          <option value="">전체</option>
          {/* No language filter in TikTok data, so this will be empty */}
        </select>
        <span style={{ fontWeight: 600 }}>정렬:</span>
        <select style={{ minWidth: 80, marginRight: 8 }}><option>No ▼</option></select>
        <span style={{ fontWeight: 600 }}>검색:</span>
        <select style={{ minWidth: 80, marginRight: 8 }}><option>전체</option></select>
        <input placeholder="검색어 입력" style={{ width: 120, marginRight: 4 }} value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        <button style={{ border: '1px solid #bdbdbd', borderRadius: 4, background: '#f8f8fa', padding: '4px 12px', fontWeight: 600, cursor: 'pointer' }}>검색</button>
      </div>
      <div className="dashboard-table-card">
        <table className="dashboard-table" style={{ minWidth: 1600 }}>
          <thead>
            <tr>
              <th>프로필</th>
              <th>ID</th>
              <th style={{ minWidth: 120 }}>닉네임</th>
              <th>바이오</th>
              <th>팔로워</th>
              <th>팔로잉</th>
              <th>하트수</th>
              <th>프로필URL</th>
              <th>조회수 중앙값</th>
              <th>좋아요 중앙값</th>
              <th>댓글 중앙값</th>
              <th>조회수/구독자</th>
              <th>좋아요/조회수</th>
              <th>댓글/조회수</th>
              <th>조회수 표준편차</th>
              <th>누적 게시물 수</th>
              <th>누적 릴스 수</th>
              <th>평균 업로드 주기</th>
              <th>대표 영상 설명</th>
              <th>최근 5개 영상 썸네일</th>
              <th>최근 5개 영상 주제 요약</th>
              <th>언어</th>
              <th>바이오 링크</th>
              <th>스레드 링크</th>
              <th>모대시 링크</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, i) => (
              <tr key={row.id}>
                <td><img src={row.profile_image} alt="프로필" className="profile-img" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e1306c', background: '#fff' }} /></td>
                <td>{row.unique_id}</td>
                <td style={{ minWidth: 120 }}>{row.nickname}</td>
                <td>{row.bio}</td>
                <td>{row.follower_count.toLocaleString()}</td>
                <td>{row.following_count.toLocaleString()}</td>
                <td>{row.heart_count.toLocaleString()}</td>
                <td><a href={row.url} target="_blank" rel="noopener noreferrer">링크</a></td>
                <td>{row.play_count_median.toLocaleString()}</td>
                <td>{row.digg_count_median.toLocaleString()}</td>
                <td>{row.comment_count_median.toLocaleString()}</td>
                <td>{row.viewsPerFollower.toFixed(2)}</td>
                <td>{row.likesPerView.toFixed(2)}</td>
                <td>{row.commentsPerView.toFixed(2)}</td>
                <td>{row.play_count_std.toLocaleString()}</td>
                <td>{row.totalPosts}</td>
                <td>{row.totalReels}</td>
                <td>{row.avgUploadInterval}</td>
                <td>{row.video_description}</td>
                <td style={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  {row.reels.map((r: any, idx: number) => <img key={idx} src={r.thumb} alt={r.title} title={r.title} className="reels-thumb-img" style={{ width: 32, height: 32, borderRadius: 4 }} />)}
                </td>
                <td>{row.aiSummary}</td>
                <td>{row.lang}</td>
                <td><a href={row.bioLink} target="_blank" rel="noopener noreferrer">바이오</a></td>
                <td><a href={row.threadLink} target="_blank" rel="noopener noreferrer">스레드</a></td>
                <td><a href={row.modaeUrl} target="_blank" rel="noopener noreferrer">모대시</a></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="dashboard-pagination">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>이전</button>
          <span>{page} / {totalPages} (총 {total}개)</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>다음</button>
        </div>
      </div>
    </div>
  );
}

export default App;
