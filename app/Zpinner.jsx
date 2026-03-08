import { Text, View } from "react-native"
import { Path, Svg, Text as SvgText} from "react-native-svg"

// Step 1: Draw the SVG area with a set number of circle segments
// move origo to center with <g>(?)
// Iterate over a set of tasks, starting with i of 0 every iteration should:
// Draw a line from origo to edge of circle, to tangent of (360deg / n^segments) * i
// Draw a curve to tangent of (360deg / n^segments) * (i + 1)
// Draw a line to origo
// Set an appropriate fill color
// Step 2: Insert task titles to segment i each iteration

const tasks = ["Eat", "Work", "Poop", "Cry", "Sleep"]

export default function Zpinner() {
  return (
    <>
      <View>
        <Text>Poke the spinner to git dizzee!</Text>
        <Svg height="200px" width="200px" viewBox="0 0 200 200">
          <Path d="M100 100 L100 0 C100 0 200 100 200 100 Z" fill="red" stroke="none" />
          <SvgText>{tasks[0]}</SvgText>
        </Svg>
      </View>
    </>
  )
}
