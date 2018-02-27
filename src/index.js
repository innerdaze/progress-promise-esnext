import React from "react";
import { equals } from "ramda";
import { render } from "react-dom";
import Hello from "./Hello";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const ProgressPromise = {
  all: (promises, reporter) =>
    Promise.all(
      promises.map((promise, index) =>
        promise.then(() => reporter((index + 1) / promises.length))
      )
    )
};

const sleep = time =>
  new Promise((resolve, reject) => setTimeout(resolve, time));

const expectedResult = [
  "Should print before first report",
  "0.2",
  "0.4",
  "Should print before third report",
  "0.6",
  "0.8",
  "1",
  "Should print at the end"
];

const result = [];
const capture = result.push.bind(result);

ProgressPromise.all(
  [
    sleep(10).then(() => result.push("Should print before first report")),
    sleep(10),
    sleep(10).then(() => capture("Should print before third report")),
    sleep(10),
    sleep(10)
  ],
  capture
).then(progress => capture("Should print at the end"));

if (equals(result, expectedResult)) {
  console.log("PASS");
} else {
  console.log(
    `FAIL

${result.join("\r\n")}

Does not equal

${expectedResult.join("\r\n")}
`
  );
}

const App = () => (
  <div style={styles}>
    <Hello name="CodeSandbox" />
    <h2>Start editing to see some magic happen {"\u2728"}</h2>
  </div>
);

render(<App />, document.getElementById("root"));
