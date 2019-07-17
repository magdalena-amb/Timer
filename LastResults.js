var LastResults = function LastResults(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h3",
      null,
      "Last saved"
    ),
    React.createElement(
      "ul",
      { className: "lastResults" },
      props.results
    )
  );
};