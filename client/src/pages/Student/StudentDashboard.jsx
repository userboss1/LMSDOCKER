import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { toast } from 'react-toastify';
import ExamLobby from './ExamLobby';
import CourseCatalog from './VisualLearning/CourseCatalog';
import ImageSortingExam from './VisualLearning/ImageSortingExam';
import ImageLabelingExam from './VisualLearning/ImageLabelingExam';
import MyNotes from './MyNotes';

const BASE2 = import.meta.env.VITE_API_URL || '';

// ─── My Results Tab ────────────────────────────────────────────────────────────
const MyResults = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedResult, setSelectedResult] = useState(null);
    const [loadingResult, setLoadingResult] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await api.get('/api/student/submissions');
                setSubmissions(data);
            } catch {
                toast.error('Failed to load exam history');
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    const viewResult = async (examId) => {
        setLoadingResult(true);
        try {
            const { data } = await api.get(`/api/student/submissions/${examId}`);
            setSelectedResult(data);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Could not load result');
        } finally {
            setLoadingResult(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center py-16 text-slate-400">
            <svg className="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Loading your exam history...
        </div>
    );

    if (selectedResult) {
        const exam = selectedResult.examId;
        return (
            <div className="animate-fade-in-up">
                <button
                    onClick={() => setSelectedResult(null)}
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6 transition font-medium"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to My Results
                </button>
                <h3 className="text-lg font-bold text-slate-800 mb-1">{exam?.title}</h3>
                {exam?.series && <p className="text-sm text-slate-400 mb-5">{exam.series}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-center">
                        <p className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-2">MCQ Score</p>
                        <p className="text-4xl font-black text-blue-700">{selectedResult.mcqScore}</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5 text-center">
                        <p className="text-xs text-purple-500 font-bold uppercase tracking-widest mb-2">Descriptive</p>
                        <p className="text-4xl font-black text-purple-700">{selectedResult.descriptiveScore}</p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-center">
                        <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest mb-2">Final Score</p>
                        <p className="text-4xl font-black text-emerald-700">{selectedResult.finalScore}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (submissions.length === 0) return (
        <div className="empty-state">
            <svg className="w-14 h-14 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="font-semibold text-slate-500 mb-1">No results yet</p>
            <p className="text-sm text-slate-400">You haven't attended any exams yet.</p>
        </div>
    );

    return (
        <div className="space-y-3">
            <p className="section-label mb-3">Attended Exams · {submissions.length} total</p>
            {submissions.map(sub => {
                const exam = sub.examId;
                const published = exam?.resultsPublished;
                return (
                    <div key={sub._id} className="bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 flex items-center justify-between hover:border-slate-200 transition-colors">
                        <div>
                            <p className="font-semibold text-slate-800">{exam?.title || 'Exam'}</p>
                            <p className="text-xs text-slate-400 mt-0.5">
                                Submitted {new Date(sub.submittedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                        </div>
                        {published ? (
                            <button
                                onClick={() => viewResult(exam._id)}
                                disabled={loadingResult}
                                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-60"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View Score
                            </button>
                        ) : (
                            <span className="text-xs px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full font-semibold">
                                Results Pending
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

// ── Visual Exam Lobby (sorting + labeling) ─────────────────────────────────────
const VisualExamLobby = () => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeExam, setActiveExam] = useState(null);

    const fetchExams = async () => {
        setLoading(true);
        try { const { data } = await api.get('/api/visual/student/available'); setExams(data); }
        catch { toast.error('Failed to load visual exams'); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchExams(); }, []);

    if (activeExam) {
        const back = () => { setActiveExam(null); fetchExams(); };
        if (activeExam.paperType === 'labeling') return <ImageLabelingExam examId={activeExam._id} onBack={back} />;
        return <ImageSortingExam examId={activeExam._id} onBack={back} />;
    }

    if (loading) return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3].map(i => <div key={i} className="h-44 bg-slate-100 rounded-2xl animate-pulse"/>)}
        </div>
    );

    if (exams.length === 0) return (
        <div className="empty-state">
            <svg className="w-14 h-14 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="font-semibold text-slate-500 mb-1">No visual exams live right now</p>
            <p className="text-sm text-slate-400">Check back later</p>
        </div>
    );

    const typeBadge = { sorting: 'bg-indigo-100 text-indigo-700', labeling: 'bg-purple-100 text-purple-700' };
    const typeBtn   = { sorting: 'from-indigo-600 to-purple-600', labeling: 'from-purple-600 to-fuchsia-600' };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exams.map(exam => {
                const approved = exam.isApproved;
                const done     = exam.hasSubmitted;
                const paper    = exam.paperId;
                return (
                    <div key={exam._id} className={`border rounded-2xl flex flex-col transition-all shadow-sm hover:shadow-md overflow-hidden ${
                        done     ? 'bg-slate-50 border-slate-200' :
                        approved ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200' :
                                   'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100'
                    }`}>
                        {exam.paperType==='sorting' && paper?.images?.length > 0 && (
                            <div className="flex h-20 overflow-hidden rounded-t-2xl">
                                {paper.images.slice(0,5).map((img,i) => (
                                    <div key={i} className="flex-1 overflow-hidden">
                                        <img src={`${BASE2}${img.imageUrl}`} alt="" className="w-full h-full object-cover"/>
                                    </div>
                                ))}
                            </div>
                        )}
                        {exam.paperType==='labeling' && paper?.backgroundImageUrl && (
                            <div className="h-20 overflow-hidden rounded-t-2xl">
                                <img src={`${BASE2}${paper.backgroundImageUrl}`} alt="" className="w-full h-full object-cover"/>
                            </div>
                        )}
                        <div className="p-4 flex flex-col flex-1">
                            <div className="flex items-start gap-2 mb-1">
                                <h4 className="font-bold text-slate-800 flex-1 text-sm leading-snug">{exam.title}</h4>
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${typeBadge[exam.paperType]||'bg-slate-100 text-slate-600'}`}>
                                    {exam.paperType}
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 mb-4">
                                {exam.paperType==='sorting' ? `${paper?.images?.length||0} images to sort` : `${paper?.spots?.length||0} spots to label`}
                            </p>
                            {done
                                ? <div className="mt-auto py-2.5 bg-slate-200 text-slate-500 text-xs font-bold rounded-xl text-center">✓ Submitted</div>
                                : approved
                                    ? <button
                                        onClick={() => setActiveExam({_id:exam._id, paperType:exam.paperType})}
                                        className={`mt-auto w-full py-2.5 bg-gradient-to-r ${typeBtn[exam.paperType]||'from-slate-600 to-slate-700'} text-white text-sm font-bold rounded-xl hover:opacity-90 transition shadow-md`}
                                      >
                                        {exam.paperType==='sorting' ? '🃏 Start Sorting' : '🔍 Start Labeling'}
                                      </button>
                                    : <div className="mt-auto py-2.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-xl text-center">⏳ Awaiting approval</div>
                            }
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// Tab header configs
const tabHeaders = {
    my_exams: {
        gradient: 'from-emerald-500 to-teal-500',
        shadow:   'shadow-emerald-200',
        title:    'Available Exams',
        subtitle: 'Live exams assigned to your class — waiting for teacher approval',
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />,
    },
    sorting: {
        gradient: 'from-indigo-500 to-purple-500',
        shadow:   'shadow-indigo-200',
        title:    'Visual Exams',
        subtitle: 'Image sorting and labeling exams assigned to you',
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    },
    courses: {
        gradient: 'from-sky-500 to-blue-500',
        shadow:   'shadow-sky-200',
        title:    'My Courses',
        subtitle: 'Visual learning modules and lessons from your teachers',
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
    },
    my_notes: {
        gradient: 'from-violet-500 to-indigo-500',
        shadow:   'shadow-violet-200',
        title:    'Study Notes',
        subtitle: 'Study material and resources shared by your teachers',
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    },
    results: {
        gradient: 'from-rose-500 to-pink-500',
        shadow:   'shadow-rose-200',
        title:    'My Results',
        subtitle: 'Your exam submission history and published scores',
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    },
};

const StudentDashboard = ({ activeTab }) => {
    const hdr = tabHeaders[activeTab];

    return (
        <div className="space-y-5 animate-fade-in-up">
            {/* Page header card */}
            {hdr && (
                <div className="card-padded">
                    <div className="flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${hdr.gradient} flex items-center justify-center shadow-lg ${hdr.shadow} flex-shrink-0`}>
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {hdr.icon}
                            </svg>
                        </div>
                        <div>
                            <h1 className="page-title">{hdr.title}</h1>
                            <p className="page-subtitle">{hdr.subtitle}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Content card */}
            <div className="card-padded">
                {activeTab === 'my_exams' && <ExamLobby />}
                {activeTab === 'sorting'  && <VisualExamLobby />}
                {activeTab === 'courses'  && <CourseCatalog />}
                {activeTab === 'my_notes' && <MyNotes />}
                {activeTab === 'results'  && <MyResults />}
                {!['my_exams','sorting','courses','my_notes','results'].includes(activeTab) && (
                    <div className="empty-state">
                        <p className="text-sm font-medium text-slate-400">Select a section from the sidebar to begin.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
