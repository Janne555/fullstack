import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total numExercises={course.parts.reduce((sum, { exercises }): number => exercises + sum, 0)} />
    </div >
  )
}

const Header = ({ course }: { course: string }) => <h1>{course}</h1>

type PartType = {
  name: string
  exercises: number
}

type ContentProps = {
  parts: PartType[]
}

const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      {
        parts.map(part => <Part {...part} />)
      }
    </div>
  )
}

const Part = ({ name, exercises }: PartType) => <p>{name} {exercises}</p>

const Total = ({ numExercises }: { numExercises: number }) => <p>Number of exercises {numExercises}</p>

ReactDOM.render(<App />, document.getElementById('root'))