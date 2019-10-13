import React from 'react'

type CourseProps = {
  course: {
    name: string
    parts: PartType[]
  }
}

export default function Course({ course }: CourseProps) {
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
