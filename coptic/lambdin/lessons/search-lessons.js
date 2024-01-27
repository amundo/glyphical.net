
let search = query => {
  lessonIndex.search(query, lessons => lessons.forEach(lesson => {
    let lines = lesson.split('\n')
    let windows = lines
      .map((line,i) => [line, i])
      .filter(([line,i]) => line.includes(query))
      .map(([line,i]) => lines.slice(i-1, i+1))

    console.table(windows)
  }))
}

search('personal pro')