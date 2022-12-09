const Header = ({ text }) => {
    return (
        <h1>{text}</h1>
    )
}

const Part = ({ name, exercises }) => {
    return (
        <p>{name} {exercises}</p>
    )
}

const Content = ({ parts }) => {
    console.log(parts[0].name);
    return (
        <div>
        {parts.map((part) =>
            <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
        <p><strong>
            total of {
            parts.reduce((sum, part) => {
                return sum + part.exercises
            }, 0)
            } exercises
        </strong></p>
        </div>
    )
}

const Course = ({ course }) => {
    console.log("course course", course);
    return (
        <div>
        <Header text={course.name} />
        <Content parts={course.parts} />
        </div>
    )
}

export default Course