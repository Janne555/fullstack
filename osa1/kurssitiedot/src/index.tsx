import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }

  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }

  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total numExercises={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

const Header = ({ course }: { course: string }) => <h1>{course}</h1>

type PartType = {
  name: string
  exercises: number
}

type ContentProps = {
  part1: PartType
  part2: PartType
  part3: PartType
}

const Content = ({ part1, part2, part3 }: ContentProps) => {
  return (
    <div>
      <Part {...part1} />
      <Part {...part2} />
      <Part {...part3} />
    </div>
  )
}

const Part = ({ name, exercises }: PartType) => <p>{name} {exercises}</p>

const Total = ({ numExercises }: { numExercises: number }) => <p>Number of exercises {numExercises}</p>

ReactDOM.render(<App />, document.getElementById('root'))