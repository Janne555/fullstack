import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const courses = [
    {
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
      {
        courses.map(course => (
          <Course course={course} />
        ))
      }
    </div >
  )
}

type CourseProps = {
  course: {
    name: string
    parts: PartType[]
  }
}

const Course = ({ course }: CourseProps) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total numExercises={course.parts.reduce((sum, { exercises }): number => exercises + sum, 0)} />
    </>
  )
}

const Header = ({ course }: { course: string }) => <h1>{course}</h1>

type PartType = {
  name: string
  exercises: number
  id: number
}

type ContentProps = {
  parts: PartType[]
}

const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      {
        parts.map(part => <Part key={part.name} {...part} />)
      }
    </div>
  )
}

const Part = ({ name, exercises }: PartType) => <p>{name} {exercises}</p>

const Total = ({ numExercises }: { numExercises: number }) => <b>total of {numExercises} exercises</b>

ReactDOM.render(<App />, document.getElementById('root'))