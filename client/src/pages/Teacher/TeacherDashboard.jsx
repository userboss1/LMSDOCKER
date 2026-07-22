import CourseManager from './VisualLearning/CourseManager';
import ExamZone from './ExamZone/index';
import NotesManager from './NotesManager';
import TeacherStudents from './TeacherStudents';
import ImageSortingManager from './VisualLearning/ImageSortingManager';

// Page header configs per tab
const tabHeaders = {
    courses: {
        gradient: 'from-blue-500 to-cyan-500',
        shadow:   'shadow-blue-200',
        title:    'Courses',
        subtitle: 'Create and manage visual learning courses for your students',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        ),
    },
    notes: {
        gradient: 'from-indigo-500 to-blue-500',
        shadow:   'shadow-indigo-200',
        title:    'Notes Manager',
        subtitle: 'Create subjects and share study material with your classes',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        ),
    },
    students: {
        gradient: 'from-sky-500 to-blue-500',
        shadow:   'shadow-sky-200',
        title:    'Students',
        subtitle: 'View and manage students enrolled in your classes',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        ),
    },
    exam_zone: {
        gradient: 'from-emerald-500 to-teal-500',
        shadow:   'shadow-emerald-200',
        title:    'Exam Zone',
        subtitle: 'Manage live exams, approve students, and view results',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        ),
    },
    sorting: {
        gradient: 'from-purple-500 to-indigo-500',
        shadow:   'shadow-purple-200',
        title:    'Visual Exams',
        subtitle: 'Create sorting and labeling exams using images',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        ),
    },
};

const TeacherDashboard = ({ activeTab }) => {
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
                {activeTab === 'courses'    && <CourseManager />}
                {activeTab === 'notes'      && <NotesManager />}
                {activeTab === 'students'   && <TeacherStudents />}
                {activeTab === 'exam_zone'  && <ExamZone />}
                {activeTab === 'sorting'    && <ImageSortingManager />}
            </div>
        </div>
    );
};

export default TeacherDashboard;
