const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('./models/Course');
const CourseModule = require('./models/CourseModule');
const Lesson = require('./models/Lesson');
const LessonStep = require('./models/LessonStep');
const User = require('./models/User');
const VisualPaper = require('./models/VisualPaper');
const VisualExam = require('./models/VisualExam');
const Class = require('./models/Class');

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lms');
        console.log('Connected to MongoDB');

        // Find teacher "anu"
        const teacher = await User.findOne({ name: /anu/i, role: 'teacher' });
        if (!teacher) {
            console.error('Teacher "anu" not found');
            process.exit(1);
        }
        console.log(`Found teacher: ${teacher.name} (${teacher._id})`);

        // Get the first class of this teacher if any, or just any class
        let teacherClass = await Class.findOne({ teacher: teacher._id });
        if (!teacherClass) {
            teacherClass = new Class({
                className: 'Physics 101',
                teacher: teacher._id,
                students: []
            });
            await teacherClass.save();
        }
        const classId = teacherClass._id;
        console.log(`Assigned to class: ${classId}`);

        // 1. Create a Course
        const course = new Course({
            title: 'Advanced Physics: Mechanics & Kinematics',
            description: 'A comprehensive visual guide to understanding motion, forces, and energy.',
            teacherId: teacher._id,
            classIds: classId ? [classId] : [],
            status: 'published'
        });
        await course.save();
        console.log('Created course:', course.title);

        // 2. Create a Module
        const courseModule = new CourseModule({
            title: 'Projectile Motion',
            description: 'Analyzing motion in two dimensions under the influence of gravity.',
            courseId: course._id,
            order: 0
        });
        await courseModule.save();
        console.log('Created module:', courseModule.title);

        // 3. Create a Lesson
        const lesson = new Lesson({
            title: 'The Mathematics of Trajectories',
            description: 'Breaking down initial velocity into components.',
            moduleId: courseModule._id,
            courseId: course._id,
            order: 0
        });
        await lesson.save();
        console.log('Created lesson:', lesson.title);

        // 4. Create Lesson Steps (using all tools)
        const steps = [
            {
                lessonId: lesson._id,
                courseId: course._id,
                type: 'explanation',
                title: 'Introduction to Projectiles',
                text: 'Projectile motion is a form of motion experienced by an object or particle that is projected near the Earth\'s surface and moves along a curved path under the action of gravity only. The only force of significance that acts on the object is gravity, which acts downward, thus imparting to the object a downward acceleration.',
                order: 0
            },
            {
                lessonId: lesson._id,
                courseId: course._id,
                type: 'quote',
                quoteType: 'important',
                title: 'Key Assumption',
                text: 'Air resistance is considered negligible in ideal projectile motion problems.',
                order: 1
            },
            {
                lessonId: lesson._id,
                courseId: course._id,
                type: 'quote',
                quoteType: 'formula',
                title: 'Trajectory Equation',
                text: 'y = x * tan(θ) - (g * x^2) / (2 * v0^2 * cos^2(θ))',
                order: 2
            },
            {
                lessonId: lesson._id,
                courseId: course._id,
                type: 'example',
                title: 'Worked Example: Kicking a Football',
                text: 'A football is kicked with an initial velocity of 20 m/s at an angle of 30° above the horizontal.\n\nStep 1: Find components.\nv_x = 20 * cos(30) = 17.32 m/s\nv_y = 20 * sin(30) = 10 m/s\n\nStep 2: Find time of flight.\nt = (2 * v_y) / g = (2 * 10) / 9.8 = 2.04 seconds',
                order: 3
            },
            {
                lessonId: lesson._id,
                courseId: course._id,
                type: 'practice',
                title: 'Check your understanding',
                questionText: 'What is the vertical acceleration of a projectile at its highest point?',
                questionType: 'MCQ',
                options: ['0 m/s²', '9.8 m/s² upwards', '9.8 m/s² downwards', 'It depends on initial mass'],
                correctAnswer: '9.8 m/s² downwards',
                order: 4
            },
            {
                lessonId: lesson._id,
                courseId: course._id,
                type: 'quote',
                quoteType: 'exam-tip',
                title: 'Common Mistake',
                text: 'Remember that horizontal velocity remains CONSTANT throughout the flight (assuming no air resistance). Only the vertical velocity changes.',
                order: 5
            }
        ];
        await LessonStep.insertMany(steps);
        console.log(`Created ${steps.length} lesson steps with various tools.`);

        // 5. Create Visual Paper (Labeling)
        const labelingPaper = new VisualPaper({
            type: 'labeling',
            title: 'Projectile Motion Graph Labeling',
            description: 'Label the components of a projectile\'s parabolic path.',
            teacherId: teacher._id,
            backgroundImageUrl: '/placeholder-graph.png', // Fallback URL
            spots: [
                { x: 10, y: 90, label: 'Origin' },
                { x: 50, y: 20, label: 'Maximum Height' },
                { x: 90, y: 90, label: 'Range' }
            ]
        });
        await labelingPaper.save();
        console.log('Created visual paper (labeling):', labelingPaper.title);

        // 6. Create Visual Exam using the paper
        const visualExam = new VisualExam({
            title: 'Quiz: Visualizing Trajectories',
            paperId: labelingPaper._id,
            classId: classId, // Assign to class if exists
            teacherId: teacher._id,
            paperType: 'labeling',
            status: 'draft'
        });
        await visualExam.save();
        console.log('Created visual exam:', visualExam.title);

        console.log('--- SEED COMPLETE ---');
        process.exit(0);

    } catch (e) {
        console.error('Seed failed:', e);
        process.exit(1);
    }
}

seed();
