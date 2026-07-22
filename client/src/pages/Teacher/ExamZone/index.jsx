import { useState } from 'react';
import ExamManagement from '../ExamManagement';
import Results from '../Results';
import QuestionPapers from './QuestionPapers';

const subTabs = [
    {
        id: 'exams',
        label: 'Manage Exams',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
        ),
    },
    {
        id: 'question_papers',
        label: 'Question Papers',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
    },
    {
        id: 'results',
        label: 'Results',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
];

const ExamZone = () => {
    const [active, setActive] = useState('exams');

    return (
        <div>
            {/* Sub-tab bar */}
            <div className="sub-tabs">
                {subTabs.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setActive(t.id)}
                        className={`sub-tab ${active === t.id ? 'sub-tab-active' : 'sub-tab-inactive'}`}
                    >
                        <span className={active === t.id ? 'text-slate-700' : 'text-slate-400'}>
                            {t.icon}
                        </span>
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div>
                {active === 'exams'           && <ExamManagement />}
                {active === 'question_papers' && <QuestionPapers />}
                {active === 'results'         && <Results />}
            </div>
        </div>
    );
};

export default ExamZone;
