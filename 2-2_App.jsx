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
  let tot = 0
  list.forEach(element => {
    tot += element.exercises
  });
  return(
    <div>
      <p>Total of {tot} exercises</p>
    </div>
  )
}
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return (
    <div>
    <Header name={course.name} />
    <Content list={course.parts} />
    <Total list={course.parts} />
    </div>
  )
}

export default App
