const Header = (props) => {
  return(
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}
const Content = (props) => {
  const list = props.list
  return(
    <div>
      {list.map((part) => (
        <p key={part.id}>{part.name} {part.exercises}</p>
      ))}
    </div>
  )
}
const Total = (props) => {
  const list = props.list
  const printable = list.reduce(
    (acumulator,currentValue) => acumulator + currentValue.exercises,
    0,
  );
  return(
    <div>
      <p>Total of {printable} exercises</p>
    </div>
  )
}
const Course = (props) => {
  const course = props.course
  return(
    <div>
      <Header key={course.id} name={course.name} />
      <Content key={course.id} list={course.parts} />
      <Total key={course.id} list={course.parts} />
    </div>
  )
}
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
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
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
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map((course) =>
        <>
          <Course id={course.id} course={course}/>
        </>
      )}
    </div>
  )
}

export default App
