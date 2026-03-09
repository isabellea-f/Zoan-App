import { Text, View } from "react-native"
import { Path, Svg, Text as SvgText, G} from "react-native-svg"

// Step 1: Draw the SVG area with a set number of circle segments
// move origo to center with <g>(?)
// Iterate over a set of tasks, starting with i of 0 every iteration should:
// Draw a line from origo to edge of circle, to tangent of (360deg / n^segments) * i
// Draw a curve to tangent of (360deg / n^segments) * (i + 1)
// Draw a line to origo
// Set an appropriate fill color
// Step 2: Insert task titles to segment i each iteration

const tasks = ["Eat", "Work", "Poop", "Cry", "Sleep"]

const radius = 100
const angle = 360 / tasks.length
const segments = []


tasks.forEach((element, index) => {
  const x1 = radius + radius * Math.cos(index * angle)
  const y1 = radius + radius * Math.sin(index * angle)
  const x2 = radius + radius * Math.cos((index +1) * angle)
  const y2 = radius + radius * Math.sin((index +1) * angle)
  segments.push(
  <G key={`Line-${index}`}>
    <Path 
      d={`M${radius} ${radius} L${x1} ${y1} C${(x2 - x1) * .8} ${y1} ${x2} ${(y2 - y1) * .8} ${x2} ${y2}`}
      fill={`#${Math.floor(Math.random()*4096).toString(16).padStart(3, '0')}`} 
      stroke="none" 
    />
    <SvgText>{ element }</SvgText>
  </G>
)}

export default function Zpinner() {
  return (
    <>
      <View>
        <Text>Poke the spinner to git dizzee!</Text>
        <Svg height="200px" width="200px" viewBox="0 0 200 200">
          {segments}
           {/* console.log(segments); */}
          {/* <Path d="M100 100 L100 0 C150 0 200 50 200 100" fill="red" stroke="none" />
          <Path d="M100 100 L200 100 C200 150 150 200 100 200" fill="blue" stroke="none" />
          <Path d="M100 100 L100 200 C50 200 0 150 0 100" fill="green" stroke="none" />
          <Path d="M100 100 L0 100 C0 50 50 0 100 0" fill="yellow" stroke="none" />
          <SvgText height="20px" width="100px">{tasks[0]}</SvgText> */}
        </Svg>
      </View>
    </>
  )
}
