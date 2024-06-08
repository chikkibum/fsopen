import Course from './components/Course';

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                // Other parts...
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                // Other parts...
            ]
        }
    ];

    return (
        <div>
            {courses.map(course => <Course key={course.id} course={course} />)}
        </div>
    );
}

export default App;
